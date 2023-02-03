import axios from "axios";
const API="http://localhost:8080"
axios.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
    
  }
  return req;
});

const SignIn = async (formData) => {
  const response = await axios.post(`/users/signin`, formData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// signup

const SingUp = async (formData) => {
  const response = await axios.post(`/users/signup`, formData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
// google signin

const GoogleSignin = async (user) => {
  const response = await axios.post(`users/googlesignin`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  SignIn,
  SingUp,
  GoogleSignin,
};

export default authService;
