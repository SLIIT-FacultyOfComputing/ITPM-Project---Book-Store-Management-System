
import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';

export default class ManageFeedbacks extends Component {
constructor(props){
  super(props);

  this.state={
    feedbacks:[]
  };

}

componentDidMount(){
  this.retrieveFeedbacks();
}

retrieveFeedbacks(){
  axios.get("/feedbacks").then(res =>{
    if(res.data.success){
      this.setState({
        feedbacks:res.data.existingFeedbacks
      });
      console.log(this.state.feedbacks)
    }
  });
}

onDelete = (id) =>{
  axios.delete(`/feedback/delete/${id}`).then((res)=>{
      // alert("Delete Successfully");
      swal.fire({ title: 'Are you sure?',

          text: "You won't be able to revert this!",

          icon: 'warning',

          showCancelButton: true,

          confirmButtonColor: '#3085d6',

          cancelButtonColor: '#d33',

          confirmButtonText: 'Yes, delete it!'

        }).then((result) => {

          if (result.isConfirmed) {

            swal.fire( 'Deleted!',

            'Your file has been deleted.',

            'success'

            )

          }

      })
      this.retrieveFeedbacks();
  });
}

/*Search Method*/
filterData(feedbacks,searchkey){
  const result = feedbacks.filter((feedback) =>
    feedback.cname.toLowerCase().includes(searchkey) || 
    feedback.cemail.toLowerCase().includes(searchkey) || 
    feedback.feedmessage.toLowerCase().includes(searchkey)
  )

  this.setState({feedbacks:result})
}


handleSearchArea = (e) =>{
  const searchkey = e.currentTarget.value;
  axios.get("/feedbacks").then(res=>{
      if(res.data.success){
          this.filterData(res.data.existingFeedbacks,searchkey)
      }
  });
}



   render(){
     return (
       <div className="container">
         <br></br>
         <center><h2>Manage Feedbacks</h2></center>

         <center>
                  {/*Search*/}
        <div className="col-lg-3 mt-2 mb-2" >
                    <input
                    className="form-control"
                    type="search"
                    placeholder="search customer name"
                    name="searchQuery"
                    onChange={this.handleSearchArea}/>
        </div>  
        </center>

        <br></br>


         <table className="table">
           <thead>
             <tr>
               <th scope="col">#</th>
               <th scope="col">Customer Name</th>
               <th scope="col">Customer Email</th>
               <th scope="col">Feedback Type</th>
               <th scope="col">Feedback Message</th>
               <th scope="col"><center>Action</center></th>
             </tr>
           </thead>
           <tbody>
           {this.state.feedbacks.map((feedbacks,index) =>(
           <tr key={index}>
             <th scope="row">{index+1}</th>
               <td>
                 <a href={`/feedback/${feedbacks._id}`} style={{textDecoration:'none'}}>
                 {feedbacks.cname}
                 </a>
               </td>
               <td>{feedbacks.cemail}</td>
               <td>{feedbacks.feedtype}</td>
               <td>{feedbacks.feedmessage}</td>
               <td>
               <center>
                 {/* <a className="btn btn-warning" href={`/edit/${feedbacks._id}`}>
                   <i className="fas fa-edit"></i>&nbsp;Edit
                 </a>
                 &nbsp; */}
                 <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(feedbacks._id)}>
                   <i className="fas fa-trash-alt"></i>&nbsp;Delete
                 </a>
                 </center>
               </td>
           </tr>
         ))}

           </tbody>
         </table>

{/* <button className="btn btn-success"><a href="/add" style={{textDecoration:'none',color:'white'}}>Create New Feedback</a></button> */}
        

       </div>
     )
   }
}


