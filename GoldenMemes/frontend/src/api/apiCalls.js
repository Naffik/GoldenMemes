import axios from "axios";
import { userRefreshToken } from "../store/auth";

var store;

export const injectStore = (_store) => {
  store = _store;
};

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

const instanceProtected = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

// INTERCEPTORS

instanceProtected.interceptors.request.use(
  (config) => {
    // console.log("token", store.getState().accessToken);
    let token = store.getState().accessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instanceProtected.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await RequestRefresh();
          if (rs) {
            store.dispatch(userRefreshToken({ rs }));
            instance.defaults.headers.common["Authorization"] = rs;
          }

          return instance(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

// INSTANCES

export async function getReq(path) {
  return await instance
    .get(path)
    .then((response) => {
      //  console.log("get res:", response);
      return response;
    })
    .catch((err) => {
      console.log("error get req", err);
      return null;
    });
}

export async function getReqProtected(path) {
  // Response interceptor for API call
  return await instanceProtected
    .get(path)
    .then((response) => {
      // console.log("get res:", response);
      return response;
    })
    .catch((err) => {
      console.log("error get req", err);
      return null;
    });
}

export async function postReq(path, data) {
  console.log("data", data);
  return await instance
    .post(path, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log("error", err);
      return null;
    });
}

export async function postReqProtected(path, data) {
  return await instanceProtected
    .post(path, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log("error", err);
      return null;
    });
}

// CALLS TO INSTANCES

export async function RequestRefresh() {
  let refresh = store.getState().refreshToken;
  let res = await postReq("account/api/token/refresh/", { refresh });
  if (res) return res.data.access;
  else console.log("Nie udało się pobrać nowego tokena");
}

export async function LoginCall({ username, password }) {
  const res = await postReq("account/api/token/", { username, password });
  return res;
}

export async function RegisterCall({ username, email, password, password2 }) {
  return await postReq("account/register/", { username, email, password, password2 });
}

export async function SubmitPostCall(data) {
  const { title, attachment, tags } = data;

  let formData = new FormData();
  formData.append("title", title);
  formData.append("image", attachment);
  formData.append("tags", JSON.stringify(tags));

  return await postReqProtected("api/post/submit/", formData);
}

export async function PostListCall() {
  const postsData = await getReqProtected("api/post/");
  if (postsData) return postsData.data.results;
  else return null;
}
