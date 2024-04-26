import React from "react";
import "./score-ometer.css";

const ScoreOmeter = (props: {
  score: number;
}) => {
  return <div className="score-ometer-main-container">
    <div className="ometer-container">
      <div className="ometer-ring"></div>
      <div className="ometer-pointer-container"
        style={{ transform: `rotate(${props.score * 1.8}deg)` }}
      >
        <div className="ometer-pointer"></div>
      </div>
      <p>{props.score}</p>
    </div>
    <p>max severity</p>
  </div>;
}

export default ScoreOmeter;
