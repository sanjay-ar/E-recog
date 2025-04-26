import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { fetchAllMeetings } from "../../meetings/meetingsSlice";
import { Box, Container, Paper, Typography, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Page from "../../components/Page";
import MeetingTable from "./MeetingTable";
import AddMeetingButton from "./AddMeetingButton";
import { PersonalVideo } from "@material-ui/icons";
import { Hub } from "aws-amplify";

const useStyles = makeStyles((theme) => ({
  videoBackground: {
    position: "fixed",
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    objectFit: "cover",
    opacity: 0.8,
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: -1,
  },
  content: {
    position: "relative",
    zIndex: 1,
    color: "white",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    backgroundColor: "transparent",
    backdropFilter: "none",
    borderRadius: theme.spacing(2),
    boxShadow: "none",
    overflow: "hidden",
  },
  title: {
    fontWeight: 700,
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
    marginBottom: theme.spacing(4),
  },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
  },
  videoLoading: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 0,
  }
}));

export default function Meetings(): JSX.Element {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.auth.user?.name);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const fetchMeetings = async () => {
      dispatch(fetchAllMeetings());
    };

    fetchMeetings();

    const listener = Hub.listen("datastore", async (hubdata) => {
      const { event } = hubdata.payload;
      if (event === "ready") {
        fetchMeetings();
      }
    });

    return () => {
      listener();
    };
  }, [dispatch]);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  return (
    <Page>
      {!videoLoaded && (
        <Box className={classes.videoLoading}>
          <CircularProgress color="secondary" />
        </Box>
      )}
      <video
        autoPlay
        loop
        muted
        className={classes.videoBackground}
        playsInline
        onLoadedData={handleVideoLoaded}
      >
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>
      <div className={classes.overlay} />
      <Container className={classes.content}>
        <Typography variant="h1" className={classes.title}>Welcome, {name}</Typography>
        <Typography variant="h4" className={classes.subtitle}>
          Start your meeting
        </Typography>
        <Typography variant="h2" className={classes.sectionTitle}>
          <PersonalVideo fontSize="inherit" />
          <Box ml={2}>Your meetings</Box>
        </Typography>
        <Typography variant="body1" paragraph>
          Create a new meeting or choose one from below.
        </Typography>
        <Box>
          <Box mb={3}>
            <AddMeetingButton />
          </Box>
          <Paper className={classes.paper}>
            <MeetingTable />
          </Paper>
        </Box>
      </Container>
    </Page>
  );
}
