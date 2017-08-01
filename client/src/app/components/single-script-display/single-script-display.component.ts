import {Component, Input, OnInit} from '@angular/core';
import {Script} from '../../interfaces/script';

@Component({
    selector: 'gid-single-script-display',
    templateUrl: './single-script-display.component.html',
    styleUrls: ['./single-script-display.component.scss']
})
export class SingleScriptDisplayComponent implements OnInit {
    @Input() script: Script;

    constructor() {
    }

    ngOnInit() {
    }

}
