import React from "react";
import Button from "./Button";
import Inputfield from "../components/Inputfield";
const Salary = ({ handleChange, handleClick }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Salary</h4>
      <div className="mb-2">
        <Button onClickHandler={handleClick} value="" title="Hourly" />
        <Button onClickHandler={handleClick} value="Monthly" title="Monthly" />
        <Button onClickHandler={handleClick} value="Yearly" title="Yearly" />
      </div>
      <div>
        <label className="sidebar-label-container">
          <input type="radio" name="test2"  value="" onChange={handleChange} />
          <span className="checkmark"></span>All
        </label>
        
        <Inputfield
          handleChange={handleChange}
          value={30}
          title="<3000k"
          name="test2"
        />
        <Inputfield
          handleChange={handleChange}
          value={50}
          title="<5000k"
          name="test2"
        />
        <Inputfield
          handleChange={handleChange}
          value={80}
          title="<8000k"
          name="test2"
        />
        <Inputfield
          handleChange={handleChange}
          value={100}
          title="<10000k"
          name="test2"
        />
      </div>
    </div>
  );
};

export default Salary;
