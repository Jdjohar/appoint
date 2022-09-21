import React from "react";

const Logout = () => {

  const handleClick = () => {
    localStorage.removeItem("user-info")
    window.location.reload();
  }

  return <button onClick={handleClick} className="btn btn-warning ml-2">Logout</button>;
};

export default Logout;