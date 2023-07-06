import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/Firebasecontext';
import { getDownloadURL, getStorage, uploadBytes, ref } from 'firebase/storage';
import { firebase } from '../../config/firebase';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { frebase } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const navigate = useNavigate()
  const handlesubmit = async (e) => {
    console.log('//////////////')
    e.preventDefault()
    const storage = getStorage(firebase)
    const imageRef = ref(storage, `/images/${image.name}`)
    await uploadBytes(imageRef, image)

    const imageUrl = await getDownloadURL(imageRef)
    const firestore = getFirestore(firebase)
    await addDoc(collection(firestore, 'products'), {
      name: name,
      Category: category,
      price: price,
      imageurl: imageUrl,
      userId: user.uid,
      createAt: new Date().toDateString()

    })
    navigate('/')

  }


  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">

          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            onChange={(e) => {
              setName(e.target.value)
            }}
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            onChange={(e) => {
              setCategory(e.target.value)
            }}
            name="category"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input className="input" onChange={(e) => { setPrice(e.target.value) }} type="number" id="fname" name="Price" />
          <br />

          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>

          <br />
          <input onChange={(e) => {
            setImage(e.target.files[0])
          }} type="file" />
          <br />
          <button onClick={handlesubmit} className="uploadBtn">upload and Submit</button>

        </div>
      </card>
    </Fragment>
  );
};

export default Create;
