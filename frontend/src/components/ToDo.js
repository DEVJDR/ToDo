import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IconButton } from "@mui/material";

const ToDo = ({ text, updateMode, deleteToDo }) => {
  return (
    <div className="todo">
      <div className="text">{text}</div>
      <div className="icons">
        <IconButton onClick={updateMode}>
          <FaEdit className="icon" />
        </IconButton>
        <IconButton onClick={deleteToDo}>
          <FaTrash className="icon" />
        </IconButton>
      </div>
    </div>
  );
};

export default ToDo;
