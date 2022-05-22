import React from "react";
import { Link } from "@mui/material";
import logo from "../assets/logo.png";
import { ResponsiveContext } from "./ResponsiveContext";
import configData from "../config/config.json";

function AppLogo({ logoPadding = "10px 10px 10px 0px" }) {
  const { isMobileView } = React.useContext(ResponsiveContext);

  return (
    <Link
      href={configData.routes.home}
      style={{
        textDecoration: "none",
        padding: logoPadding,
        cursor: "pointer",
      }}
    >
      <img
        src={logo}
        alt="Logo"
        height={isMobileView ? "16px" : "18px"}
        width={isMobileView ? "78px" : "110px"}
        style={{ paddingLeft: 0, margin: isMobileView ? "0 6px 0 6px" : 0 }}
      />
    </Link>
  );
}

export default AppLogo;
