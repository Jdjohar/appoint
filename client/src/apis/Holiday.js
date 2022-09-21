import axios from "axios";

export default axios.create({
    // baseURL: "http://155.138.232.230:3000/api/v1/business/:id/holiday",
    baseURL:"https://tachitool-node.herokuapp.com/api/v1/business/:id/holiday"
})