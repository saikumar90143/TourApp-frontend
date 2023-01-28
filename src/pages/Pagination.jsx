import { MDBBtn, MDBPagination, MDBPaginationItem } from 'mdb-react-ui-kit'
import React from 'react'

const Pagination = ({setCurrentPage,currentpage,numberOfpages,dispatch}) => {
  
    const renderPagination=()=>{
        // if(currentpage===numberOfpages && currentpage ===1)return null
        if (currentpage==1){
            return (
                <MDBPagination center className='mb-0'>
                    <MDBPaginationItem>
                        <p className='fw-bold mt-1'>{currentpage}</p>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBBtn rounded className='mx-2' onClick={()=>dispatch(setCurrentPage(currentpage + 1))}>
Next
                        </MDBBtn>
                    </MDBPaginationItem>
                </MDBPagination>
            )
        }else if(currentpage !== numberOfpages){
               return(
                <MDBPagination center className='mb-0'>
                    <MDBPaginationItem>
                        <MDBBtn rounded className='mx-2' onClick={()=>dispatch(setCurrentPage(currentpage - 1))}>
prev
                        </MDBBtn>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <p className='fw-bold mt-1'>{currentpage}</p>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <MDBBtn rounded className='mx-2' onClick={()=>dispatch(setCurrentPage(currentpage + 1))}>
Next
                        </MDBBtn>
                    </MDBPaginationItem>
                    
                </MDBPagination>
               )
           } else{
            return(
               <>
               <div className='d-flex justify-content-center'>
                          <MDBPaginationItem>
                        <MDBBtn rounded className='mx-2' onClick={()=>dispatch(setCurrentPage(currentpage - 1))}>
   prev
                        </MDBBtn>
                    </MDBPaginationItem>
                    <MDBPaginationItem>
                        <p className='fw-bold mt-2 '>1</p>
                    </MDBPaginationItem>
                    </div>
               </>
            )
           }
        
    }

    return (
    <>
      <div className='mt-2'>{renderPagination()}</div> 
    </>
  )
}

export default Pagination
