import React, { useContext, useState } from "react";
// import ReactDOM from "react-dom";
import Businessall from "../apis/Businessall";
import { useHistory } from "react-router-dom";
import { BusinessContext } from "../context/BusinessContext";
import { RegionDropdown } from "react-country-region-selector";
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import axios from "axios";
const lookup = require('country-code-lookup');

const AddBuisness = () => {
  const script = document.createElement("script");
  script.src = "../path/hello.js";
  script.async = true;

  document.body.appendChild(script);

  let history = useHistory();
  const { addBuisness1 } = useContext(BusinessContext);
  const [business_name, setbusiness_name] = useState("");
  const [business_email, setbusiness_email] = useState("");
  const [country, setcountry] = useState("United States");
  const [city, setcity] = useState("");
  const [province, setprovince] = useState("");
  // const [region, setregion] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [max_appoint, setmax_appoint] = useState(1);
  let [nameError, setNameError] = useState("");
  let [emailError, setEmailError] = useState("");
  let [phoneError, setPhoneError] = useState("");

  const validate = () => {
    if (!/\S+@\S+\.\S+/.test(business_email)) {
      emailError = "Email is invalid";
    } else if (/\S+@\S+\.\S+/.test(business_email)) {
      emailError = "";
      setEmailError(emailError);
    }

    if (emailError) {
      setEmailError(emailError);
    }
    if (business_name.length < 1) {
      nameError = "Business name cannot be empty";
    } else if (business_name.length >= 1) {
      nameError = "";
      setNameError(nameError);
    }

    if (nameError) {
      setNameError(nameError);
    }

    // if (!/^[0-9]+$/.test(phonenumber)) {
    //   phoneError = "Phone number is invalid";
    // } else if (/^[0-9]+$/.test(phonenumber)) {
    //   phoneError = "";
    //   setPhoneError(phoneError);
    // }

    // if (phoneError) {
    //   setPhoneError(phoneError);
    // }
    if (nameError || phoneError || emailError) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const isValid = validate();
    
    console.log("On submit:", { nameError }, { emailError }, { phoneError });
    console.log(isValid);
    if (isValid) {
      try {

        const code = lookup.byCountry(country).iso2;
        //console.log("code: ", code.iso2);
        let holidays = await axios.get("https://calendarific.com/api/v2/holidays?&api_key=aa92c68baa0dae129145b965651ebb571fae5301&country="+code +"&year="+new Date().getFullYear());
        let national = holidays.data.response.holidays;
        console.log("All: ", national);
        national = national.filter(holiday => holiday.type[0] === "National holiday").map((date) => ({
          date: new Date(date.date.iso),
          title: date.name
        }));
        console.log("Only national:", national);

        // businessall come from api folder Businessall.js

        const response = await Businessall.post("/", {
          business_name,
          business_email,
          country,
          province,
          city,
          'region': 'region',
          phonenumber,
          max_appoint,
          national
        });
        // history.push move the page when data submit succefully.
        history.push("/business/" + response.data.data.business.id + "/time");
        addBuisness1(response.data.data.business);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="mb-4">
      <div id="demo"></div>

      <form action="">
        <div className="form-group">
          <label for="exampleInputEmail1">Business Name</label>
          <input
            value={business_name}
            placeholder="Business Name"
            onChange={(e) => setbusiness_name(e.target.value)}
            type="text"
            className="form-control"
            required="required"
          />
        </div>
        <div style={{ color: "red" }}>{nameError}</div>
        <div className="form-group">
          <label for="exampleInputEmail1">Business Email</label>
          <input
            value={business_email}
            placeholder="example@mail.com"
            onChange={(e) => setbusiness_email(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div style={{ color: "red" }}>{emailError}</div>

        <div className="form-group" style={{ display: "block" }}>
          <label style={{marginRight:"3%"}}>Phone Number</label>
          <IntlTelInput
            value={phonenumber}
            containerClassName="intl-tel-input"
            inputClassName="form-control"
            format="true"
            // defaultCountry="India"
            onSelectFlag={(string, data, str, bool)=>{
              const cname = data.name.split("(");
              //console.log(cname[0]);
              setcountry(cname[0].trim(" "));
            }}
            onPhoneNumberChange={(isValid, value, data) => {
              setphonenumber(value);
              if(isValid){ 
                setPhoneError("");
              } else{
                setPhoneError("Phone number is invalid");
              }
            }}
          />
        </div>
        <div style={{ color: "red" }}>{phoneError}</div>
        {/*<div class="form-group" style={{ display: "block" }}>
          <label for="exampleInputEmail1">Country</label>

          <CountryDropdown
            value={country}
            id="my-country-field-id"
            name="my-country-field"
            classes="form-control"
            onChange={(val) => {
              setcountry(val);
              console.log(val);
            }}
          />
          </div>*/}

        {country && (
          <div>
            <div class="form-group" style={{ display: "block" }}>
              <label for="exampleInputEmail1">State/Province</label>
              <RegionDropdown
                country={country}
                value={province}
                classes="form-control"
                onChange={(val) => setprovince(val)}
              />
            </div>

            <div class="form-group" style={{ display: "block" }}>
              <label for="exampleInputEmail1">City</label>
              <input
                value={city}
                style={{ display: "block" }}
                onChange={(e) => setcity(e.target.value)}
                type="text"
                placeholder="City"
                className="form-control"
              />
            </div>

            <div class="form-group" style={{ display: "block" }}>
              <label>Max. appointments</label>
              <input
                value={max_appoint}
                style={{display: "block"}}
                onChange={(e) => setmax_appoint(e.target.value)}
                type="number"
                className="form-control"
              />
            </div>
          </div>
        )}
        
        <button
          type="submit"
          className="btn btn-primary  "
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default AddBuisness;
