import axios from "axios";

export default axios.create({
    baseURL: "https://tachitool-node.herokuapp.com/login",
    // baseURL: "http://155.138.232.230:3000/login",
})