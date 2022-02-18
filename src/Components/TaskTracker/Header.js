import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../Pages/TaskTracker/TaskTracker.scss";


const addBtnStyle = {
  padding: "4px 15px"
}
export const Header = ({ handleShowAddTask, startDate, handleDateFilter }) => {
  return (
    <div className="Header">
      <h3>Task Manager</h3>
      <div>
        <DatePicker selected={startDate} onChange={(date) => handleDateFilter(date)} showMonthYearDropdown />
        <Button variant="success" onClick={handleShowAddTask} style={addBtnStyle}>
          Add
        </Button>
      </div>
    </div>
  );
};
