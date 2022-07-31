import { AppBar, Button, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectedUser } from "../../auth/authSlice";
import { signout } from "../../auth/services/auth.service";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const state = useAppSelector(selectedUser);
  console.log("Header component", state);

  const handleSignout = () => dispatch(signout());

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#14213d", color: "white", padding: "4px" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <img
            onClick={() => navigate("/")}
            style={{
              height: "50px",
              cursor: "pointer",
            }}
            src="/logo192.png"
            alt="shine"
          />
          <div style={{ display: "flex" }}>
            <div>
              {/* <div>Hello, {user?.name}</div> */}
              <div>Hello, </div>
              <Button
                onClick={handleSignout}
                sx={{ padding: 0, marginRight: "16px" }}
                color="inherit"
              >
                Signout
              </Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
