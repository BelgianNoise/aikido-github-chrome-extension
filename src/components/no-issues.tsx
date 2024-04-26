import React from "react";
import "./not-logged-in.css";

const NoIssues = () => {
  return (
    <div className="aik-no-issues-container">
      <div className="aik-no-issues-icon-container">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#6551F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#6551F3" strokeWidth="1.5" strokeLinecap="round"></path>
        </svg>
      </div>
      <p>No code vulnerabilities found!</p>
    </div>
  );
};

export default NoIssues;
