import React, { useEffect, useState } from "react"
import AddServices from '../apis/AddServices';
import { useHistory, useParams } from "react-router-dom";

const AddService = () => {

  let history = useHistory();
  let {id} = useParams();
  // const [servicename, setservicename] = useState("");
  // const [servicecost, setservicecost] = useState("");
  // const [servicetime, setservicetime] = useState("");

  const [inputList, setInputList] = useState([{ serviceName: "", serviceTime: "", serviceCost: ""}]);

  const handleInputChange = (e, index) => {
    const {name, value} = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, {serviceName: "", serviceTime: "", serviceCost: "" }])
  };

  const handleRemoveClick = index => {
    const list = [...inputList];
    console.log(index);
    list.splice(index, 1);
    setInputList(list);
  }
  // const [weektime_id, setweektime_id] = useState("");
  // const [business_id, setbusiness_id] = useState("");
//   const postData = {
//     serviceName,
//     serviceCost,
//     serviceTime
// }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      // const response = await fetch("http://155.138.232.230:3000/api/v1/business/:id/services", {
      //   method: "POST",
      //   body: JSON.stringify(postData),
      //   headers: {
      //     "Content-type": "Application/json"
      //   }
      // })
    const response = await AddServices.post("/", {
      inputList,
      id
      });
    history.push(`/dashboard`);
    console.log(response);
    }catch (err) {

    }

  }

    return (
        <div className="Services">
        
          <h6 className="mb-0">Do you offer your services at your location or at the customers location?</h6>

                <div className="custom-control custom-radio custom-control-inline pb-3">
                    <input type="radio" id="customRadioInline1" name="customRadioInline1" className="custom-control-input" />
                    <label className="custom-control-label" for="customRadioInline1">Services offered at Merchant location</label>
                </div>

                <div class="custom-control custom-radio custom-control-inline py-2">
                        <input type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" />
                        <label class="custom-control-label" for="customRadioInline2">Services offered at Customers location</label>
                </div>

                <h5 className="pt-3" >Enter services with cost and duration</h5>

{inputList.map((input, i) => {
  return (
    <form  >
        <div className="form-group col-12">
            <label>Service {i+1}</label>
            <input
            name="serviceName"
            value={input.serviceName}
            onChange={(e) => handleInputChange(e, i)}
            type="text"
            className="form-control"
            id="businessname"
            placeholder="Service Name" />
        </div>
        <div className="form-group  col-12">
            <label className="sr-only" for="inlineFormInputGroupTime">Cost</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">Price</div>
              </div>
              <input
              name="serviceCost"
              value={input.serviceCost}
              onChange={(e) => handleInputChange(e, i)}
              type="text"
              className="form-control"
              id="inlineFormInputGroupTime"
              placeholder="In Your Currency" />
            </div>
        </div>


     <div id="city-div" className="form-group col-12">
          <label>Service Time</label>
            <div className="input-group">

              <input
              name="serviceTime"
               value={input.serviceTime}
               onChange={(e) => handleInputChange(e, i)}
              type="text"
              className="form-control"
              id="inlineFormInputGroupUsername"
              placeholder="Time in Minutes" />
            </div>
    </div>
    <div className="add-new-service">
      { inputList.length !== 1 && <button type="button" className="btn btn-danger mb-2" onClick={()=>handleRemoveClick(i)}>Remove</button>}
    </div>
    <div className="add-new-service">
      {inputList.length - 1 === i && <button type="button" className="btn btn-primary" onClick={handleAddClick}>Add</button>}
    </div>
    

</form>
  )
})}

<div className="col-12 pt-5 text-center">
<button className="btn btn-secondary mr-2" onClick={() => {history.goBack()}} >Back</button>
<button className="btn btn-secondary mr-2" onClick={() => {history.push('/dashboard')}}>Skip</button>
<button type="submit" onClick={handleSubmit} class="btn btn-secondary" >Submit</button>
</div>

        </div>
    )
}

export default AddService