import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBContainer, MDBIcon, MDBSpinner } from 'mdb-react-ui-kit'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { GetTour, ReleatedTours } from '../redux/Features/TourSlice'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import ReleatedTour from './ReleatedTour'

const SingleTour = () => {
  const {id}=useParams()
    const dispatch=useDispatch()
    const {tour,isLoading,Releatedtours}=useSelector((state)=>state.tour)
   const tags=tour?.tags
   
   useEffect(()=>{
     tags && dispatch(ReleatedTours(tags))
   },[tags])

  //  get tour
     useEffect(()=>{
       dispatch(GetTour(id))
     },[id])

     if(isLoading){
      return <Loader/>
     }
  return (
    <> 

      <MDBContainer >
        <Link to='/' className='text-start fs-4'>Back</Link>
        
        <MDBCard className='my-3' >
            <MDBCardImage src={tour?.selectfile} alt={tour?.title} position="top" style={{maxHeight:"500px",maxWidth:'100%'}} />
            <MDBCardBody>
            
            <MDBCardTitle  tag='h4' className="text-capitalize">{tour?.title}</MDBCardTitle>
            <MDBCardText className='text-start' >Posted: <MDBIcon fas icon="calendar-alt" /> <small>{moment(tour?.createdAt).fromNow()}</small></MDBCardText>
            <MDBCardText className='text-start'>Tags: {tour?.tags?.map((tag,index)=><Link to='/' key={index}>{`#${tag} `}</Link>)}</MDBCardText>
            <MDBCardText className='text-start'>Created By: <small>{tour?.name}</small></MDBCardText>
            
            <MDBCardText className='text-start'>Description: {tour?.description}</MDBCardText>
             <ReleatedTour releatedtour={Releatedtours} tourId={id}/>
            </MDBCardBody>
        </MDBCard>
       
        </MDBContainer>
    </>
  )
}

export default SingleTour
