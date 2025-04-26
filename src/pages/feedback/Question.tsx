import { Box, Typography, makeStyles, Paper } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { Star } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  questionBox: {
    backgroundColor: "#f8fafc",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    border: "1px solid #e2e8f0",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#f1f5f9",
      borderColor: "#cbd5e1",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    },
  },
  question: {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "#2c3e50",
    marginBottom: theme.spacing(3),
    display: "flex",
    alignItems: "center",
  },
  stars: {
    fontSize: "2.5rem",
    color: "#f1c40f", // Yellow color for stars
    "& .MuiRating-iconFilled": {
      color: "#f1c40f",
    },
    "& .MuiRating-iconEmpty": {
      color: "#e2e8f0",
    },
  },
  label: {
    fontSize: "1rem",
    color: "#7f8c8d",
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 500,
  },
  required: {
    color: "#e74c3c",
    fontSize: "1.25rem",
    marginLeft: theme.spacing(1),
    fontWeight: 600,
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2, 0),
  },
  ratingLabels: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: theme.spacing(2),
    padding: theme.spacing(0, 2),
  },
  ratingLabel: {
    fontSize: "0.75rem",
    color: "#7f8c8d",
    textAlign: "center",
    fontWeight: 500,
  },
  ratingValue: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#2c3e50",
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 2),
    backgroundColor: "rgba(52, 152, 219, 0.1)",
    borderRadius: theme.spacing(1),
    minWidth: 120,
    textAlign: "center",
  },
  starContainer: {
    position: "relative",
    padding: theme.spacing(2, 0),
  },
  starBackground: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 120,
    height: 120,
    borderRadius: "50%",
    backgroundColor: "rgba(241, 196, 15, 0.1)",
    zIndex: 0,
  },
}));

type QuestionProps = {
  question: string;
  value: number | null;
  onChange: (value: number | null) => void;
  required?: boolean;
};

export default function Question({
  question,
  value,
  onChange,
  required = false,
}: QuestionProps): JSX.Element {
  const classes = useStyles();

  const getRatingLabel = (rating: number | null) => {
    if (!rating) return "Not rated";
    
    switch (rating) {
      case 1: return "Poor";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Very Good";
      case 5: return "Excellent";
      default: return "";
    }
  };

  return (
    <Paper className={classes.questionBox} elevation={0}>
      <Typography variant="h6" className={classes.question}>
        {question}
        {required && <span className={classes.required}>*</span>}
      </Typography>
      
      <Box className={classes.ratingContainer}>
        <Box className={classes.starContainer}>
          <Box className={classes.starBackground}></Box>
          <Rating
            value={value}
            onChange={(_: React.ChangeEvent<{}>, newValue: number | null) => onChange(newValue)}
            size="large"
            icon={<Star fontSize="inherit" />}
            emptyIcon={<Star fontSize="inherit" />}
            className={classes.stars}
            max={5}
          />
        </Box>
        
        <Box className={classes.ratingLabels}>
          <Typography className={classes.ratingLabel}>1</Typography>
          <Typography className={classes.ratingLabel}>2</Typography>
          <Typography className={classes.ratingLabel}>3</Typography>
          <Typography className={classes.ratingLabel}>4</Typography>
          <Typography className={classes.ratingLabel}>5</Typography>
        </Box>
        
        <Typography className={classes.ratingValue}>
          {getRatingLabel(value)}
        </Typography>
      </Box>
    </Paper>
  );
}
