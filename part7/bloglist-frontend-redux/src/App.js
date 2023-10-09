import Router from "./routes/Router";
import { Container } from "@mui/material";
import { Nav, Notification } from "./components";
import { useSelector } from "react-redux";

const App = () => {
  const notification = useSelector((state) => state.notification);

  return (
    <>
      <Nav />

      <Container
        sx={{
          ml: {
            xs: "1vw",
            sm: "240px",
          },
        }}
      >
        <Router />
        {notification.show ? (
          <Notification
            message={notification.message}
            open={notification.show}
            severity={notification.severity}
          />
        ) : (
          <>No notification</>
        )}
      </Container>
    </>
  );
};

export default App;
