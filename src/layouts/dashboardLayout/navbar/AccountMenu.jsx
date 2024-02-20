import noProfile from "@/assets/images/noProfile.jpg";
import CustomModal from "@/components/common/CustomModal/CustomModal";
import { getNCC } from "@/components/locals/dashboard/ncc/redux/actions";
import useToggle from "@/hooks/useToggle";
import {
  logout,
  saveAdminNccCountry,
  saveAdminNccIdDetails,
  saveAdminRoleDetails,
  saveRoleDetails,
} from "@/redux/auth/actions";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import HomeIcon from "@mui/icons-material/Home";
import Logout from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import Person4Icon from "@mui/icons-material/Person4";
import PublicIcon from "@mui/icons-material/Public";
import Settings from "@mui/icons-material/Settings";
import { Box, Button, Grid, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useStyles from "./Styles";

export default function AccountMenu() {
  const dispatch = useDispatch();
  const [storedValueID, setStoredValue] = useState(
    Number(localStorage.getItem("nccRoleID"))
  );
  const [storedValueRole, setStoredRole] = useState(
    localStorage.getItem("nccRole" || "admin")
  );
  const [nccCountryName, setNCCName] = useState(
    localStorage.getItem("nccCountryName")
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const [changeEl, setChangeEl] = useState(null);
  const [openForm, formOpenFunction] = useToggle(false);
  const [userRole, setUserRole] = useState("member");
  const [filteredNccData, setFilteredNccData] = useState();
  const [search, setSearch] = useState("");

  const { user, role_details, admin_role_details } = useSelector(
    (state) => state.auth
  );
  const { nccData, get_ncc_loading } = useSelector((state) => state.ncc);

  const open = Boolean(anchorEl);
  const roleOpen = Boolean(changeEl);

  const navigate = useNavigate();
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleRoleClick = (event) => {
    setChangeEl(event.currentTarget);
  };
  const handleSuperadminRoleClick = (event) => {
    setChangeEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRoleClose = () => {
    setChangeEl(null);
  };
  const handleSuperadminRoleClose = () => {
    setChangeEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate(`/`);
  };

  const handlePasswordChange = () => {
    navigate(`/password-reset`);
  };

  const goToHome = () => {
    navigate("/");
  };

  const handleRoleNcc = () => {
    userRole === "member" && setUserRole("ncc");
    navigate(`/dashboard`);
  };
  const handleRoleMember = () => {
    userRole === "ncc" && setUserRole("member");
    navigate(`/dashboard`);
  };
  useEffect(() => {
    dispatch(saveRoleDetails(userRole));
  }, [userRole]);

  const handleSuperadminRoleNcc = () => {
    navigate(`/dashboard`);
    formOpenFunction();
  };

  const handleSuperadminRoleMember = () => {
    localStorage.setItem("nccRole", "admin");
    localStorage.setItem("nccCountryName", null);
    localStorage.setItem("nccRoleID", null);
    setStoredValue(null);
    setNCCName(null);
    setStoredRole("admin");
    navigate(`/dashboard`);
  };

  useEffect(() => {
    dispatch(getNCC());
  }, []);

  useEffect(() => {
    if (nccData?.data) {
      const newNccData = nccData?.data?.filter((list) =>
        list?.country_name?.toLowerCase()?.includes(search?.toLowerCase())
      );
      setFilteredNccData(newNccData);
    }
  }, [search, nccData?.data]);

  const handleSelectNccID = (item) => {
    localStorage.setItem("nccRole", "ncc");
    localStorage.setItem("nccRoleID", item?.id);
    localStorage.setItem("nccCountryName", item?.country_name);
    storedValueRole === "admin" && localStorage.setItem("nccRole", "ncc");
    setStoredValue(item?.id);
    setNCCName(item?.country_name);
    setStoredRole("ncc");
    formOpenFunction();
    setSearch("");
  };

  useEffect(() => {
    dispatch(saveAdminNccIdDetails(storedValueID));
    dispatch(saveAdminRoleDetails(storedValueRole));
    dispatch(saveAdminNccCountry(nccCountryName));
  }, [storedValueID, storedValueRole, nccCountryName]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Box className={classes.userWrapper}>
          {user?.role_name === "ncc" && (
            <Tooltip title="Switch User Mode">
              <IconButton
                onClick={handleRoleClick}
                size="small"
                aria-controls={roleOpen ? "role-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={roleOpen ? "true" : undefined}
              >
                <ChangeCircleIcon />
              </IconButton>
            </Tooltip>
          )}
          {user?.role_name === "superadmin" && (
            <Tooltip title="Switch User Mode">
              <IconButton
                onClick={handleSuperadminRoleClick}
                size="small"
                aria-controls={roleOpen ? "role-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={roleOpen ? "true" : undefined}
              >
                <ChangeCircleIcon />
              </IconButton>
            </Tooltip>
          )}
          <Box>
            <p className={classes.name}>{user?.full_name} </p>
            {user?.role_name === "ncc" && (
              <p className={classes.role} style={{ width: "100px" }}>
                {role_details === "member" ? "Personal Profile" : "NCC"}{" "}
              </p>
            )}
            {user?.role_name === "superadmin" && (
              <p
                className={classes.role}
                style={{ minWidth: "100px", width: "auto" }}
              >
                {admin_role_details === "admin"
                  ? "Superadmin"
                  : `${nccCountryName}'s NCC`}{" "}
              </p>
            )}
          </Box>

          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                <img
                  src={user?.profile_image ? user?.profile_image : noProfile}
                  alt="Profile Image"
                  style={{ objectFit: "cover" }}
                  height="32"
                  width="32"
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        <Button
          onClick={goToHome}
          variant="outlined"
          sx={{ minWidth: "30px !important", padding: "20px 13px !important" }}
        >
          <HomeIcon />
        </Button>
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
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.12))",
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
        <MenuItem onClick={handlePasswordChange}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Change Password
        </MenuItem>
        <MenuItem onClick={() => handleLogout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      {user?.role_name === "ncc" && (
        <Menu
          anchorEl={changeEl}
          id="role-menu"
          open={roleOpen}
          onClose={handleRoleClose}
          onClick={handleRoleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.12))",
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
          <MenuItem onClick={handleRoleNcc}>
            <ListItemIcon>
              <PublicIcon fontSize="small" />
            </ListItemIcon>
            NCC
          </MenuItem>
          <MenuItem onClick={handleRoleMember}>
            <ListItemIcon>
              <Person4Icon fontSize="small" />
            </ListItemIcon>
            Personal Profile
          </MenuItem>
        </Menu>
      )}
      {user?.role_name === "superadmin" && (
        <Menu
          anchorEl={changeEl}
          id="role-menu"
          open={roleOpen}
          onClose={handleSuperadminRoleClose}
          onClick={handleSuperadminRoleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.12))",
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
          <MenuItem onClick={handleSuperadminRoleNcc}>
            <ListItemIcon>
              <PublicIcon fontSize="small" />
            </ListItemIcon>
            NCC
          </MenuItem>
          <MenuItem onClick={handleSuperadminRoleMember}>
            <ListItemIcon>
              <Person4Icon fontSize="small" />
            </ListItemIcon>
            Superadmin
          </MenuItem>
        </Menu>
      )}

      <CustomModal
        open={openForm}
        handleClose={formOpenFunction}
        modalTitle="Select any NCC to proceed"
        modalSubtitle=""
        icon={<PersonIcon />}
        width={`60rem`}
      >
        <Box sx={{ padding: "40px" }}>
          {get_ncc_loading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              <TextField
                placeholder="Search NCC"
                name="search"
                onChange={handleSearch}
                sx={{ marginBottom: "10px", marginLeft: "10px" }}
              />

              <Grid container>
                {filteredNccData?.map((item, index) => {
                  return (
                    <Grid item md={2.4} sx={{ padding: "10px" }} key={index}>
                      <Button
                        variant="contained"
                        sx={{ width: "100%" }}
                        onClick={() => handleSelectNccID(item)}
                      >
                        {item?.country_name}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}
        </Box>
      </CustomModal>
    </React.Fragment>
  );
}
