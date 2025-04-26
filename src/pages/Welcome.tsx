import { Box, Container, Typography, Fade, Button, Grid, Paper } from "@material-ui/core";
import CTAButton from "../components/CTAButton";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { EmojiEmotions, Assessment, School, Speed } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: "url('https://ggie.berkeley.edu/wp-content/uploads/2019/09/Basics_of_Emotion_Students_1410x820-705x410.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(26, 37, 47, 0.85)",
    }
  },
  wrapper: {
    position: "relative",
    minHeight: "100vh",
    overflowX: "hidden",
    overflowY: "auto",
  },
  content: {
    position: "relative",
    zIndex: 1,
    color: "#ECF0F1",
  },
  title: {
    fontSize: "4rem",
    fontWeight: 700,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    marginBottom: theme.spacing(2),
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
    color: "#ECF0F1",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  subtitle: {
    fontSize: "1.5rem",
    textAlign: "center",
    marginBottom: theme.spacing(6),
    color: "#BDC3C7",
    maxWidth: "800px",
    margin: "0 auto",
  },
  startButton: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2, 6),
    fontSize: "1.2rem",
    borderRadius: "4px",
    backgroundColor: theme.palette.primary.main,
    color: "#ECF0F1",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      transform: "translateY(-5px)",
      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    },
  },
  featureCard: {
    backgroundColor: "rgba(44, 62, 80, 0.7)",
    backdropFilter: "blur(10px)",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    height: "100%",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    border: "1px solid rgba(236, 240, 241, 0.1)",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
    },
  },
  featureIcon: {
    fontSize: "3rem",
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.light,
  },
  featureTitle: {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  featureDescription: {
    color: "#BDC3C7",
  },
  scrollIndicator: {
    position: "absolute",
    bottom: theme.spacing(4),
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "translateX(-50%) translateY(-5px)",
    },
  },
  scrollText: {
    marginBottom: theme.spacing(1),
    fontSize: "0.9rem",
    color: "#BDC3C7",
  },
  scrollArrow: {
    fontSize: "2rem",
    color: "#ECF0F1",
    animation: "$bounce 2s infinite",
  },
  "@keyframes bounce": {
    "0%, 20%, 50%, 80%, 100%": {
      transform: "translateY(0)",
    },
    "40%": {
      transform: "translateY(-10px)",
    },
    "60%": {
      transform: "translateY(-5px)",
    },
  },
}));

export function Welcome(): JSX.Element {
  const classes = useStyles();
  const [showContent, setShowContent] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  
  useEffect(() => {
    // Animate content on mount
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    
    // Animate features after content
    const featuresTimer = setTimeout(() => {
      setShowFeatures(true);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(featuresTimer);
    };
  }, []);
  
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className={classes.wrapper}>
      <div className={classes.background} />
      <Container className={classes.content}>
        <Box
          height="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Fade in={showContent} timeout={1000}>
            <Box width={1}>
              <Typography variant="h1" className={classes.title}>
                Students emotion detector
              </Typography>
              <Typography variant="h5" className={classes.subtitle}>
                Advanced AI-powered emotion detection for educational environments
              </Typography>
            </Box>
          </Fade>
          
          <Fade in={showContent} timeout={1500}>
            <Box mt={4} width={1} display="flex" alignItems="center" justifyContent="center">
              <CTAButton component={RouterLink} to="/login" className={classes.startButton}>
                Start
              </CTAButton>
            </Box>
          </Fade>
          
          <Box className={classes.scrollIndicator} onClick={scrollToFeatures}>
            <Typography className={classes.scrollText}>Discover more</Typography>
            <Box className={classes.scrollArrow}>↓</Box>
          </Box>
        </Box>
        
        <Box id="features" py={10}>
          <Fade in={showFeatures} timeout={1000}>
            <Typography variant="h3" align="center" gutterBottom>
              Key Features
            </Typography>
          </Fade>
          
          <Grid container spacing={4} style={{ marginTop: 16 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Fade in={showFeatures} timeout={1200}>
                <Paper className={classes.featureCard}>
                  <EmojiEmotions className={classes.featureIcon} />
                  <Typography variant="h6" className={classes.featureTitle}>
                    Emotion Recognition
                  </Typography>
                  <Typography className={classes.featureDescription}>
                    Real-time detection of student emotions through facial expressions and voice analysis.
                  </Typography>
                </Paper>
              </Fade>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Fade in={showFeatures} timeout={1400}>
                <Paper className={classes.featureCard}>
                  <Assessment className={classes.featureIcon} />
                  <Typography variant="h6" className={classes.featureTitle}>
                    Engagement Metrics
                  </Typography>
                  <Typography className={classes.featureDescription}>
                    Track student engagement levels and identify patterns in emotional responses.
                  </Typography>
                </Paper>
              </Fade>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Fade in={showFeatures} timeout={1600}>
                <Paper className={classes.featureCard}>
                  <School className={classes.featureIcon} />
                  <Typography variant="h6" className={classes.featureTitle}>
                    Educational Insights
                  </Typography>
                  <Typography className={classes.featureDescription}>
                    Gain valuable insights to improve teaching methods and student learning outcomes.
                  </Typography>
                </Paper>
              </Fade>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Fade in={showFeatures} timeout={1800}>
                <Paper className={classes.featureCard}>
                  <Speed className={classes.featureIcon} />
                  <Typography variant="h6" className={classes.featureTitle}>
                    Real-time Analysis
                  </Typography>
                  <Typography className={classes.featureDescription}>
                    Instant feedback on student emotional states during lectures and presentations.
                  </Typography>
                </Paper>
              </Fade>
            </Grid>
          </Grid>
          
          <Box mt={8} display="flex" justifyContent="center">
            <Fade in={showFeatures} timeout={2000}>
              <CTAButton component={RouterLink} to="/login" className={classes.startButton}>
                Get Started Now
              </CTAButton>
            </Fade>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
