import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";

import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import moment from "moment";
import "moment/locale/da";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CloudDownload from "@material-ui/icons/CloudDownload";
import Map from "@material-ui/icons/Map";
import TableChart from "@material-ui/icons/TableChart";
import BarChart from "@material-ui/icons/BarChart";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DatePicker } from "@material-ui/pickers";
import MapData from "./Map.js";
import GridData from "./Grid.js";
import GraphData from "./Graph.js";

import "./App.css";
import classnames from "classnames";
import ReactExport from "react-data-export";
import jQuery from "jquery";
import { navigate } from "@reach/router";
import FilterListIcon from "@material-ui/icons/FilterList";
import TemporaryDrawer from "./Drawer";

moment.locale("da");

/*
TODO:
1. use the filtered list to update the data -- done
2. add reset btn to the list -- done
3. Filteredrows to update csv_data. now excel is up to date -- done
3. Finish the table component to the extra requested columns -- need to be done
4. Fix map renderfeatures when data is empty
5. make list to filter generic, not hard coded
*/

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 300
  },
  progress: {
    margin: theme.spacing(1) * 2
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
});

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  }
});

//TODO: complete the select  comp!!!
function uniqueValues(colValues) {
  let vals = [...new Set(colValues)];
  // console.log(vals);
  return vals;
}

function uniqueValuesGroupedByKey(arrOfObj, keys) {
  // const keys = Object.keys(arrOfObj[0]);
  //console.log(keys);
  let ret = {};

  function uniqueElemsOfSameKey(_arrOfObj, key) {
    const values = _arrOfObj.map(elem => elem[key]);
    let ret  = uniqueValues(values);
    ret = ret.map(elem => ({[elem] :false}));
    return ret;
  }

  keys.forEach(key => {
    ret[key] = uniqueElemsOfSameKey(arrOfObj, key);
  });

  return ret;
}

function TabContainer(props) {
  return <div>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      startDate: moment()
        .subtract(1, "months")
        .startOf("month")
        .format("YYYY-MM-DD"),
      endDate: moment()
        .subtract(1, "months")
        .endOf("month")
        .format("YYYY-MM-DD"),
      data: [],
      kommuner: [],
      komkode: this.props.komnr, //'165',
     
      csvData: [], // used for Excel print
      loading: true,
      completed: 0,
      canSendRequest: false,
      filterOpen: false,
      drawerOpen: false,
      
      uniqueVals: {},
      /*
      This is the data which will be rendered and printed by the excel component.
      All filtering will act on this array. 
      The reset button will reset this arrat to 
              dataToRender = this.state.data or this.state.csvData;
      */
      dataToRender: [] 
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDoneClick = this.handleDoneClick.bind(this);
    this.handleFilterOpen = this.handleFilterOpen.bind(this);
    this.handleFilterClose = this.handleFilterClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleCheckedFilters = this.handleCheckedFilters.bind(this);
    this.reset = this.reset.bind(this);
    this.updateRenderDataFromTable = this.updateRenderDataFromTable.bind(this);
    this.doFilter = this.doFilter.bind(this);
  }

  doFilter(){
    const uniqueVals = this.state.uniqueVals;
    const filteredCategories = Object.keys(uniqueVals);
    // console.log(filteredCategories);
    let filters = {};
     filteredCategories.forEach(cat =>{
      let temp = uniqueVals[cat];
      // console.log(temp)
      filters[cat] = temp.filter(obj => {
        return Object.values(obj)[0] === true;
      })
     .map(elem => {
        return Object.keys(elem)[0];
      }); 
     });
     const dataToRender = this.state.dataToRender;
     const data = dataToRender.filter(row => {
      let res = true;
      filteredCategories.forEach(key =>{
      //  console.log(row.properties[key]);
      if(filters[key].length > 0 
        && filters[key].indexOf(row.properties[key]) === -1)
             res = false;
      });
      return res;
     });
     this.setState({dataToRender : data});
     
  }

  updateRenderDataFromTable(filteredRows){
    this.setState({csvData: filteredRows});
  }

  reset(){
    this.setState({
      dataToRender: this.state.data, 
      uniqueVals: uniqueValuesGroupedByKey(
        this.state.data.map(feature => feature.properties), 
        [
        "status",
        "postnummer",
        "postdistrikt"
      ])
    });
  }

  handleCheckedFilters(text, event){ //console.log('called with => ', text)
    let [group, name] = text.split("_");
    let checkedGroup = this.state.uniqueVals[group];
    let indexToUpdate = checkedGroup.findIndex(elem => Object.keys(elem)[0] === name);
    let elementToUpdate = checkedGroup[indexToUpdate];
    //Toggle to false or true
    elementToUpdate[name] = !elementToUpdate[name];

    this.setState({uniqueVals:{
      ...this.state.uniqueVals,
      [group]: [
        ...checkedGroup.slice(0,indexToUpdate),
        elementToUpdate,
        ...checkedGroup.slice(indexToUpdate+1)
      ]
    }});
  }

  handleFilterOpen() {
    this.setState({ filterOpen: !this.state.filterOpen });
  }

  handleDrawerOpen() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  handleFilterClose() {
    this.setState({ filterOpen: false });
  }

  getKommuner() {
    let komUrl =
      "https://drayton.mapcentia.com/api/v1/sql/ballerup?q=select right(komkode, 3)::int komkode, " +
      "komnavn from data.kommune group by komkode, komnavn order by komnavn";
    komUrl = "kom.json";
    let that = this;
    jQuery.ajax({
      url: komUrl,
      type: "GET",
      dataType: "json",
      success: function(res) {
        let koms = res.features.map(feature => feature.properties);
        that.setState(preveState => ({ kommuner: koms }));
      }
    });
  }

  getData(komkode, startDate, endDate) {
    this.setState(preveState => ({ csvData: [], loading: true }));
    let that = this;
    if (!komkode) {
      this.setState({ loading: false });
      return;
    }
    let dataUrl =
      "https://drayton.mapcentia.com/api/v1/sql/ballerup?q=SELECT * FROM cvr.flyt_fad_dev(" +
      komkode +
      ",'2019-08-01','2019-08-31')&srs=4326";
    dataUrl = "data.json";
    // console.log(dataUrl);
    jQuery.ajax({
      url: dataUrl,
      type: "GET",
      dataType: "json",
      success: function(res) {
        //that.setState(preveState => ({ data: res.features }));
        // console.log(res.features);
        let csv = res.features.map(feature => feature.properties);
        that.setState(prevState => ({
          csvData: csv,
          data: res.features,
          dataToRender: res.features,
          loading: false,
          uniqueVals: uniqueValuesGroupedByKey(csv, [
            "status",
            "postnummer",
            "postdistrikt"
          ])
        }));
      }
    });
  }

  handleSelect(event) {
    event.persist();
    this.setState(prevState => ({ komkode: event.target.value }));
  }

  componentDidMount() {
    let { komkode, startDate, endDate } = this.state;
    this.getData(komkode, startDate, endDate);
    this.getKommuner();
  }

  componentWillUnmount() {
    //clearInterval(this.timer);
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  handleDoneClick() {
    let { komkode, startDate, endDate } = this.state;
    this.getData(komkode, startDate, endDate);
    navigate("#/" + komkode);
  }

  handleStart(date) {
    this.setState({
      startDate: date.format("YYYY-MM-DD")
    });
  }

  handleEnd(date) {
    this.setState({
      endDate: date.format("YYYY-MM-DD")
    });
  }

  render() {
    const { value, startDate, endDate, kommuner, komkode } = this.state;
    const locale = "da";
    return (
      <MuiThemeProvider theme={theme}>
        <div className="app">
          <div className={this.state.loading ? "loading" : ""}></div>
          
          <TemporaryDrawer
            handleDrawer={this.handleDrawerOpen}
            drawerOpen={this.state.drawerOpen}
            filterCols={this.state.uniqueVals}
            handleCheckedFilters={this.handleCheckedFilters}
            reset={this.reset}
            doFilter={this.doFilter}
          />
          <div className="">
            <AppBar position="static" color="default">
              <Toolbar>
                <Grid container /*spacing={}*/>
                  <Grid item xs={2}>
                    <Typography variant="h6" color="inherit">
                      CVR Flyttemønster
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <form
                      className={classnames.container}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="standard-select"
                        select
                        label="Kommune"
                        placeholder="Placeholder"
                        className={classnames.textField}
                        value={this.state.komkode || ""}
                        onChange={this.handleSelect}
                        SelectProps={{
                          native: true
                        }}
                        helperText=""
                        InputLabelProps={{ shrink: true }}
                      >
                        {kommuner.map(kom => {
                          let selected =
                            this.state.komkode === kom.komkode
                              ? "selected"
                              : false;
                          // if (selected) console.log(kom.komnavn);
                          return (
                            <option key={kom.komkode} value={kom.komkode}>
                              {kom.komnavn}
                            </option>
                          );
                        })}
                      </TextField>
                    </form>
                  </Grid>
                  <Grid item xs={2}>
                    <MuiPickersUtilsProvider
                      utils={MomentUtils}
                      locale={locale}
                      moment={moment}
                    >
                      <DatePicker
                        value={startDate}
                        label="Startdato"
                        format="DD MMM YYYY"
                        onChange={this.handleStart}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={2}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DatePicker
                        value={endDate}
                        label="Slutdato"
                        format="DD MMM YYYY"
                        onChange={this.handleEnd}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      arial-label="Done"
                      onClick={this.handleDoneClick}
                    >
                      <DoneIcon />
                    </IconButton>
                  </Grid>

                  <Grid item xs={2}>
                    <IconButton
                      arial-label="Filter"
                      onClick={this.handleDrawerOpen}
                    >
                      <FilterListIcon />
                    </IconButton>
                  </Grid>

                  <Grid item xs={2}>
                    {this.state.csvData.length > 0 && (
                      <ExcelFile
                        element={
                          <IconButton arial-label="Excel">
                            <CloudDownload />
                          </IconButton>
                        }
                        filename={
                          "export_" + komkode + "_" + startDate + "_" + endDate
                        }
                      >
                        <ExcelSheet data={this.state.csvData} name="CVR">
                          <ExcelColumn label="Status" value="status" />
                          <ExcelColumn label="CVR nummer" value="cvr-nummer" />
                          <ExcelColumn label="P nummer" value="p-nummer" />
                          <ExcelColumn label="Branche" value="hovedbranche" />
                          <ExcelColumn label="Virksomhedsnavn" value="navn" />
                          <ExcelColumn
                            label="Kontaktperson"
                            value="fuldt ansvarlige deltagere"
                          />
                          <ExcelColumn
                            label="Kommunekode"
                            value="kommunekode"
                          />
                          <ExcelColumn label="vejnavn" value="vejnavn" />
                          <ExcelColumn label="Husnummer" value="husnummer" />
                          <ExcelColumn label="Postnummer" value="postnummer" />
                          <ExcelColumn label="By" value="postdistrikt" />
                          <ExcelColumn label="Email" value="emailadresse" />
                          <ExcelColumn
                            label="Indlæst dato"
                            value="indlæst dato"
                          />
                        </ExcelSheet>
                      </ExcelFile>
                    )}
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>

            <Tabs value={value} onChange={this.handleChange} centered>
              <Tab
                icon={
                  <Tooltip title="Kort">
                    <Map />
                  </Tooltip>
                }
              />
              <Tab
                icon={
                  <Tooltip title="Tabel">
                    <TableChart />
                  </Tooltip>
                }
                aria-label="Tabel"
              />
              <Tab
                icon={
                  <Tooltip title="Grapher">
                    <BarChart />
                  </Tooltip>
                }
              />
              
            </Tabs>
            {value === 0 && (
              <TabContainer>
                <MapData data={this.state.dataToRender} />
              </TabContainer>
            )}
            {value === 1 && (
              <TabContainer>
                <GridData data={this.state.dataToRender} updateData={this.updateRenderDataFromTable}/>
              </TabContainer>
            )}
            {value === 2 && (
              <TabContainer>
                <GraphData data={this.state.dataToRender} />
              </TabContainer>
            )}
          </div>
        </div>
   
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);

