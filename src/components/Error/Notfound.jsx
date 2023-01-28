import { MDBTypography } from 'mdb-react-ui-kit'
import React from 'react'
import { Link } from 'react-router-dom'
 
const Notfound = () => {
  return (
    <div>
      <MDBTypography tag="h1">404 Page not found<br/>Get back to home page</MDBTypography>
      <Link to="/">HOME</Link>
    </div>
  )
}

export default Notfound
