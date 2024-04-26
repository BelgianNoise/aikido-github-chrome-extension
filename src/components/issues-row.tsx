import React from "react";
import "./issues-row.css";

const IssuesRow = (props: {
  critical: number;
  high: number;
  medium: number;
  low: number;
}) => {

  return (
    <div className="aik-issues-row">
      <div className="aik-issues-row-item critical">
        <p>{props.critical}</p>
        <p>critical</p>
      </div>
      <div className="aik-issues-row-item high">
        <p>{props.high}</p>
        <p>high</p>
      </div>
      <div className="aik-issues-row-item medium">
        <p>{props.medium}</p>
        <p>medium</p>
      </div>
      <div className="aik-issues-row-item low">
        <p>{props.low}</p>
        <p>low</p>
      </div>
    </div>
  );
};

export default IssuesRow;
