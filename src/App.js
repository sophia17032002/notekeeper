import React, { useState, useEffect } from "react";
import NoteCard from "./components/NoteCard"; 
import { AiOutlineBulb } from "react-icons/ai"; // Bulb Icon
import { BsMoon, BsSun } from "react-icons/bs"; // Moon and Sun Icons
import "animate.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: "",
    tagline: "",
    body: "",
    isPinned: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editIndex, setEditIndex] = useState(null);

  const notesPerPage = 6;

  // Load notes from localStorage on app start
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  // Toggle between dark and light mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  // Handle adding a new note
  const handleAddNote = () => {
    if (newNote.title.trim() === "" || newNote.body.trim() === "") {
      alert("Title and Body cannot be empty!");
      return;
    }
    setNotes([...notes, newNote]);
    setNewNote({ title: "", tagline: "", body: "", isPinned: false });
  };

  const handleEditNote = (index) => {
    setEditIndex(index);
    setNewNote(notes[index]); // Load the selected note for editing
    setIsModalOpen(true);
  };

  const handleUpdateNote = () => {
    if (newNote.title.trim() === "" || newNote.body.trim() === "") {
      alert("Note cannot be empty!");
      return;
    }

    const updatedNotes = [...notes];
    updatedNotes[editIndex] = newNote; // Update the edited note
    setNotes(updatedNotes); // Save updated notes
    setIsModalOpen(false);
    setNewNote({ title: "", tagline: "", body: "", isPinned: false });
    setEditIndex(null);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const handlePinNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].isPinned = !updatedNotes[index].isPinned;

    // Sort notes: pinned notes should come first
    updatedNotes.sort((a, b) => b.isPinned - a.isPinned);

    setNotes(updatedNotes);
  };

  // Sort the notes to show pinned notes on top
  const sortedNotes = [...notes].sort((a, b) => b.isPinned - a.isPinned);

  // Calculate the notes to display on the current page
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = sortedNotes.slice(indexOfFirstNote, indexOfLastNote);

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get total pages
  const totalPages = Math.ceil(sortedNotes.length / notesPerPage);

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gradient-to-r from-[#ada996] via-[#f2f2f2] to-[#dbdbdb] dark:bg-gradient-to-r dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364] transition-all ease-in-out duration-500">
      {" "}
      <div className="flex justify-between items-center w-full max-w-4xl mb-8">
        <h1 className="text-3xl font-bold text-customOrange animate__animated animate__fadeIn animate__delay-1s">
          KeepNotes{" "}
        </h1>
        <button
          className="text-2xl text-white transform hover:scale-125 transition-all duration-300"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? (
            <BsSun className="text-yellow-500" />
          ) : (
            <BsMoon className="text-gray-800" />
          )}
        </button>
      </div>
      <AiOutlineBulb className="inline-block text-yellow-400 text-6xl ml-2" />
      {notes.length === 0 ? (
        <p className="text-lg font-bold italic mb-8 text-customOrange animate__animated animate__fadeIn animate__delay-1s">
          Notes that you add will appear here.
        </p>
      ) : (
        <p className="text-lg italic font-bold mb-8 text-customOrange animate__animated animate__fadeIn animate__delay-1s">
          Your Notes
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {currentNotes.map((note, index) => (
          <NoteCard
            key={index}
            note={note}
            onClick={() => handleEditNote(index + indexOfFirstNote)} 
            onDelete={() => handleDeleteNote(index + indexOfFirstNote)} 
            onPin={() => handlePinNote(index + indexOfFirstNote)} 
          />
        ))}
      </div>
      <div className="flex gap-4 mt-8 w-full max-w-4xl">
        <input
          type="text"
          className="p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-800 dark:text-white"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <input
          type="text"
          className="p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-800 dark:text-white"
          placeholder="Tagline"
          value={newNote.tagline}
          onChange={(e) => setNewNote({ ...newNote, tagline: e.target.value })}
        />
        <textarea
          className="p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-800 dark:text-white"
          placeholder="Body"
          value={newNote.body}
          onChange={(e) => setNewNote({ ...newNote, body: e.target.value })}
        />
        <button
          className="bg-green-500 text-white p-3 rounded-lg transform hover:scale-110 transition-all duration-300"
          onClick={handleAddNote}
        >
          Add Note
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full animate__animated animate__fadeIn animate__delay-1s dark:bg-gray-800 dark:text-white">
            <h2 className="text-2xl mb-4">Edit Your Note</h2>
            <input
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-800 dark:text-white"
              placeholder="Title"
              value={newNote.title}
              onChange={(e) =>
                setNewNote({ ...newNote, title: e.target.value })
              }
            />
            <input
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-800 dark:text-white"
              placeholder="Tagline"
              value={newNote.tagline}
              onChange={(e) =>
                setNewNote({ ...newNote, tagline: e.target.value })
              }
            />
            <textarea
              className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-800 dark:text-white"
              placeholder="Body"
              value={newNote.body}
              onChange={(e) => setNewNote({ ...newNote, body: e.target.value })}
            />
            <div className="flex justify-end gap-4">
              <button
                className="bg-blue-500 text-white p-3 rounded-lg transform hover:scale-105 transition-all duration-300"
                onClick={handleUpdateNote}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white p-3 rounded-lg transform hover:scale-105 transition-all duration-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center w-full max-w-4xl mt-8">
        <button
          className="bg-blue-500 text-white p-2 rounded-lg"
          onClick={() => paginate(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded-lg"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded-lg"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded-lg"
          onClick={() => paginate(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default App;
