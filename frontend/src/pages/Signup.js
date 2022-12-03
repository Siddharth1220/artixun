import React from 'react'
import { Link  } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Signup = () => {
  
    return (

    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={submitHandler}> 
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Register</h3>
          <div className="text-center">
            Already registered?{" "}
            <Link to="/Login">Login</Link>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              name="fullname"
              className="form-control mt-1"
              placeholder="e.g Siddharth Vaniya"
            />
          </div>



          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              name="email"

            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              name="pass"
            />
          </div>
          <div className="d-grid gap-2 mt-4">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
            <ToastContainer />
    </div>

        );
    };

    
    
    const submitHandler = (event) =>{
      
      event.preventDefault();
      const fullname = event.target.fullname.value;
      const email = event.target.email.value;
      const pass = event.target.pass.value;
      axios.post("http://localhost/signup", {
        fullname: fullname,  
        email : email,
        pass : pass,
        })
        .then(function (response) {
          const data = response.data;
          if(data ===  false)
          {
            showToastMessage2();
          }
          else
          {

            const id = response.data._id;
            const fullname = response.data.fullname;
            const email = response.data.email;
            localStorage.setItem("authenticated", true);
            localStorage.setItem("ID", id);
            localStorage.setItem("fn",fullname);
            localStorage.setItem("email",email);
            showToastMessage1();
          }
        })
        .catch(function (error) {
          showToastMessage2();
          console.log(error);
        });
    }
  
  
    const showToastMessage1 = () => {
      toast.success('SignUp Success ', {
          position: toast.POSITION.BOTTOM_RIGHT
      });
  };
  
  
  const showToastMessage2 = () => {
    toast('email already in use', {
        position: toast.POSITION.BOTTOM_RIGHT
    });
  };
 



  

    
export default Signup;