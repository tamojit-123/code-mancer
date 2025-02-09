import React from "react";

const ChatBotInput = ({ input, setInput, sendMessage }) => {
  return (
    <div className="p-4 bg-gray-200">
      <div className="relative">
        <div className="pr-4">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none w-10 h-10 rounded-full">
              {" "}
              <img
                src="https://img.freepik.com/free-vector/ai-technology-robot-cyborg-illustrations_24640-134419.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        <input
          type="text"
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
