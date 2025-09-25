import React from "react";
import TimeZoneDisplay from "./Timezone.jsx";
import "./Footer.css";

function Footer() {
  return (
    <footer className="foot">
      <TimeZoneDisplay />
      <p>© 2024 TripVoyage. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
