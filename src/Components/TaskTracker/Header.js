import React from "react";
import { Button } from "react-bootstrap";
import "../../Pages/TaskTracker/TaskTracker.css";

export const Header = ({ handleShowAddTask }) => {
  return (
    <div className="header">
      <h3>Task Manager</h3>
      <Button variant="success" onClick={handleShowAddTask}>
        Add
      </Button>
    </div>
  );
};
