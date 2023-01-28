import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardGroup,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { DeleteTour, GetToursByUser } from "../redux/Features/TourSlice";
import moment from 'moment'
const Dashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { userTours,isLoading } = useSelector((state) => state.tour);
  console.log("userTours: ", userTours);
  const userId = user?.result?._id;

  useEffect(() => {
    if (userId) {
      dispatch(GetToursByUser(userId));
    }
  }, [userId]);

  const excerpt = (str) => {
    if (str.length > 35) {
      str = str.substring(0, 35) + "...";
    }
    return str;
  };

  if(isLoading){
    return <Loader/>
  }

  // delete tour

  const handleDelete=(id)=>{
    if(window.confirm("Are you sure to delete this tour")){
     dispatch(DeleteTour(id))
    }
  }

  return (
    <div className="mt-2">
      <h4>DashBoard</h4>

      {userTours &&
        userTours.map((item) => (
          <MDBCardGroup className="align-content-center d-flex justify-content-center mb-3"  key={item._id}>
            <MDBCard
              style={{ maxWidth: "600px" }}
             
              className="mt-2"
            >
              <MDBRow>
                <MDBCol md="4">
                  <MDBCardImage
                    className="rounded"
                    src={item?.selectfile}
                    alt={item?.title}
                    fluid
                  />
                </MDBCol>
                <MDBCol md="8" >
                  <MDBCardBody>
                    <MDBCardText className="text-start">posted: {moment(item.updatedAt).fromNow()}</MDBCardText>
                    <MDBCardTitle className="text-start">
                     <small>Title: </small> {item?.title}
                    </MDBCardTitle>
                    <MDBCardText className="text-start">
                      <small className="text-muted">
                     Desc:   {excerpt(item?.description)}
                      </small>
                    </MDBCardText>
                    <div className="float-end">
                      <MDBBtn onClick={()=>handleDelete(item._id)}>
                        <MDBIcon
                          icon="trash"
                          fas
                          style={{ color: "red" }}
                          size="lg"
                        /> 

                        delete
                      </MDBBtn>
                      <Link to={`/edittour/${item._id}`}>
                        {" "}
                        
                          <MDBIcon
                            icon="edit"
                            fas
                            style={{ color: "#55acee" ,marginLeft:"10px"}}
                            size="lg"
                          />
                        Edit
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
            
          </MDBCardGroup>
        ))}
    </div>
  );
};

export default Dashboard;
