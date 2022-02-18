import React, { useState, useEffect } from "react";
import { db } from "../../Config/firebase-config";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import Collapse from "react-bootstrap/Collapse";

import { Header, AddTask, TaskList } from "../../Components";
import "./TaskTracker.scss";
import utils from "../../utility/utils";

const taskDetailsRef = collection(db, "Tasks");

export const TaskTracker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [taskDetails, setTaskDetails] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleTaskDetails = (updatedTaskDetails) => setTaskDetails( utils.sortPriority(updatedTaskDetails));
  const handleShowAddTask = () => setShowAddTask(!showAddTask);
  const handleDateFilter = (date) => {
    setStartDate(date);
  };
  const handleAddTask = async (taskNameRef, priority) => {
    const newTaskDetails = {
      completed: false,
      task_name: taskNameRef.current.value,
      priority: priority.name,
      created_date: new Date().setHours(0, 0, 0, 0),
    };

    const response = await addDoc(taskDetailsRef, newTaskDetails);
    newTaskDetails["id"] = response.id;
    const sortedList = utils.sortPriority([...taskDetails, newTaskDetails])
    setTaskDetails(sortedList);
    setShowAddTask(false);
  };
  const getTaskDetails = async () => {
    const qry = query(taskDetailsRef, where("created_date", "==", startDate.setHours(0, 0, 0, 0)));
    const data = await getDocs(qry);
    return utils.sortPriority(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    (async () => {
      setTaskDetails(await getTaskDetails());
      setIsLoading(false);
    })();
  }, [startDate]);

  return (
    <div className="Container">
      <Header handleShowAddTask={handleShowAddTask} startDate={startDate} handleDateFilter={handleDateFilter} />
      <Collapse in={showAddTask} style={{ transition: "300ms" }}>
        <div>
          <AddTask handleAddTask={handleAddTask} />
        </div>
      </Collapse>
      <TaskList taskDetails={taskDetails} handleTaskDetails={handleTaskDetails} isLoading={isLoading} />
    </div>
  );
};
