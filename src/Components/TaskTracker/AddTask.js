import React, { useState, useRef } from "react";
import { db } from "../../Config/firebase-config";
import { Form, Button, ButtonGroup, ToggleButton, Feedback } from "react-bootstrap";

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
  const [priority, setPriority] = useState({
    name: "High",
    value: 1,
    variant: "outline-danger",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleAddTask(taskNameRef, priority);
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    margin: "20px 0",
    padding: "20px",
    backgroundColor: "#ececec",
  };

  return (
    <Form onSubmit={handleSubmit} style={formStyle}>
      <Form.Group>
        <Form.Control type="text" placeholder="Task Name" ref={taskNameRef} maxLength={10} required />
        <Form.Control.Feedback type="invalid">Please enter task name.</Form.Control.Feedback>
      </Form.Group>
      <ButtonGroup>
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
