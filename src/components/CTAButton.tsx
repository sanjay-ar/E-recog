import { Button, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: theme.typography.h4.fontSize,
    padding: theme.spacing(1, 4),
    transition: "all 0.3s ease-in-out",
    position: "relative",
    overflow: "hidden",
    borderRadius: "4px",
    fontWeight: 600,
    letterSpacing: "0.5px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      transform: "translateY(-5px)",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    },
    "&:active": {
      transform: "translateY(0)",
      boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
      transform: "translateX(-100%)",
      transition: "transform 0.6s ease-in-out",
    },
    "&:hover::after": {
      transform: "translateX(100%)",
    },
  },
}));

export default function CTAButton({ children, ...props }: any): JSX.Element {
  const classes = useStyles();

  return (
    <Button className={classes.root} variant="contained" {...props}>
      {children}
    </Button>
  );
}
