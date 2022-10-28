import React from 'react'
import img4 from "../images/img2.jpg"
import img5 from "../images/img1.jpg"
import img6 from "../images/img3.jpg"

const Home = () => {
  return (
    <div>
<center><h3>Procurement in Construction Management</h3></center>
      <p><b>
        Simply put, the procurement process is how we go about acquiring the goods and services we need.
        When we’re shopping for arugula or a pair of jeans, procurement is pretty straightforward.
        But when we’re looking to acquire all of the goods and services needed to get a major construction project up and running,
        the plot thickens.
        To get a feel for the complexity of procurement management,
        let’s take a closer look at the bidding process in construction projects.
        It begins with preparing the design documents for the required work, and continues with the RFP documentation,
        an invitation to tender. Different service providers, contractors and suppliers submit their tenders or proposals,
        upon which the merits of the potential bids are discussed and weighed. Once a provider has been chosen, terms are settled,
        the contract is ratified and the service is executed or the goods provided.
        It isn’t rocket science, but it’s pretty involved, because every last nail has to be specified and procured,
        and someone has to hammer it in.</b>
      </p>
      <center>
        <div style={{ width: "80%", marginTop: "50px", float: 'center' }}>
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src={img4} alt="First slide" />
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src={img5} alt="Second slide" />
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src={img6} alt="Third slide" />
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </center>
    </div>
  )
}

export default Home