import React from "react";
import ReactMarkdown from "react-markdown";
import { FiCopy, FiCheck } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CustomCodeMarkDown = ({ setCopied, index, copied, message }) => {
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
            <div className="p-5">
              <div className="relative group border border-gray-600 rounded-lg overflow-hidden">
                <button
                  data-copy-to-clipboard-target="code-block"
                  data-copy-to-clipboard-content-type="innerHTML"
                  data-copy-to-clipboard-html-entities="true"
                  onClick={() => handleCopy(codeText, index)}
                  className="absolute right-0 p-4 text-gray-900 dark:text-gray-400 m-0.5 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center bg-white border-gray-200 border h-8"
                >
                  {copied === index ? (
                    <FiCheck className="text-green-400" />
                  ) : (
                    <FiCopy />
                  )}
                </button>
                <div className="p-1">{match[1]}</div>
                <div className="pt-1">
                  <SyntaxHighlighter
                    language={match[1]}
                    style={materialOceanic}
                  >
                    {codeText}
                  </SyntaxHighlighter>
                </div>
              </div>
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
};

export default CustomCodeMarkDown;
