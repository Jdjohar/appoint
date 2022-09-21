import React, { useEffect, useState } from "react"
import ReactDOM from 'react-dom';
import Login from '../apis/Login';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { render } from "@testing-library/react";
import Userlogin from "../apis/Userlogin";
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
const responseFacebook = (response) => {
  console.log(response + 'Jashan Profile');
}


const EmbedLogin = ({props, setAuth}) => {

const [email, setemail] = useState(false);
const [password, setpassword] = useState("");
const [isLoggedIn, setisLoggedIn] = useState("");
const [userID, setuserID] = useState("");
const [name, setname] = useState("");
let history = useHistory();

const postData = {
  email,
  password
}

// const tokenPost = {
//   userLoginToken,
// }

const handleSubmit = async (e, id) => {
  e.preventDefault();
  try {
    console.log("response");
        const response = await fetch("https://tachitool-node.herokuapp.com/login", {
        // const response = await fetch("http://155.138.232.230:3000/login", {
  method: "POST",
  body: JSON.stringify({semail: email, spassword: password}),
  headers: {
    'Content-Type' : 'application/json',
  }
});
const data = await response.json();
console.log(data, "Data")
const user_token = data.token;
console.log(user_token);
history.push("/appointmentbooking/"+ data.user1_id +"");
localStorage.setItem(JSON.stringify(data.token));


    // businessall come from api folder Businessall.js
    //   const response = await Userlogin.post("/", {
    //     email,
    //     password
    //   });
    //  // history.push //move the page when data submit succefully.
    //  console.log("JAshan");
     
  } catch (err) {}
};


    return (
        <div>
          <h1>Login Page</h1>
<form action="">
        <div className="form-group">
            <label>Email</label>
            <input 
             
             onChange={(e) => setemail(e.target.value)}
            type="text" 
            className="form-control" 
            />
        </div>
        <div className="form-group">
            <label>Password</label>
            <input 
          
             onChange={(e) => setpassword(e.target.value)}
            type="password" 
            className="form-control" 
           />
        </div>
        
      

</form>
{/* <input type="submit" value="Submit"  onClick={loginauth} className="btn btn-primary" /> */}
<button onClick={handleSubmit} className="btn btn-primary" >Submit</button>
{/* <FacebookLogin
  appId="297378905085678"
  autoLoad
  callback={responseFacebook}
  render={renderProps => (
    <button onClick={renderProps.onClick}>This is my custom FB button</button>
  )}
/> */}

        </div>
    )

}

export default EmbedLogin