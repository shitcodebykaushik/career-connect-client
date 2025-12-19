import React from 'react'
import Inputfield from '../components/Inputfield'
const EmploymentType = ({handleChange}) => {
  return (
    <div>
    <h4 className="text-lg font-medium mb-2">Type of Employment</h4>

    <div>
      <label className="sidebar-label-container">
        <input
          type="radio"
          name="test"
          id="test"
          value=""
          onChange={handleChange}
        />
        <span className="checkmark"></span>Any experience
      </label>
      <Inputfield
        handleChange={handleChange}
        value="full-time"
        title="Full-Time"
        name="test"
      />
      <Inputfield
        handleChange={handleChange}
        value="temporary"
        title="Temporary"
        name="test"
      />
      <Inputfield
        handleChange={handleChange}
        value="part-time"
        title="Part-Time"
        name="test"
      />
    </div>
  </div>
  )
}

export default EmploymentType
