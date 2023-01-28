import {
  MDBCardImage,
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarToggler,
} from "mdb-react-ui-kit";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import decode from "jwt-decode"
import { useLocation } from "react-router-dom";
import { Logout, setUser } from "../../redux/Features/AuthSlice";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user: ", user);
  const [item, setItem] = useState(false);
  // location
  const location = useLocation();
  // dispatch
  const dispatch = useDispatch();
  const token=user?.token

 
// handle token expire
  if(token){
    const decodedToken=decode(token)
    console.log('decodedToken: ', decodedToken);
      if(decodedToken.exp * 1000 < new Date().getTime()){
        dispatch(Logout())
      }
    
  }
  

  useEffect(() => {
    dispatch(setUser(user));
  }, [location, dispatch]);

  //handle logout

  const handleLogout = () => {
    dispatch(Logout());
  };
  return (
    <>
      <div style={{position:"sticky",top:"0",left:"0", zIndex:"999"}}>
        <MDBNavbar expand="md" light bgColor="light">
          <MDBContainer>
            <MDBNavbarBrand
              className="fs-2 fw-bolder text-capitalize"
              href="/"
              style={{ color: "cadetblue" }}
            >
              Make Tour
            </MDBNavbarBrand>
            <MDBNavbarToggler
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <MDBIcon
                icon="bars"
                fas
                className="fa-2x"
                onClick={() => setItem(!item)}
              />
            </MDBNavbarToggler>
            <MDBCollapse navbar show={item}>
              <MDBNavbarNav right fullWidth={false}>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/" active>
                    Home
                  </MDBNavbarLink>
                </MDBNavbarItem>
                {user?.result?._id && (
                  <>
                    {" "}
                    <MDBNavbarItem>
                      <MDBNavbarLink href="/addtour">Add Tour</MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                      <MDBNavbarLink href="/dashboard">
                        Dash Board
                      </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                      <MDBNavbarLink href="/profile">
                      {user?.result?.image?  <MDBCardImage
                          src={user?.result?.image}
                          alt={user?.result?.name.charAt(0)}
                          className="rounded-circle border-danger fs-4 fw-bolder mx-2"
                          position="center"
                          style={{ width: "20px" }}
                        />:<MDBIcon icon="user" fas/>}
                      </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                      <MDBNavbarLink href="/">
                        {user?.result?.name}
                      </MDBNavbarLink>
                    </MDBNavbarItem>
                  </>
                )}

                <MDBNavbarItem>
                  {user?.result?._id ? (
                    <MDBNavbarLink href="/signup" onClick={handleLogout}>
                      LogOut
                    </MDBNavbarLink>
                  ) : (
                    <MDBNavbarLink href="/signup">LogIn</MDBNavbarLink>
                  )}
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </div>
    </>
  );
};

export default Header;
