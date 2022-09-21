import React, { useState } from "react";
import WeekTime from "../apis/WeekTime";
import ReactDOM from "react-dom";
import { useHistory, useParams } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
// import "resize-observer-polyfill/dist/ResizeObserver.global";
// import { TimeGridScheduler, classes } from "@remotelock/react-week-scheduler";
// import "@remotelock/react-week-scheduler/index.css";

const rangeStrings = [
  //   ["2021-03-04 00:15", "2021-03-04 01:45"],
  //   ["2021-03-05 09:00", "2021-03-05 10:30"],
  //   ["2021-03-06 22:00", "2021-03-06 22:30"],
  //   ["2021-03-07 01:30", "2021-03-07 03:00"],
  //   ["2021-03-07 05:30", "2021-03-07 10:00"],
  //   ["2021-03-08 12:30", "2021-03-08 01:30"],
  //   ["2021-03-09 22:00", "2021-03-09 23:59"],
];

const defaultSchedule = rangeStrings.map((range) =>
  range.map((dateString) => new Date(dateString))
);

const AddTime = () => {
  let history = useHistory();
  const [schedule, setSchedule] = useState(defaultSchedule);
  //const [business_id, setbusiness_id] = useState("");
  let { id } = useParams();
  const [start_time, setstart_time] = useState("");
  const [end_time, setend_time] = useState("");
  const [day_name, setday_name] = useState("");
  const [radio_check, setradio_check] = useState("");
  const [radio_check2, setradio_check2] = useState("");
  const [monTime, setMonTime] = useState("");
  const [tueTime, setTueTime] = useState("");
  const [wedTime, setWedTime] = useState("");
  const [thurTime, setThurTime] = useState("");
  const [friTime, setFriTime] = useState("");
  const [satTime, setSatTime] = useState("");
  const [sunTime, setSunTime] = useState("");
  const [monEndEndTime, setMonEndTime] = useState("");
  const [tueEndTime, setTueEndTime] = useState("");
  const [wedEndTime, setWedEndTime] = useState("");
  const [thurEndTime, setThurEndTime] = useState("");
  const [friEndTime, setFriEndTime] = useState("");
  const [satEndTime, setSatEndTime] = useState("");
  const [sunEndTime, setSunEndTime] = useState("");
  const [activeTab, setActiveTab] = useState(1);

  // console.log(schedule);
  // const postData = {
  //     business_id,
  //     start_time,
  //     end_time,
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const response = await fetch("http://155.138.232.230:3000/api/v1/business/:id/time", {
      //   method: "POST",
      //   body: JSON.stringify(postData),
      //   headers: {
      //     "Content-type": "Application/json"
      //   }
      // })
      const response = await WeekTime.post("/", {
        id,
        start_time,
        end_time,
        day_name,
      });
      history.push("/business/" + id + "/services");
      console.log(response);
      console.log("Hello", response.id);
    } catch (err) {}
  };
  let answer;
  let answer2;
  function handleClick(event) {
    const { id, value } = event.target;
    console.log(id);
    console.log(value);
    if (id === "customRadioInline1") {
      setradio_check(true);
      setradio_check2(false);
      answer = true;
      answer2 = false;
    }
    if (id === "customRadioInline2") {
      setradio_check2(true);
      setradio_check(false);
      answer = false;
      answer2 = true;
    }
  }

  // for handling tab change
  const handleSelect = (selectedTab) =>{
    setActiveTab(selectedTab);
  }

  return (
    <div className="addTime">
      <div className="custom-control custom-radio custom-control-inline pb-3">
        <input
          type="radio"
          id="customRadioInline1"
          name="customRadioInline1"
          className="custom-control-input"
          onChange={handleClick}
        />
        <label className="custom-control-label" for="customRadioInline1">
          Set Operating Hours for All Days
        </label>
      </div>

      {radio_check && !radio_check2 && (
        <div id="first">
          {/*<div className="form-group col-6 float-left">
                     <label for="exampleInputEmail1">Business ID</label>
                     <input value={business_id} onChange={(e) => setbusiness_id(e.target.value)} type="text" className="form-control" placeholder="Business ID" />
                </div>*/}

          <div className="form-group col-6 float-left">
            <label for="exampleInputEmail1">From</label>
            <input
              value={start_time}
              onChange={(e) => setstart_time(e.target.value)}
              type="time"
              className="form-control"
              placeholder="Start Time"
            />
          </div>
          <div className="form-group col-6 float-left">
            <label for="exampleInputEmail1">To</label>
            <input
              value={end_time}
              onChange={(e) => setend_time(e.target.value)}
              type="time"
              className="form-control"
              placeholder="End Time"
            />
          </div>
          {/*<div className="form-group col-6 float-left">
                     <label for="exampleInputEmail1">Day name</label>
                     <input value={day_name} onChange={(e) => setday_name(e.target.value)} type="text" className="form-control" placeholder="Day name" />
                 </div>*/}
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn mt-3 btn-primary"
          >
            Next
          </button>
          <button
            type="submit"
            onClick={handleSubmit}  
            className="btn mt-3 btn-primary px-1"
          >
            Back
          </button>
        </div>
      )}

      <div class="custom-control custom-radio custom-control-inline py-2">
        <input
          type="radio"
          id="customRadioInline2"
          name="customRadioInline1"
          class="custom-control-input"
          onChange={handleClick}
        />
        <label class="custom-control-label" for="customRadioInline2">
          Customize time per day
        </label>
      </div>

      {!radio_check && radio_check2 && (
        <div>
          <form>
            <div className="form-group nav-tabs py-3 myClass" id="Province-div">
              <label>
                Select all days operating<span className="text-danger">*</span>
              </label>
              <Tabs defaultActiveKey={1} activeKey={activeTab} onSelect={handleSelect}>
                <Tab eventKey={1}  title="Mon">
                <label for="exampleInputPassword1">
                Time Operating <span className="text-danger">*</span>
              </label>
              <div className="row">
                <div className="col">
                  <small for="from">From </small>
                  <input
                    value={monTime}
                    type="time"
                    onChange={(e) => {
                      setMonTime(e.target.value);
                      setTueTime(e.target.value);
                      setWedTime(e.target.value);
                      setThurTime(e.target.value);
                      setFriTime(e.target.value);
                      setSatTime(e.target.value);
                      setSunTime(e.target.value);
                    }}
                    className="form-control"
                    placeholder="First name"
                  />
                </div>
                <div className="col">
                  <small for="from">To </small>
                  <input
                    type="time"
                    value={monEndEndTime}
                    onChange={(e) => {
                      setMonEndTime(e.target.value);
                      setTueEndTime(e.target.value);
                      setWedEndTime(e.target.value);
                      setThurEndTime(e.target.value);
                      setFriEndTime(e.target.value);
                      setSatEndTime(e.target.value);
                      setSunEndTime(e.target.value);
                    }}
                    className="form-control"
                    placeholder="Last name"
                  />
                </div>
              </div>
                </Tab>
                <Tab eventKey={2} title="Tue">
                <label for="exampleInputPassword1">Time Operating</label>

                <div className="row">
                  <div className="col">
                    <small for="from">From </small>
                    <input
                      type="time"
                      value={tueTime}
                      onChange={(e) => setTueTime(e.target.value)}
                      className="form-control"
                      placeholder="First name"
                    />
                  </div>
                  <div className="col">
                    <small for="from">To </small>
                    <input
                      type="time"
                      className="form-control"
                      value={tueEndTime}
                      onChange={(e) => setTueEndTime(e.target.value)}
                      placeholder="Last name"
                    />
                  </div>
                </div>
                </Tab>
                <Tab eventKey={3} title="Wed">
                <label for="exampleInputPassword1">Time Operating</label>
                  <div className="row">
                    <div className="col">
                      <small for="from">From </small>
                      <input
                        type="time"
                        value={wedTime}
                        onChange={(e) => setWedTime(e.target.value)}
                        className="form-control"
                        placeholder="First name"
                      />
                    </div>
                    <div className="col">
                      <small for="from">To </small>
                      <input
                        type="time"
                        value={wedEndTime}
                        onChange={(e) => setWedEndTime(e.target.value)}
                        className="form-control"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                </Tab>
                <Tab eventKey={4} title="Thur">
                <label for="exampleInputPassword1">Time Operating</label>

                <div className="row">
                  <div className="col">
                    <small for="from">From </small>
                    <input
                      type="time"
                      value={thurTime}
                      onChange={(e) => setThurTime(e.target.value)}
                      className="form-control"
                      placeholder="First name"
                    />
                  </div>
                  <div className="col">
                    <small for="from">To </small>
                    <input
                      type="time"
                      value={thurEndTime}
                      onChange={(e) => setThurEndTime(e.target.value)}
                      className="form-control"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                </Tab>
                <Tab eventKey={5} title="Fri">
                <label for="exampleInputPassword1">Time Operating</label>
                <div className="row">
                  <div className="col">
                    <small for="from">From </small>
                    <input
                      type="time"
                      value={friTime}
                      onChange={(e) => setFriTime(e.target.value)}
                      className="form-control"
                      placeholder="First name"
                    />
                  </div>
                  <div className="col">
                    <small for="from">To </small>
                    <input
                      type="time"
                      value={friEndTime}
                      onChange={(e) => setFriEndTime(e.target.value)}
                      className="form-control"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                </Tab>
                <Tab eventKey={6} title="Sat">
                <label for="exampleInputPassword1">Time Operating</label>
                <div className="row">
                <div className="col">
                  <small for="from">From </small>
                  <input
                    type="time"
                    value={satTime}
                    onChange={(e) => setSatTime(e.target.value)}
                    className="form-control"
                    placeholder="First name"
                  />
                </div>
                <div className="col">
                  <small for="from">To </small>
                  <input
                    type="time"
                    value={satEndTime}
                    onChange={(e) => setSatEndTime(e.target.value)}
                    className="form-control"
                    placeholder="Last name"
                  />
                </div>
              </div>
                </Tab>
                <Tab eventKey={7} title="Sun">
                <label for="exampleInputPassword1">Time Operating</label>
                <div className="row">
                  <div className="col">
                    <small for="from">From </small>
                    <input
                      type="time"
                      value={sunTime}
                      onChange={(e) => setSunTime(e.target.value)}
                      className="form-control"
                      placeholder="First name"
                    />
                  </div>
                  <div className="col">
                    <small for="from">To </small>
                    <input
                      type="time"
                      value={sunEndTime}
                      onChange={(e) => setSunEndTime(e.target.value)}
                      className="form-control"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                </Tab>
              </Tabs>
              {/*<ul className="nav nav-tabs pb-3" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="mon-tab"
                    data-toggle="tab"
                    href="#mon"
                    role="tab"
                    aria-controls="mon"
                    aria-selected="true"
                  >
                    Mon
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="tue-tab"
                    data-toggle="tab"
                    href="#tue"
                    role="tab"
                    aria-controls="tue"
                    aria-selected="false"
                  >
                    Tue
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="wed-tab"
                    data-toggle="tab"
                    href="#wed"
                    role="tab"
                    aria-controls="wed"
                    aria-selected="false"
                  >
                    Wed
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="thur-tab"
                    data-toggle="tab"
                    href="#thur"
                    role="tab"
                    aria-controls="thur"
                    aria-selected="false"
                  >
                    Thur
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="fri-tab"
                    data-toggle="tab"
                    href="#fri"
                    role="tab"
                    aria-controls="fri"
                    aria-selected="false"
                  >
                    Fri
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="sat-tab"
                    data-toggle="tab"
                    href="#sat"
                    role="tab"
                    aria-controls="sat"
                    aria-selected="false"
                  >
                    Sat
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="sun-tab"
                    data-toggle="tab"
                    href="#sun"
                    role="tab"
                    aria-controls="sun"
                    aria-selected="false"
                  >
                    Sun
                  </a>
                </li>
      </ul>*/}

              {/*<div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="mon"
                  role="tabpanel"
                  aria-labelledby="mon-tab"
                >
                  <label for="exampleInputPassword1">
                    Time Operating <span className="text-danger">*</span>
                  </label>
                  <div className="row">
                    <div className="col">
                      <small for="from">From </small>
                      <input
                        value={monTime}
                        type="time"
                        onChange={(e) => {
                          setMonTime(e.target.value);
                          setTueTime(e.target.value);
                          setWedTime(e.target.value);
                          setThurTime(e.target.value);
                          setFriTime(e.target.value);
                          setSatTime(e.target.value);
                          setSunTime(e.target.value);
                        }}
                        className="form-control"
                        placeholder="First name"
                      />
                    </div>
                    <div className="col">
                      <small for="from">To </small>
                      <input
                        type="time"
                        value={monEndEndTime}
                        onChange={(e) => {
                          setMonEndTime(e.target.value);
                          setTueEndTime(e.target.value);
                          setWedEndTime(e.target.value);
                          setThurEndTime(e.target.value);
                          setFriEndTime(e.target.value);
                          setSatEndTime(e.target.value);
                          setSunEndTime(e.target.value);
                        }}
                        className="form-control"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="tue"
                  role="tabpanel"
                  aria-labelledby="tue-tab"
                >
                  <label for="exampleInputPassword1">Time Operating</label>

                  <div className="row">
                    <div className="col">
                      <small for="from">From </small>
                      <input
                        type="time"
                        value={tueTime}
                        onChange={(e) => setTueTime(e.target.value)}
                        className="form-control"
                        placeholder="First name"
                      />
                    </div>
                    <div className="col">
                      <small for="from">To </small>
                      <input
                        type="time"
                        className="form-control"
                        value={tueEndTime}
                        onChange={(e) => setTueEndTime(e.target.value)}
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="wed"
                  role="tabpanel"
                  aria-labelledby="wed-tab"
                >
                  <label for="exampleInputPassword1">Time Operating</label>
                  <div className="row">
                    <div className="col">
                      <small for="from">From </small>
                      <input
                        type="time"
                        value={wedTime}
                        onChange={(e) => setWedTime(e.target.value)}
                        className="form-control"
                        placeholder="First name"
                      />
                    </div>
                    <div className="col">
                      <small for="from">To </small>
                      <input
                        type="time"
                        value={wedEndTime}
                        onChange={(e) => setWedEndTime(e.target.value)}
                        className="form-control"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade show"
                  id="thur"
                  role="tabpanel"
                  aria-labelledby="thur-tab"
                >
                  <label for="exampleInputPassword1">Time Operating</label>

                  <div className="row">
                    <div className="col">
                      <small for="from">From </small>
                      <input
                        type="time"
                        value={thurTime}
                        onChange={(e) => setThurTime(e.target.value)}
                        className="form-control"
                        placeholder="First name"
                      />
                    </div>
                    <div className="col">
                      <small for="from">To </small>
                      <input
                        type="time"
                        value={thurEndTime}
                        onChange={(e) => setThurEndTime(e.target.value)}
                        className="form-control"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="fri"
                  role="tabpanel"
                  aria-labelledby="fri-tab"
                >
                  <label for="exampleInputPassword1">Time Operating</label>
                  <div className="row">
                    <div className="col">
                      <small for="from">From </small>
                      <input
                        type="time"
                        value={friTime}
                        onChange={(e) => setFriTime(e.target.value)}
                        className="form-control"
                        placeholder="First name"
                      />
                    </div>
                    <div className="col">
                      <small for="from">To </small>
                      <input
                        type="time"
                        value={friEndTime}
                        onChange={(e) => setFriEndTime(e.target.value)}
                        className="form-control"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="sat"
                  role="tabpanel"
                  aria-labelledby="sat-tab"
                >
                  <label for="exampleInputPassword1">Time Operating</label>
                  <div className="row">
                    <div className="col">
                      <small for="from">From </small>
                      <input
                        type="time"
                        value={satTime}
                        onChange={(e) => setSatTime(e.target.value)}
                        className="form-control"
                        placeholder="First name"
                      />
                    </div>
                    <div className="col">
                      <small for="from">To </small>
                      <input
                        type="time"
                        value={satEndTime}
                        onChange={(e) => setSatEndTime(e.target.value)}
                        className="form-control"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="sun"
                  role="tabpanel"
                  aria-labelledby="sun-tab"
                >
                  <label for="exampleInputPassword1">Time Operating</label>
                  <div className="row">
                    <div className="col">
                      <small for="from">From </small>
                      <input
                        type="time"
                        value={sunTime}
                        onChange={(e) => setSunTime(e.target.value)}
                        className="form-control"
                        placeholder="First name"
                      />
                    </div>
                    <div className="col">
                      <small for="from">To </small>
                      <input
                        type="time"
                        value={sunEndTime}
                        onChange={(e) => setSunEndTime(e.target.value)}
                        className="form-control"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                </div>
                      </div>*/}
            </div>

            {/*<TimeGridScheduler
              classes={classes}
              originDate={new Date("2021-03-22")}
              schedule={schedule}
              onChange={setSchedule}
            />*/}

            {/*
                        <button type="submit" className="btn btn-primary">Next</button>  */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn mt-3 btn-primary"
            >
              Next
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddTime;
