import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/common/Landing.css";

const Landing = () => {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      history.push({
        pathname: "/login",
      });
    }, 4000);
  }, []);

  return (
    <div className="landing-page">
      <div>BUUR</div>
      <div className="header">
        <svg
          className="waves"
          xmlns="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
            <use
              href="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,255,255,0.5)"
            />
            <use
              href="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,255,0.3)"
            />
            <use href="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
      <div className="content"></div>
      <div className="bubble beer-bubble1"></div>
      <div className="bubble beer-bubble2"></div>
      <div className="bubble beer-bubble3"></div>
      <div className="bubble beer-bubble4"></div>
      <div className="bubble beer-bubble5"></div>
    </div>
  );
};

export default Landing;
