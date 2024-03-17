import React from 'react'



// Data of the Bookings , Cancellations, Refund Status , extra 
   //            |
   //         Bus, Hotel, Train , Packages 
   //                 each will be different array in itself  
                 export default function IRCTCStatus() {
  return (
    <div>
         <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">TRAINS</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active"  href="/IRCTCSearch">Ticket Booking</a>
        <a class="nav-link" href="/IRCTCSearch/Status">Get Ticket Status</a>
        <a class="nav-link" href="/IRCTCSearch/PNR">PNR Enquiry</a>
        <a className="nav-link" href="/IRCTCSearch/PNR">
            Booking history
              </a>
              <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    others
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>
      </div>
    </div>
  </div>
</nav>
<div>

</div>
      
    </div>
  )
}
