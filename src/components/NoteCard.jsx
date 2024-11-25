import React from "react";
import { AiOutlinePushpin, AiFillPushpin } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

const NoteCard = ({ note, onClick, onDelete, onPin }) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex flex-col justify-between"
      style={{ minHeight: "200px" }} // Ensures a minimum height
      onClick={onClick} // Trigger modal open only when the card itself is clicked
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white break-words">
        {note.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 break-words">
        {note.tagline}
      </p>
      <p className="mt-4 text-base text-gray-700 dark:text-gray-200 break-words">
        {note.body}
      </p>

      <div className="flex justify-between items-center mt-4">
        {/* Pin/Unpin Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the parent's onClick
            onPin();
          }}
          className="text-xl text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          {note.isPinned ? <AiFillPushpin /> : <AiOutlinePushpin />}
        </button>

        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the parent's onClick
            onDelete();
          }}
          className="text-xl text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
