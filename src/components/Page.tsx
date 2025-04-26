import { Box, Container, IconButton, Link, Tooltip } from "@material-ui/core";
import Error from "../error/Error";
import { Auth } from "aws-amplify";
import { BugReport, GitHub, Home, PowerSettingsNew } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";

type PageProps = {
  children: React.ReactNode;
};

export default function Page({ children }: PageProps): JSX.Element {
  return (
    <Box>
      <Container>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Box>
            <Tooltip title="Home">
              <IconButton component={RouterLink} to="/meetings">
                <Home color="primary" />
              </IconButton>
            </Tooltip>
           
            <Tooltip title="Logout">
              <IconButton
                onClick={async () => {
                  await Auth.signOut();
                }}
              >
                <PowerSettingsNew color="error" />
              </IconButton>
            </Tooltip>
          
          </Box>
        </Box>
        <Error />
      </Container>
      {children}
    </Box>
  );
}
