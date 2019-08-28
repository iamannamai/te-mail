/**
 * Extracts keys based on %%key%% format using regex. Keys are then added to a set so that we only render input fields for unique key names
 * @param {string} template - template string
 * @return {Set} - set containing all unique key names
 */

export const extractKeys = (template = '') => {
  // This regex will match keys containing only word characters. Assumption here is that keys are the only text fields that start and end with '%%'.
  const keys = template.match(/[^%%]\w+(?=%%)/g);
  return new Set(keys);
};
