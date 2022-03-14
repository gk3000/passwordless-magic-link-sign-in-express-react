import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Enter from './components/Enter.js'
import Home from './views/Home.js'
import UserEmail from './components/UserEmail.js'

const URL = 'http://localhost:4444'

function App() {

  let [loggedIn, setLoggedIn]=useState(false)
  let [userEmail,setUserEmail]=useState('')

// Dealing with the token
const token = JSON.parse(localStorage.getItem("token"));

useEffect(() => {
  const verify_token = async () => {
    if (token === null) return setLoggedIn(false);
    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post(`${URL}/users/verify`)
      return response.data.ok ? 
      login(token) : logout();
    } catch (error) {
      console.log(error);
    }
  };
  verify_token();
}, []);

// ---


// Sign in, log in, log out
const login = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
  setLoggedIn(true);
};
const logout = () => {
  localStorage.removeItem("token");
  setLoggedIn(false);
};
const signIn = async (email,magicLink) => {
  try{
    let res = await axios.post(`${URL}/users/enter`,{email,magicLink})
    if(res.data.token){
      alert(res.data.message) 
      login(res.data.token)
    }else{ 
      alert(res.data.message)
    }
  }catch(e){
    alert(e)
  }
}
// ---

// Event listeners 
const enterEmail = (e) => {
  setUserEmail(e.target.value)
}

const emailSubmit=(e)=>{
  e.preventDefault()
  signIn(userEmail)
  setUserEmail('')
}
// ---


return (
  <div className="App">
  <p>You are logged {loggedIn?'in':'out'}</p>
  {!loggedIn ? <UserEmail 
  enterEmail={enterEmail} 
  emailSubmit={emailSubmit} 
  userEmail={userEmail} 
  setUserEmail={setUserEmail} /> : <button onClick={logout}>Logout</button>}
  <Router>
  <Routes>
  <Route
  path="/"
  element={<Home/>}
  />
  <Route
  path="enter/:email/:link"
  element={<Enter signIn={signIn} />}
  />
  </Routes>
  </Router>
  </div>
  );
}

export default App;
