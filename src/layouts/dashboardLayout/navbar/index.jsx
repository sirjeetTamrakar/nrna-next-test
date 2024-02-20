import CustomBreadcrumbs from "@/components/common/CustomBreadcrumbs/CustomBreadcrumbs";
import useScreenSize from "@/hooks/useScreenSize";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Typography } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import useStyles from "./Styles";

const Navbar = ({ toggleDrawer, drawerOpen }) => {
  const classes = useStyles();
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);
  const screenSize = useScreenSize();

  console.log("screenSizenav", { screenSize });

  return (
    <Box className={classes.root}>
      <Box sx={{ display: "flex", gap: "20px", alignItems: "start" }}>
        <Box
          className="hamburger"
          sx={{ cursor: "pointer" }}
          onClick={toggleDrawer}
        >
          {!drawerOpen ? (
            <MenuIcon
              sx={{
                fontSize: "30px !important",
                backgroundColor: "#d6d6d6",
                borderRadius: "50%",
                padding: "5px",
              }}
            />
          ) : (
            <CloseIcon
              sx={{
                fontSize: "30px !important",
                backgroundColor: "#d6d6d6",
                borderRadius: "50%",
                padding: "5px",
              }}
            />
          )}
        </Box>

        <Box className={classes.header}>
          <Box className={classes.main}>
            {paths?.length
              ? paths?.slice(-1)?.toString()?.replaceAll("-", " ")
              : "Hi User!"}
          </Box>
          <Box className={classes.breadcrumbs}>
            {" "}
            <CustomBreadcrumbs data={{ color: "#fff" }} />
          </Box>
        </Box>
      </Box>

      <Box className={classes.right}>
        <AccountMenu />
      </Box>
    </Box>
  );
};

export default Navbar;

const LinkComponent = ({ row }) => {
  const classes = useStyles();
  return (
    <NavLink
      to={row?.url}
      className={({ isActive }) => {
        return isActive && classes.active;
      }}
    >
      <Typography>{row?.label}</Typography>
    </NavLink>
  );
};
