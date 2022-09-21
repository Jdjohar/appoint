import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";

const SignupPage = (props) => {
  const [name, setuser_name] = useState("");
  const [email, setuser_email] = useState("");
  const [password, setuser_password] = useState("");
  const [cpassword, setuser_cpassword] = useState("");
  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('user-info')){
      history.push("/")
    }
  }, [])

  async function signup() {
    let result = await fetch("https://tachitool-node.herokuapp.com/api/v1/business/register", {
    // let result = await fetch("http://155.138.232.230:3000/api/v1/business/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        cpassword: cpassword,
      }),
    });
    result = await result.json();
    console.log("result: ", result);
    localStorage.setItem("user-info", JSON.stringify(result));
    if (result.status == "success") {
      history.push("/login");
    }
  }

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

  return (
    <div className="Services">
      <form action="">
        <div className="form-group">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setuser_name(e.target.value)}
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Name"
          />
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
            name="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
          <label>Confirm Password</label>
          <input
            value={cpassword}
            onChange={(e) => setuser_cpassword(e.target.value)}
            name="cpassword"
            type="password"
            className="form-control"
            id="cpassword"
            placeholder="Confirm Password"
          />
        </div>
      </form>
      {/* <input type="submit" value="Submit"  onClick={loginauth} className="btn btn-primary" /> */}
      <button className="btn btn-success" type="submit" onClick={signup}>
        Sign up
      </button>

      <FacebookLogin
        appId="3011820379037671"
        autoLoad={true}
        scope="email,public_profile"
        fields="name,email,picture"
        callback={responseFacebook}
        // cssClass="my-facebook-button-class"
        //icon="fa-facebook"
        render={renderProps => (
          <button className="btn btn-primary m-2" onClick={renderProps.onClick}><i className="fab fa-facebook-f"></i> Signup</button>
        )}
      />

      <GoogleLogin
        clientId="761338314551-1b5c4tsqi5de1tjsja4d0blr5mpkmlin.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        onClick={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />

      {/*<a href="https://tachitool-node.herokuapp.com/auth/facebook" class="btn btn-primary">
        <span class="fa fa-facebook"></span> Sign in with Facebook
      </a>
      <a href="https://tachitool-node.herokuapp.com/auth/google" class="btn btn-danger">
        <span class="fa fa-google"></span> Sign in with Google
  </a> */}
    </div>
  );
};

export default SignupPage;