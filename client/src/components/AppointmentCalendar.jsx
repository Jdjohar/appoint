import { React, useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useParams } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Appointmentcalendar from "../apis/AppointmentCalendar";
import Holiday from "../apis/Holiday";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";
// import { DayTableSlicer } from "@fullcalendar/daygrid";
// const lookup = require("country-code-lookup");

const AppointmentCalendar = () => {
  const { id } = useParams();
  let [events, setEvents] = useState([]);
  const [addHoliday, setaddholiday] = useState();
  const [removeHoliday, setremoveholiday] = useState();
  // const [holidayEvent, setHolidayEvent] = useState([]);
  const [holidayTilte, setholidaytitle] = useState("");
  
  const localizer = momentLocalizer(moment);
  const eventObj = [];
  const onlyHolidays = [];
  const withHolidays = [];
  // const exclude = [];
  const [exclude, setexclude] = useState([]);
  useEffect(() => {
    
    const fetchHolidays = async () => {
      try {
        const response = await Holiday.get("/", {
          params: {
            id,
          },
        });

        //console.log("response: ", response);
        let national = response.data.holidays.map(day => ({
          title: day.title,
          start: new Date(day.date),
          end: new Date(day.date),
          allDay: 'true',
          
        }));
        //console.log("national: ", national);
        for(var i=0;i<national.length;i++){
          onlyHolidays.push(national[i]);
        }

        const bookings = await Appointmentcalendar.get("/", { params: { id } });
        
        //console.log(bookings);
        bookings.data.appointments.forEach((appointment) => {
          const start_at = moment(appointment.appointment_date).toDate();
          const end_at = moment(appointment.appointment_date).toDate();
          // console.log("appointment: ",appointment.time_slot);
          const time = appointment.time_slot.split("-");
          // console.log("time:",time);
          const start = time[0].split(":");
          const startHours = start[0],
            startMinutes = start[1],
            startSeconds = start[2];
          start_at.setHours(startHours);
          start_at.setMinutes(startMinutes);
          start_at.setSeconds(startSeconds);

          const end = time[1].split(":");
          const endHours = end[0],
            endMinutes = end[1],
            endSeconds = end[2];
          end_at.setHours(endHours);
          end_at.setMinutes(endMinutes);
          end_at.setSeconds(endSeconds);

          const title = appointment.m_service;

          eventObj.push({
            title: title,
            start: start_at,
            end: end_at,
            allDay: false,
          });
        });
        for(var e=0;e<eventObj.length;e++){
          withHolidays.push(eventObj[e]);
        }
        for(var r=0;r<onlyHolidays.length;r++){
          withHolidays.push(onlyHolidays[r]);
        }
        

          //console.log(onlyHolidays);
          var excluded = onlyHolidays.map(day => 
            day.start
          );
          setexclude(excluded);
          //console.log("exlcude: ",exclude);
  
        setEvents(withHolidays);
        //console.log(onlyHolidays[0])
      } catch (err) {
        console.log(err);
      }
    };
    
   

    fetchHolidays();
    
    
  }, [eventObj,onlyHolidays,withHolidays,exclude]);
  // console.log("events: ", eventObj);
  // console.log("holidays: ", onlyHolidays);
  // console.log("with holidays: ", withHolidays);
    
  const handleRemoveClick = async (e) => {
      e.preventDefault();
      const response = await Holiday.get("/", {
        params: {
          id,
        },
      });
      let custom = response.data.holidays.map(day => ({
        date: new Date(new Date(day.date).setHours(0,0,0,0)),
        title: day.title
      }))
      
      console.log("response", custom);
      //console.log(custom[0].date);
      //console.log(custom[0].date.getTime());
      //console.log(removeHoliday);
      custom = custom.filter(day => removeHoliday.getTime() !== day.date.getTime() )
      console.log("custom: ", custom);
      const result = await Holiday.put("/", {
        data: {
          id: id,
          custom: custom
        }
      });
      console.log("result: ",result);
      setremoveholiday()
    }
  
  const handleAddClick = async (e) => {
    e.preventDefault();
    const response = await Holiday.get("/", {
      params: {
        id,
      },
    });
    let custom = response.data.holidays.map(day => ({
      date: new Date(day.date),
      title: day.title
    }));
    console.log("before:",custom);
    custom = [...custom, {date:addHoliday, title: holidayTilte}]
    console.log("after:",custom);
    const result = await Holiday.put("/", {
      data: {
        id: id,
        custom: custom
      }
    });

    console.log("result:",result);
    setholidaytitle("");
    setaddholiday();
  }
 

  // Events array to pass to calendar
  // const events = [{
  //   // title: m_service,
  //   // start: start_at,
  //   // end: end_at,
  //   // allDay: false,
  // }]
  return (
    <div className="row">
      <div className="col-lg-6">
        <div style={{ background: "white", padding: "8%", borderRadius: "3%" }}>
          <h1>Calendar</h1>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              defaultView="week"
              eventPropGetter={
                (event, start, end, isSelected) => {
                  let newStyle = {
                    backgroundColor: '#3174ad'
                  };
            
                  if (event.allDay){
                    newStyle.backgroundColor = "red"
                  }
            
                  return {
                    className: "",
                    style: newStyle
                  };
                }
              }
            />
        </div>
        </div>
        <div className="col-lg-6">  
          <div style={{padding:'3%', backgroundColor:'white', borderRadius:'2%'}}>
            <h1>Add/Remove Holiday</h1>
            <form action="">
              <label className="d-block" htmlFor="">Remove Holiday</label>
              <DatePicker
                  selected={removeHoliday}
                  dateFormat="dd-MM-yyyy"
                  onChange={date => {
                    setremoveholiday(date);
                    console.log(date);
                  }}
                  placeholderText="Select Date"
                  //excludeDates={exclude}
                />
                <button onClick={handleRemoveClick} className="btn btn-sm btn-danger mt-1 d-block">Remove</button>
                <br/>
                <label className="d-block" htmlFor="">Add Holiday</label>
                
                <input type="text" value={holidayTilte} onChange={(e)=>setholidaytitle(e.target.value)} placeholder="Title" className="d-block"/>
                
                <DatePicker
                  className="mt-2"
                  selected={addHoliday}
                  dateFormat="dd-MM-yyyy"
                  onChange={date => {
                    setaddholiday(date);
                    console.log(date);
                  }}
                  placeholderText="Select Date"
                  excludeDates={exclude}
                />
                <button onClick={handleAddClick}  className="btn btn-small btn-info mt-1 d-block">Add</button>
            </form>
          </div>
        </div>
      
    </div>
    
  );
};

export default AppointmentCalendar;
