import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const Url = "https://myadmin.rightfx.com/ajaxfiles";
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [Slidebarinfo, setSlidebarinfo] = useState({
    data: [],
  });
  const [open, setOpen] = useState({
    operation: false,
    trading: false,
  });

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 900px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 900px)");
    const handleMediaQueryChange = (e) => {
      if (isCollapsed == false) {
        setMatches(true);
        setIsCollapsed(false);
        console.log("if");
      } else if (isCollapsed == true) {
        setMatches(false);
        console.log("else");
      }
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    const param = new FormData();
    param.append("action", "sidebar_menus");
    param.append("is_app", 1);
    param.append("AADMIN_LOGIN_ID", 1);
    param.append("role_id", 1);
    axios.post(Url + "/menu_manage.php", param).then((res) => {
      if (res.data.status == "error1") {
        toast(res.data.message);
      }
      Slidebarinfo.data = res.data.data;
      setSlidebarinfo({ ...Slidebarinfo });
      // console.log(Slidebarinfo.data);
    });
  }, []);

  const handleClick = (e) => {
    setOpen((preValue) => {
      return {
        ...preValue,
        [e]: !open[e],
      };
    });
  };
  // console.log("isCollapsed", isCollapsed);
  // console.log("matches", matches);

  return (
    <div>
      <Box position="absolute" margin="22px 10px">
        <MenuOutlinedIcon
          onClick={() => {
            setMatches(true);
            setIsCollapsed(!isCollapsed);
          }}
        />
      </Box>

      <div style={{ display: ` ${matches ? "unset" : "none"}` }}>
        <Box
          sx={{
            "& .pro-sidebar-inner": {
              background: `${colors.primary[400]} !important`,
            },
            "& .pro-icon-wrapper": {
              backgroundColor: "transparent !important",
            },
            "& .pro-inner-item": {
              padding: "5px 35px 5px 20px !important",
            },
            "& .pro-inner-item:hover": {
              color: "#868dfb !important",
            },
            "& .pro-menu-item.active": {
              color: "#6870fa !important",
            },
          }}
        >
          <ProSidebar collapsed={isCollapsed}>
            <Menu iconShape="square">
              {/* LOGO AND MENU ICON */}
              <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{
                  margin: "10px 0 20px 0",
                  color: colors.grey[100],
                }}
              >
                {!isCollapsed && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px"
                  >
                    <Typography variant="h3" color={colors.grey[100]}>
                      ADMINIS
                    </Typography>
                    <IconButton
                      onClick={() => {
                        setIsCollapsed(!isCollapsed);
                        if (window.innerWidth <= 900) {
                          setMatches(false);
                        }
                      }}
                    >
                      <MenuOpenRoundedIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>

              {!isCollapsed && (
                <Box mb="25px">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img
                      alt="profile-user"
                      width="100px"
                      height="100px"
                      src={`https://cdn-icons-png.flaticon.com/512/3135/3135715.png`}
                      style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                  </Box>
                  <Box textAlign="center">
                    <Typography
                      variant="h2"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      sx={{ m: "10px 0 0 0" }}
                    >
                      ADMIN
                    </Typography>
                    <Typography variant="h5" color={colors.greenAccent[500]}>
                      VP Fancy Admin
                    </Typography>
                  </Box>
                </Box>
              )}
              {Slidebarinfo.data.map((item) => {
                {
                  if (item.sub_menu_list.length > 1) {
                    return (
                      <div className="">
                        <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                          <li>
                            <a
                              className={`${
                                open[item.menu_id] == true ? "active" : ""
                              } removeBefore`}
                              onClick={() => handleClick(item.menu_id)}
                            >
                              <div className="d-flex align-items-center justify-content-between">
                                <Item
                                  title={item.menu_name}
                                  to={item.menu_url}
                                  icon={
                                    <span className="material-symbols-outlined">
                                      {item.icon_class}
                                    </span>
                                  }
                                  selected={selected}
                                  setSelected={setSelected}
                                />
                                {/* {console.log(item.menu_id)} */}
                                <span className="sidebar-icon-indicator">
                                  {open[item.menu_id] == true ? (
                                    <ExpandLess />
                                  ) : (
                                    <ExpandMore />
                                  )}
                                </span>
                              </div>
                            </a>
                            <Collapse
                              className="mx-4 mb-2"
                              in={open[item.menu_id]}
                              timeout="auto"
                              unmountOnExit
                            >
                              {item.sub_menu_list.map((itemm) => {
                                return (
                                  <Item
                                    title={itemm.menu_name}
                                    to={itemm.menu_url}
                                    selected={selected}
                                    setSelected={setSelected}
                                  />
                                );
                              })}
                            </Collapse>
                          </li>
                        </Box>
                      </div>
                    );
                  } else if (item.sub_menu_list.length >= 0) {
                    return (
                      <div className="">
                        <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                          <Item
                            title={item.menu_name}
                            to={item.menu_url}
                            icon={
                              <span className="material-symbols-outlined">
                                {item.icon_class}
                              </span>
                            }
                            selected={selected}
                            setSelected={setSelected}
                          />
                        </Box>
                      </div>
                    );
                  }
                }
              })}
            </Menu>
          </ProSidebar>
        </Box>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Sidebar;
