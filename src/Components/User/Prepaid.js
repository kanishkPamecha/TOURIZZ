import React from 'react'
import jaipur from '../../images/jaipur.jpg';
import Dubai from '../../images/Dubai.jpg'
import Kerela from '../../images/Kerela.jpg';
import Agra from '../../images/Agra.jpg';
import Kedarnath from '../../images/kedarnath.jpg';
import Bhutan from '../../images/Bhutan.jpg';
import './Packages.css'
import Packages1 from './packages_ele'
import des from './Flight/Flights'
export default function Packages() {
  let name ;
 let  description ;
   const pack=(place)=>{
     name = `${place}`;
     description = `${place}`
   }
  return (
    <>
    
    <div class=''>
      <div className=" bg-dark1 card mb-3 max_width_container  desktop">
  <div className="row g-0">
    <div className="col-md-4">
      <img src={jaipur} className="img-fluid rounded-start" alt="..." />
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">Jaipur</h5>
        <p className="card-text">Only at <b> @ 15000 for 7 days and 8 nights</b></p>
        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
  
</div>
<div className="bg-dark1 card mb-3  max_width_container desktop" >
  <div className="row g-0">
    <div className="col-md-4">
      <img src={Dubai} className="img-fluid rounded-start" alt="..." />
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">Dubai</h5>
        <p className="card-text">Only at <b>
            @ 75000 for 7 days and 8 nights
            </b>
           </p>
        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
  </div>
    </div>
  </div>
  
</div>
<div className=" bg-dark1 card mb-3  max_width_container desktop" >
  <div className="row g-0">
    <div className="col-md-4">
      <img src={Kerela} className="img-fluid rounded-start" alt="..." />
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">Kerela</h5>
        <p className="card-text">Only at <b>@ 25000 for 7 days and 8 nights</b></p>
        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
  </div>
    </div>
  </div>
  
</div>
{/* <div className=" bg-dark1 card mb-3  max_width_container mobile" onClick={<Packages1 name = {'name'} description= {'dd'} />} > */}
<div class="card mb-3 mobile ">
  <img src={Agra} class="card-img-top"  alt="..."/>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
  </div>
</div>
  
</div>
<div class="card mb-3 mobile ">
  <img src={Kedarnath} class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
  </div>
  <div class="card mb-3 mobile ">
  <img src={Bhutan} class="card-img-top maxheight" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
  </div>
</div>
    </div>
    </>
  )
}
