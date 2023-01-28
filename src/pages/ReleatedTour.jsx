import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from 'mdb-react-ui-kit'
import React from 'react'
import { Link } from 'react-router-dom'

const ReleatedTour = ({releatedtour,tourId}) => {
    
    const excerpt=(str)=>{
        if(str.length>30){
           str= str.substring(0,30) +"..."
        }
        return str
    }
  return (
    <>
      {releatedtour && releatedtour.length > 0 && (
        <>
         {releatedtour.length> 1 && <h4>Releated Tours</h4>}
         <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
            {releatedtour.filter((item)=>item._id!==tourId).splice(0,3).map((tour)=>{
                return(
                    <MDBCol key={tour._id}>
                        <MDBCard>
                            <Link to={`/tour/${tour._id}`}>
                                <MDBCardImage src={tour?.selectfile} alt={tour?.title} fluid/>

                            </Link>
                            <span className='text-start'>
                         {tour?.tags?.map((tag,index)=><Link to={`/tour/${tour._id}`} key={index}>{`#${tag}`}</Link>)}
                            </span>
                            <MDBCardBody>

                                <MDBCardTitle className='text-start'>
                                   {tour?.title}
                                </MDBCardTitle>
                                <MDBCardText className='text-start'>
                                    {excerpt(tour?.description)}
                                </MDBCardText>
                            </MDBCardBody>
                                
                              
                        </MDBCard>
                    </MDBCol>

                )
            })}

         </MDBRow>
        </>
      )} 
    </>
  )
}

export default ReleatedTour
