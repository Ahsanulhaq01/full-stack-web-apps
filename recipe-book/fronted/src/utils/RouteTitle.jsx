import React, { useEffect } from "react";
import { useLocation } from "react-router";

function RouteTitle() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace("/", "");

    const title =
      path === "" ? "home" : path.charAt(0).toUpperCase() + path.slice(1);

    document.title = `${title}`;
  }, [location]);
  return null;
}

export default RouteTitle;
