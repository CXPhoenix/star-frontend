import axios from "axios";

const req = axios.create({
  baseURL: "https://star.fhsh.tp.edu.tw/api",
});

export const getSignIn = async (account, password) => {
  const reqst = await req.post("/user/sign-in", {
    account,
    password,
  });
  // const reqst = await req.post("/user/sign-in", {
  //   account: "10630801",
  //   password: "A230612119",
  // });
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

export const updateVolunteerRank = async (volunteerRanks) => {
  const signInInfo = JSON.parse(window.localStorage.getItem("signIn"));
  const accessToken = signInInfo.accessToken;
  const reqst = await req.post(
    "/pre-apply/volunteer-rank",
    { userRanking: volunteerRanks },
    {
      headers: { "x-token": accessToken },
    }
  );
  window.sessionStorage.setItem("user", JSON.stringify(reqst.data));
  return reqst.data;
};
