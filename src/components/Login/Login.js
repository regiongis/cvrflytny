import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { InputLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

root: {
    flexGrow: 1
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));



function LoginComponent(props){
    const classes = useStyles();
    
    // const [loginData, setLoginData] = React.useState({
    //     email:{value:"", error:false, helperText:"*"},
    //     password: {value:"", error:false, helperText:"*"},
    // });

    // const handleInputChange = (event) =>{
    //     const target = event.target;
    //     const value = target.value;
    //     const name = target.name;

    //     setLoginData({
    //         ...loginData,
    //         [name]: {
    //             ...loginData[name],
    //             value:value
    //         }
    //     })
    // } 

    const loginData = props.loginData;
    const handleInputChange = props.handleLoginDatachange;
    const errorMessage = props.errorMessage;

    return (
        <>
            <Grid item xs={3}>
                <InputLabel>E-mail/brugernavn</InputLabel>
                <TextField 
                     
                    id="standard-basic" 
                    label="" 
                    name="user"
                    variant="standard"
                    placeholder=""
                    InputLabelProps={{shrink:false}}
                    value={loginData.user.value}
                    error={errorMessage}
                    helperText={errorMessage ? "Der var fejl ved login. Prøv igen":""}
                    onChange={handleInputChange}
                    />
            </Grid>
            
            <Grid item xs={3}>
                <InputLabel>Adgangskode</InputLabel>
                <TextField 
                    type="password" 
                     
                    id="standard-basic" 
                    label="" 
                    name="password"
                    variant="standard"
                   // error={loginData.password.value.length < 3}
                    value={loginData.password.value}
                    onChange={handleInputChange}
                    />
            </Grid>
            
        </> 
    );
}

export default LoginComponent;
