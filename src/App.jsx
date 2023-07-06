
import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create'
import { useContext, useEffect } from 'react';
import { AuthContext, FirebaseContext } from './store/Firebasecontext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import View from './Pages/ViewPost';
import Postdetails from './store/postcontext'


function App() {
  const { setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  useEffect(() => {
    const auth = getAuth(firebase)

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        const uid = user.uid
      }
      else {
        console.log('not login')
      }

    })
  })

  return (
    <>
      <div>
        <Postdetails>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/create' element={<Create />}></Route>
            <Route path='/view' element={<View />}></Route>
          </Routes>
        </Postdetails>
      </div>
    </>
  )
}

export default App
