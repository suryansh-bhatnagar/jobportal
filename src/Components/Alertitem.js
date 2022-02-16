import React from "react";
import Alert from '@mui/material/Alert';

export default function Alertitem(props) {
  return (
    props.alert && (<Alert  severity="success">
    {props.alert.msg}
  </Alert>)
  );
}