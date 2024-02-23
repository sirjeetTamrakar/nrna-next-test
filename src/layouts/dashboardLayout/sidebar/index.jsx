import Logo from "@/assets/images/nrna.png";
import { useGetSidebar } from "@/constants/SidebarConstants";
import { ExpandMore } from "@mui/icons-material";
import { Box, Collapse, Typography } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { useSelector } from "react-redux";
import useStyles from "./styles";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar({ toggleDrawer, drawerOpen }) {
  const { SidebarConstants } = useGetSidebar();
  const pathname = usePathname();

  const classes = useStyles();
  const [open, setOpen] = React.useState(sessionStorage.getItem("active"));

  const handleClick = (item) => {
    sessionStorage.setItem("active", open === item?.label ? "" : item?.label);
    setOpen((prev) => (prev === item?.label ? "" : item?.label));
    !item && toggleDrawer();
  };
  const handleClickMain = (item) => {
    sessionStorage.setItem("active", open === item?.label ? "" : item?.label);
    setOpen((prev) => (prev === item?.label ? "" : item?.label));
  };

  const { user, role_details, admin_role_details } = useSelector(
    (state) => state.auth
  );
  const isActive = (href) => pathname?.includes(href);

  // --------------------

  console.log({ drawerOpen });

  return (
    <Box sx={{ display: "flex", "& .MuiDrawer-paper": { border: "none" } }}>
      <Drawer
        sx={!drawerOpen ? { display: "none" } : { display: "block" }}
        variant="permanent"
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        className={classes.drawerMainMobile}
      >
        <Box className={classes.drawer}>
          <DrawerHeader>
            <Box className={classes.drawerHeader}>
              <Image src={Logo} />
            </Box>
          </DrawerHeader>
          <NavBarByRoles
            open={open}
            role_details={role_details}
            user={user}
            handleClick={handleClick}
            toggleDrawer={toggleDrawer}
            isActive={isActive}
          />
          <NavBarByRoleNCC
            open={open}
            role_details={role_details}
            user={user}
            handleClick={handleClick}
            toggleDrawer={toggleDrawer}
            isActive={isActive}
          />
          {admin_role_details !== "admin" && (
            <NavBarByRoleSuperadmin
              open={open}
              role_details={admin_role_details}
              user={user}
              handleClick={handleClick}
              toggleDrawer={toggleDrawer}
              isActive={isActive}
            />
          )}
          {user?.role_name !== "ncc" &&
            admin_role_details === "admin" &&
            SidebarConstants?.map((row, index) => (
              <List
                key={row?.header}
                subheader={
                  <Box sx={{ fontSize: "11px", padding: "5px 12px" }}>
                    {row?.header}{" "}
                  </Box>
                }
                sx={{ mb: "1rem" }}
              >
                {row?.items?.map((item, index) => {
                  const filterData = item?.roles?.includes(user?.role_name);
                  if (filterData) {
                    return (
                      <ListItem
                        key={item?.label}
                        disablePadding
                        sx={{ display: "block", paddingBottom: "5px" }}
                        className={classes.nav}
                      >
                        <Link
                          href={item?.children?.length ? "" : item?.url}
                          className={
                            isActive(item?.url) &&
                            (item?.children?.length
                              ? item?.children?.some((nestedItem) =>
                                  window.location.pathname.includes(
                                    nestedItem.url
                                  )
                                )
                                ? classes.activeClass
                                : {}
                              : classes.activeClass)
                          }
                        >
                          <ListItemButton
                            className={classes.listItemButton}
                            onClick={() =>
                              item?.children?.length !== 0
                                ? handleClick(item)
                                : handleClick()
                            }
                            style={{
                              background: open === item?.label && "#f6f6f6",
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: 2,
                                justifyContent: "center",
                              }}
                            >
                              <Image
                                style={{ height: "20px", width: "20px" }}
                                src={
                                  isActive(item?.url)
                                    ? item?.children?.length
                                      ? item?.children?.some((nestedItem) =>
                                          window.location.pathname.includes(
                                            nestedItem.url
                                          )
                                        )
                                        ? item?.activeIcon
                                        : item?.icon
                                      : item?.activeIcon
                                    : item?.icon
                                }
                              />
                            </ListItemIcon>

                            <ListItemText primary={item?.label} />
                            {item?.children?.length !== 0 && (
                              <ExpandMore
                                sx={{
                                  transition: "transform 0.3s",
                                  transform:
                                    open === item?.label
                                      ? "rotate(-180deg)"
                                      : "rotate(0deg)",
                                }}
                              />
                            )}
                          </ListItemButton>
                        </Link>

                        <Collapse
                          in={open === item?.label}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box className={classes.childContainer}>
                            {item?.children?.map((child, index) => (
                              <ChildComponent
                                child={child}
                                key={index}
                                classes={classes}
                                toggleDrawer={toggleDrawer}
                                isActive={isActive}
                              />
                            ))}
                          </Box>
                        </Collapse>
                      </ListItem>
                    );
                  } else return false;
                })}
              </List>
            ))}
        </Box>
      </Drawer>
    </Box>
  );
}

const NavBarByRoles = ({
  role_details,
  user,
  handleClick,
  open,
  toggleDrawer,
  isActive,
}) => {
  const classes = useStyles();
  const { SidebarConstants } = useGetSidebar();
  return (
    <>
      {user?.role_name === "ncc" &&
        role_details === "member" &&
        SidebarConstants?.map((row, index) => (
          <List
            key={row?.header}
            subheader={
              <Box sx={{ fontSize: "11px", padding: "5px 12px" }}>
                {row?.header}{" "}
              </Box>
            }
            sx={{ mb: "1rem" }}
          >
            {row?.items?.map((item, index) => {
              const filterData = item?.memberProfile?.includes("memberProfile");
              if (filterData) {
                return (
                  <ListItem
                    key={item?.label}
                    disablePadding
                    sx={{ display: "block", paddingBottom: "5px" }}
                    className={classes.nav}
                  >
                    <Link
                      href={item?.children?.length ? "" : item?.url}
                      className={
                        isActive(item?.url) &&
                        (item?.children?.length
                          ? item?.children?.some((nestedItem) =>
                              window.location.pathname.includes(nestedItem.url)
                            )
                            ? classes.activeClass
                            : {}
                          : classes.activeClass)
                      }
                    >
                      <ListItemButton
                        className={classes.listItemButton}
                        onClick={() =>
                          item?.children?.length !== 0
                            ? handleClick(item)
                            : handleClick()
                        }
                        style={{
                          background: open === item?.label && "#f6f6f6",
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: 2,
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            style={{ height: "20px", width: "20px" }}
                            src={
                              isActive(item?.url)
                                ? item?.children?.length
                                  ? item?.children?.some((nestedItem) =>
                                      window.location.pathname.includes(
                                        nestedItem.url
                                      )
                                    )
                                    ? item?.activeIcon
                                    : item?.icon
                                  : item?.activeIcon
                                : item?.icon
                            }
                          />
                        </ListItemIcon>

                        <ListItemText primary={item?.label} />
                        {item?.children?.length !== 0 && (
                          <ExpandMore
                            sx={{
                              transition: "transform 0.3s",
                              transform:
                                open === item?.label
                                  ? "rotate(-180deg)"
                                  : "rotate(0deg)",
                            }}
                          />
                        )}
                      </ListItemButton>
                    </Link>

                    <Collapse
                      in={open === item?.label}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box className={classes.childContainer}>
                        {item?.children?.map((child, index) => (
                          <ChildComponent
                            child={child}
                            key={index}
                            classes={classes}
                            toggleDrawer={toggleDrawer}
                            isActive={isActive}
                          />
                        ))}
                      </Box>
                    </Collapse>
                  </ListItem>
                );
              } else return false;
            })}
          </List>
        ))}{" "}
    </>
  );
};
const NavBarByRoleNCC = ({
  role_details,
  user,
  handleClick,
  open,
  toggleDrawer,
  isActive,
}) => {
  const classes = useStyles();
  const { SidebarConstants } = useGetSidebar();
  return (
    <>
      {user?.role_name === "ncc" &&
        role_details === "ncc" &&
        SidebarConstants?.map((row, index) => (
          <List
            key={row?.header}
            subheader={
              <Box sx={{ fontSize: "11px", padding: "5px 12px" }}>
                {row?.header}{" "}
              </Box>
            }
            sx={{ mb: "1rem" }}
          >
            {row?.items?.map((item, index) => {
              const filterData =
                item?.memberProfileNCC?.includes("memberProfileNCC");
              if (filterData) {
                return (
                  <ListItem
                    key={item?.label}
                    disablePadding
                    sx={{ display: "block", paddingBottom: "5px" }}
                    className={classes.nav}
                  >
                    <Link
                      href={item?.children?.length ? "" : item?.url}
                      className={
                        isActive(item?.url) &&
                        (item?.children?.length
                          ? item?.children?.some((nestedItem) =>
                              window.location.pathname.includes(nestedItem.url)
                            )
                            ? classes.activeClass
                            : {}
                          : classes.activeClass)
                      }
                    >
                      <ListItemButton
                        className={classes.listItemButton}
                        onClick={() =>
                          item?.children?.length !== 0
                            ? handleClick(item)
                            : handleClick()
                        }
                        style={{
                          background: open === item?.label && "#f6f6f6",
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: 2,
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            style={{ height: "20px", width: "20px" }}
                            src={
                              isActive(item?.url)
                                ? item?.children?.length
                                  ? item?.children?.some((nestedItem) =>
                                      window.location.pathname.includes(
                                        nestedItem.url
                                      )
                                    )
                                    ? item?.activeIcon
                                    : item?.icon
                                  : item?.activeIcon
                                : item?.icon
                            }
                          />
                        </ListItemIcon>
                        <ListItemText primary={item?.label} />

                        {item?.children?.length !== 0 && (
                          <ExpandMore
                            sx={{
                              transition: "transform 0.3s",
                              transform:
                                open === item?.label
                                  ? "rotate(-180deg)"
                                  : "rotate(0deg)",
                            }}
                          />
                        )}
                      </ListItemButton>
                    </Link>

                    <Collapse
                      in={open === item?.label}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box className={classes.childContainer}>
                        {item?.children?.map((child, index) => (
                          <ChildComponent
                            child={child}
                            key={index}
                            classes={classes}
                            toggleDrawer={toggleDrawer}
                            isActive={isActive}
                          />
                        ))}
                      </Box>
                    </Collapse>
                  </ListItem>
                );
              } else return false;
            })}
          </List>
        ))}{" "}
    </>
  );
};
const NavBarByRoleSuperadmin = ({
  admin_role_details,
  user,
  handleClick,
  open,
  toggleDrawer,
  isActive,
}) => {
  const classes = useStyles();
  const { SidebarConstants } = useGetSidebar();
  return (
    <>
      {(user?.role_name === "superadmin" || user?.role_name === "admin") &&
        SidebarConstants?.map((row, index) => (
          <List
            key={row?.header}
            subheader={
              <Box sx={{ fontSize: "11px", padding: "5px 12px" }}>
                {row?.header}{" "}
              </Box>
            }
            sx={{ mb: "1rem" }}
          >
            {row?.items?.map((item, index) => {
              const filterData = item?.adminProfile?.includes("adminProfile");
              if (filterData) {
                return (
                  <ListItem
                    key={item?.label}
                    disablePadding
                    sx={{ display: "block", paddingBottom: "5px" }}
                    className={classes.nav}
                  >
                    <Link
                      href={item?.children?.length ? "" : item?.url}
                      className={
                        isActive(item?.url) &&
                        (item?.children?.length
                          ? item?.children?.some((nestedItem) =>
                              window.location.pathname.includes(nestedItem.url)
                            )
                            ? classes.activeClass
                            : {}
                          : classes.activeClass)
                      }
                    >
                      <ListItemButton
                        className={classes.listItemButton}
                        onClick={() =>
                          item?.children?.length !== 0
                            ? handleClick(item)
                            : handleClick()
                        }
                        style={{
                          background: open === item?.label && "#f6f6f6",
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: 2,
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            style={{ height: "20px", width: "20px" }}
                            src={
                              isActive(item?.url)
                                ? item?.children?.length
                                  ? item?.children?.some((nestedItem) =>
                                      window.location.pathname.includes(
                                        nestedItem.url
                                      )
                                    )
                                    ? item?.activeIcon
                                    : item?.icon
                                  : item?.activeIcon
                                : item?.icon
                            }
                          />
                        </ListItemIcon>
                        <ListItemText primary={item?.label} />

                        {item?.children?.length !== 0 && (
                          <ExpandMore
                            sx={{
                              transition: "transform 0.3s",
                              transform:
                                open === item?.label
                                  ? "rotate(-180deg)"
                                  : "rotate(0deg)",
                            }}
                          />
                        )}
                      </ListItemButton>
                    </Link>

                    <Collapse
                      in={open === item?.label}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box className={classes.childContainer}>
                        {item?.children?.map((child, index) => (
                          <ChildComponent
                            toggleDrawer={toggleDrawer}
                            isActive={isActive}
                            child={child}
                            key={index}
                            classes={classes}
                            admin_role_details={admin_role_details}
                          />
                        ))}
                      </Box>
                    </Collapse>
                  </ListItem>
                );
              } else return false;
            })}
          </List>
        ))}{" "}
    </>
  );
};

const ChildComponent = ({
  child,
  classes,
  admin_role_details,
  role_details,
  toggleDrawer,
  isActive,
  main,
}) => {
  const { user } = useSelector((state) => state.auth);
  const filterData = child?.roles?.includes(user?.role_name);
  if (filterData) {
    return (
      <>
        <List
          key={child?.label}
          component="div"
          disablePadding
          sx={{ paddingBottom: "5px" }}
          className={classes.nav}
        >
          <Link onClick={() => (!main ? toggleDrawer() : "")} href={child?.url}>
            <ListItemButton
              className={[
                classes.listItemButtonChild,
                isActive(child?.url) && classes.activeChildClass,
              ]}
            >
              <ListItemText
                disableTypography
                primary={
                  <Typography variant="body2">{child?.label}</Typography>
                }
                className="active"
                primaryTypographyProps="h2"
              />
            </ListItemButton>
          </Link>
        </List>
      </>
    );
  } else return false;
};
