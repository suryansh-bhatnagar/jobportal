import React from 'react';
import { Button } from '@material-ui/core';
import { useFormikContext } from 'formik';

import SendIcon from '@mui/icons-material/Send';

const ButtonWrapper = ({
  children,
  ...otherProps
}) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  }

  const configButton = {
    variant: 'contained',
    color:'primary',
    fullWidth: true,
    onClick: handleSubmit
  }

  return (
    <Button
      {...configButton}
      endIcon={<SendIcon />}
    >
      {children}
    </Button>
  );
};

export default ButtonWrapper;
