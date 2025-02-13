"use client";

import React, { useState } from "react";

const ChatBotHeader = ({ profilePicture, userName, onSave }) => {
  // <div className="bg-blue-500 text-white p-4 text-center">
  //   <h1 className="text-xl font-semibold">Code Mancer Chatbot</h1>
  // </div>

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSaveClick = () => {
    onSave(inputValue); // Call the onSave function passed from the parent
    setInputValue(""); // Clear the input field after saving
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      {/* Input Field and Save Button */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="text-gray-900 border border-gray-300 rounded-md py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter text here..."
          value={inputValue}
          required
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSaveClick}
        >
          Save
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex items-center space-x-4">
        <img
          src={profilePicture}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-semibold text-gray-800">{userName}</span>
      </div>
    </header>
  );
};

export default ChatBotHeader;
