import { KuotaPage } from './app.po';

describe('kuota App', () => {
  let page: KuotaPage;

  beforeEach(() => {
    page = new KuotaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
