import React from "react";

const ChatBotInput = ({ input, setInput, sendMessage }) => {
  return (
    <div className="p-4 bg-gray-200">
      <div className="relative">
        <input
          type="search"
          id="search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ask AI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          required
        />
        <button
          type="submit"
          onClick={sendMessage}
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default ChatBotInput;
