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
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import CircularProgress from '@material-ui/core/CircularProgress';
//import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import "moment/locale/da";
// import Select from '@material-ui/core/Select';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
// import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';
import CloudDownload from "@material-ui/icons/CloudDownload";
import Map from "@material-ui/icons/Map";
import TableChart from "@material-ui/icons/TableChart";
import BarChart from "@material-ui/icons/BarChart";
// import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DatePicker } from "@material-ui/pickers";
//import {hot} from 'react-hot-loader';
import MapData from "./Map.js";
import GridData from "./Grid.js";
import GraphData from "./Graph.js";
//import DataTable from "./DataTable";
// import MaterialGrid from "./MaterialGrid";
import "./App.css";
import classnames from "classnames";
import ReactExport from "react-data-export";
import jQuery from "jquery";
import { navigate } from "@reach/router";
import FilterListIcon from "@material-ui/icons/FilterList";
// import FilterComponent from "./FilterComponent";
import TemporaryDrawer from "./Drawer";

moment.locale("da");

/*
TODO:
1. use the filtered list to update the data
2. add reset btn to the list
3. Finish the table component to the extra requested columns
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
    // console.log("komrn ", this.props.komnr);
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
      filteredData: [],
      kommuner: [],
      komkode: this.props.komnr, //'165',
      Fraflytter: true,
      Tilflytter: true,
      Ophørt: true,
      Nystartet: true,
      csvData: [],
      loading: true,
      completed: 0,
      canSendRequest: false,
      filterOpen: false,
      drawerOpen: false,
      fieldsToFilter: {
        cols: [
          "status",
          "hovedbranche",
          "vejnavn",
          "postnummer",
          "postdistrikt",
          "cvr-nummer"
        ],
        _data: {
          status: [],
          hovedbranche: [],
          vejnavn: [],
          postnummer: [],
          postdistrikt: [],
          "cvr-nummer": []
        }
      },
      uniqueVals: {},
      afterFilter: []
    };

    this.theData = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.progress = this.progress.bind(this);
    this.handleDoneClick = this.handleDoneClick.bind(this);
    this.handleFilterOpen = this.handleFilterOpen.bind(this);
    this.handleFilterClose = this.handleFilterClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDataAfterFilter = this.handleDataAfterFilter.bind(this);
    this.handleCheckedFilters = this.handleCheckedFilters.bind(this);
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

  handleDataAfterFilter(filteredObj) { console.log(filteredObj);
    let keys = Object.keys(filteredObj).filter(key => {
      return filteredObj[key].length > 0;
    });
    let data = [];
    this.state.data.forEach(row => {
      keys.forEach(key => {// console.log('key =>', row.properties[key]);
        if (filteredObj[key][0] === row.properties[key]) {
          // console.log(row);
          data.push(row);
        }
      });
    });
    //remove eventual duplicates
    data = [...new Set(data)];
    this.setState({ _data: data }, function(){
      // console.log(this.state._data)
    });
    
  }
  progress() {
    //console.log();
    let comp = this.state.completed;
    this.setState({ completed: comp >= 100 ? 0 : comp + 1 });
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

  getCsv() {
    const csv = this.state.data.map(feature => {
      let s = feature.properties["fuldt ansvarlige deltagere"];
      if (s !== null && s.length > 0) {
        feature.properties["fuldt ansvarlige deltagere"] = s.replace(/"/g, "");
      }
      return feature.properties;
    });
    return csv;
  }

  filterData(feature) {
    const { Fraflytter, Tilflytter, Ophørt, Nystartet } = this.state;
    const checked = [];
    if (Fraflytter) checked.push("Fraflytter");
    if (Tilflytter) checked.push("Tilflytter");
    if (Ophørt) checked.push("Ophørt");
    if (Nystartet) checked.push("Nystartet");
    return checked.indexOf(feature.properties.status) > -1;
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
        that.setState(preveState => ({ data: res.features }));
        // console.log(res.features);
        let csv = res.features.map(feature => feature.properties);
        that.setState(prevState => ({
          csvData: csv,
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

  handleChecked(event) {
    event.persist();
    let { data, Fraflytter, Tilflytter, Ophørt, Nystartet } = this.state;
    this.setState(
      preveState => ({ [event.target.value]: event.target.checked }),
      () => {
        Fraflytter = this.state.Fraflytter;
        Tilflytter = this.state.Tilflytter;
        Ophørt = this.state.Ophørt;
        Nystartet = this.state.Nystartet;
      }
    );

    const _checked = [];
    if (Fraflytter) _checked.push("Fraflytter");
    if (Tilflytter) _checked.push("Tilflytter");
    if (Ophørt) _checked.push("Ophørt");
    if (Nystartet) _checked.push("Nystartet");

    let newData = data.filter(feature => {
      // console.log(feature.properties.status);
      return _checked.indexOf(feature.properties.status) > -1;
    });

    this.setState({ data: newData });
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
    // console.log("before navigating");
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
    // console.log("props from router => ", this.props.komnr);
    const { value, startDate, endDate, kommuner, komkode } = this.state;
    const locale = "da";
    // console.log(this.state.uniqueVals);
    return (
      <MuiThemeProvider theme={theme}>
        <div className="app">
          <div className={this.state.loading ? "loading" : ""}></div>
          {/* <FilterComponent
            open={this.state.filterOpen}
            handleOpen={this.handleFilterOpen}
          /> */}
          <TemporaryDrawer
            handleDrawer={this.handleDrawerOpen}
            drawerOpen={this.state.drawerOpen}
            filterCols={this.state.uniqueVals}
            onDataFiltered={this.handleDataAfterFilter}
            handleCheckedFilters={this.handleCheckedFilters}
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
              {/* <Tab icon={
                                    <Tooltip title="DataTable">
                                        <DataTable/>
                                  </Tooltip>
                                
                                } /> */}
            </Tabs>
            {value === 0 && (
              <TabContainer>
                <MapData data={this.state.data} />
              </TabContainer>
            )}
            {value === 1 && (
              <TabContainer>
                <GridData data={this.state.data} />
                {/* <MaterialGrid data={this.state.data} /> */}
              </TabContainer>
            )}
            {value === 2 && (
              <TabContainer>
                <GraphData data={this.state.data} />
              </TabContainer>
            )}
            {/* {value === 3 && <TabContainer><DataTable /></TabContainer>} */}
          </div>
        </div>
        {/* <FormGroup row>
                            <FormControlLabel 
                                control={
                                    <Switch
                                        checked={this.state.Fraflytter}
                                        onChange={this.handleChecked}
                                        color="primary"
                                        value="Fraflytter"
                                    />
                                }
                                label="Fraflyttet"
                            />
                            <FormControlLabel 
                                control={
                                    <Switch
                                        checked={this.state.Tilflytter}
                                        onChange={this.handleChecked}
                                        color="primary"
                                        value="Tilflytter"
                                    />
                                }
                                label="Tilflyttet"
                            />
                            <FormControlLabel 
                                control={
                                    <Switch
                                        checked={this.state.Ophørt}
                                        onChange={this.handleChecked}
                                        color="primary"
                                        value="Ophørt"
                                    />
                                }
                                label="Ophørt"
                            />
                            <FormControlLabel 
                                control={
                                    <Switch
                                        checked={this.state.Nystartet}
                                        onChange={this.handleChecked}
                                        color="primary"
                                        value="Nystartet"
                                    />
                                }
                                label="Nystartet"
                            />
                        </FormGroup> */}
      </MuiThemeProvider>
    );
  }
}
/*

{loading && <CircularProgress size={50} value={this.state.completed} color="primary" variant="determinate" className={classnames.progress} />} 
*/
export default withStyles(styles)(App);

/*
TODO: 

 First do the graph data with Victory library!!! then filters!!!!
 1. Implement filters: use switches or dropdown with checkboxes.
 

 Next => use filterData, til show only checked values

 FIX THE FILTERING OF DATA
*/
