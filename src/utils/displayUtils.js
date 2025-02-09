import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { FiCopy, FiCheck } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function getReactMarkdown(setCopied, index, copied, message) {
  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(index);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className = "", children, ...props }) {
          console.log("Code Block Class:", className); // Debugging output

          const match = /language-(\w+)/.exec(className);
          const codeText = String(children).trim();

          return !inline && match ? (
            <div className="relative group border border-gray-600 rounded-lg overflow-hidden">
              <button
                onClick={() => handleCopy(codeText, index)}
                className="absolute right-2 top-2 bg-gray-700 text-white p-2 rounded"
              >
                {copied === index ? (
                  <FiCheck className="text-green-400" />
                ) : (
                  <FiCopy />
                )}
              </button>
              <SyntaxHighlighter language={match[1]} style={materialDark}>
                {codeText}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {message?.text || ""}
    </ReactMarkdown>
  );
}

export default getReactMarkdown;
