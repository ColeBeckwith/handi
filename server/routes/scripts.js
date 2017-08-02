const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const Script = mongoose.model('Script');

const tokenVerification = require('../config/tokenverification');
const feedbackService = require('../services/feedback-service');

router.use((req, res, next) => tokenVerification(req, res, next));

router.post('/upload-script/:scriptId', (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.multiples = true;
    form.keepExtensions = true;
    const uploadDest = path.join(__dirname, '/..', '/script-storage/', 'script' + req.params.scriptId + '.pdf');

    form.parse(req, (err, fields, file) => {
        if (err) {
            console.debug(err);
            return res.status(500).json({error: err});
        }

        fs.rename(file.fileData.path, uploadDest, (err) => {
            if (err) {
                console.debug(err);
                res.status(500).error(err);
            }
            res.status(200).json({ uploaded: true });
        });
    });
});

router.post('/add', (req, res, next) => {
    let script = new Script();
    script.name = req.body.name;
    script.logline = req.body.logline;
    script.genre = req.body.genre;
    script.subgenre = req.body.subgenre;
    script.storageUrl = req.body.storageUrl;
    script.userId = req.requestUser._id;

    script.save((err) => {
        if (err) {
            console.log(err);
            return res.status(500).error(err);
        }
        return res.status(200).json({script: script});
    });
});

router.delete('/:scriptId', (req, res, next) => {
    Script.findById(req.params.scriptId, (err, script) => {
       if (err || !script) {
           return res.status(400).json('Script Not Found');
       }

       feedbackService.removeAllFeedbackDataForScript(script);

       // TODO delete the script in the script-storage folder.

       script.remove((err, script) => {
           if (err) {
               return res.status(500).json('Unable to Delete Script');
           }
           return res.status(200).json('Deleted');
       })
    });
});

router.get('/', (req, res, next) => {
    Script.find({userId: req.requestUser._id}, (err, scripts) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json(scripts);
    });
});

router.get('/:scriptId', (req, res, next) => {
    Script.findById(req.params.scriptId, (err, script) => {
        if (err || !script) {
            return res.status(400).send('Script Not Found');
        }

        return res.status(200).json({script: script});
    })
});

router.get('/for-user/:userId', (req, res, next) => {
    Script.find({userId: req.params.userId}, (err, scripts) => {
        if (err) {
            return res.status(400).send('');
        }

        return res.status(200).json({scripts: scripts});
    })
});

module.exports = router;
