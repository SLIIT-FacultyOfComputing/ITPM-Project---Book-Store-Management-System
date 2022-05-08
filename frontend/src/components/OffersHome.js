import React, { Component } from 'react'
import axios from 'axios';

export default class OffersHome extends Component {
    constructor(props){
        super(props);
      
        this.state={
          offers:[]
        };
      
      }


      componentDidMount(){
        this.retrieveOffers();
      }
      
      retrieveOffers(){
        axios.get("/offers").then(res =>{
          if(res.data.success){
            this.setState({
              offers:res.data.existingOffers
            });
            console.log(this.state.offers)
          }
        });
      }


  
  
    render() {
    return (
      <div className="row">
                            <main>
                                <div className="row center" >                                                                  
                                      {this.state.offers.map((offers,index)=>(
                                        <div className="card" >
                                          <a href={`/offers/${offers._id}`}>                                          
                                          <center><img className="card-img-top" src={ "http://localhost:8000/" + offers.feedmessage } alt="Card image cap"/></center>
                                          </a>
                                          
                                                  <h6 className="card-title">{offers.otitle}</h6>
                                             

                                          

                                        </div>                                            
                                    ))
                                }                           
                            </div>
                        </main>               
                    </div>                    
      
    
    )
  }
}
