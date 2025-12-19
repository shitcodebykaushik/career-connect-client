import React from "react";
import Inputfield from "../components/Inputfield";
const WorkExperience = ({handleChange}) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Work Experience</h4>

      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test"
            id="test"
            value=""
            onChange={handleChange}
          />
          <span className="checkmark"></span>Any Experience
        </label>
        <Inputfield
          handleChange={handleChange}
          value="internship"
          title="Internship"
          name="test"
        />
        <Inputfield
          handleChange={handleChange}
          value="work remotely"
          title="Work remotely"
          name="test"
        />
      </div>
    </div>
  );
};

export default WorkExperience;
