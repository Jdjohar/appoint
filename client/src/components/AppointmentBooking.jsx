import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { BusinessContext } from "../context/BusinessContext";
import Servicelist from "../apis/Serviceslist";
import Appointmentbooking from "../apis/AppointmentBooking";
import Holiday from "../apis/Holiday";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {Modal, Button} from "react-bootstrap";
const lookup = require("country-code-lookup");

const AppointmentBooking = (props) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  let history = useHistory();
  const [value, onChange] = useState(new Date());
  const [date, setdate] = useState("");
  const [m_service, setm_service] = useState("");
  const [time_slot, settime_slot] = useState("");
  const [appointment_date, setappointment_date] = useState();
  const { selectedBusiness, setSelectedBusiness } = useContext(BusinessContext);
  const [exclude, setExclude] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  const postData = {
    id,
    appointment_date,
    m_service,
    time_slot,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id);
        const response = await Servicelist.get("/", {
          params: {
            id,
          },
        });
        console.log("Test Response");
        console.log(response);
        //console.log(response.data.data.service[0].servicename);
        console.log(response.data.data.country);
        setSelectedBusiness(response.data.data.service);
        //console.log(response.data.data.service);

        let holidays = await Holiday.get("/", {
          params: {
            id,
          },
        });

        holidays = holidays.data.holidays.map((day) => new Date(day.date));
        //console.log("holidays: ", holidays);
        setExclude(holidays);
      } catch (err) {}
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //     const response = await fetch(`https://tachitool-node.herokuapp.com/api/v1/business/appointment/:id`, {
      //     method: "POST",
      //     body: JSON.stringify(postData),
      //     headers: {
      //       "Content-type": "Application/json"
      //     }
      // })
      console.log("On submit: ", time_slot);
      // businessall come from api folder Businessall.js
      const response = await Appointmentbooking.post("/", {
        postData,
      });
      // history.push move the page when data submit succefully.
      // history.push(`/business/1/time`);
      console.log("booking", response);
      if (response.status === 200) {
        history.push("/appointmentcalendar/" + postData.id);
      }
      if(response.status === 204){
        setShow(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="p-4">
        {/* <ScheduleComponent>
    <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
  </ScheduleComponent> */}
        <form>
          <h3>{name}</h3>
          {/*<div className="form-group">
                    <label for="exampleInputEmail1">Select Date</label>
                    <input placeholder="Select Date" onChange={(e) => {setappointment_date(e.target.value);
                      console.log(typeof(appointment_date));
                      
                    }} type="date" className="form-control" />
                  </div>*/}
          <DatePicker
            selected={appointment_date}
            dateFormat="dd-MM-yyyy"
            onChange={(date) => {
              setappointment_date(date);
              console.log(date);
            }}
            placeholderText="Select Date"
            excludeDates={exclude}
          />

          {selectedBusiness !== null && selectedBusiness.length>0 ? (
            <>
              <div className="form-group">
                <label for="exampleInputEmail1">Select Service</label>
                <select
                  onChange={(e) => setm_service(e.target.value)}
                  className="form-control"
                >
                  <option>Select Service</option>
                  {selectedBusiness.map((selectedBusiness) => (
                    <option
                      key={selectedBusiness.id}
                      value={selectedBusiness.servicename}
                    >
                      {selectedBusiness.servicename}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Enter service name"
                  className="form-control"
                  value={m_service}
                  onChange={(e) => {
                    setm_service(e.target.value);
                  }}
                />
              </div>
            </>
          )}

          {/* <Services /> */}
          {/* <div className="form-group">
                    <label for="exampleInputEmail1">Select Service</label>
                    <select onChange={(e) => setm_service(e.target.value)} className="form-control">
                      <option>Select Service</option>
                      <option>ABC</option>
                      <option>ABC</option>
                      <option>ABC</option>
                    </select>
                    
                </div> */}

          <div className="form-group col-lg-6">
            {/*<label for="exampleInputEmail1">From</label>
                <input
                  // value={start_time}
                  type="time"
                  className="form-control"
                  placeholder="Start Time"
                  step="1"
                  onChange={(e) => setstart_time(e.target.value)}
                />
                <label for="exampleInputEmail1">To</label>
                <input
                  // value={start_time}
                  // onChange={(e) => setstart_time(e.target.value)}
                  type="time"
                  className="form-control"
                  placeholder="Start Time"
                  step="1"
                  onChange={(e) => setend_time(e.target.value)}
                />*/}

            <select
              //value={time_slot}
              placeholder="Time Slot"
              onChange={(e) => {
                settime_slot(e.target.value);
                console.log(time_slot);
              }}
              type="text"
              className="form-control"
            >
              <option value="9:00:00-10:00:00">9:00 AM - 10:00 AM</option>
              <option value="10:00:00-11:00:00">10:00 AM - 11:00 AM</option>
              <option value="11:00:00-12:00:00">11:00 AM - 12:00 AM</option>
              <option value="12:00:00-13:00:00">12:00 PM - 01:00 PM</option>
              <option value="13:00:00-14:00:00">01:00 PM - 02:00 PM</option>
              <option value="14:00:00-15:00:00">02:00 PM - 03:00 PM</option>
              <option value="15:00:00-16:00:00">03:00 PM - 04:00 PM</option>
              <option value="16:00:00-17:00:00">04:00 PM - 05:00 PM</option>
              <option value="17:00:00-18:00:00">05:00 PM - 06:00 PM</option>
              <option value="18:00:00-19:00:00">06:00 PM - 07:00 PM</option>
              <option value="19:00:00-20:00:00">07:00 PM - 08:00 PM</option>
              <option value="20:00:00-21:00:00">08:00 PM - 09:00 PM</option>
              <option value="21:00:00-22:00:00">09:00 PM - 10:00 PM</option>
            </select>
            {/* <input 
                    value={time_slot} 
                    placeholder="Time Slot" 
                    onChange={(e) => settime_slot(e.target.value)} 
                    type="text" 
                    className="form-control" /> */}
          </div>

          {/* <div className="form-group">
                    <label for="exampleInputEmail1">Amount</label>
                    <input value={amount} placeholder="Amount" onChange={(e) => setamount(e.target.value)} type="text" className="form-control" />
                </div> */}

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Sorry!</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background: '#fff'}}>
              The maximum number of appointments for this slot have been booked! Please try another time slot.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <button
            type="submit"
            className="btn btn-primary  "
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentBooking;
