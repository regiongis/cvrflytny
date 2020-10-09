import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function CreateUserDialog(props) {
  const [open, setOpen] = React.useState(false);

  const [userInfo, setUserInfo] = React.useState({
    name: {value:"", error:false, helperText:""},
    email: {value:"", error:false, helperText:""},
    organisation:{value:"", error:false, helperText:""},
    password:{value:"", error:false, helperText:""},
    password2:{value:"", error:false, helperText:""},
    consent: {value:false, error:false, helperText:""},
    btnDisabled : true
  });



  const isDisabled = () =>  (displayError("name") || displayError("email") || displayError("organisation")
                              || displayError("password") || displayError("password2") || !userInfo.consent.value
                            )
  
  const displayError = (name) => {
    if(name === "password2" 
      && userInfo[name].value.length < 2
      && userInfo.password.value !== userInfo.password2.value){
        console.log(userInfo.password.value," and ",userInfo.password2.value," are not equal")
        return true;
      }

    if(userInfo[name].value.length < 2) return true;

    return false
    
  }

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setUserInfo({
      ...userInfo,
      [name]:{
        ...userInfo[name],
        value:value,
      //  error: displayError(name)
      },
      btnDisabled: isDisabled()
    });

  }

  
  
  const handleRegister = () => {
    let data = {
      name: userInfo.name.value,
      email: userInfo.email.value,
      organisation: userInfo.organisation.value,
      password: userInfo.password.value
    }
    props.handleRegister(data);
   // props.handleCreateDialogClose();
  }

  // const handleOpen = props.handleCreateDialogOpen;
  const handleDialogClose = props.handleCreateDialogClose;
  const errorMessage = props.errorMessage;

  return (
    <div>
      
      <Dialog open={props.isRegisterFormShown} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Opret dig som bruger</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          {
            errorMessage && <Alert severity="error">{errorMessage}</Alert>
          }
          <TextField
            autoFocus
            margin="dense"
            name="name"
            id="name"
            label="Navn:"
            value={userInfo.name.value}
            error={userInfo.name.error}
            helperText={userInfo.name.helperText}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="organisation"
            name="organisation"
            label="Organisation:"
            value={userInfo.organisation.value}
            onChange={handleInputChange}
            error={userInfo.organisation.error}
            helperText={userInfo.organisation.helperText}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="E-mail/brugernavn"
            type="email"
            value={userInfo.email.value}
            error={userInfo.email.error}
            helperText={userInfo.email.helperText}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            name="password"
            label="Adganskode:"
            type="password"
            value={userInfo.password.value}
            error={userInfo.password.error}
            helperText={userInfo.password.helperText}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="password2"
            name="password2"
            label="Gentag adgangskode:"
            type="password"
            value={userInfo.password2.value}
            error={userInfo.password2.error}
            helperText={userInfo.password2.helperText}
            onChange={handleInputChange}
            fullWidth
          />
          <FormControlLabel
            control={<Checkbox 
                        checked={userInfo.consent.value}
                        name="consent"
                        onChange={handleInputChange} />
            }
            
            label="Med min oprettelse som bruger giver jeg mit samtykke til, at mine oplysninger bliver opbevaret, således at projektet kan kontakte mig, fx. ifm. driftsforstyrrelser, nye versioner, nye tiltag, mv."
          />
          {!userInfo.consent.value &&
            <FormHelperText error>Du skal give samtykke</FormHelperText>
          }
          {/* {userInfo.btnDisabled &&
            <FormHelperText error>Alle felter skal udfyldes korrekt.</FormHelperText>
          } */}
          
          
        </DialogContent>
        <DialogActions style={{justifyContent: 'center'}} >
          
          <Button  disabled={!userInfo.consent.value} variant="contained" onClick={handleRegister} color="primary">
            Opret
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}