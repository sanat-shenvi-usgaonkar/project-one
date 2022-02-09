import React, { useState, useEffect } from "react";
import { db } from "../../Config/firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Collapse from "react-bootstrap/Collapse";

import { Header, AddTask, TaskList } from "../../Components";
import "./TaskTracker.scss";

const taskDetailsRef = collection(db, "Tasks");

export const TaskTracker = () => {
  const [taskDetails, setTaskDetails] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const handleTaskDetails = (updatedTaskDetails) => setTaskDetails(updatedTaskDetails);
  const handleShowAddTask = () => setShowAddTask(!showAddTask);

  const handleAddTask = async (taskNameRef, priority) => {
    const newTaskDetails = {
      completed: false,
      task_name: taskNameRef.current.value,
      priority: priority.name,
      created_date: new Date(),
    };

    const response = await addDoc(taskDetailsRef, newTaskDetails);
    newTaskDetails["id"] = response.id;
    setTaskDetails([...taskDetails, newTaskDetails]);
    setShowAddTask(false);
  };

  useEffect(() => {
    (async () => {
      setTaskDetails(await getTaskDetails());
    })();
  }, []);

  const getTaskDetails = async () => {
    const data = await getDocs(taskDetailsRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  };

  return (
    <div className="Container">
      <Header handleShowAddTask={handleShowAddTask} />
      <Collapse in={showAddTask} style={{ transition: "300ms" }}>
        <div>
          <AddTask handleAddTask={handleAddTask} />
        </div>
      </Collapse>
      <TaskList taskDetails={taskDetails} handleTaskDetails={handleTaskDetails} />
    </div>
  );
};
