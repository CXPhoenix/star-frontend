import axios from "axios";

export const req = axios.create({
  baseURL: "https://star.fhsh.tp.edu.tw/api",
});

export const getSignIn = async (account, password) => {
  // const reqst = await req.post("/user/sign-in", {
  //   account,
  //   password,
  // });
  const reqst = await req.post("/user/sign-in", {
    account: "10630801",
    password: "A230612119",
  });
  window.localStorage.setItem("signIn", JSON.stringify(reqst.data));

  return reqst.data;
};

export const getUser = async (accessToken) => {
  const data = await req.get("/user/me", {
    headers: { "x-token": accessToken },
  });

  window.sessionStorage.setItem("user", JSON.stringify(data.data));
  return data.data;
};
