import { Button } from "@mui/material";
import { LogoutController } from "./LogoutController";

export const Logout = () => {
  const { handleLogout } = LogoutController();

  return (
    <Button
      onClick={handleLogout}
      variant="contained"
      fullWidth
      sx={{ background: "red" }}
    >
      Logout
    </Button>
  );
};
