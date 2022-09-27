import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/";

export async function getReq(path, token) {
  return await axios
    .get(path, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("get res:", response);
      return response;
    })
    .catch((err) => {
      console.log("error get req", err);
      return null;
    });
}

export async function postReq(path, data) {
  return await axios
    .post(path, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log("error", err);
      return null;
    });
}

export async function postReqProtected(path, data, token) {
  return await axios
    .post(path, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log("error", err);
      return null;
    });
}

export async function LoginCall({ username, password }) {
  const res = await postReq(BASE_URL + "account/api/token/", { username, password });
  return res;
}

export async function RegisterCall({ username, email, password, password2 }) {
  return await postReq(BASE_URL + "account/register/", { username, email, password, password2 });
}

export async function SubmitPostCall(data, token) {
  const { title, attachment, tags } = data;

  let formData = new FormData();
  formData.append("title", title);
  formData.append("image", attachment);
  formData.append("tags", JSON.stringify(tags));
  // console.log("title", title, "aatach", attachment);
  return await postReqProtected(BASE_URL + "api/post/submit/", formData, token);
}

export async function PostListCall(token) {
  const postsData = await getReq(BASE_URL + "api/post/", token);
  if (postsData) return postsData.data.results;
  else return null;
}
