import React, { useEffect } from "react";

const Alert = (props) => {
  const { msg, type } = props.alert;

  useEffect(() => {
    const timeOut = setTimeout(() => {
      props.removeAlert();
    }, 3000);
    return () => clearTimeout(timeOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.items]);

  return (
    <header className="alert">
      <p className={type === "success" ? "alert-success" : "alert-danger"}>
        {msg}
      </p>
    </header>
  );
};

export default Alert;
