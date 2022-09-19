import axios from 'axios';

const {
  REACT_APP_BACKEND_HOST: hostname,
  REACT_APP_BACKEND_PORT: port,
} = process.env;

const request = async ({
  method, url, data = {}, auth = {},
}) => {
  try {
    const response = await axios({
      method,
      baseURL: `http://${hostname || 'localhost'}:${port || 3010}`,
      url,
      auth,
      data,
    });

    return {
      error: false,
      data: response.data,
    };
  } catch (error) {
    return {
      error: true,
      data: error.response.data,
    };
  }
};

export default request;
