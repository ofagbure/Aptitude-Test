import React from "react";

function Footer() {
  return (
    <footer style={{ 
      position: "fixed",
      left: "0",
      bottom: "0",
      width: "100%",
      background: "linear-gradient(45deg, rgba(255,255,255,1) 25%, rgba(0,172,255,0) 50%)"
    }}>
        <span>
          <h5 style={{
            margin: "10px",
          }}>Choober ™</h5>
        </span>
    </footer>
  );
}

export default Footer;