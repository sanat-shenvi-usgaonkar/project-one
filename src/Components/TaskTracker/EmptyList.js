import React from "react";
import "../../Pages/TaskTracker/TaskTracker.scss";

 
export const EmptyList = () => {
  return (
    <div className="empty-list">
      <img src={require("../../Assets/Images/empty-list.png")} alt="empty-list"/>
    </div>
  );
};
