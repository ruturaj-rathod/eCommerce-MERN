import React, { Fragment, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Toolbar,
  Typography,
  // makeStyles,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

// const useStyles = makeStyles(() => ({
//   link: { textDecoration: "none", color: "blue", fontSize: "20px" },
//   icon: { color: "white" },
//   logo: { flexGrow: "1", cursor: "pointer" },
//   draw: { background: "red" },
// }));

const DrawerComponent = () => {
  // const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Fragment>
      <Drawer
        anchor="left"
        sx={{ width: 250, color: "#fff" }}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Toolbar sx={{ background: "primary.main" }}>
          <Typography varaint="h4" mx={2}>
            Ecommerce
          </Typography>
          <CloseIcon onClick={() => setOpenDrawer(false)} />
        </Toolbar>
        <box sx={{ bgColor: "primary.main" }} height="100vh">
          <List height="100vh">
            <Divider />
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/" className="sx-nav-link">
                  Home
                </Link>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/products" className="sx-nav-link">
                  product
                </Link>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/" className="sx-nav-link" >
                  contact
                </Link>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/" className="sx-nav-link" >
                  About
                </Link>
              </ListItemText>
            </ListItem>
            <Divider />
          </List>
        </box>
      </Drawer>
      <IconButton
      className="menu-icon"
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon/>
      </IconButton>
    </Fragment>
  );
};

export default DrawerComponent;
