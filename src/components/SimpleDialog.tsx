import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dialog: {
    "& .MuiDialog-paper": {
      backgroundColor: "rgba(44, 62, 80, 0.95)",
      backdropFilter: "blur(10px)",
      borderRadius: theme.spacing(2),
      border: "1px solid rgba(236, 240, 241, 0.1)",
      color: "#ECF0F1",
    }
  },
  dialogTitle: {
    borderBottom: "1px solid rgba(236, 240, 241, 0.1)",
    "& .MuiTypography-root": {
      fontWeight: 600,
    }
  },
  dialogContent: {
    padding: theme.spacing(3),
  },
  dialogActions: {
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(236, 240, 241, 0.1)",
  },
  button: {
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1, 3),
    textTransform: "none",
    fontSize: "1rem",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 5px 10px rgba(0,0,0,0.2)",
    },
  },
  primaryButton: {
    backgroundColor: theme.palette.primary.main,
    color: "#ECF0F1",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  secondaryButton: {
    color: "#BDC3C7",
    "&:hover": {
      backgroundColor: "rgba(189, 195, 199, 0.1)",
    },
  }
}));

export type SimpleDialogProps = {
  header: string;
  body: React.ReactNode;
  primaryAction: Function;
  primaryActionText: string;
  secondaryAction?: Function;
  secondaryActionText?: string;
  open: boolean;
  handleClose: () => void;
};

export default function SimpleDialog({
  header,
  body,
  primaryAction,
  primaryActionText,
  secondaryAction,
  secondaryActionText,
  open,
  handleClose,
}: SimpleDialogProps): JSX.Element {
  const classes = useStyles();

  return (
    <div>
      <Dialog 
        open={open} 
        onClose={handleClose}
        className={classes.dialog}
      >
        <DialogTitle className={classes.dialogTitle}>{header}</DialogTitle>
        <DialogContent className={classes.dialogContent}>{body}</DialogContent>
        <DialogActions className={classes.dialogActions}>
          {!!secondaryAction && !!secondaryActionText && (
            <Button
              onClick={() => {
                secondaryAction();
                handleClose();
              }}
              className={`${classes.button} ${classes.secondaryButton}`}
            >
              {secondaryActionText}
            </Button>
          )}
          <Button
            onClick={() => {
              primaryAction();
              handleClose();
            }}
            className={`${classes.button} ${classes.primaryButton}`}
            autoFocus
          >
            {primaryActionText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
