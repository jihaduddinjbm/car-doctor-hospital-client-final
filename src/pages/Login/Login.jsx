
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';
import axios from 'axios';
const Login = () => {

    const {signIn} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);

    const handleLogIn = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
       
        signIn(email, password)
        .then(result => {
            const loggedInUser = result.user;
            console.log(loggedInUser);
            const user = { email };
           
            // get access token
            axios.post('http://localhost:5000/jwt', user, 
            { withCredentials: true})
            .then(res => {
                console.log(res.data)  
                if(res.data.success) {
                   navigate(location?.state ? location?.state : '/' ) 
                }
            })
        })
        .catch(error => console.log(error));
    }
    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="w-1/2 mr-12">
          <img src={img} alt="" />
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">    
            <div className="card-body">
            <h1 className="text-5xl font-bold">Login now!</h1>
              <form onSubmit={handleLogIn}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
              </div>
              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="Login" />
              </div>
              </form>
              <p className='text-center'>Do not have an Account <Link to="/signup" className='text-xl text-orange-500 font-bold'>Sign up</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;