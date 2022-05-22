import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useNavigate, useLocation } from "react-router-dom";
import { makeStyles, styled } from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Hidden from "@mui/material/Hidden";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import sessionHelper from "../services/sessionHelper";
import configData from "../config/config.json";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    borderRight: "none",
    backgroundColor: `${theme.palette.secondary.main} !important`,
    width: drawerWidth,
    overflow: "auto",
  },
  closeIcon: {
    top: 0,
    right: 0,
    height: 40,
    width: 40,
  },
  listItem: {
    marginBottom: 20,
  },
  link: {
    textAlign: "left",
    fontWeight: 400,
    color: theme.palette.secondary.label,
    textDecoration: "none",
    cursor: "pointer",
  },
  selectedCell: {
    backgroundColor: theme.palette.secondary.dark,
  },
  selectedCellText: {
    color: `${theme.palette.common.white} !important`,
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const IconMap = {
  reports: <FolderOpenIcon style={{ color: "#EEEEEEB3" }} />,
  platform: <FolderOpenIcon style={{ color: "#EEEEEEB3" }} />,
  api: <FolderOpenIcon style={{ color: "#EEEEEEB3" }} />,
  role: <FolderOpenIcon style={{ color: "#EEEEEEB3" }} />,
  brand: <FolderOpenIcon style={{ color: "#EEEEEEB3" }} />,
  user: <PersonOutlineIcon style={{ color: "#EEEEEEB3" }} />,
};

const Sidebar = ({ open, onToggleOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const [selectedMenu, setSelectedMenu] = React.useState(0);
  const [selectedSubmenu, setSelectedSubmenuMenu] = React.useState(0);
  const [list, setList] = React.useState({});

  const handleChange = (index) => {
    setSelectedMenu(index);
    setSelectedSubmenuMenu(null);
  };

  const handleClick = (url, index) => {
    navigate(url);
    setSelectedSubmenuMenu(index);
  };

  React.useEffect(() => {
    const _list = [];

    for (const link of Object.keys(configData.sideBarLinks)) {
      const menu = configData.sideBarLinks[link].menu.filter((menuItem) =>
        // sessionHelper.allowedLinksURLArr.includes(menuItem?.serverURL)
        menuItem?.serverURL
      );

      if (menu?.length)
        _list[link] = {
          ...configData.sideBarLinks[link],
          menu,
        };
    }

    const url = location.pathname.split("/")[1];

    Object.keys(_list).includes(url) &&
      setSelectedMenu(Object.keys(_list).indexOf(url));

    setSelectedSubmenuMenu(null);

    setList(_list);
  }, []);

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      classes={{ paper: classes.drawerPaper }}
    >
      <Hidden smUp>
        <DrawerHeader>
          <IconButton onClick={onToggleOpen} className={classes.closeIcon}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
      </Hidden>
      <List>
        {Object.keys(list).map((link, index) => (
          <Box key={index}>
            <ListItemButton onClick={() => handleChange(index)}>
              <ListItemIcon>
                {IconMap[link] || (
                  <FolderOpenIcon style={{ color: "#EEEEEEB3" }} />
                )}
              </ListItemIcon>
              <ListItemText
                className={classNames(classes.link, {
                  [classes.selectedCellText]: index === selectedMenu,
                })}
                primary={list[link].title}
              />
              {index === selectedMenu ? (
                <ExpandLess className={classes.link} />
              ) : (
                <ExpandMore className={classes.link} />
              )}
            </ListItemButton>
            <Collapse in={index === selectedMenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {list[link].menu.map((menuItem, index) => (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    key={index}
                    onClick={() => handleClick(menuItem.url, index)}
                    className={classNames({
                      [classes.selectedCell]: index === selectedSubmenu,
                    })}
                  >
                    <ListItemIcon />
                    <ListItemText
                      className={classNames(classes.link, {
                        [classes.selectedCellText]: index === selectedSubmenu,
                      })}
                      primary={menuItem.title}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Drawer>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool,
  onToggleOpen: PropTypes.func,
};

Sidebar.defaultProps = {
  open: true,
};

export default Sidebar;
export { drawerWidth };
