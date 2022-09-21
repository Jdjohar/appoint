import React from "react";
import {Switch, Route } from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";
import Home from "./routes/Home";
import AddServices from "./routes/AddServices";
import AddTiming from "./routes/AddTimeing";
import Icsexport from "./routes/Icsexport";
import Loginpage from "./routes/Login"
import BusinessDetail from "./routes/BusinessDetail";
import Dashboard from "./routes/Dashboard";
import AppointmentBooking from "./routes/AppointmentBooking";
import Holiday from "./routes/Holiday";
import { BusinessContextProvider } from "./context/BusinessContext";
import "../src/path/style.css"
import SignupPage from "./routes/Signup";
import EmbedLogin from "./routes/EmbedLogin";
import ProtectedRoute from "./routes/ProtectedRoute";
import Appointmentcalendar from "./routes/AppointmentCalendar";


const App = () => {
    return (
        <BusinessContextProvider>
 <div className="container py-5">
        <div className="row">
            
        <Router>
        <Switch>  
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/business/:id/time" component={AddTiming} />
            <Route exact path="/business/:id" component={BusinessDetail} />
            <ProtectedRoute exact path="/business/:id/services" component={AddServices} />
            <Route exact path="/business/:id/holiday" component={Holiday} />
            <Route exact path="/business/:id/icsexport" component={Icsexport} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <Route exact path="/login" component={Loginpage} />
            <Route exact path="/appointmentbooking/:id" component={AppointmentBooking} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/embedlogin" component={EmbedLogin} />
            <Route exact path="/appointmentcalendar/:id" component={Appointmentcalendar} />
        </Switch>
        </Router>
       
        </div>
    </div>
        </BusinessContextProvider>
       
    );
};

export default App;     