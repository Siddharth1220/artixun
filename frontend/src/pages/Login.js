import { Link } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const Login = () => {

    return (
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={submitHandler}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?
                <Link to="/Signup">Signup</Link>
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  name="email"
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  name="pass"
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <p className="text-center mt-2">
                Forgot <Link href="#">password?</Link>
              </p>

              <div>
            <ToastContainer />
        </div>
            </div>
          </form>
        </div>
      );
  };
  

  const submitHandler = (event) =>{
    event.preventDefault();
    const email = event.target.email.value;
    const pass = event.target.pass.value;
    axios.post("http://localhost/login", {
      email : email,
      pass : pass,
      })
      .then(function (response) {
        if(response.data === false)
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
    toast.success('Login Success ', {
        position: toast.POSITION.BOTTOM_RIGHT
    });
};


const showToastMessage2 = () => {
  toast('Invalid Credentials', {
      position: toast.POSITION.BOTTOM_RIGHT
  });
};
  export default Login;