const {
  parseTemplate,
  render,
  renderFromTemplateString
} = require('../../../server/util');

describe('parseTemplate', () => {
  it('should return html string for a given templateString and inputs', () => {
    const templateStr = 'template %%key%% string';
    const inputs = {
      key: 'value'
    };
    const expectedParsed = '<div>template {{key}} string</div>';

    const parsed = parseTemplate(templateStr, inputs);
    expect(parsed).toBe(expectedParsed);
  });

  it('should return an empty <div> given an empty templateString', () => {
    const templateStr = '';
    const inputs = {
      key: 'value'
    };
    const expectedParsed = '<div></div>';

    const parsed = parseTemplate(templateStr, inputs);
    expect(parsed).toBe(expectedParsed);
  });

  // this is probably not the expected functionality...
  it("should return the string with '%%' characters stripped if no inputs match the keys", () => {
    const templateStr = 'template %%key%% string';
    const expectedParsed = '<div>template key string</div>';

    const parsed = parseTemplate(templateStr);
    expect(parsed).toBe(expectedParsed);
  });
});
