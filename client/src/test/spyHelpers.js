export const fetchResponseOk = (body) =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(body),
  });

export const fetchResponseError = () =>
  Promise.resolve({ ok: false });

export const requestBodyOf = (fetchSpy) =>
  JSON.parse(fetchSpy.mock.calls[0][1].body);

export const requestURLOf = (fetchSpy) => fetchSpy.mock.calls[0][0];

/**
 *
 * @param {*} name
 * @param {*} value
 * @returns Search param string.
 */
export const urlSearchParam = (name, value) => `${name}=${value}`;

export const fieldWithName = (fieldName) =>
  urlSearchParam('field', fieldName);
export const tableWithName = (tableName) =>
  urlSearchParam('table', tableName);
