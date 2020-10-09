import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MapData from "./Map.js";
import GridData from "./Grid.js";
import GraphData from "./Graph.js";
import Title from "./components/Title";

import "./App.css";
import classnames from "classnames";
import ReactExport from "react-data-export";
import jQuery from "jquery";
import { navigate } from "@reach/router";
import FilterListIcon from "@material-ui/icons/FilterList";
import TemporaryDrawer from "./Drawer";
import LoginComponent from "./components/Login/Login";
import CreateUserDialog from "./components/Register/create";
import Logout from "./components/Logout";

moment.locale("da");


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const filterWords = ["status", "virksomhedsform", "hovedbranche"];

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

function uniqueValues(colValues) {
  let vals = [...new Set(colValues)];
  return vals;
}

const getVirkForm = form =>{
  switch(form){
    case 10 : return "Enkeltmandsvirksomhed";
    case 15 : return "Personligt ejet Mindre Virksomhed";
    case 20 : return "Dødsbo";
    case 30 : return "Interessentskab";
    case 40 : return "Kommanditselskab";
    case 45 : return "Medarbejderinvesteringsselskab";
    case 50 : return "Partrederi";
    case 60 : return "Aktieselskab";
    case 70 : return "Kommanditaktieselskab/Partnerskab";
    case 80 : return "Anpartsselskab";
    case 81 : return "Iværksætterselskab";
    case 90 : return "Fond";
    case 100 : return "Erhvervsdrivende fond";
    case 110 : return "Forening";
    case 115 : return "Frivillig forening";
    case 130 : return "Andelselskab(-forening)";
    case 140 : return "Andelselskab(-forening) med begrænset ansvar";
    case 150 : return "Forening eller selskab med begrænset ansvar";
    case 151 : return "Selskab med begrænset ansvar";
    case 152 : return "Forening med begrænset ansvar";
    case 160 : return "Europæisk Økonomisk Firmagruppe";
    case 170 : return "Filial af udenlandsk aktieselskab, kommanditakties";
    case 180 : return "Filial af udenlandsk anpartselskab eller selskab";
    case 190 : return "Filial af udenlandsk virksomhed med begrænset ansv";
    case 195 : return "SCE-selskab";
    case 196 : return "Filial af SCE-selskab";
    case 200 : return "Filial af anden udenlandsk virksomhed";
    case 210 : return "Anden udenlandsk virksomhed";
    case 220 : return "Fast forretningssted af Europæisk økonomisk Firmag";
    case 230 : return "Offentlige arbejdsplads";
    case 235 : return "Offentlige arbejdsplads";
    case 245 : return "Offentlige arbejdsplads";
    case 250 : return "Offentlige arbejdsplads";
    case 260 : return "Folkekirkelige institutioner";
    case 270 : return "Enhed under oprettelse i Erhvervs- og Selskabsstyr";
    case 280 : return "Øvrige virksomhedsformer";
    case 285 : return "Særlig finansiel virksomhedsform";
    case 290 : return "SE-selskab";
    case 291 : return "Filial af SE-selskab";
    case 990 : return "Uoplyst virksomhedsform";
    default : return form;
  }
}

function uniqueValuesGroupedByKey(arrOfObj, keys) {
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
      komkode: this.props.komnr,// || '165',
     
      csvData: [], 
      loading: true,
      completed: 0,
      canSendRequest: false,
      filterOpen: false,
      drawerOpen: false,
      alertOpen: false,
      alertMessage: '',
      uniqueVals: {},
      dataToRender: [],
      isLoginShown : true,
      isRegisterFormShown : false,
      sessionId : sessionStorage.getItem("sessionId") || "",
      loginData:{
        user:{value:"", error:false, helperText:"*"},
        password: {value:"", error:false, helperText:"*"}
      },
      registrationErrorMessage: "",
      loginErrorMessage:false
      // registrationData: {
      //   name: {value:"", error:false, helperText:"*"},
      //   email: {value:"", error:false, helperText:"*"},
      //   organisation:{value:"", error:false, helperText:"*"},
      //   password:{value:"", error:false, helperText:"*"},
      //   password2:{value:"", error:false, helperText:"*"},
      //   consent: {value:true, error:false, helperText:"*"},
      //   btnDisabled : true
      // } 
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
    this.onAlertClose = this.onAlertClose.bind(this);
    this.handleCreateDialogOpen = this.handleCreateDialogOpen.bind(this);
    this.handleCreateDialogClose = this.handleCreateDialogClose.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLoginDatachange = this.handleLoginDatachange.bind(this);
  }

  onAlertClose(){
    this.setState({alertOpen: false});
  }

  handleLoginDatachange(event){
    let that = this;
    console.log("I was called!!!");
      const target = event.target;
        const value = target.value;
        const name = target.name;

        that.setState({
          loginData: {
            ...this.state.loginData,
            [name]: {
                ...this.state.loginData[name],
                value:value
            }
          }
        });
  }

  doFilter(){
    const uniqueVals = this.state.uniqueVals;
    const filteredCategories = Object.keys(uniqueVals);
    let filters = {};
    filteredCategories.forEach(cat =>{
      let temp = uniqueVals[cat];
      
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
        if(filters[key].length > 0 
          && filters[key].indexOf(row.properties[key]) === -1)
              res = false;
      });
      return res;
     });
     const message = `${data.length} ud af ${this.state.data.length}`;
     this.setState({
       dataToRender : data, 
       drawerOpen : false,
       alertMessage: message,
       alertOpen: true
      });
     
  }

  updateRenderDataFromTable(filteredRows){
    this.setState({csvData: filteredRows});
  }

  reset(){
    this.setState({
      dataToRender: this.state.data, 
      uniqueVals: uniqueValuesGroupedByKey(
        this.state.data.map(feature => feature.properties), 
        filterWords
        )
    });
  }

  handleCheckedFilters(text, event){ 
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

  

  

  handleLogout(){
    let that = this;
    let sessionUrl = "https://offentligedata.admin.gc2.io/api/v2/session/stop";
    jQuery.get(sessionUrl,function(res){
      if(res && res.success){
        sessionStorage.removeItem("sessionId");
        that.setState({
          sessionId : "",
          data: [],
          csvData : [],
          dataToRender : []
        });
        if(window.lfMap && window.geojsonLayer){ console.log("removelayer called");
          window.lfMap.removeLayer(window.geojsonLayer);
        }
      }
    });

    
  }

  handleDrawerOpen() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  handleFilterClose() {
    this.setState({ filterOpen: false });
  }
 /*
  https://drayton.mapcentia.com/api/v1/sql/ballerup?q=select right(komkode, 3)::int komkode,komnavn from data.kommune group by komkode, komnavn order by komnavn
 */
  getKommuner() {
    let komUrl =
      "https://drayton.mapcentia.com/api/v1/sql/ballerup?q=select right(komkode, 3)::int komkode, " +
      "komnavn from data.kommune group by komkode, komnavn order by komnavn";
    //komUrl = "kom.json";
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

  handleLogin(){
    let that = this;
    let sessionUrl = "https://offentligedata.admin.gc2.io/api/v2/session/start";
    let _loginData = {
      user: that.state.loginData.user.value,
      password: that.state.loginData.password.value,
      database: "ballerup"
    };

    jQuery.get(sessionUrl, _loginData, function(res){
      if(res && res.success){
        sessionStorage.setItem("sessionId", res.data.session_id);
        that.setState({sessionId: res.data.session_id, loginErrorMessage : false});
        console.log("login succeeded, session id: ", res.data.session_id);
      }
    },"json")
    .fail(function(res){
      that.setState({loginErrorMessage : true});
    })
    ;
    //this.setState({sessionId : "loggedin"});
  }

  handleRegister(userObj){
    let that = this;
    let userUrl = "https://offentligedata.admin.gc2.io/api/v2/user";
    let sessionUrl = "https://offentligedata.admin.gc2.io/api/v2/session/start";

    let data = {
      name: userObj.email,
      email: userObj.email,
      password: userObj.password,
      subuser: true,
      usergroup: "erhvervsinfo",
      parentdb: "ballerup",
      properties: {
        org: userObj.organisation,
        name: userObj.name
      }
    }

    let _loginData = {
      user: userObj.email,
      password: userObj.password,
      database: "ballerup"
    }
    console.log("before posting data");
    jQuery.post(userUrl, JSON.stringify(data), function(res){
      console.log("data posted successfully!");
      console.log(res);
      if(res && res.success){
        jQuery.get(sessionUrl, _loginData, function(res){
          if(res && res.success){
            that.handleCreateDialogClose();
            sessionStorage.setItem("sessionId", res.data.session_id);
            that.setState({sessionId: res.data.session_id});
            console.log("login succeeded, session id: ", res.data.session_id);
          }
        },"json");
      }else if(res && !res.success){
        
      }

    },
    "json")
    .fail(function(res){
      console.log("login failed, message => ", res.responseJSON.message);
      that.setState({registrationErrorMessage: that.getErrorMessage(res.responseJSON.errorCode)});
    })
    ;

  }

  getErrorMessage(errorMessage){
    switch(errorMessage){
      case 'SUB_USER_ALREADY_EXISTS':
      case 'PARENT_USER_EXISTS_WITH_NAME':
      case 'USER_ALREADY_EXISTS':
      case 'EMAIL_ALREADY_EXISTS':
        return 'E-mail/brugernavn er allerede taget.';
      case 'WEAK_PASSWORD':
        return 'Adgangskode skal opfylde følgende kriterier: mindst 8 tegn langt, mindst 1 tal og mindst 1 stort bogstav';
      default:
        return 'Der var en fejl ved oprettelse. Prøv igen.'
    }
  }
  getData(komkode, startDate, endDate) {
    this.setState(preveState => ({ csvData: [], loading: true }));
    let that = this;
    let sessionId = this.state.sessionId;
    let postData = {
      session_id: sessionId,
      komkode : komkode,
      startdate: startDate,
      enddate: endDate,
      database:"ballerup"
    };

    let jsonData = JSON.stringify(postData);

    if (!komkode) {
      this.setState({ loading: false });
      return;
    }

    let newUrl = "https://offentligedata.admin.gc2.io/extensions/offentligedata/api/request"
    let dataUrl =
      "https://drayton.mapcentia.com/api/v1/sql/ballerup?q=SELECT * FROM cvr.flyt_fad_dev(" +
      komkode +
      ",'"+ startDate +"','"+ endDate +"')&srs=4326";
      jQuery.ajax({
      url: newUrl, // dataUrl,
      type: "POST",
      dataType: "json",
      data: jsonData,
      success: function(res) {
        let csv = res.features.map(feature => feature.properties);
        res.features.forEach(feature => {
          let form = feature.properties.virksomhedsform;
          feature.properties.virksomhedsform = getVirkForm(form);
          let _startdato = feature.properties.startdato;
          feature.properties.startdato = (_startdato && _startdato.length > 0) ?
                    _startdato.substring(0,10) : '';
        });
        that.setState(prevState => ({
          csvData: csv,
          data: res.features,
          dataToRender: res.features,
          loading: false,
          uniqueVals: uniqueValuesGroupedByKey(csv,filterWords)
        }));
      }
      // ,
      // timeout: 15000,
      // error: function(xhr, textStatus, errorThrown){
      //   console.log("error timeout!!!!");
      //   that.setState({loading : false});
      // }
    });
  }

  handleSelect(event) {
    event.persist();
    this.setState(prevState => ({ komkode: event.target.value }));
  }

  componentDidMount() { console.log("");
    let { komkode, startDate, endDate } = this.state;
    this.getData(komkode, startDate, endDate);
    this.getKommuner();
  }

  componentWillUnmount() {
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  handleDoneClick() {
    let { komkode, startDate, endDate } = this.state;
    if(!komkode) komkode = 165;
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

  handleCreateDialogOpen(){
    console.log("Createdialog open")
    this.setState({
      isRegisterFormShown : true,
      isLoginShown : false
    });
  }

  handleCreateDialogClose(){
    this.setState({
      isRegisterFormShown : false,
      isLoginShown : true  
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
            filterWords={filterWords}
          />

          <CreateUserDialog 
            handleRegister = {this.handleRegister}
            isRegisterFormShown={this.state.isRegisterFormShown}
            handleCreateDialogClose={this.handleCreateDialogClose}
            handleCreateDialogOpen={this.handleCreateDialogOpen}
            errorMessage={this.state.registrationErrorMessage}
          />
          <div className="">
            <AppBar position="static" color="default">
              <Toolbar>
                <Grid container>
                  <Grid item xs={2}>
                    <Title/>
                  </Grid>
                  {this.state.sessionId === "" && (
                    <>
                  {/* <Grid item xs={7}> */}
                    <LoginComponent 
                      loginData={this.state.loginData}
                      handleLoginDatachange = {this.handleLoginDatachange} 
                      errorMessage = {this.state.loginErrorMessage}
                    /> 
                  {/* </Grid> */}
                  <Grid item xs={1}>
                      <Button variant="contained" color="primary" size="small" onClick={this.handleLogin}>
                      Log på
                      </Button> 
                  </Grid> 
                  {/* <Grid item xs={1}>eller</Grid> */}
                   <Grid item xs={2}>
                   eller &nbsp;<Link color="inherit" underline="always" component="button" onClick={this.handleCreateDialogOpen} size="small">Opret dig som bruger</Link>
                    </Grid>
                  {/*<Grid item xs={2}>
                    
                {/*</Grid>*/}
                </>
                  )}
                  
                  {this.state.sessionId !== "" && (


                    <>
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
                    
                    </>  
                  )}

                  {this.state.sessionId !== "" &&(
                    <>
                    
                   <Grid item xs={3}>
                    <IconButton
                      arial-label="Done"
                      onClick={this.handleDoneClick}
                    >
                      <Tooltip title="Send">
                        <SendIcon />
                      </Tooltip>
                    </IconButton>
                    <IconButton
                      arial-label="Filter"
                      onClick={this.handleDrawerOpen}
                    >
                      <Tooltip title="Filter">
                        <FilterListIcon />
                      </Tooltip>
                    </IconButton>
                    {this.state.csvData.length > 0 && (
                      <ExcelFile
                        element={
                          <IconButton arial-label="Excel">
                            <Tooltip title="Download Excel">
                              <CloudDownload />
                            </Tooltip>
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
                          <ExcelColumn label="virksomhedsform" value="virksomhedsform" />
                          <ExcelColumn label="Virksomhedsnavn" value="navn" />
                          <ExcelColumn
                            label="Kontaktperson"
                            value="fuldt ansvarlige deltagere"
                          />
                          <ExcelColumn label="kvartalbes_interval" value="Antal ansatte" />
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
                  <Grid item xs={1}>
                    <Logout handleLogout={this.handleLogout}/>
                  </Grid>
                    </>
                  )}    
                  

                  
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
                  <Tooltip title="Histogram">
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
                <GridData 
                  data={this.state.dataToRender} 
                  updateData={this.updateRenderDataFromTable}
                  total={this.state.data.length}
                  totalRendered={this.state.csvData.length}
                  />
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

