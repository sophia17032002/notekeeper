import React from "react";
import { AiOutlinePushpin, AiFillPushpin } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

const NoteCard = ({ note, onClick, onDelete, onPin }) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
      style={{ minHeight: "200px" }}
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{note.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{note.tagline}</p>
      <p className="mt-4 text-base text-gray-700 dark:text-gray-200">{note.body}</p>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          {/* Pin/Unpin Button */}
          <button
            onClick={onPin}
            className="text-xl text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            {note.isPinned ? (
              <AiFillPushpin />
            ) : (
              <AiOutlinePushpin />
            )}
          </button>
          {/* Edit Button */}
          <button
            onClick={onClick}
            className="text-xl text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-300"
          >
            Edit
          </button>
        </div>

        {/* Delete Button */}
        <button
          onClick={onDelete}
          className="text-xl text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
