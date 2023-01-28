import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBInput,
  MDBCardFooter,
  MDBBtn,
  MDBSpinner,
  MDBValidation,
  MDBTypography,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SignIn, SignUp, GoogleSignIn } from "../redux/Features/AuthSlice";
import Google from "react-google-login";
import { gapi } from "gapi-script";
const Auth = () => {
  const { isLoading, isError, user } = useSelector((state) => state.auth);
  

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
    if (!user) {
      navigate("/signup");
    }

    if (user) {
      navigate("/");
      toast.success("login success");
    }
  }, [isError, user]);

  // dispatch
  const dispatch = useDispatch();
  // navigate
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formValue, setFormValue] = useState({
    firstname: "",
    lastname: "",
    conformpassword: "",
    email: "",
    password: "",
  });
  const { firstname, lastname, email, password, conformpassword } = formValue;
  // handlesubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (password !== conformpassword) {
        return toast.error("please enter valid password");
      } else {
        const SignupData = {
          firstname,
          lastname,
          email,
          password,
          conformpassword,
        };
        dispatch(SignUp(SignupData));
        navigate("/signup");
      }
    } else {
      const LoginData = {
        email,
        password,
      };
      if (email && password) {
        dispatch(SignIn(LoginData));
      }
    }
  };

  // gapi

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "555708941349-b51hofe0h2ocktuur168iur2jteejgph.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);
  // handleSuccess

  const handleSuccess = async (res) => {
    console.log("res: ", res);
    const email = res?.profileObj?.email;
    const name = res?.profileObj.name;
    const googleid = res?.profileObj?.googleid;
    const image = res?.profileObj?.imageUrl;
    const token = res?.tokenId;
    const result = { name, email, googleid, image, token };
    dispatch(GoogleSignIn(result));
  };

  // handle failure

  const handleFailure = (error) => {
    toast.error("login failed");
    console.log(error);
  };

  // handlechange
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  // switchmode
  const switchmode = () => {
    setIsSignUp((prev) => !prev);
  };
  return (
    <>
      <div
        className="mt-5 mx-auto"
        style={{ alignContent: "center", maxWidth: "450px" }}
      >
        <MDBCard alignment="center">
          <MDBTypography className="fw-bold mt-3">
            {isSignUp ? "Sign Up" : "Sign In"}
          </MDBTypography>
          <MDBIcon icon="user-circle" className="fa-2x" />
          <MDBCardBody>
            <MDBValidation
              noValidate
              className="row gap-3"
              onSubmit={handleSubmit}
            >
              {isSignUp && (
                <>
                  {" "}
                  <MDBValidationItem invalid feedback="enter firstname">
                    <MDBInput
                      label="firstname"
                      name="firstname"
                      value={firstname}
                      onChange={handleChange}
                      required
                    />
                  </MDBValidationItem>
                  <MDBValidationItem invalid feedback="enter lastname">
                    <MDBInput
                      label="lastname"
                      name="lastname"
                      value={lastname}
                      onChange={handleChange}
                      required
                    />
                  </MDBValidationItem>
                </>
              )}
              <MDBValidationItem invalid feedback="please enter email">
                <MDBInput
                  label="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </MDBValidationItem>
              <MDBValidationItem invalid feedback="please enter password">
                <MDBInput
                  label="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                />
              </MDBValidationItem>
              {isSignUp && (
                <MDBValidationItem
                  invalid
                  feedback="please enter conformpassword"
                >
                  <MDBInput
                    label="conformpassword"
                    name="conformpassword"
                    value={conformpassword}
                    onChange={handleChange}
                    required
                  />
                </MDBValidationItem>
              )}
              <MDBBtn className="btn-primary" type="submit">
                {isLoading && (
                  <MDBSpinner
                    style={{ fontSize: "1rem", width: "20px", height: "20px" }}
                  />
                )}
                {isSignUp ? "SignUp" : "SignIn"}
              </MDBBtn>
              <Google
                clientId="555708941349-b51hofe0h2ocktuur168iur2jteejgph.apps.googleusercontent.com"
                render={(props) => (
                  <MDBBtn
                    onClick={props.onClick}
                    disabled={props.disabled}
                    color="danger"
                  >
                    <MDBIcon icon="google" fab /> Sign In
                  </MDBBtn>
                )}
                cookiePolicy="single_host_origin"
                onSuccess={handleSuccess}
                onFailure={handleFailure}
              />
            </MDBValidation>
          </MDBCardBody>
          <MDBCardFooter>
            <MDBTypography onClick={switchmode}>
              <Link to="/signup">
                {isSignUp
                  ? "Already have an Account? Sign In"
                  : "Don't have an account?SignUp"}
              </Link>
            </MDBTypography>
          </MDBCardFooter>
        </MDBCard>
      </div>
    </>
  );
};

export default Auth;
