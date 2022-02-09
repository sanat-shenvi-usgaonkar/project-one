import React from "react";
import { Button } from "react-bootstrap";
import "../../Pages/TaskTracker/TaskTracker.scss";

export const Header = ({ handleShowAddTask }) => {
  return (
    <div className="Header">
      <h3>Task Manager</h3>
      <Button variant="success" onClick={handleShowAddTask}>
        Add
      </Button>
    </div>
  );
};
