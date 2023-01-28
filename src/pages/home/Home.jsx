import { MDBBtn, MDBCardGroup, MDBCol, MDBContainer, MDBInput, MDBRow, MDBSpinner, MDBTypography } from 'mdb-react-ui-kit'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Loader from '../../components/Loader'
import { GetTours, SearchTitle,setCurrentPage } from '../../redux/Features/TourSlice'
import Pagination from '../Pagination'
import TourCard from '../TourCard'

const Home = () => {
  const [query,setQuery]=useState("")
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {isLoading,tours,currentPage,numberofPages}=useSelector((state)=>state.tour)
  useEffect(()=>{
     dispatch(GetTours(currentPage))
  },[currentPage])

  if(isLoading){
    return <Loader/>
  }

  // handle search submit

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(query){
      dispatch(SearchTitle(query))
       navigate('/search')
       setQuery("")
    }else{
      navigate('/')
    }
  }

  // searchQuery
  

  return (
    <div className='mt-2'>
        <MDBContainer style={{maxWidth:"1200px"}}>
        <MDBRow className='mb-3' style={{width:'100%'}}>
          <h4>Search</h4>
         <MDBCol md='12' className='d-flex justify-content-center gap-3'>
          <MDBInput type='search' value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="search title" style={{width:"40vw"}}/>
          <MDBBtn type='submit' onClick={handleSubmit}>Search</MDBBtn>
          
          </MDBCol>
              
              {tours.length ===0?<MDBTypography tag="h3" className="mt-5">No Tour Found</MDBTypography>:  tours.map((item,index)=>{
                  
                   return(
                   <MDBCol  md='6' lg='4' className='my-2' key={index}>
                     <TourCard  {...item}/>
                     </MDBCol>
                   )
                 })}
              
            </MDBRow>
            <Pagination setCurrentPage={setCurrentPage} currentpage={currentPage} dispatch={dispatch} numberOfpages={numberofPages}/>
        </MDBContainer>
    </div>
  )
}

export default Home
