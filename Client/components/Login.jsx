import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import './Login.css';
import Questions from './Questions.jsx';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

//import NFVote IPFS Hash
// const path = require("path");
// require("dotenv").config({ path: __dirname + "./../../NFVoteMeta.env" });
// const { IPFS } = process.env;


async function loginUser(credentials) {
 return await fetch('/server/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}


export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [redirect, setRedirect] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    })

    // console.log('*********** sREDIRECT FRONT END HIT *************')
    // console.log(`token:`,token.logIn)
    // console.log('data in logIn:', data);
    setRedirect(token.logIn);
    // {token.logIn ? render(<Redirect to="/questions" />) : console.log('NO_RENDER')}
  }
  if(redirect){
    return <Redirect
    to = {{
      pathname: "/questions",
    }}
     />
  }

  
  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
