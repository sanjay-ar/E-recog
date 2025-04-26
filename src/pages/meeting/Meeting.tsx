import {
  Box,
  Button,
  Container,
  Paper,
  Tab,
  Typography,
  useTheme,
  makeStyles,
} from "@material-ui/core";
import { ArrowBackIos, PlayArrow, Stop } from "@material-ui/icons";
import {
  Alert,
  AlertTitle,
  TabContext,
  TabList,
  TabPanel,
} from "@material-ui/lab";
import { useCallback, useRef, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import Page from "../../components/Page";
import { startMeeting, stopMeeting } from "../../meetings/meetingsSlice";
import { useAppDispatch } from "../../reduxHooks";
import AudienceEmotionBarometer from "./AudienceEmotionBarometer";
import AudienceEmotionRollercoaster from "./AudienceEmotionRollercoaster";
import EmotionRadar from "./EmotionRadar";
import ExportButton from "./ExportButton";
import FeedbackLinkButton from "./FeedbackLinkButton";
import {
  useEmotionDetection,
  useFetchMeeting,
  useMeetingInformation,
  useScreenCapturingIfMeetingIsRunning,
} from "./hooks";
import Ratings from "./Ratings";
import StartScreenCapturingDialog from "./StartScreenCapturingDialog";
import VoiceCaptureControls from "./VoiceCaptureControls";
import VoiceVisualization from "./VoiceVisualization";

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
  tabPanel: {
    padding: theme.spacing(2, 0),
    backgroundColor: "transparent",
  },
  paper: {
    backgroundColor: "transparent",
    backdropFilter: "none",
    boxShadow: "none",
  },
  tabList: {
    backgroundColor: "transparent",
    "& .MuiTab-root": {
      color: "rgba(255, 255, 255, 0.7)",
      "&.Mui-selected": {
        color: "white",
      },
    },
  },
}));

export default function Meeting(): JSX.Element {
  const { id } = useParams() as any;
  const [notFound] = useFetchMeeting(id);
  const [meetingLoading, meetingRunning, meetingEnded, meetingName] =
    useMeetingInformation(id);

  const dispatch = useAppDispatch();

  const handleStartMeeting = useCallback(async () => {
    dispatch(startMeeting());
  }, [dispatch]);

  const handleStopMeeting = useCallback(() => {
    dispatch(stopMeeting());
  }, [dispatch]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleStartScreenCapturing = useScreenCapturingIfMeetingIsRunning(
    videoRef,
    handleStopMeeting
  );
  useEmotionDetection(videoRef, canvasRef);

  const [audioStream, setAudioStream] = useState<MediaStream | undefined>(
    undefined
  );

  const [tabValue, setTabValue] = useState<string>("1");
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabValue(newValue);
  };

  const theme = useTheme();
  const classes = useStyles();

  return (
    <Page>
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        className={classes.videoBackground}
        playsInline
      >
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>
      <div className={classes.overlay} />
      
      {/* Face detection video - hidden but functional */}
      <video
        ref={videoRef}
        width={1000}
        height={564}
        autoPlay
        muted
        style={{ display: "none", visibility: "hidden" }}
      />
      
      <Container className={classes.content}>
        <Button
          color="primary"
          startIcon={<ArrowBackIos />}
          component={RouterLink}
          to="/meetings"
        >
          Back
        </Button>
        {meetingLoading ? (
          <Box>
            <Loader />
          </Box>
        ) : notFound ? (
          <Box mt={2}>
            <Alert severity="warning">
              <AlertTitle>Oh no! Meeting not found 😩</AlertTitle>
              <Typography variant="body1">
                This meeting does not exist or has been deleted.
              </Typography>
            </Alert>
          </Box>
        ) : (
          <>
            <Typography variant="h1">{meetingName}</Typography>
            {meetingEnded ? (
              <>
                <Typography variant="h5">
                  This meeting has ended and cannot be started again. 👏
                </Typography>
                <FeedbackLinkButton />
                <ExportButton />
              </>
            ) : (
              <Box display="flex" alignItems="center">
                <StartScreenCapturingDialog
                  handleStartScreenCapturing={handleStartScreenCapturing}
                />
                <Button
                  color={meetingRunning ? "secondary" : "primary"}
                  variant="contained"
                  size="large"
                  startIcon={meetingRunning ? <Stop /> : <PlayArrow />}
                  onClick={
                    meetingRunning ? handleStopMeeting : handleStartMeeting
                  }
                >
                  {meetingRunning ? "Stop" : "Start"} the meeting
                </Button>
                {meetingRunning && (
                  <Box ml={3}>
                    <VoiceCaptureControls handleMediaStream={setAudioStream} />
                  </Box>
                )}
              </Box>
            )}
            <Box mt={2}>
              <TabContext value={tabValue}>
                <Paper className={classes.paper} square>
                  <TabList onChange={handleTabChange} className={classes.tabList}>
                    <Tab label="Statistics" value="1" />
                    <Tab label="Faces" value="2" />
                    <Tab label="Voice" value="3" />
                    <Tab label="Ratings" value="4" />
                  </TabList>
                </Paper>
                <TabPanel value="1" className={classes.tabPanel}>
                  <Box display="flex" flexDirection="row" alignItems="flex-start" justifyContent="center">
                    <Box flex={1} maxWidth="500px" marginRight={2}>
                      {meetingEnded ? (
                        <EmotionRadar />
                      ) : (
                        <AudienceEmotionBarometer />
                      )}
                    </Box>
                    <Box flex={1} maxWidth="750px">
                      <AudienceEmotionRollercoaster />
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value="2" className={classes.tabPanel}>
                  {!meetingRunning ? (
                    <Alert severity="info">
                      <Typography variant="body1">
                        This visualization is only available if the meeting is
                        running.
                      </Typography>
                    </Alert>
                  ) : (
                    <>
                      {!videoRef.current?.srcObject && (
                        <Alert severity="info">
                          <Typography variant="body1">
                            There is no active screen capturing. Did you allow
                            the application access to your screen? Reload the
                            page to try again.
                          </Typography>
                        </Alert>
                      )}
                      <canvas ref={canvasRef} />
                    </>
                  )}
                </TabPanel>
                <TabPanel value="3" className={classes.tabPanel}>
                  {!meetingRunning ? (
                    <Alert severity="info">
                      <Typography variant="body1">
                        This visualization is only available if the meeting is
                        running.
                      </Typography>
                    </Alert>
                  ) : (
                    <>
                      {audioStream instanceof MediaStream ? (
                        <VoiceVisualization audioStream={audioStream} />
                      ) : (
                        <Alert severity="info">
                          <Typography variant="body1">
                            This visualization is only available if the voice
                            tracking is active. Enable it using the switch
                            above.
                          </Typography>
                        </Alert>
                      )}
                    </>
                  )}
                </TabPanel>
                <TabPanel value="4" className={classes.tabPanel}>
                  <Ratings />
                </TabPanel>
              </TabContext>
            </Box>
          </>
        )}
      </Container>
    </Page>
  );
}
