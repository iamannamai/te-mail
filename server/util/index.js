const Handlebars = require('handlebars');

/**
 * Converts email template string to html template with mustache brackets
 * @param {string} templateString - string version of template to parse into html
 * @param {object} inputs - inputs for template so the function can identify which strings pertain to a key and format accordingly
 */
const parseTemplate = (templateString, inputs) => {
  // split by newline character first
  // within each string, further split by '%%' characters
  // map through each string and return either the string or the mustached version of {{string}} if it is a key
  return `<div>${templateString
    .split('\\n')
    .map(subStr => {
      return subStr
        .split('%%')
        .map(keyCandidate => {
          return inputs.hasOwnProperty(keyCandidate)
            ? `{{${keyCandidate}}}`
            : keyCandidate;
        })
        .join('');
    })
    .join('</div><div>')}</div>`;
};

const render = (source, inputs) => {
  const template = Handlebars.compile(source);

  return template(inputs);
};

module.exports = {
  parseTemplate,
  render
};
