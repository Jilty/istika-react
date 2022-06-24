// import React from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles, withStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import Check from '@material-ui/icons/Check';
// import SettingsIcon from '@material-ui/icons/Settings';
// import GroupAddIcon from '@material-ui/icons/GroupAdd';
// import VideoLabelIcon from '@material-ui/icons/VideoLabel';
// import StepConnector from '@material-ui/core/StepConnector';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import Modal from '@material-ui/core/Modal';
// import { Grid, TextField } from '@material-ui/core';
// import amazon from '../../assets/icons/amazon.png';
// import azure from '../../assets/icons/azure.png'
// import react from '../../assets/icons/react.png'
// import spring from '../../assets/icons/spring.png'
// import AccountTreeIcon from '@material-ui/icons/AccountTree';
// import { Card, Container, Col, Row } from 'react-bootstrap';
// var userObject = {
//   name: 'New Project',
//   projectType: '',
//   cloudType: '',
//   active: false
// }
// const QontoConnector = withStyles({
//   alternativeLabel: {
//     top: 10,
//     left: 'calc(-50% + 16px)',
//     right: 'calc(50% + 16px)',
//   },
//   active: {
//     '& $line': {
//       borderColor: '#784af4',
//     },
//   },
//   completed: {
//     '& $line': {
//       borderColor: '#784af4',
//     },
//   },
//   line: {
//     borderColor: '#eaeaf0',
//     borderTopWidth: 3,
//     borderRadius: 1,
//   },
// })(StepConnector);

// const useQontoStepIconStyles = makeStyles({
//   root: {
//     color: '#eaeaf0',
//     display: 'flex',
//     height: 22,
//     alignItems: 'center',
//   },
//   active: {
//     color: '#784af4',
//   },
//   circle: {
//     width: 8,
//     height: 8,
//     borderRadius: '50%',
//     backgroundColor: 'currentColor',
//   },
//   completed: {
//     color: '#784af4',
//     zIndex: 1,
//     fontSize: 18,
//   },
// });

// function QontoStepIcon(props) {
//   const classes = useQontoStepIconStyles();
//   const { active, completed } = props;

//   return (
//     <div
//       className={clsx(classes.root, {
//         [classes.active]: active,
//       })}
//     >
//       {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
//     </div>
//   );
// }

// QontoStepIcon.propTypes = {
//   /**
//    * Whether this step is active.
//    */
//   active: PropTypes.bool,
//   /**
//    * Mark the step as completed. Is passed to child components.
//    */
//   completed: PropTypes.bool,
// };

// const ColorlibConnector = withStyles({
//   alternativeLabel: {
//     top: 22,
//   },
//   active: {
//     '& $line': {
//       backgroundImage:
//         'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
//     },
//   },
//   completed: {
//     '& $line': {
//       backgroundImage:
//         'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
//     },
//   },
//   line: {
//     height: 3,
//     border: 0,
//     backgroundColor: '#eaeaf0',
//     borderRadius: 1,
//   },
// })(StepConnector);

// const useColorlibStepIconStyles = makeStyles({
//   root: {
//     backgroundColor: '#ccc',
//     zIndex: 1,
//     color: '#fff',
//     width: 50,
//     height: 50,
//     display: 'flex',
//     borderRadius: '50%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   active: {
//     backgroundImage:
//       'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
//     boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
//   },
//   completed: {
//     backgroundImage:
//       'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
//   },
// });
// function getModalStyle() {
//   const top = 50;
//   const left = 50;

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//     height: 600,
//     width: 600

//   };
// }
// function ColorlibStepIcon(props) {
//   const classes = useColorlibStepIconStyles();
//   const { active, completed } = props;

//   const icons = {
//     1: <SettingsIcon />,
//     2: <GroupAddIcon />,
//     3: <VideoLabelIcon />,
//   };

//   return (
//     <div
//       className={clsx(classes.root, {
//         [classes.active]: active,
//         [classes.completed]: completed,
//       })}
//     >
//       {icons[String(props.icon)]}
//     </div>
//   );
// }

// ColorlibStepIcon.propTypes = {
//   /**
//    * Whether this step is active.
//    */
//   active: PropTypes.bool,
//   /**
//    * Mark the step as completed. Is passed to child components.
//    */
//   completed: PropTypes.bool,
//   /**
//    * The label displayed in the step icon.
//    */
//   icon: PropTypes.node,
// };

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//   },
//   button: {
//     marginRight: theme.spacing(1),
//   },
//   instructions: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//   },
//   paper: {
//     position: 'absolute',
//     width: 500,
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: theme.shadows[5]
//   }
// }));

// function getSteps() {
//   return ['Select project architype', 'Select cloud provider', 'Complete'];
// }

// function getCloudProvider() {
//   return [{ type: 'azure', icon: azure, active: false }, { type: 'aws', icon: amazon, active: false }];
// }
// function getCloudProjectType() {
//   return [{ type: 'spring', icon: spring, active: false }, { type: 'react', icon: react, active: false }];
// }
// function setProject(project) {
//   userObject.projectType = project;
//   console.log(project);
// }

// function setCloudProvider(provider) {
//   userObject.cloudType = provider;
//   console.log(provider);
// }
// function getProjectResources() {
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'x-access-token': localStorage.getItem('token') }
//   };
//   fetch('http://localhost:8080/api/create/resource', requestOptions)
//     .then(response => response.json())
//     .then(data => {
//       if (data)
//         return data[0]
//     });
// }
// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       var project = getCloudProjectType();
//       return (
//         <div>
//           <Container>
//             <Row>
//               <Col>
//                 {project.map((pro, index) => (
//                   <Card onClick={(event) => setProject(pro.type)} style={{ width: '18rem' }}>
//                     <Card.Img variant="top" src={pro.icon} />
//                     <Card.Body>
//                       <Card.Title>{pro.type}</Card.Title>

//                     </Card.Body>
//                   </Card>
//                 ))}
//               </Col>
//             </Row>

//           </Container>
//         </div>
//       );
//     case 1:
//       var cloud = getCloudProvider();
//       return (
//         <div>
//           <Container>
//             <Row>
//               <Col>
//                 {cloud.map((clo, index) => (
//                   <Card onClick={(event) => setCloudProvider(clo.type)} style={{ width: '18rem' }}>
//                     <Card.Img variant="top" src={clo.icon} />
//                     <Card.Body>
//                       <Card.Title>{clo.type}</Card.Title>

//                     </Card.Body>
//                   </Card>
//                 ))}
//               </Col>
//             </Row>

//           </Container>

//         </div>
//       );;
//     case 3:
//       var projectResources = getProjectResources();
//       var resourceGroups = [];
//       projectResources.map((project) => {
//         resourceGroups.push(project.resourceGroupName);
//       })
//       return (
//         <div>
//           <Container>
//             <Row>
//               <Col xs={12}>
//                 <TextField placeholder="Project Name"></TextField>
//               </Col>
//               <Col xs={12}>
//                 <Select
//                   native
//                   value={state.resourceGroupName}
//                   onChange={handleChange}
//                   inputProps={{
//                     name: 'age',
//                     id: 'age-native-simple',
//                   }}
//                 >
//                   {resourceGroups.map(resource => {

//                     return (
//                       <option value={resource}>{resource}</option>
//                     )
//                   })}

//                 </Select>
//               </Col>
//               <Col xs={12}>
//                 <TextField placeholder="Project Name"></TextField>
//               </Col>
//             </Row>

//           </Container>

//         </div>
//       );;
//     case 2:
//       return (<div> <Typography>You can now continue with your project</Typography></div>);
//     default:
//       return 'Unknown step';
//   }
// }

// export default function CustomizedSteppers(props) {
//   const classes = useStyles();
//   const [modalStyle] = React.useState(getModalStyle);
//   const [open, setOpen] = React.useState(false);
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [cloudType, setCloudType] = React.useState(0);
//   const [clusterName, setClusterName] = React.useState(0);
//   const [containerName, setContainerName] = React.useState(0);
//   const [resourceGroupName, setResourceGroupName] = React.useState(0);
//   const [projectName, setProjectName] = React.useState(0);
//   const [projectType, setProjectType] = React.useState(0);
//   const steps = getSteps();

//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const updateCloud = (val) => {
//     setCloudType(val);
//   }
//   const updateCluster = (val) => {
//     setClusterName(val)
//   }
//   const updateContainer = (val) => {
//     setContainerName(val)
//   }
//   const updateResourceGroup = (val) => {
//     setResourceGroupName(val)
//   }
//   const updateProjectName = (val) => {
//     setProjectName(val)
//   }
//   const updateProjectType = (val) => {
//     setProjectType(val)
//   }

//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     if (activeStep === steps.length - 1) {
//       localStorage.setItem('user', JSON.stringify(userObject));
//       console.log('finished');
//       var postObj =
//       {
//         "cloudType": { cloudType },
//         "clusterName": { clusterName },
//         "containerName": { containerName },
//         "resourceGroupName": { resourceGroupName },
//         "location": "eastus",
//         "projectName": { projectName },
//         "projectType": { projectType }
//       }

//       const requestOptions = {
//         method: 'POST',
//         headers: { 'x-access-token': localStorage.getItem('token') },
//         body: JSON.stringify(postObj)
//       };
//       fetch('http://localhost:8080/api/create/project', requestOptions)
//         .then(response => response.json())
//         .then(data => {
//           console.log(data);
//         });
//       handleClose();
//       props.handleModalClose();
//     }

//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   return (
//     <div >
//       <Button variant="contained" color="primary" disableElevation onClick={handleOpen}> Create Project</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="simple-modal-title"
//         aria-describedby="simple-modal-description"
//       >
//         <div style={modalStyle} className={classes.paper}>
//           <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
//             {steps.map((label) => (
//               <Step key={label}>
//                 <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//           <div>
//             {activeStep === steps.length ? (
//               <div>
//                 <Typography className={classes.instructions}>
//                   All steps completed - Please select your project from the table and continue;
//             </Typography>

//               </div>
//             ) : (
//                 <div>
//                   {getStepContent(activeStep)}
//                   <div>
//                     <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
//                       Back
//               </Button>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={handleNext}
//                       className={classes.button}
//                     >
//                       {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//                     </Button>
//                   </div>
//                 </div>
//               )}
//           </div>
//         </div>
//       </Modal>
//     </div>


//   );
// }
