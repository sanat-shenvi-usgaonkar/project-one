import React, { useState, useEffect } from "react";
import { db } from "../../Config/firebase-config";
import { collection, getDocs, addDoc, firebase } from "firebase/firestore";
import { v4 as uuid4 } from "uuid";
import { Header, AddTask, TaskList } from "../../Components";
import "./TaskTracker.css";

const taskDetailsRef = collection(db, "Tasks");

export const TaskTracker = () => {
  const [taskDetails, setTaskDetails] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const handleTaskDetails = (updatedTaskDetails) => setTaskDetails(updatedTaskDetails);
  const handleShowAddTask = () => setShowAddTask(!showAddTask);

  const handleAddTask = async (taskNameRef, priority) => {
    const newTaskDetails = {
      id: uuid4(),
      completed: false,
      task_name: taskNameRef.current.value,
      priority: priority.name,
      created_date: new Date(),
    };
    debugger;
    await addDoc(taskDetailsRef, newTaskDetails);
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
      {showAddTask && <AddTask handleAddTask={handleAddTask} />}
      <TaskList taskDetails={taskDetails} handleTaskDetails={handleTaskDetails} />
    </div>
  );
};
