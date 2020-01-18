import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from '@material-ui/core/SnackbarContent';

export default function SnackbarComponent(props){

    return (
        <SnackbarContent
            open={props.open}
            onClose={props.onClose}
            message={props.message}
        />
    );
}