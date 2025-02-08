import ReactMarkdown from "react-markdown";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiCheck, FiCopy } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import React from "react";

function getReactMarkdown(setCopied, index, copied, message) {
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const codeText = String(children).trim();

          return !inline && match ? (
            <div className="relative group">
              <CopyToClipboard text={codeText} onCopy={() => setCopied(index)}>
                <button className="absolute right-2 top-2 bg-gray-700 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {copied === index ? (
                    <FiCheck className="text-green-400" />
                  ) : (
                    <FiCopy />
                  )}
                </button>
              </CopyToClipboard>
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
      {message.text}
    </ReactMarkdown>
  );
}

export default getReactMarkdown;
