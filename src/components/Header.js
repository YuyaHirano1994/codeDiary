import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import ImportContactsSharpIcon from "@mui/icons-material/ImportContactsSharp";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../common/supabase";
import useAuth from "../common/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const user = useAuth();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(user.id);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
    navigate("/user/signin");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          {/* <header>
            <div>{user.id ? showLoggedIn() : showNotLoggedIn()}</div>
          </header> */}
          {user.id ? (
            <>
              <Box sx={{ display: "flex", alignItems: "center", textAlign: "center", flexGrow: 1 }}>
                <Link to={"/home"} style={{ textDecoration: "none" }}>
                  <ImportContactsSharpIcon />
                </Link>
                <div style={{ flexGrow: 1 }}></div>
                <Typography sx={{ minWidth: 100 }}>About</Typography>
                {/* <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
                <Tooltip title="Profile">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> <Link to={"/mypage"}>MyPage</Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  <Link to={"/mypage/setting"}>Settings</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <Box onClick={logout}>Sign out</Box>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Typography variant="h5" align="right">
              <Button variant="outlined">
                <Link to={"user/signin"}>Sign In</Link>
              </Button>
            </Typography>
          )}
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
