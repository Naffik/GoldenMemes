import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/";

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

export async function postReqProtected(path, postData, token) {
  const { title, image } = postData;

  let data = new FormData();
  data.append("title", title);
  data.append("image", image);

  return await axios
    .post(path, data, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export async function SubmitPost(data, token) {
  const { title, attachment } = data;
  // console.log("title", title, "aatach", attachment);
  return await postReqProtected(BASE_URL + "api/post/submit/", { title, image: attachment }, token);
}

// export async function LoginCall({ username, password }) {
//   return await axios
//     .post(BASE_URL + "account/api/token/", { username, password })
//     .then((response) => {
//       return response;
//     })
//     .catch(() => {
//       return null;
//     });
// }

// export async function RegisterCall({ username, email, password, password2 }) {
//   return await axios
//     .post(BASE_URL + "account/register/", { username, email, password, password2 })
//     .then((response) => {
//       return response;
//     })
//     .catch(() => {
//       return null;
//     });
// }
