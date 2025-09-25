import React, { useState, useEffect } from "react";
import "./Timezone.css";

const TimeZoneDisplay = ({ dataTimestamp }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (timestamp, timeZone) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone,
    }).format(new Date(timestamp));
  };

  const displayTimestamp = dataTimestamp || new Date().toISOString();

  return (
    <div className="timezone">
      <p>
        <strong>Your Time Zone:</strong> {userTimeZone}
      </p>
      <p>
        <strong>Current Date:</strong> {formatDate(currentDate, userTimeZone)}
      </p>
      <p>
        <strong>UTC: </strong>
        {formatDate(displayTimestamp, "UTC")}
      </p>
    </div>
  );
};

export default TimeZoneDisplay;
