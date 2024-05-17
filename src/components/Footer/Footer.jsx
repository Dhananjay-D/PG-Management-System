import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <>
      <div className="footerContainer">
        {/* <h1 className="footerHeading">Stay Manager</h1> */}
        <div className="flexContainer">
          <div className="flexchild">
            <h2>About</h2>
            <p className="abtPara">
              Stay Manager simplifies tenant management by providing an
              intuitive platform for storing and organizing client information.
            </p>
          </div>
          <div className="flexchild">
            <h2>Contact Info</h2>
            <p className="abtPara" style={{ paddingBottom: "10px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              +91-8217014312
            </p>
            <p className="abtPara">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Bhagyanagar, Belagavi
            </p>
          </div>

          <div className="flexchild">
            <h2>Have a question?</h2>

            <a
              href="https://wa.me/8217014312"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>Get In Touch </button>
            </a>
          </div>
        </div>
      </div>
      <div className="copy">
        <hr></hr>
      </div>
    </>
  );
}
