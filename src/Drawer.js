import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
// import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
// import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";
import Collapse from "@material-ui/core/Collapse";
// import StarBorder from "@material-ui/icons/StarBorder";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles({
  list: {
    width: 450
  },
  fullList: {
    width: "auto"
  },
  nested: {
    paddingLeft: 30
  }
});

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  //   const [state, setState] = React.useState({
  //     top: false,
  //     left: false,
  //     bottom: false,
  //     right: false
  //   });

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  //   const toggleDrawer = (side, open) => event => {
  //     if (
  //       event.type === "keydown" &&
  //       (event.key === "Tab" || event.key === "Shift")
  //     ) {
  //       return;
  //     }

  //     setState({ ...state, [side]: open });
  //   };

  const handleDrawer = props.handleDrawer;
  const filterCols = props.filterCols;

  // console.log(filterCols);

  const sideList = (side, cols) => {
    // let c = cols["status"];
    // c.push("hello");
    // console.log("length ", cols["status"]); //TODO: solve this strange undefined!!!!!!
    let comps = [];
    if (cols["status"]) {
      comps = cols["status"].map((col, index) => (
        <ListItem button className={classes.nested}>
          <ListItemText primary={col} />
          <ListItemSecondaryAction>
            <Checkbox edge="end" />
          </ListItemSecondaryAction>
        </ListItem>
      ));
    }
    return (
      <div
        className={classes.list}
        role="presentation"
        // onClick={handleDrawer}
        // onKeyDown={handleDrawer}
      >
        <List>
          {["status", "postdistrikt", "postnummer"].map((text, index) => (
            <>
              <ListItem button key={text}>
                {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
                <ListItemText primary={text} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {comps}
                </List>
              </Collapse>
              {
                //console.log(filterCols[text]);
                //cols[text].map((col, index) => (
                // <Collapse in={open} timeout="auto" unmountOnExit>
                //   <List component="div" disablePadding>
                //     {cols["status"].map((col, index) => (
                //       <ListItem button className={classes.nested}>
                //         <ListItemText primary={col} />
                //         <ListItemSecondaryAction>
                //           <Checkbox edge="end" />
                //         </ListItemSecondaryAction>
                //       </ListItem>
                //     ))}
                //   </List>
                // </Collapse>
                //))
              }
            </>
          ))}
          <ListItem button onClick={handleClick}>
            {/* <ListItemIcon>
                <InboxIcon />
              </ListItemIcon> */}
            <ListItemText primary="Inbox" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                {/* <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon> */}
                <ListItemText primary="Starred" />
                <ListItemSecondaryAction>
                  <Checkbox edge="end" />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    );
  };

  return (
    <div>
      {/* <Button onClick={toggleDrawer('right', true)}>Open Right</Button> */}
      <Drawer anchor="right" open={props.drawerOpen} onClose={handleDrawer}>
        {sideList("right", filterCols)}
      </Drawer>
    </div>
  );
}
