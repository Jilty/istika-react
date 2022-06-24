import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import './create-modal.scss';

import Divider from "@material-ui/core/Divider";
import CustomizedSteppers from '../project-modal';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  }
}));


  
export default function CreateProject(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [finishedPro]= React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleModalClose =()=>{
    console.log('yayyy');
    handleClose();
   props.startProject();
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
     <Grid container className="modalContainer">
            <Grid item xs={6} className="apass-create-div">
                <Grid container>
                  <div className="optionBox-Wrapper">
                    <span className="optionBox-Name" >Create a apass Application</span>
                    <div className="optionBox-Description" >Simple interface for creating automattated flows.</div>
                    <div data-test-id="create-button-apass-application" className="optionBox-Action">
                    <CustomizedSteppers onClick={handleClose} handleModalClose={(event)=>{handleModalClose()}}></CustomizedSteppers>
                     </div>
                     </div>
                 
                </Grid>
            </Grid>
            <Grid item xs={6} className="cbass-create-div">
            <Grid container>
                  <div className="optionBox-Wrapper">
                    <span className="optionBox-Name" >Create a cbass application</span>
                    <div className="optionBox-Description" >Simple interface for creating customer base application.</div>
                    <div data-test-id="create-button-apass-application" className="optionBox-Action">
                    <Button variant="contained" color="primary" disableElevation > Create Project</Button>
                     </div>
                     </div>
                </Grid>
            </Grid>
        </Grid>
    </div>
  );

  return (
    <div>
     
      <Button variant="contained" color="primary" disableElevation onClick={handleOpen}> Create Project</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
