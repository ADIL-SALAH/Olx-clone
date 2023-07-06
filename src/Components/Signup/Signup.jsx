import React ,{useState,useContext} from 'react';

import Logo from '../../../assets/images/olx-logo.png';
import './Signup.css';
import  { useNavigate} from 'react-router-dom'
import {FirebaseContext} from '../../store/Firebasecontext'
import { auth, firestore } from '../../config/firebase';
import {createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

export default function Signup() {
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [Password,setPassword] = useState('');
  const {firebase}= useContext(FirebaseContext)
  const navigate = useNavigate()
  const login = ()=>{
    navigate('/login')
  }
  const handlesubmit=(e)=>{
    e.preventDefault()
    createUserWithEmailAndPassword(auth,email,Password).then((usercredential)=>{
      const user = usercredential.user
      updateProfile(user,{
        displayName:username
      }).then(()=>{
        addDoc(collection(firestore,"users"),{
          id:usercredential.user.uid,
          email,
          Password,
          phone,
          username
        }).then(()=>{
          navigate('/login')
          
        })
      })
    })
    .catch((error)=>{
      console.log(error)
    })

  
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handlesubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            value={Password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}
