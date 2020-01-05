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

let checkedObj = {
  status: [],
  postdistrikt: [],
  postnummer: []
}

export default function TemporaryDrawer(props) {
  const classes = useStyles();

  const handleDrawer = props.handleDrawer;
  const filterCols = props.filterCols;
  const onDataFiltered = props.onDataFiltered;
  const handleCheckedFilters = props.handleCheckedFilters;

  const [opened, setOpened] = React.useState({
    status: false,
    postdistrikt: false,
    postnummer: false
  });

  const [checked, setChecked] = React.useState({
    status: [],
    postdistrikt: [],
    postnummer: []
  });

  

  const handleClick = text => { 
    setOpened({
      ...opened,
      [text]: !opened[text]
    });
  };
  /*
  TODO: - checkboxes must be marked on collapse : controlled inputs
        - move the checked state in the App component!
  
  */
  const handleChecked = text => event => { console.log('called with ', text);
    let isChecked = event.target.checked;
    let [group, name] = text.split("_");
    if (isChecked) {
      // if not in the array, add it!!
      // if (checked[group].indexOf(name) === -1) {
      //   setChecked({
      //     ...checked,
      //     [group]: [...checked[group], name]
      //   });
      // }
      if (checkedObj[group].indexOf(name) === -1) { console.log(name, ' not found');
      console.log(checkedObj[group]);
      checkedObj[group].push(name);
      console.log(checkedObj[group]);
        // checkedObj= {
        //   ...checkedObj,
        //   [group]: [...checkedObj[group], name]
        // };
      }
      // if (checked[group].indexOf(name) === -1) {
      //   setChecked({
      //     ...checked,
      //     [group]: [...checked[group], name]
      //   });
      // }
    } else {
      // if in the array, remove it!!
      let index = checkedObj[group].indexOf(name);
      if (index !== -1) {
        checkedObj[group].splice(index,1);
        // let temp = [
        //   ...checkedObj[group].slice(0, index),
        //   ...checkedObj[group].slice(index + 1)
        // ];
        // setChecked({
        //   ...checked,
        //   [group]: [...temp]
        // });
        // checkedObj = {
        //   ...checkedObj,
        //   [group]: [...temp]
        // }
      }
    }
    // invoke method on parent component to update the data
    onDataFiltered(checkedObj);
  };

  const sideList = (side, cols) => {
    let comps = {};
    if (cols["status"]) {
      comps["status"] = cols["status"].map((col, index) => (
        <ListItem button className={classes.nested}>
          <ListItemText primary={Object.keys(col)[0]} />
          <ListItemSecondaryAction>
            <Checkbox
              checked={Object.values(col)[0]}
              onChange={(e) => handleCheckedFilters("status_" + Object.keys(col)[0], e)}
              edge="end"
            />
          </ListItemSecondaryAction>
        </ListItem>
      ));
    }
    if (cols["postdistrikt"]) {
      comps["postdistrikt"] = cols["postdistrikt"].map((col, index) => (
        <ListItem button className={classes.nested}>
          <ListItemText primary={Object.keys(col)[0]} />
          <ListItemSecondaryAction>
            <Checkbox
              checked={Object.values(col)[0]}
              onChange={(e) => handleCheckedFilters("postdistrikt_" + Object.keys(col)[0], e)}
              edge="end"
            />
          </ListItemSecondaryAction>
        </ListItem>
      ));
    }
    if (cols["postnummer"]) {
      comps["postnummer"] = cols["postnummer"].map((col, index) => (
        <ListItem button className={classes.nested}>
          <ListItemText primary={Object.keys(col)[0]} />
          <ListItemSecondaryAction>
            <Checkbox
              checked={Object.values(col)[0]}
              onChange={(e) => handleCheckedFilters("postnummer_" + Object.keys(col)[0], e)}
              edge="end"
            />
          </ListItemSecondaryAction>
        </ListItem>
      ));
    }
    return (
      <div className={classes.list} role="presentation">
        <List dense>
          <ListItem>
            <ListItemText primary="100 ud af 300 filtreret" />
            <ListItemSecondaryAction>
              <Checkbox edge="end" />
            </ListItemSecondaryAction>
          </ListItem>
          {["status", "postdistrikt", "postnummer"].map((text, index) => (
            <>
              <ListItem button key={text} onClick={() => handleClick(text)}>
                <ListItemText primary={text} />
                {opened[text] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={opened[text]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding dense>
                  {comps[text]}
                </List>
              </Collapse>
            </>
          ))}
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
