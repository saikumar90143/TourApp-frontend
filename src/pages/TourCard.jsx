import { MDBBtn, MDBCard, MDBCardBody, MDBCardGroup, MDBCardImage, MDBCardText, MDBCardTitle, MDBIcon, MDBTooltip, MDBTypography } from 'mdb-react-ui-kit'
import React from 'react'
import { Link} from 'react-router-dom'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { LikePost } from '../redux/Features/TourSlice'
const TourCard = ({name,selectfile,tags,description,title,_id,updatedAt,likes}) => {

   const dispatch=useDispatch()
   const {user}=useSelector((state)=>state.auth)
   const userId=user?.result._id || user?.result?.googleId

    const excerpt=(str)=>{
        if(str.length>35){
           str= str.substring(0,35) +"..."
        }
        return str
    }



    // likes component

    const Likes=()=>{
      if(likes.length>0){
        return likes.find((like)=>like===userId) ?(
          <>
          <MDBIcon fas icon='thumbs-up'/>&nbsp;
            {likes.length > 2 ?(
              <MDBTooltip  title={`you and ${likes.length -1} other likes`}>{likes.length} Likes</MDBTooltip>
            ):(
              `${likes.length} Like${likes.length>1 ?"s":""}`
            )}
          </>
        ):(
          <>
          <MDBIcon fas icon='thumbs-up'/>
          &nbsp;
          {likes.length} {likes.length===1?"like":"likes"}
          </>
        )
      }
      return(
        <>
        <MDBIcon icon='thumbs-up' far/>
        &nbsp; like
        </>
      )
    }

    // handle like

    const handleLike=()=>{
        dispatch(LikePost(_id))
    }
  return (
    <>
      <div>
      
       <MDBCard style={{height:"500px"}}>
       <Link to={`/tour/${_id}`}> 
           <MDBCardImage className='card' src={selectfile? selectfile : 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt='image' position='top' fluid style={{maxHeight:"250px",objectFit:"fill"}}/>
           </Link>
            <MDBCardTitle tag='h5' className='text-capitalize text-start'><small>Created by:</small> {name}</MDBCardTitle>
           <MDBCardGroup className='d-flex justify-content-around align-items-center'>
            <MDBCardText className='text-start ms-2 mt-2' ><small>Tags: </small>{tags?.map((tag,index)=><Link to={`/tag/${tag}`} key={index}>{`#${tag}`} </Link>)}</MDBCardText>
            <MDBBtn className='text-end' tag='a' color='none' onClick={handleLike}><Likes/></MDBBtn>
            </MDBCardGroup>
            <MDBCardText className='text-start ms-2'>posted: <small>{moment(updatedAt).fromNow()}</small></MDBCardText>
            <MDBCardBody>
                <MDBCardTitle className='text-uppercase text-start cardname' position="top" style={{mixBlendMode:"exclusion"}}>{title}</MDBCardTitle>
                <MDBCardText className='text-start'><small>Description: </small>{excerpt(description)}
                {description.length>35 &&  <Link to={`/tour/${_id}`} className="btn-floating">ReadMore</Link>}
                
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>
        
      </div>
    </>
  )
}

export default TourCard
