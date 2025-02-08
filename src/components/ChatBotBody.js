import ChatThinking from "@/components/ChatThinking";
import React from "react";
import getReactMarkdown from "@/utils/displayUtils";

const ChatBotBody = ({
  chatContainerRef,
  messages,
  setCopied,
  copied,
  loading,
}) => {
  return (
    <>
      {/* Chat Body */}
      <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${message.sender === "user" ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block rounded-lg p-2 ${message.sender === "user" ? "bg-blue-200 text-gray-800" : "bg-gray-200 text-gray-800"}`}
            >
              {message.sender === "bot" &&
              message.structured &&
              message.structured.summary ? (
                <>
                  <b>Summary:</b> {message.structured.summary}
                  <br />
                  {getReactMarkdown(setCopied, index, copied, message)}
                </>
              ) : (
                <>{getReactMarkdown(setCopied, index, copied, message)}</>
              )}
              {message.isError && <div className="error-message">Error</div>}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-left">
            <ChatThinking />
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBotBody;
