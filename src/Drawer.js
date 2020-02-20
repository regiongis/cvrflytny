import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

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

  const handleDrawer = props.handleDrawer;
  const filterCols = props.filterCols;
  const handleCheckedFilters = props.handleCheckedFilters;
  const reset = props.reset;
  const doFilter = props.doFilter;
  const filterWords = props.filterWords;

  const [opened, setOpened] = React.useState({
    status: false,
    postdistrikt: false,
    postnummer: false
  });

  
  const handleClick = text => { 
    setOpened({
      ...opened,
      [text]: !opened[text]
    });
  };
  

  const _list = (cols,key) => {
    return cols[key].map((col, index) => (
      <ListItem key={key + "_" + index} button className={classes.nested}>
        <ListItemText primary={Object.keys(col)[0]} />
        <ListItemSecondaryAction>
          <Checkbox
            checked={Object.values(col)[0]}
            onChange={(e) => handleCheckedFilters(key + "_" + Object.keys(col)[0], e)}
            edge="end"
          />
        </ListItemSecondaryAction>
      </ListItem>
    ));
  }
  const sideList = (categories, cols) => {
    let comps = {};
    categories.forEach(categorie => {
      if (cols[categorie]) {
        comps[categorie] = _list(cols,categorie);
      }  
    });
    
    return (
      <div className={classes.list} role="presentation">
        <List>
        <ListItem>
            <ListItemIcon>
              <Button variant="contained" color="primary" size="small" onClick={doFilter}>
                Filtrere
              </Button>
            </ListItemIcon>
            <ListItemSecondaryAction>
              <Button variant="contained" color="secondary" size="small" onClick={reset}>
                Nulstil
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <List dense>
          {categories.map((text, index) => (
            <React.Fragment key={"cat_"+index}>
              <ListItem button key={text} onClick={() => handleClick(text)}>
                <ListItemText primary={text} />
                {opened[text] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={opened[text]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding dense>
                  {comps[text]}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </div>
    );
  };

  return (
    <div>
      {/* <Button onClick={toggleDrawer('right', true)}>Open Right</Button> */}
      <Drawer anchor="right" open={props.drawerOpen} onClose={handleDrawer}>
        {sideList(filterWords, filterCols)}
      </Drawer>
    </div>
  );
}
