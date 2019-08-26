export const extractKeys = template => {
  // This regex will match keys containing only word characters. Assumption here is that keys are the only text fields that start and end with '%%'.
  const keys = template.match(/[^%%]\w+(?=%)/g);
  console.log(keys);
  return new Set(keys);
};
