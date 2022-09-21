import React, { useState, useContext, useEffect, Link } from "react";
import { useHistory, useParams } from "react-router-dom";
import { BusinessContext } from "../context/BusinessContext";
import AppointmentBooking from '../apis/AppointmentBooking';
import Calendar from "react-full-event-calendar";
import moment from 'moment';


const Dashboard = (props) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  let history = useHistory();
  const [today, settoday] = useState(new Date()); 
  const [appoint_dates, setappoint_dates] = useState("");
  const [date, setdate] = useState("");
  const [m_service, setm_service] = useState("");
  const [time_slot, settime_slot] = useState("");
  const [appointment_date, setappointment_date] = useState("");
  const { selectedBusiness, setSelectedBusiness } = useContext(BusinessContext);

  const postData = {
    appointment_date,
    m_service,
    time_slot
}


useEffect(() => {
  const fetchData = async () => {
    console.log("Hello")
      try {
        console.log("Hello Jashan")
          const response = await AppointmentBooking.get("/");
        
          setappoint_dates(response.data.data.fetchDate);
          const date_c = response.data.data.fetchDate;
      } catch (err) {}  
  };

  fetchData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
const events = [
  
  {
    startTime: new Date(moment().add(-3, "hour")),
    endTime: new Date(moment().add(-2, "hour")),
    title: "working in the weekend -3 -2"
  },
  {
    startTime: new Date(moment().add(2, "hour")),
    endTime: new Date(moment().add(3, "hour")),
    title: "working in the weekend"
  },
  {
    startTime: new Date("2021-03-25"),
    endTime: new Date(moment().add(1, "day")),
    title: "working in the weekend"
  }
];

const dateModification = appoint_dates && (appoint_dates.map(appoint_dates =>
  appoint_dates.appointment_date.substring(0, 10).replaceAll("-", ",")
  ));

const demo = dateModification && (dateModification.map(dateModification =>
  new Date(dateModification)
  ));
console.log("date mofication", dateModification);
console.log("date mofi", demo);


const [value, onChange] = useState(demo); 
console.log("new date mofi", value);
const disable = ({activeStartDate, date, view }) => date.getDay() === 0;



  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
          const response = await fetch("https://tachitool-node.herokuapp.com/api/v1/business/"+id+"/appointment", {
          // const response = await fetch("http://155.138.232.230:3000/api/v1/business/"+id+"/appointment", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-type": "Application/json"
    }
  })

      // businessall come from api folder Businessall.js
        // const response = await Businessall.post("/", {
        //     business_name,
        //     business_email,
        //     country,
        //     city,
        //     province,
        //     region,
        //     phonenumber
        // });
        // history.push move the page when data submit succefully.
        // history.push(`/business/1/time`);
        console.log(response);
    } catch (err) {}
};




    return <div className="w-100">
    <button className="btn btn-secondary d-block" onClick={() => {history.goBack()}} >Back</button>
      <div className="row">
        <div className="col-md-8">
        <Calendar events={events} />
        </div>
     

      <div className="col-md-4">
<div className="main embed_code">
<h2>Generate Embed code</h2>
<p> To create you custom calendar and have it on your website or on your Facebook page, please copy the code on the right and provide it to your developer</p>
    </div>
    </div>
    </div>



    </div>;
};
const rootElement = document.getElementById("root");
// ReactDOM.render(<Dashboard />, rootElement);

export default Dashboard;
