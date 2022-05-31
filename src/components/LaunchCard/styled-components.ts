import { styled } from "@stitches/react";

export const CardContainer = styled("div", {
  width: "30%",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  flexDirection: "column",
  padding: ".5rem",
  margin: ".75rem",
  borderRadius: "4px",
  boxShadow: "rgba(0, 0, 0, 0.35) 0 5px 15px",

  "& img": {
    maxWidth: "320px",
    maxHeight: "240px"
  }
});