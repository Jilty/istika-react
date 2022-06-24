import React, { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField';
import CustomHeader from "../../components/header";
import './dasboard.scss';
import { Container, Col, Row, Card, ListGroup, ListGroupItem, Figure, Image, Button, Table, Modal, CardGroup } from 'react-bootstrap';
import * as moment from "moment"
import notFoundIcon from '../../assets/icons/nodata.png';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useHistory } from 'react-router-dom';
import CardContainer  from "../../components/cardContainer";
import url from "../../config.js"
import {archetypesStack,techStack,cloudStack}  from "../../constants/templateConstants";
import {pjtTableHeader} from "../../constants/tableHeaderConstants";
import {TableHeader,NoSettingsFound} from "../../components/tableComponent/index"
import {ValidationComponent} from "../../components/new-resource-form/index.js";
import styled from 'styled-components';


const Title = styled.p`
  color: #fff;
  font-weight: 100;
  @media (max-width: 100px) {
    font-size: 0.2rem;
  }
`
const Date = styled.div`
  color: #ccc;
  font-weight: 300;
  margin: 5px 0;
  
  @media (max-width: 10px) {
    font-size: 0.8rem;
  }
`
const Description = styled.p`
  color: #fff;
  font-weight: 300;
  padding:10px;
  @media (max-width: 10px) {
    font-size: 0.75rem;
  }
`


const domain = url.domain;
// const archetypesStack=myConst.archetypesStack
// const cloudStack= myConst.cloudStack
// const techStack = myConst.techStack

function Dashboard () {
  const history = useHistory()

  // static contextTypes = {
  //   router: PropTypes.object
  // }
  
  const [state,setState] =useState( {
    resources: [],
    resource_group_name: [],
    azure_container: [],
    azure_cluster: [],
    projects: [],
    showModal: false,
    projectStep: 1,
    projectName:'',
    validationClass: '',    
    projectArchetype: '',    
  }
  )
  const showContainer = () => {
    if (state.myclass === '') {
      setState(prevState=>({...prevState,myclass: 'slide'}))
    }
    else {
      setState(prevState=>({...prevState,myclass: ''}))
    }
  }
  function getProject() {
    const requestOptions = {
      method: 'GET',
      headers: { 'x-access-token': localStorage.getItem('token') }
    };
    fetch(domain + '/api/v1/project', requestOptions)
      .then(response => response.json())
      .then(data => {
      
        if (data) {
          setState(prevState=>({...prevState, projects: data.projects }))
        }
      });
  }
  const gotproject = (id) => {
    history.push('/projectDetails/' + id);
  }
  
  function onChange(event) {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }
  function getResource() {
    const requestOptions = {
      method: 'GET',
      headers: { 'x-access-token': localStorage.getItem('token') }
    };
    fetch(domain + '/api/v1/azresource', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setState(prevState=>({...prevState,resources: data }))
        if (data.length) {
          data.map((res) => {
            console.log(res);
            var resources = state.resource_group_name.concat(res.resource_group_name);
            setState(prevState=>({...prevState ,resource_group_name: resources }))
            console.log(state.resource_group_name);
          });
        }

      });
  }

  useEffect(() => {
    getResource();
    getProject()
  },[])
  const setSelectProperties = (rg) => {
    state.resources.map(res => {
      console.log(res);
      console.log(rg);
      if (res.resource_group_name === rg) {
        console.log("inside");
        let container = state.azure_container.concat(res.azure_container_registry_name);
        let cluster = state.azure_cluster.concat(res.aks_cluster_name);
        setState(prevState=>({...prevState, azure_container: container }))
        setState(prevState=>({...prevState, azure_cluster: cluster }))
        console.log(state.azure_container);
      }
    })
  }

  const submit = () => {
    if (!state.projectName || state.projectName === '') {
      setState(prevState=>({...prevState, validationClass: 'validation-error' }))
      
    }
    else{
    console.log(state);
    setState(prevState=>({...prevState, projectStep: 1 }))
    handleClose();
    var postObj =
    {
      "cloudType": state.cloudType,
      "createdOn": moment().format("DD-MM-YYYY hh:mm:ss"),
      "projectName": state.projectName,
      "projectType": state.projectType,
      "projectArchetype": (!state.projectArchetype || state.projectArchetype === '') ? state.projects.projectType + '-template' : state.projectArchetype
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('token') },
      body: JSON.stringify(postObj)
    };
    fetch(domain + '/api/v1/project', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        getProject();
      });
  }
}
  const handleOpen = () => {
    console.log('Show modal')
    setState(prevState=>({...prevState, showModal: true }))
    setState(prevState=>({...prevState, projectArchetype: archetypesStack[0].value }))
  }
  const handleClose = () => {
    setState(prevState=>({...prevState,showModal: false }))
  }
  const next = () => {
    setState(prevState=>({...prevState,validationClass: '' }))
    let projectStep = state.projectStep;
    console.log("projectStep",projectStep)
    setState(prevState=>({...prevState, validationClass: 'valid' }))
    console.log(state);
    console.log(state.projectType)
    switch (projectStep) {
      case 1:
        if (!state.projectType || state.projectType === '') {
          setState(prevState=>({...prevState,validationClass: 'validation-error' }))
          return
        }

        break;
      case 2:
        if (!state.cloudType || state.cloudType === '') {
          setState(prevState=>({...prevState,validationClass: 'validation-error' }))
          return
        }
        break;
      case 3:
        if (!state.projectName || state.projectName === '') {
          setState(prevState=>({...prevState, validationClass: 'validation-error' }))
          return
        }
        break;
      case 4:
        if (!state.projectArchetype || state.projectArchetype === '') {
          setState(prevState=>({...prevState,validationClass: 'validation-error' }))
          return
        }
        break;
      default:
        break;
    }
    setState(prevState=>({...prevState, projectStep: projectStep + 1 }))

  }
  const prev = () => {
    let projectStepTemp = state.projectStep;
    setState(prevState=>({...prevState, projectStep: projectStepTemp - 1 }))
  }
  const handleSelect = (type) => event => {
    console.log(type)
    console.log(event);
    if (type === 'cloud')
      setState(prevState=>({...prevState,cloudType: event.value }))
  }
  const projectStepLength = () => {
    return (state.projectType === 'mule' ? 4 : 3);
  }
  const setProjectArchetype = (val) => {
    setState(prevState=>({...prevState, projectArchetype: val }));
  }
  const setSelectedArchetype = (val) => {
    console.log("setSelectedArchetype",val)
     setState(prevState=>({...prevState, projectArchetype:archetypesStack[archetypesStack.map((item, i) => item.name === val ? i : '').filter(String)].value }))
  }

  const getModalBody = () => {
    console.log("getModalBody",state)
    let cloudType= state.cloudType;
    let projectType= state.projectType;
    switch (state.projectStep) {
      case 1:
        const sampleFuncion = () =>{
          console.log("called");
        }
       const setProjectType = (item) =>{
         console.log(item);
        setState(prevState=>({...prevState,projectType:item}))
       }
        return (
          <div>
            <div>
              <div className="text-label-wrap">
                <label className="form-text-label">Project Type (required)</label>
                {state.validationClass!==''&&state.validationClass!=='valid'?<ValidationComponent message='please select a project type'/>:null}

              </div>
              <div className="text-input-wrap">
                <CardContainer data={techStack} onClick={(val) => setProjectType(val)}></CardContainer>  
           
              </div>
            </div>
          </div>
        )
      case 2:
         const setCloudType = (item) =>{
        setState(prevState=>({...prevState,cloudType:item}))
       }
        return (<div>
          <div>
            <div className="text-label-wrap">
              <label className="form-text-label">{state.projectType === 'mule' ? 'CI/CD Server' : 'Cloud Type (required)'}</label>
              {state.validationClass!=='valid'?<ValidationComponent message='please select a value here'/>:null}

            </div>
            <div className="text-input-wrap">
               <CardContainer data={cloudStack} onClick={(val) => setCloudType(val)}></CardContainer>
            
            </div>
          </div>
        </div>

        )
      case 3:
        return (<div>
          <div className="text-label-wrap">
            <label className="form-text-label">Project name (required)</label>
            {state.validationClass!=='valid'?<ValidationComponent message='please provide a value here'/>:null}

          </div>
          <div className="text-input-wrap">
          <input className={"form-imput project-name " + state.validationClass} placeholder="Project Name" name='projectName' onChange={onChange}></input>
          </div>
        </div>)
      case 4:
        return (
          <div>
            <div>
              <div className="text-label-wrap">
                <label className="form-text-label">Select Mule Project Template</label>
              </div>
              <div className="text-input-wrap">
                
                 <CardContainer data={archetypesStack} onClick={(val) => setSelectedArchetype(val)}></CardContainer>
               
              </div>
            </div>
          </div>
        )
      default: break;
    }
  }
  console.log("state",state)
    return (
      <div className="root" >
        <CustomHeader></CustomHeader>
        <main className="content">
          <div className="create-project-container-wrapper" >         
            <div className={'create-project-container ' + state.myclass}>
              <h2 className="header-modal"> Create new Project</h2> <span className="close-container" onClick={() => { showContainer() }}>X</span>
              <TextField variant="outlined"
                margin="normal"
                required
                fullWidth
                id="project"
                label="Project Name"
                onChange={(event) => setState(prevState=>({...prevState, projectName: event.target.value }))}>
              </TextField>
              <select className="browser-default custom-select" name='projectType'onChange={onChange}>
                <option>Choose your option</option>
                <option value="spring">Spring</option>
                <option value="react">React</option>
              </select>

              <select className="browser-default custom-select" name='cloudType' onChange={onChange}>
                <option>Choose your option</option>
                <option value="azure">Azure</option>
                <option value="aws">Aws</option>
              </select>

              <select className="browser-default custom-select" name='resourceGroupName'onChange={onChange}>
                <option>Resource Group</option>
                {state.resource_group_name.map(res => {
                  return (
                    <option value={res}>{res}</option>
                  )
                })}
              </select>
              <select className="browser-default custom-select" name='containerName' onChange={onChange}>
                <option>Contianer Name</option>
                {state.azure_container.map(res => {
                  return (
                    <option value={res}>{res}</option>
                  )
                })}
              </select>
              <select className="browser-default custom-select" name='clusterName'onChange={onChange}>
                <option>Cluster Name</option>
                {state.azure_cluster.map(res => {
                  return (
                    <option value={res}>{res}</option>
                  )
                })}
              </select>
              <Button type="button"
                fullWidth
                variant="contained"
                color="primary" onClick={() => submit()}>Submit</Button>
            </div>
          </div>
          <div className="project-overview-wrap">
            <Container className="project-overview-container " className={ !state.showModal ? 'show': 'hide' }> 
            
              <Row className="project-container-row">
                <Col xs={12} className=" projects-container">
                  <Row className=" projects-header-wrap">
                    <Col xs={3}>
                      <div className="sub-header">Projects</div>
                    </Col>
                    <Col xs={9}>
                      <Button className='create-project-btn' variant="contained" onClick={() => handleOpen()}> Create New</Button>
                    </Col>

                  </Row>
                  <Row xs={2} md={4} className="card-row" >
                    {state.projects && state.projects.length && state.projects.map(project => (
                      <Col xs={6}>

                      <div className= "projectcontainer" onClick={() => gotproject(project._id)}>
                          <div className='firstdiv'>
                        <p>{project.projectName}<br/>{ project.createdAt}</p>                        
                        </div>
                        <div >
                            <Description> {project.projectType}</Description>
                            {/* <input className="table-apssword" type="password" value={props.value4}></input> */}
                            {/* <Date type='password'>{props.value4}</Date> */}
                    
                        
                        </div>
                      </div>
                      </Col>
                    //   <Col  >
                    //   <Card className ="card-body" style={{ width: '18rem' }} onClick={() => gotproject(project._id)}>
                    //      <Card.Body >
                    //        <Card.Title style={{color: "#000000a1"}}>{project.projectName}</Card.Title>
                    //        <Card.Text style={{color: "#000000a1"}}>
                    //          <Row > Project Type:{project.projectType}</Row>
                    //          <Row> Created: { project.createdAt}</Row>
                    //        </Card.Text>
                    //      </Card.Body>
                    //    </Card>
                    // </Col>
                 ))} 
                </Row>
                  {/* {
                    (state.projects && state.projects.length) ?
                      <Row className="table-wrap">
                        <table className="custom-table" hover>
                          <TableHeader list={pjtTableHeader}/>                         
                          <tbody >
                            {state.projects && state.projects.length && state.projects.map(project => {
                              return (
                                <tr onClick={() => gotproject(project._id)}>
                                  <td>{project.projectName}</td>
                                  <td>{project.projectType}</td>
                                  <td>{project.createdAt}</td>
                                  <td></td>
                                </tr>


                              )

                            })
                            }
                          </tbody>

                        </table >
                      </Row> :<NoSettingsFound message='No Projects found'/>                      
                  } */}
                </Col>
              </Row>
            </Container>
            <Container className="create-project-wrap " className={state.showModal ? 'show': 'hide'}>
                 
                  <div>
                  {getModalBody()}
                </div>
                <div className="project-step-btn-group">
                   {state.projectStep === 1 ? <Button variant="secondary" onClick={() => handleClose()}>
                  Cancel
          </Button> : <Button variant="secondary" onClick={() => prev()}>
                  Prev
          </Button>}

                {state.projectStep < projectStepLength() ? <Button variant="primary" onClick={() => next()}>
                  Next
          </Button> : <Button variant="primary" onClick={() => submit()}>
                  Done
          </Button>}

                </div>
            </Container>
            
          </div>
        </main>
      </div>
    );
  }

export default Dashboard;