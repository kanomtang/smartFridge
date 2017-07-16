import { SmartFridgePage } from './app.po';

describe('smart-fridge App', () => {
  let page: SmartFridgePage;

  beforeEach(() => {
    page = new SmartFridgePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
