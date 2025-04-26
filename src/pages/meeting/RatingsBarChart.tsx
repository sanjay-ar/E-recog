import {
  Box,
  IconButton,
  Paper,
  Popover,
  Typography,
  useTheme,
  makeStyles,
} from "@material-ui/core";
import { Rating } from "../../models";
import { useAppSelector } from "../../reduxHooks";
import { useState } from "react";
import { InfoOutlined } from "@material-ui/icons";
import Plot from "react-plotly.js";
import { selectActiveMeetingRatings } from "../../meetings/ratingsSlice";
import { range } from "lodash-es";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(52, 73, 94, 0.5)",
    backdropFilter: "blur(5px)",
    borderRadius: theme.spacing(1.5),
    border: "1px solid rgba(236, 240, 241, 0.1)",
    transition: "all 0.3s ease-in-out",
    flex: "1 1 calc(50% - 12px)",
    minWidth: "300px",
    "&:hover": {
      backgroundColor: "rgba(52, 73, 94, 0.7)",
      transform: "translateY(-2px)",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    },
  },
  infoButton: {
    color: "rgba(236, 240, 241, 0.7)",
    padding: theme.spacing(1),
    "&:hover": {
      backgroundColor: "rgba(236, 240, 241, 0.1)",
    },
  },
  popover: {
    "& .MuiPopover-paper": {
      backgroundColor: "rgba(44, 62, 80, 0.95)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(236, 240, 241, 0.1)",
      borderRadius: theme.spacing(1),
      maxWidth: 300,
    },
  },
  popoverText: {
    color: "#ECF0F1",
  },
}));

type RatingsBarChartProps = {
  questionType: "overallStars" | "contentStars" | "paceStars";
  title: string;
  explanation: string;
};

export default function RatingsBarChart({
  questionType,
  title,
  explanation,
}: RatingsBarChartProps): JSX.Element {
  const theme = useTheme();
  const classes = useStyles();
  const ratings: Rating[] = useAppSelector(selectActiveMeetingRatings);

  // Popover
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Paper className={classes.root}>
      <Box position="relative">
        <Box position="absolute" top={0} right={0} zIndex={1}>
          <IconButton
            className={classes.infoButton}
            onClick={handleOpenPopover}
            size="small"
          >
            <InfoOutlined />
          </IconButton>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            className={classes.popover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Box p={2}>
              <Typography variant="body2" className={classes.popoverText}>
                {explanation}
              </Typography>
            </Box>
          </Popover>
        </Box>
      </Box>
      <Plot
        config={{
          displayModeBar: false,
        }}
        layout={{
          title: {
            text: title,
            font: {
              family: theme.typography.fontFamily,
              size: 18,
              color: "#ECF0F1",
            },
            y: 0.9,
          },
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
          hovermode: false,
          width: 605,
          height: 375,
          margin: {
            l: 40,
            r: 30,
            t: 50,
            b: 70,
          },
          font: {
            family: theme.typography.fontFamily,
            color: "#ECF0F1",
            size: 14,
          },
          yaxis: {
            tickformat: ",d",
            rangemode: "nonnegative",
            gridcolor: "rgba(236, 240, 241, 0.1)",
            zerolinecolor: "rgba(236, 240, 241, 0.1)",
          },
          xaxis: {
            gridcolor: "rgba(236, 240, 241, 0.1)",
            zerolinecolor: "rgba(236, 240, 241, 0.1)",
          },
          showlegend: false,
          transition: {
            duration: 500,
            easing: "cubic-in-out",
          },
        }}
        data={[
          {
            x: range(1, 6).map((i) =>
              range(1, i).reduce((prev) => prev + "⭐", "⭐")
            ),
            y: range(1, 6).map(
              (i) => ratings.filter((r) => r[questionType] === i).length
            ),
            marker: {
              color: "rgba(52, 152, 219, 0.7)",
              line: {
                color: "rgba(52, 152, 219, 0.9)",
                width: 1,
              },
            },
            type: "bar",
            hoverinfo: "y",
          },
        ]}
      />
    </Paper>
  );
}
