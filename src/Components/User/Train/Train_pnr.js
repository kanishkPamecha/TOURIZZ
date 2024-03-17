import React from 'react'

export default function Train_pnr() {
  return (
    <div>
       
       <form className="d-flex" role="search">
        <input className="form-control me-2 dropdown-toggle " type="search" placeholder="Search" aria-label="Search" />
        {/* <button class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
        //   </button> */}
          <ul class="dropdown-menu dropdown-menu-dark">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  )
}
