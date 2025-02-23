import axios from "axios";

import { VP_API_URL, VP_CLIENT_ID, VP_CLIENT_SECRET } from "./constants";


class RequestBuilder {
  constructor(url = "") {
    this.url = url;
    this._params = {};
    this._headers = {};
    this._data = {};
  }

  setHeaders(headers) {
    this._headers = headers;
  }

  setParams(params) {
    this._params = params;
  }

  setData(data) {
    this._data = data;
  }

  clean() {
    this._params = {};
    this._data = {};
    this._headers = {};
  }
}

class RequestHandler extends RequestBuilder {
  constructor(url = "") {
    super(url);
  }

  get(endpoint = "") {
    let url = `${this.url}${endpoint}`;
    return axios.get(url, {
      params: this._params,
      headers: this._headers,
    });
  }

  post(endpoint = "") {
    let url = `${this.url}${endpoint}`;
    return axios.post(url, this._data, {
      params: this._params,
      headers: this._headers,
    });
  }

  put(endpoint = "") {
    let url = `${this.url}${endpoint}`;
    return axios.put(url, this._data, {
      params: this._params,
      headers: this._headers,
    });
  }

  patch(endpoint = "") {
    let url = `${this.url}${endpoint}`;
    return axios.patch(url, this._data, {
      params: this._params,
      headers: this._headers,
    });
  }

  delete(endpoint = "") {
    let url = `${this.url}${endpoint}`;
    return axios.delete(url, {
      params: this._params,
      headers: this._headers,
    });
  }
}

class API extends RequestHandler {

  #client_id;
  #client_secret;

  constructor(version = "v1") {
    super(`${VP_API_URL}/api/${version}`);

    this.#client_id = VP_CLIENT_ID;
    this.#client_secret = VP_CLIENT_SECRET;
    
    this.setDefaultHeaders();
  }

  setDefaultHeaders() {
    this.setHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
    });
  }

  cleanRequest() {
    this.clean();
    this.setDefaultHeaders();
  }

  addAuthorization(token) {
    this._headers.Authorization = `Bearer ${token}`;
  }

  status() {
    return new Promise(async (resolve, reject) => {
      try {
        await this.get("/");
        this.cleanRequest();
        resolve();
      } catch (error) {
        this.cleanRequest();
        reject();
      }
    });
  }

  auth() {
    this.setData({
      client_id: this.#client_id,
      client_secret: this.#client_secret,
      grant_type: "client_credentials",
    });
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.post("/clients/authenticate");
        this.cleanRequest();
        const result = response.data;
        const { access_token } = result.data;
        this.addAuthorization(access_token);
        resolve();
      } catch (error) {
        this.cleanRequest();
        reject(error);
      }
    });
  }
  
  featureFlagStatus(name, options = { account_id: null }, callback = () => null) {
    const api = this;
    return new Promise(async (resolve, reject) => {
      try {
        await api.auth();

        const { account_id } = options;

        if (account_id) {
          api.setParams({ account_id });
        }

        const response = await api.get(`/feature_flags/status/${name}`);
        api.cleanRequest();
        resolve(response.data.data);
      } catch (error) {
        api.cleanRequest();
        reject(error?.response?.data);
      }
    });
  }
}

let api = null;

async function initAPI() {
  return new Promise(async (resolve) => {
    const apiInstance = new API();
    try {
      await apiInstance.status();
      api = apiInstance;
    } catch (error) {
      api = null;
      console.warn('[APIError]:', 'API is not available at the moment.');
    }
    resolve();
  });
}

function getAPI() {
  return api;
}

export {
  initAPI,
  getAPI,
};
