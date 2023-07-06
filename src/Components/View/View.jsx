import React,{useContext,useEffect,useState} from 'react';
import {Postcontext} from '../../store/postcontext'
import './View.css';
import { FirebaseContext } from '../../store/Firebasecontext';
import { collection, getDocs,query, where } from 'firebase/firestore';
import {firestore} from '../../config/firebase'
function View() {
  const [userDetails,setUserDetails] = useState()
  const {postDetails} = useContext(Postcontext)
  const {firebase} = useContext(FirebaseContext)
  console.log(postDetails +"ajsmlsclnl")
  useEffect(()=>{
    const fetchdata = async ()=>{
      const querysnapshot = await getDocs(collection(firestore,"users"),where("id","==",postDetails.userId))

      querysnapshot.forEach((doc) => {
        if(doc.data().id==postDetails.userId){
          setUserDetails(doc.data())
        }
       
      })
  
      
    }
  
    fetchdata();
  
    
  },[])

  console.log(postDetails)
  console.log(userDetails)
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.imageurl}

          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.Category}</p>
          <span>{postDetails.createAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username} </p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
