import axios from "axios";

export default axios.create({
    baseURL: "https://tachitool-node.herokuapp.com/api/v1/business/appointment/:id",
    // baseURL: "http://155.138.232.230:3000/api/v1/business/appointment/:id",
})