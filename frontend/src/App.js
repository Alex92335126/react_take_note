import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Secret from "./pages/Secret";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Modal from './pages/modal'
import TodoList from "./pages/TodoList";
import SearchBar from './pages/SearchBar'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import NavBar from './pages/nav'

function App() {
  const [showModal, setShowModal] = useState(false)
   const [searchText, setSearchText] = useState('')
   const [favLinks, setFavLinks] = useState ([])

   const getData = async() => {
     let res = await axios.get("http://localhost:8888/")
     console.log('return data', typeof res, res.data.data)
     setFavLinks(res.data.data)
   }

   useEffect(() => {
     getData()
   }, [])

   const keywordChanged = (e) => {
     setSearchText(e.target.value)
   }

   const addedNewLink = () => {
     getData()
   }

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/list"
          element={
            <RequireAuth>
              <TodoList links={favLinks} word={searchText} reload={() => addedNewLink()} />
            </RequireAuth>
          }
        />
      </Routes>
      <div className="App">
       <Modal
         show={showModal}
         onHide={() => setShowModal(false)}
         reload={() => addedNewLink()}
       />
       <div className='profile-card'>    
         {/* profile image */}
         <img className="pikachu" src='https://i.pinimg.com/originals/5b/2e/c3/5b2ec3d72d2404f4700774c1db9203d8.png'>
         </img>
       </div>
       <div>
         <Button variant="warning" size="lg" onClick={() => setShowModal(true)}>
             Add Link
         </Button>
       </div>
       <div className='search_link'> 
         <h2 className='mx-2'>Search Link</h2>  
         <SearchBar keyword={searchText} keywordChanged={keywordChanged}  />
       </div>  
       <div>
         <TodoList links={favLinks} word={searchText} reload={() => addedNewLink()} />
       </div>  
     </div>
    </div>
  );
}

export default App;
