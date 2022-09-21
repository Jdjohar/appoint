import React, { useEffect, useState } from "react";
import Login from "../apis/Login";
import { useHistory } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";

import axios from "axios";
import FullCalendar from "@fullcalendar/react";

const LoginPage = (props) => {
  const [email, setuser_email] = useState("");
  const [password, setuser_password] = useState("");

  let history = useHistory();
  const [isSubmit, setIsSubmit] = useState("");

  useEffect(() => {
    if (localStorage.getItem('user-info')){
      history.push("/")
    }
  }, [])

  async function responseGoogle(response)  {
    console.log("response: ",response);
    console.log(response.profileObj.name, response.profileObj.email, response.googleId);
    
    let googleUser = await fetch("https://tachitool-node.herokuapp.com/api/v1/business/social-login", {
    // let googleUser = await fetch("http://155.138.232.230:3000/api/v1/business/social-login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: response.profileObj.email,
        name: response.profileObj.name,
        googleId: response.googleId
      }),
    })
    googleUser = await googleUser.json();
    console.log("client side: ", googleUser);
    localStorage.setItem("user-info", JSON.stringify(googleUser));
    history.push(googleUser.redirect);
  }

  async function responseFacebook(response) {
    console.log(response);
    console.log("facebook details: ", response.name, response.email);
    let fbUser = await fetch("https://tachitool-node.herokuapp.com/api/v1/business/social-login", {
    // let fbUser = await fetch("http://155.138.232.230:3000/api/v1/business/social-login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: response.email,
        name: response.name,
      }),
    })
    fbUser = await fbUser.json();
    console.log("client side: ", fbUser);
    localStorage.setItem("user-info", JSON.stringify(fbUser));
    history.push(fbUser.redirect);
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
    } catch (err) {}
  };
  async function signup() {
    history.push("/signup");
  }
  async function login() {
    // console.warn(email,password);
    //const item = {email,password};

    //console.log(JSON.stringify(item));
    // let result = await fetch("http://155.138.232.230:3000/api/v1/business/login", {
    let result = await fetch("https://tachitool-node.herokuapp.com/api/v1/business/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    result = await result.json();
    console.log("result: ", result);
    localStorage.setItem("user-info", JSON.stringify(result));
    if (result.status == "success") {
      history.push("/");
    }
  }

  // async function loginWithFacebook() {
  //   let fbResult = await fetch("https://tachitool-node.herokuapp.com/auth/facebook", {
  //     method: "GET"
  //   })
  //   fbResult = await fbResult.json();
  //   console.log("fbResult: ", fbResult);
  // }

  return (
    <div className="Services">
      <form action="">
      <div className="font-weight-bold">
          <h2>Login Page for Returning Merchants</h2>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setuser_email(e.target.value)}
            type="text"
            className="form-control"
            id="email"
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setuser_password(e.target.value)}
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
        </div>
      </form>
      {/* <input type="submit" value="Submit"  onClick={loginauth} className="btn btn-primary" /> */}
      <button className="btn btn-success" type="submit" onClick={login}>
        Submit
      </button>
      <button className="btn btn-primary" type="Signup" onClick={signup}>
        Signup
      </button>
      {/* <FacebookLogin
        appId="3011820379037671"
        autoLoad={false}
        scope="email,public_profile"
        fields="name,email,picture"
        callback={responseFacebook} 
        // cssClass="my-facebook-button-class"
        //icon="fa-facebook"
        render={renderProps => (
          <button className="btn btn-primary m-2" onClick={renderProps.onClick}><i className="fab fa-facebook-f"></i> Login</button>
        )}
      />

      <GoogleLogin
        clientId="761338314551-1b5c4tsqi5de1tjsja4d0blr5mpkmlin.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        onClick={responseGoogle}
        cookiePolicy={"single_host_origin"}
      /> */}
    </div>
  );
};

export default LoginPage;