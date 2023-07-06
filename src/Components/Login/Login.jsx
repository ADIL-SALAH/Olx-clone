import React,{useState,useRef,useContext} from 'react';

import Logo from '../../../assets/images/olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../store/Firebasecontext';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const emailRef=useRef(null)
  const passwordRef=useRef(null)
  const navigate = useNavigate()
  const {firebase}= useContext(FirebaseContext)
  const auth = getAuth(firebase)
  const signupUser=()=>{
  
    navigate('/signup');
  }
  const handlelogin = (e)=>{
    e.preventDefault()
    signInWithEmailAndPassword(auth,emailRef.current.value,passwordRef.current.value).then((usercredential)=>{
      const user = usercredential.user
      navigate('/') 
    })
    .catch((error)=>{
      const errorcode = error.code
      const message = error.message 
    })
    
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handlelogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            ref={emailRef}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            ref={passwordRef}
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={signupUser}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
