import React, { useState, useRef } from "react";
import { Form, Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import "../../Pages/TaskTracker/TaskTracker.scss";

const priorities = [
  {
    name: "High",
    value: 1,
    variant: "outline-danger",
  },
  {
    name: "Medium",
    value: 2,
    variant: "outline-success",
  },
  {
    name: "Low",
    value: 3,
    variant: "outline-primary",
  },
];

export const AddTask = ({ handleAddTask }) => {
  const taskNameRef = useRef(null);
  const [priority, setPriority] = useState(priorities[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;

    handleAddTask(taskNameRef, priority);
    setPriority(priorities[0]);
    taskNameRef.current.value = "";
  };

  // const formStyle = {
  //   display: "flex",
  //   flexDirection: "column",
  //   gap: "20px",
  //   margin: "20px 0",
  //   padding: "20px",
  //   backgroundColor: "#ececec",
  // };

  return (
    <Form onSubmit={handleSubmit} className="TaskList">
      <Form.Group>
        <Form.Control type="text" placeholder="Task Name" ref={taskNameRef} maxLength={50} required />
        <Form.Control.Feedback type="invalid">Please enter task name.</Form.Control.Feedback>
      </Form.Group>
      <ButtonGroup className="Priority">
        {priorities.map((prty, index) => (
          <ToggleButton
            key={index}
            id={`radio-${index}`}
            type="radio"
            variant={prty.variant}
            name="radio"
            value={prty.value}
            checked={prty.value === priority.value}
            onChange={() => setPriority({ ...prty })}
          >
            {prty.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
};
