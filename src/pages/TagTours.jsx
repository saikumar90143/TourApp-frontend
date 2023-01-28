import { MDBCard, MDBCardBody, MDBCardGroup, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { SearchTag } from '../redux/Features/TourSlice'

const TagTours = () => {
    const dispatch=useDispatch()
    const{tags,isLoading}=useSelector((state)=>state.tour)
  
    const {tag}=useParams()
    console.log('tags: ', tags);
    useEffect(()=>{
        if(tag){
            dispatch(SearchTag(tag))
        }
    },[tag])

    const excerpt=(str)=>{
      if(str.length>30){
         str= str.substring(0,30) +"..."
      }
      return str
  }

  // loading

  if(isLoading){
    return <Loader/>
  }
  return (
    <>
    <div className='mt-2'>
      <h3 style={{position:"relative"}}>Tours based on tags</h3>
      {tags?.map((item)=>{
        return(
          <MDBCardGroup key={item?._id} className="align-content-center d-flex justify-content-center mb-3">
          <MDBCard style={{maxWidth:"600px"}} className="mt-2">
           <MDBRow className='g-0'>
           <MDBCol md='4'>
           <Link to={`/tour/${item?._id}`}> <MDBCardImage className='rounded' src={item?.selectfile} alt={item?.title} fluid/></Link> 
           </MDBCol>
           <MDBCol md='8'>
            <MDBCardBody>
             <MDBCardTitle className='text-start'>
           Tag: {item?.title}
             </MDBCardTitle>
             <MDBCardText className='text-start'>
             Desc: <small>{excerpt(item?.description)}</small>  
             {item?.description.length>30 &&  <Link to={`/tour/${item?._id}`} className="btn-floating">ReadMore</Link>} 
             </MDBCardText>
             
            </MDBCardBody>
           </MDBCol>
           </MDBRow>
          </MDBCard>
       </MDBCardGroup> 
        )
      })}
       
    </div>
    </>
  )
}

export default TagTours
