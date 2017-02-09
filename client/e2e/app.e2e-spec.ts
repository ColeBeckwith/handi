import { HandiPage } from './app.po';

describe('handi App', function() {
  let page: HandiPage;

  beforeEach(() => {
    page = new HandiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
