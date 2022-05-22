import sessionHelper from "./sessionHelper";

function Client({
  path = "",
  baseUrl = "http://127.0.0.1:4000",
  options = {},
  payload,
}) {

  const _url = (() => {
    let _path = path;

    if (_path[0] !== "/") _path = "/" + _path;

    return baseUrl + _path;
  })();

  const _options = {
    ...JSON.parse(JSON.stringify(options)),
    headers: {
      Authorization: `Bearer ${sessionHelper.token}`,
      "Content-Type": "application/json",
      
    }
  };

  if (payload) {
    _options.body = JSON.stringify(payload);
  }

  const _handleError = (error) => {
    console.error(error);
    throw error;
  };

  const _fetch = async (...args) => {
    try {
      const response = await fetch(...args);
      const responseJson = await response.json();

      return responseJson;
    } catch (error) {
      _handleError(error);
    }
  };

  /**
   * GET request to remote service
   */
  this.get = () =>
    _fetch(_url, {
      ..._options,
      method: "GET",
    });

  /**
   * POST request to remote service
   */
  this.post = () =>
    _fetch(_url, {
      ..._options,
      method: "POST",
    });

  /**
   * PUT request to remote service
   */
  this.put = () =>
    _fetch(_url, {
      ..._options,
      method: "PUT",
    });

  /**
   * PATCH request to remote service
   */
  this.patch = () =>
    _fetch(_url, {
      ..._options,
      method: "PATCH",
    });

  /**
   * DELETE request to remote service
   */
  this.delete = () =>
    _fetch(_url, {
      ..._options,
      method: "DELETE",
    });
}

export {
  Client
};
