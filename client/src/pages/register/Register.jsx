import { Link } from "react-router-dom";
import { useState } from "react";
import "./register.scss";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  })

  const [err, setErr] = useState(null)
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);


const handleChange = e =>{
  setInputs(prev => ({...prev, [e.target.name]:e.target.value}))
}

const handleClick = async e =>{
  e.preventDefault()

  try{
    await axios.post("http://localhost:8800/api/auth/register", inputs);
    navigate("/login");
  }catch(err){
setErr(err.response.data);
  }
}


  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Euphonic Register</h1>
          <p>
            Register to access cool features of Euphonic website and listen to a broad range of artists that make you wanna dance and feel joy!
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            <input type="email" placeholder="Email" name="email" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
