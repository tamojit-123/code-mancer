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
              className={`${message.sender === "user" ? "inline-flex justify-end w-full" : "inline-flex items-center justify-center w-full"}`}
            >
              {message.sender === "user" && (
                <div className="pr-4">
                  <div className="relative">
                    <img
                      className="w-10 h-10 rounded-full"
                      src="data:image/jpeg;base64,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"
                      alt=""
                    />
                    <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                  </div>
                </div>
              )}
              <div
                className={`inline-block rounded-lg p-2 ${message.sender === "user" ? "bg-blue-200 text-gray-800" : "max-w-[80%] text-gray-800"}`}
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
