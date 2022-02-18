import React, { useState, useRef } from "react";
import { db } from "../../Config/firebase-config";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Table } from "react-bootstrap";

import { TiDelete } from "react-icons/ti";
import { BiEdit, BiCheck } from "react-icons/bi";
import { Loader, EmptyList } from "../../Components";
import utils from "../../utility/utils";

const disableCtrlStyle = {
  opacity: "0.5",
  pointerEvents: "none",
};

export const TaskList = ({ taskDetails, handleTaskDetails, isLoading }) => {
  const [priority, setPriority] = useState("High");
  const [selectedTaskIdToEdit, setSelectedTaskIdToEdit] = useState(null);
  const taskNameRef = useRef(null);

  const updateTaskPriority = (e) => {
    setPriority(e.target.value);
  };

  const handleTaskNameChange = () => {
    utils.validateInputAndAddStyle(taskNameRef);
  };

  const handleUpdateTaskDetails = async (action, taskId) => {
    if (!utils.isFormValid) {
      return false;
    }

    const task = doc(db, "Tasks", taskId);
    let updatedTask = [];

    switch (action) {
      case "updateTaskStatus":
        updatedTask = taskDetails.map((task) => {
          if (task.id === taskId) {
            task.completed = !task.completed;
          }
          return task;
        });
        break;

      case "updateTaskDetails":
        updatedTask = taskDetails.map((task) =>
          task.id === taskId
            ? {
                ...task,
                ...{
                  task_name: taskNameRef.current.value,
                  priority,
                  completed: task.completed,
                },
              }
            : task
        );
        break;
      
      default:
        break;
    }

    handleTaskDetails(updatedTask); // update the task details on UI
    setSelectedTaskIdToEdit(null); // reset edit

    // Firebase update query
    await updateDoc(
      task,
      updatedTask.find((task) => task.id === taskId)
    );
  };

  const deleteTask = async (taskId) => {
    const task = doc(db, "Tasks", taskId);
    const updatedTaskList = taskDetails.filter((task) => task.id !== taskId);
    handleTaskDetails(updatedTaskList);
    await deleteDoc(task);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : !taskDetails.length ? (
        <EmptyList />
      ) : (
        <Table striped bordered hover responsive="sm" style={{ margin: "20px 0 0 0" }}>
          <thead>
            <tr>
              <th>#</th>
              <th style={{ width: "80%" }}>Task Name</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {taskDetails.map((task) => {
              return (
                <tr key={task.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleUpdateTaskDetails("updateTaskStatus", task.id)}
                      disabled={selectedTaskIdToEdit === task.id}
                    />
                  </td>
                  <td>
                    {selectedTaskIdToEdit === task.id ? (
                      <input
                        type="text"
                        defaultValue={task.task_name}
                        ref={taskNameRef}
                        style={{ width: "100%" }}
                        onChange={handleTaskNameChange}
                      />
                    ) : (
                      <label
                        style={{
                          textDecoration: task.completed ? "line-through" : "none",
                        }}
                      >
                        {task.task_name}
                      </label>
                    )}
                  </td>
                  <td align="center">
                    {selectedTaskIdToEdit === task.id ? (
                      <select defaultValue={task.priority} onChange={updateTaskPriority}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    ) : (
                      task.priority
                    )}
                  </td>
                  <td align="center">
                    {selectedTaskIdToEdit === task.id ? (
                      <BiCheck onClick={() => handleUpdateTaskDetails("updateTaskDetails", task.id)} />
                    ) : (
                      <div style={task.completed ? disableCtrlStyle : {}}>
                        <BiEdit onClick={() => setSelectedTaskIdToEdit(task.id)} />
                        <TiDelete onClick={() => deleteTask(task.id)} />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};
