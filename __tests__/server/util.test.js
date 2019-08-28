const Handlebars = require('handlebars');
const {
  parseTemplate,
  render,
  renderFromTemplateString
} = require('../../server/util');

jest.mock('handlebars');

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

// Render is a function that simply wraps the handlebars compile method
describe('render', () => {
  it('should return html with fields replaced given a handlebars template and a set of inputs', () => {
    const source = '<div>template {{key}} string</div>';
    const inputs = { key: 'value' };
    const expectedRender = '<div>template value string</div>';

    Handlebars.compile.mockImplementation(() => () =>
      '<div>template value string</div>'
    );

    const rendered = render(source, inputs);
    expect(rendered).toBe(expectedRender);
  });
});

// Composes parseTemplate and render to generate fully parsed HTML
describe('renderFromTemplate', () => {
  it('should return html with fields replaced given a string template and a set of inputs', () => {
    const templateStr = 'template %%key%% string';
    const inputs = { key: 'value' };
    const expectedRender = '<div>template value string</div>';

    Handlebars.compile.mockImplementation(source => () => {
      if (source === '<div>template {{key}} string</div>') {
        return '<div>template value string</div>';
      }
    });

    const rendered = renderFromTemplateString(templateStr, inputs);
    expect(rendered).toBe(expectedRender);
  });
});
