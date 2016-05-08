describe('App', () => {
  beforeEach(() => {
    browser.get('/');
  });

  it('should have a <h1>', () => {
    const subject: webdriver.promise.Promise<boolean> = element(by.css('sg-app div h1')).isPresent();
    const result: boolean = true;
    expect(subject).toEqual(result);
  });
});
