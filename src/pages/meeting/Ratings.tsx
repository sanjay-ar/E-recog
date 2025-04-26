import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import {
  fetchActiveMeetingRatings,
  selectActiveMeetingRatings,
  subscribeToActiveMeetingRatings,
} from "../../meetings/ratingsSlice";
import { Box, Typography, makeStyles, Paper } from "@material-ui/core";
import Loader from "../../components/Loader";
import { Alert } from "@material-ui/lab";
import RatingsBarChart from "./RatingsBarChart";
import { unwrapResult } from "@reduxjs/toolkit";
import { selectActiveMeetingFeedbackLinkId } from "../../meetings/meetingsSelectors";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(44, 62, 80, 0.7)",
    backdropFilter: "blur(10px)",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    border: "1px solid rgba(236, 240, 241, 0.1)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  },
  title: {
    color: "#ECF0F1",
    fontSize: "2rem",
    fontWeight: 600,
    marginBottom: theme.spacing(4),
  },
  chartsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(3),
  },
  alert: {
    backgroundColor: "rgba(52, 73, 94, 0.7)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(236, 240, 241, 0.1)",
    "& .MuiAlert-message": {
      color: "#ECF0F1",
    },
  },
}));

export default function Ratings(): JSX.Element {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchActiveMeetingRatings());
  }, [dispatch]);

  const activeMeetingFeedbackLinkId = useAppSelector(
    selectActiveMeetingFeedbackLinkId
  );

  useEffect(() => {
    let unsubscribe: () => void;
    const subscribeToRatings = async () => {
      unsubscribe = unwrapResult(
        await dispatch(subscribeToActiveMeetingRatings())
      );
    };
    subscribeToRatings();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [
    dispatch,
    // If the feedback link is created after opening the ratings page, the subscription should be run again
    activeMeetingFeedbackLinkId,
  ]);

  const ratingsLength = useAppSelector(
    (state) => selectActiveMeetingRatings(state).length
  );
  const loading = useAppSelector(
    (state) => state.ratings.loading && state.ratings.ids.length === 0
  );

  return loading ? (
    <Loader />
  ) : (
    <Paper className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        Ratings (N={ratingsLength})
      </Typography>
      {ratingsLength === 0 ? (
        <Alert severity="info" className={classes.alert}>
          <Typography variant="body1">
            There are no ratings yet. Create a feedback link after you finished
            the meeting and send it to your audience. This page will refresh
            automatically.
            <br />
            <strong>
              Note: Feedback links are only valid for 30 minutes after the
              meeting has ended.
            </strong>
          </Typography>
        </Alert>
      ) : (
        <div className={classes.chartsContainer}>
          <RatingsBarChart
            questionType="overallStars"
            title="Overall experience"
            explanation="Shows the distribution of the overall experience scored by stars rom 1 to 5 (1=useless, 5=excellent). This is the score your audience gave using the feedback link you sent them."
          />
          <RatingsBarChart
            questionType="paceStars"
            title="Speaker's pace"
            explanation="Shows the distribution of the speaker's pace scored by stars from 1 to 5 (1=way too fast / slow, 5=just right). This is the score your audience gave using the feedback link you sent them."
          />
          <RatingsBarChart
            questionType="contentStars"
            title="Usefulness of content"
            explanation="Shows the distribution of the usefulness of the presentation's content scored by stars from 1 to 5 (1=useless, 5=excellent). This is the score your audience gave using the feedback link you sent them."
          />
        </div>
      )}
    </Paper>
  );
}
