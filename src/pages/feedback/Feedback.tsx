import { Box, Button, Container, Typography, makeStyles, Paper, Fade, Grid, Divider } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Send, CheckCircle } from "@material-ui/icons";
import NotFound from "../NotFound";
import { useFetchPublicMeeting, useSubmitAnswer } from "./hooks";
import { useAppSelector } from "../../reduxHooks";
import Question from "./Question";
import Loader from "../../components/Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4),
  },
  header: {
    textAlign: "center",
    marginBottom: theme.spacing(6),
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: -theme.spacing(3),
      left: "50%",
      transform: "translateX(-50%)",
      width: 80,
      height: 4,
      backgroundColor: "#3498db",
      borderRadius: 2,
    },
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: theme.spacing(2),
  },
  title: {
    color: "#2c3e50",
    fontSize: "2.5rem",
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    letterSpacing: "-0.5px",
  },
  subtitle: {
    color: "#7f8c8d",
    fontSize: "1.2rem",
    marginBottom: theme.spacing(4),
    maxWidth: 600,
    margin: "0 auto",
  },
  feedbackCard: {
    backgroundColor: "#ffffff",
    borderRadius: theme.spacing(3),
    padding: theme.spacing(4),
    maxWidth: 800,
    width: "100%",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.12)",
    },
  },
  questionSection: {
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(52, 152, 219, 0.05)",
    },
  },
  submitButton: {
    backgroundColor: "#3498db",
    color: "#ffffff",
    padding: theme.spacing(1.5, 4),
    fontSize: "1.1rem",
    marginTop: theme.spacing(4),
    borderRadius: theme.spacing(2),
    textTransform: "none",
    fontWeight: 600,
    boxShadow: "0 4px 12px rgba(52, 152, 219, 0.3)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#2980b9",
      boxShadow: "0 6px 16px rgba(52, 152, 219, 0.4)",
      transform: "translateY(-2px)",
    },
    "&:disabled": {
      backgroundColor: "#bdc3c7",
      boxShadow: "none",
    },
  },
  anonymousNotice: {
    color: "#7f8c8d",
    fontSize: "0.9rem",
    marginTop: theme.spacing(3),
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1.5),
    backgroundColor: "rgba(52, 152, 219, 0.05)",
    borderRadius: theme.spacing(1),
  },
  thankYouScreen: {
    textAlign: "center",
    color: "#2c3e50",
    padding: theme.spacing(4),
  },
  thankYouIcon: {
    fontSize: 80,
    color: "#2ecc71",
    marginBottom: theme.spacing(2),
  },
  thankYouTitle: {
    fontSize: "2.5rem",
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    color: "#2c3e50",
    letterSpacing: "-0.5px",
  },
  thankYouMessage: {
    fontSize: "1.2rem",
    color: "#7f8c8d",
    marginBottom: theme.spacing(4),
    maxWidth: 500,
    margin: "0 auto",
  },
  footer: {
    marginTop: theme.spacing(6),
    textAlign: "center",
    color: "#7f8c8d",
    fontSize: "0.9rem",
    padding: theme.spacing(2),
    borderTop: "1px solid #e2e8f0",
    width: "100%",
  },
  divider: {
    margin: theme.spacing(4, 0),
    backgroundColor: "#e2e8f0",
  },
  progressIndicator: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(4),
  },
  progressStep: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    backgroundColor: "#e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#7f8c8d",
    fontWeight: 600,
    margin: theme.spacing(0, 1),
    transition: "all 0.3s ease",
  },
  progressStepActive: {
    backgroundColor: "#3498db",
    color: "#ffffff",
  },
  progressStepCompleted: {
    backgroundColor: "#2ecc71",
    color: "#ffffff",
  },
  progressLine: {
    height: 2,
    width: 50,
    backgroundColor: "#e2e8f0",
    margin: theme.spacing(0, 1),
    alignSelf: "center",
  },
  progressLineActive: {
    backgroundColor: "#3498db",
  },
  progressLineCompleted: {
    backgroundColor: "#2ecc71",
  },
}));

export default function Feedback(): JSX.Element {
  const classes = useStyles();
  const { publicMeetingId } = useParams() as any;
  const [meetingLoading, expired, publicMeeting] =
    useFetchPublicMeeting(publicMeetingId);
  const [submitLoading, submitted, submitAnswer] = useSubmitAnswer(
    publicMeeting?.id,
    publicMeeting?.owner
  );
  const signedIn: boolean = useAppSelector((state) => state.auth.signedIn);
  const userId: string | undefined = useAppSelector(
    (state) => state.auth.user?.id
  );

  const [overallStars, setOverallStars] = useState<number | null>(null);
  const [paceStars, setPaceStars] = useState<number | null>(null);
  const [contentStars, setContentStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      submitAnswer(overallStars!, paceStars, contentStars);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box className={classes.root}>
        <Loader />
      </Box>
    );
  }

  if (submitted) {
    return (
      <Box className={classes.root}>
        <Container maxWidth="sm">
          <Paper className={classes.feedbackCard} elevation={0}>
            <Box className={classes.thankYouScreen}>
              <CheckCircle className={classes.thankYouIcon} />
              <Typography variant="h1" className={classes.thankYouTitle}>
                Thank You!
              </Typography>
              <Typography variant="h6" className={classes.thankYouMessage}>
                Your feedback has been successfully submitted. We appreciate your time and input.
              </Typography>
              <Button
                variant="contained"
                className={classes.submitButton}
                onClick={() => window.close()}
              >
                Close
              </Button>
            </Box>
          </Paper>
          <Typography className={classes.footer}>
            © {new Date().getFullYear()} Erecog - Emotion Recognition Platform
          </Typography>
        </Container>
      </Box>
    );
  }

  if (meetingLoading) {
    return (
      <Box className={classes.root}>
        <Loader />
      </Box>
    );
  }

  if (!publicMeeting) {
    return <NotFound />;
  }

  return (
    <Box className={classes.root}>
      <Container maxWidth="md">
        <Box className={classes.header}>
          <Typography variant="h1" className={classes.title}>
            Course Feedback
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            Help us improve by sharing your experience with this course
          </Typography>
        </Box>
        
        <Box className={classes.progressIndicator}>
          <Box className={`${classes.progressStep} ${classes.progressStepActive}`}>1</Box>
          <Box className={`${classes.progressLine} ${classes.progressLineActive}`}></Box>
          <Box className={classes.progressStep}>2</Box>
          <Box className={classes.progressLine}></Box>
          <Box className={classes.progressStep}>3</Box>
        </Box>
        
        <Paper className={classes.feedbackCard} elevation={0}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box className={classes.questionSection}>
                <Question
                  question="How do you rate the overall experience?"
                  value={overallStars}
                  onChange={setOverallStars}
                  required
                />
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Divider className={classes.divider} />
            </Grid>
            
            <Grid item xs={12}>
              <Box className={classes.questionSection}>
                <Question
                  question="Was the speaker's pace right for you?"
                  value={paceStars}
                  onChange={setPaceStars}
                />
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Divider className={classes.divider} />
            </Grid>
            
            <Grid item xs={12}>
              <Box className={classes.questionSection}>
                <Question
                  question="Was the content useful?"
                  value={contentStars}
                  onChange={setContentStars}
                />
              </Box>
            </Grid>
          </Grid>
          
          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              variant="contained"
              className={classes.submitButton}
              onClick={handleSubmit}
              disabled={!overallStars}
              endIcon={<Send />}
            >
              Submit Feedback
            </Button>
          </Box>
          
          <Typography variant="body2" className={classes.anonymousNotice}>
            Your feedback is anonymous and will help improve future sessions
          </Typography>
        </Paper>
        
        <Typography className={classes.footer}>
          © {new Date().getFullYear()} Erecog - Emotion Recognition Platform
        </Typography>
      </Container>
    </Box>
  );
}

