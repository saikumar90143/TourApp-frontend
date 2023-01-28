import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBFooter,
  MDBInput,
  MDBSpinner,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import React from "react";
import { useState } from "react";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { CreateTour, UpdateTour } from "../redux/Features/TourSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
const AddTour = () => {
  const {id}=useParams()
  //  dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // tour data
  const initialstate = {
    title: "",
    description: "",
    selectfile: "",
    tags: [],
  };
  const [tourData, setTourData] = useState(initialstate);
  const { title, description, selectfile, tags } = tourData;

  const { isError, isLoading,userTours} = useSelector((state) => state.tour);

  const { user } = useSelector((state) => state.auth);

  // update tour
   useEffect(()=>{
    if(id){
       const editTour=userTours.find((item)=>item._id===id)
       setTourData({...editTour})
    }
   },[id])
  // error
  useEffect(() => {
    isError && toast.error(isError);
  }, [isError]);



  // handleSubmit

  const handleSubmit = (e) => {
    e.preventDefault();
    const createTourData = { ...tourData, name: user?.result?.name };
    if (title && description && selectfile && tags) {
      if(!id){
      dispatch(CreateTour(createTourData));
      navigate("/");
      toast.success("tour added");
      }else{
        const updatedata={...tourData,name:user?.result?.name}
        dispatch(UpdateTour(updatedata))
        navigate('/dashboard')
        toast.success("tour updated")
      }
    }
    handleClear();
  };

  // tags
  const handletag = (tag) => {
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });
  };

  const handleDelete = (deletetag) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== deletetag),
    });
  };
  // handleClear
  const handleClear = () => {
    setTourData(initialstate);
  };

  return (
    <>
      <div className="container mt-3" style={{ maxWidth: "500px" }}>
        <MDBCard>
          <h4>{id?"Update Tour":"Add Tour"}</h4>
          <MDBCardBody>
            <MDBValidation
              noValidate
              onSubmit={handleSubmit}
              className="row gap-3"
            >
              <MDBValidationItem invalid feedback="please enter title">
                <MDBInput
                  label="title"
                  name="title"
                  onChange={(e) =>
                    setTourData({ ...tourData, title: e.target.value })
                  }
                  value={tourData.title}
                  required
                />
              </MDBValidationItem>
              <MDBValidationItem invalid feedback="please enter min 20 chars">
                <MDBInput
                  label="description"
                  name="description"
                  onChange={(e) =>
                    setTourData({ ...tourData, description: e.target.value })
                  }
                  value={tourData.description}
                  required
                  minLength={20}
                  style={{ height: "100px" }}
                />
              </MDBValidationItem>
              <MDBValidationItem>
                <ChipInput
                  label="tags"
                  onAdd={(tag) => handletag(tag)}
                  fullWidth
                  onDelete={(deletetag) => handleDelete(deletetag)}
                  value={tourData.tags}
                />
              </MDBValidationItem>
              <MDBValidationItem
                style={{ display: "flex", justifyContent: "flex-start" }}
              >
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setTourData({ ...tourData, selectfile: base64 })
                  }
                />
              </MDBValidationItem>
              <MDBFooter className="row gap-3">
                <MDBBtn type="submit">
                  {isLoading && (
                    <MDBSpinner
                      style={{
                        fontSize: "1rem",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  )}
                  {id?"Update":"Submit"}
                </MDBBtn>
                <MDBBtn className="btn-danger" onClick={handleClear}>
                  Clear
                </MDBBtn>
              </MDBFooter>
            </MDBValidation>
          </MDBCardBody>
        </MDBCard>
      </div>
    </>
  );
};

export default AddTour;
