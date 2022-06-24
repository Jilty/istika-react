import React, { useEffect,useState } from "react";
import CustomHeader from "../../components/header";
import './project.scss';
import { Container, Col, Row, Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import socketIOClient from "socket.io-client";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";
import { useHistory } from 'react-router-dom';
import url from "../../config.js";

const domain = url.domain;
const ENDPOINT = url.ENDPOINT;
var update = require('immutability-helper');
export default function Project(props)  {
  const history = useHistory()
  const [state,setState] = useState({
    resources: [],
    resource_group_name: [],
    azure_container: [],
    azure_cluster: [],
    projects: null,
    startedDeployment: false,
    azStatus: null,
    activePage: '',
    showModal: false,
    projectStep: 1,
    akcontainer: [],
    github: [],
    projectStatus: [],
    readyToDeploy: false,
    myclass: "",
    consoleValue: "",
    deployedUrl: "",
    buildStarted: false,
    buildFinished: false,
    consoleMessage: "",
    deployed: false,
    isreleaseEnabled: false,
    validationMessage: "",
    validationError: false,
    deployType: "",
    availableRTF:[],
    aksClusterResouce: [],
    targetCluster:'',
    targetRTF:''

  })
  function onChange(event) {
    console.log("event",event)
    event.persist()
    
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }
  const resetState = () => {
    setState(prevState=>({...prevState, startedDeployment: false }));
    setState(prevState=>({...prevState,buildStarted: false }));
    setState(prevState=>({...prevState,buildFinished: false }));
    setState(prevState=>({...prevState, buildComplete: false }));
  }
  const showContainer = () => {
    if (state.myclass === '') {
      setState(prevState=>({...prevState,myclass: 'slide' }))
    }
    else {
      setState(prevState=>({...prevState,myclass: '' }))
    }
  }
  function getPipeLineStatus(project) {
    const requestOptions = {
      method: 'GET',
      headers: { 'x-access-token': localStorage.getItem('token') }
    };
    fetch(domain + '/api/start/pipeline?projectName=' + project, requestOptions)
      .then(response => response.json()
      )
      .then(data => {
        console.log(data);
        if (data.message === 'Build Exists') {
          setState(prevState=>({...prevState,buildStarted: true }))
          setState(prevState=>({...prevState, readyToDeploy: false }))
        } else {
          resetState();
          setState(prevState=>({...prevState,readyToDeploy: true }))
        }

      });
  }
  function getProject() {
    const requestOptions = {
      method: 'GET',
      headers: { 'x-access-token': localStorage.getItem('token') }
    };
    fetch(domain + '/api/v1/project', requestOptions)
      .then(response => response.json()
      )
      .then(data => {
        console.log(data);
        data.projects.map(pro => {
          if (pro._id === props.match.params.id) {
            setState(prevState=>({...prevState, projects: pro }))
            if (pro.buildComplete == true || pro.buildComplete === "true") {
              // this.setState({ readyToDeploy: true })
              getPipeLineStatus(pro.projectName);
            }
          }

        })
      });

    if (state.projects && state.projects.startedBuild) {

      const interval = setInterval(() => {
        if (state.projects.finishedBuild) {
          clearInterval(interval)
        } else {
          getAzureStatus()
        }
      }, 1000);
    }
  }
  function getResource() {
    const requestOptions = {
      method: 'GET',
      headers: { 'x-access-token': localStorage.getItem('token') }
    };
    fetch(domain + '/api/v1/azresource', requestOptions)
      .then(response => response.json())
      .then(data => {
        setState(prevState=>({...prevState,resources: data }));
        if (data && data.length) {
          setState(prevState=>({...prevState,aksClusterResouce:data}))
          data.map((res) => {
            console.log("Azure Resources");
            console.log(res);
            var resources = state.resource_group_name.concat(res.resource_group_name);
            setState(prevState=>({...prevState, resource_group_name: resources }))
            console.log(state.resource_group_name);
            setState(prevState=>({...prevState, azureResourceAvailable: true }))
          });
        }

      });
  }
  function getGithub() {
    const requestOptions = {
      method: 'GET',
      headers: { 'x-access-token': localStorage.getItem('token') }
    };
    fetch(domain + '/api/v1/repo', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.length) {
          setState(prevState=>({...prevState,github: data }));
          setState(prevState=>({...prevState,gitReposAvailable: true }))
        }
      });
  }
  const getAzureStatus = () => {
    console.log('inisde status call');
    const requestOptions = {
      method: 'GET',
      headers: { 'x-access-token': localStorage.getItem('token') }
    };
    fetch(domain + '/api/v1/azstatus?id=' + props.match.params.id, requestOptions)
      .then(response => response.json()
      )
      .then(data => {
        setState(prevState=>({...prevState,azStatus: data[0] }))
      });
  }
  const createRelease = () => {
    setContent({ consoleMessage: 'Release in progress' })
    var postObj =
    {
      "id": props.match.params.id,
      "env": [
        {
          "clientId": state.sandBoxClientId,
          "clientSecret": state.sandBoxClientSecret,
          "name": state.projects.projectName + '-Sandbox' + state.projects.projectType,
          "env": "dev",
          "username": state.muleUsername,
          "password": state.mulePassword
        },
        {
          "clientId": state.qaClientId,
          "clientSecret": state.qaClientSecret,
          "name": state.projects.projectName + '-QA' + state.projects.projectType,
          "env": "test",
          "username": state.qaUsername,
          "password": state.qaPassword
        }
      ]
    }
    console.log(postObj);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('token') },
      body: JSON.stringify(postObj)
    };
    fetch(domain + '/api/v1/createrelease?id=' + props.match.params.id, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }
  const gotoproject = (id) => {
    history.push('/project/' + id);
  }
  const getProjectImage = (type) => {
    let url = ""
    if (type === 'react') {
      url = "../../assets/icons/react.png"
    }
    if (type === 'spring') {
      url = "../../assets/icons/spring.png"
    }
    return url;
  }
  // setLocalStorage() {
  //   if (this.state.projectStatus && this.state.projectStatus.length) {
  //     localStorage.setItem(this.props.match.params.id + '-build', JSON.stringify(this.state.projectStatus))
  //   }
  // }
  // getBuildFromLocalStorage() {
  //   let buildStatus = JSON.parse(localStorage.getItem(this.props.match.params.id + '-build'));
  //   this.setState({ projectStatus: buildStatus });
  // }
  useEffect(() => {
    // this.getBuildFromLocalStorage();
    getResource();
    getProject();
    getGithub();
    getJenkins();getMule();
    getBitbucket();
    getRTFResource();
    const socket = socketIOClient(ENDPOINT + '/');
    socket.on("releaseupdate", data => {
      console.log(data);
      if (data.status == "done") {
        resetState();
        setState({ deployed: true });
      }
      let message = state.consoleValue + '\n' + data.message + '\n';
      setState(prevState=>({...prevState,
        consoleValue: message
      }))
      if (data.status !== 'console') {
        setState(prevState=>({...prevState,
          projectStatus: [...state.projectStatus, data]
        }))
      }
    })
    socket.on("deployment", data => {
      console.log(data);
      if (data.status == "done") {
        setState(prevState=>({...prevState, deployedUrl: data.message }));
        resetState();
        setState(prevState=>({...prevState,deployed: true }));
      }
      let message = state.consoleValue + '\n' + data.message + '\n';
      setState(prevState=>({...prevState,consoleValue: message }))
    })
    socket.on("buildupdate", data => {
      console.log(data);
      if (data && data.projectName === state.projects.projectName) {
        if (data.message === "Build completed") {
          console.log(data.message);
          resetState();
          setState(prevState=>({...prevState,isreleaseEnabled: true }));
          createRelease();
          setState(prevState=>({...prevState,readyToDeploy: true }));
          getProject();
        }
        let message = state.consoleValue + '\n' + data.message + '\n';
        setState(prevState=>({...prevState,consoleValue: message}))

        if (data.status !== 'console') {
          // if (data.status === 'completed') {
          var oldData = state.projectStatus;
          var commentIndex = oldData.findIndex(function (c) {
            return c.message === data.message;
          });
          if (commentIndex !== -1) {
            var updatedComment = update(oldData[commentIndex], { status: { $set: data.status } });
            var newData = update(oldData, {
              $splice: [[commentIndex, 1, updatedComment]]
            });
            setState(prevState=>({...prevState,projectStatus: newData }));

          } else {
            setState(prevState=>({...prevState,projectStatus: [...state.projectStatus, data]}))
          }
          // this.setLocalStorage();

          // } else {
          //   this.setState({
          //     projectStatus: [...this.state.projectStatus, data]
          //   })
          // }

        }
      }
    });
  },[])
  const getAzResource = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'x-access-token': localStorage.getItem('token') }
    };
    fetch(domain + '/api/v1/azresource', requestOptions)
      .then(response => response.json())
      .then(data => {
        setState(prevState=>({...prevState,resources: data }));
        setState(prevState=>({...prevState, azureResourceAvailable: true }))
      });
  }

  const getRTFResource = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'x-access-token': localStorage.getItem('token') }
    };
    fetch(domain + '/api/v1/mule/rtf', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log("RTF");
        console.log(data);
        setState(prevState=>({...prevState, availableRTF: data.mule }))
      });
  }

  const getGitRepos = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'x-access-token': localStorage.getItem('token') }
    };
    fetch(domain + '/api/v1/repo', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data) {
          setState(prevState=>({...prevState,gitReposAvailable: true }))
        } else {
          return null;
        }


      });
  }

  const getJenkins = async () => {
    console.log(localStorage.getItem('token'));
    const requestOptions = {
      method: 'GET',
      headers: { 'x-access-token': localStorage.getItem('token') }
    };
    fetch(domain + '/api/v1/jenkins', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setState(prevState=>({...prevState,jenkinsResourceAvailable: true }))
        } else {
          return null;
        }


      });
  }
  const getBitbucket = async () => {
    console.log(localStorage.getItem('token'));
    const requestOptions = {
      method: 'GET',
      headers: { 'x-access-token': localStorage.getItem('token') }
    };
    fetch(domain + '/api/v1/bitbucket', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setState(prevState=>({...prevState, bitbucketResourceAvailable: true }))
        } else {
          return null;
        }


      });
  }
  const getMule = async () => {
    console.log(localStorage.getItem('token'));
    const requestOptions = {
      method: 'GET',
      headers: { 'x-access-token': localStorage.getItem('token') }
    };
    fetch(domain + '/api/v1/mule', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log("anypointdata",data)
        if (data && data.mule.length) {
          setState(prevState=>({...prevState, anypointData: data }));

          setState(prevState=>({...prevState,muleResourceAvailable: true }))
        } else {
          return null;
        }

      });
  }
  const checkAccessManagement = async () => {
    console.log(state.gitReposAvailable)
    if (!state.gitReposAvailable)
      return { val: false, message: "Github properties not updated" };
    if (state.projects.cloudType === 'azure') {
      if (!state.azureResourceAvailable)
        return { val: false, message: "No Azure resources found" };
    }
    if (state.projects.cloudType === 'jenkins') {
      if (!state.jenkinsResourceAvailable)
        return { val: false, message: "No jenkins resource found" };
    }
    if (state.projects.cloudType === 'bitbucket') {
      if (!state.bitbucketResourceAvailable)
        return { val: false, message: "No bitbucket settings found" };
    }
    if (state.projects.projectType === 'mule') {
      if (!state.muleResourceAvailable)
        return { val: false, message: "No mule settings found" };
    }
    return { val: true }
  }
  const submit = async (id, name) => {
   
    setState(prevState=>({...prevState, validationError: false }));
    setContent({ consoleMessage: 'Build in progress' })
    console.log("project",state.projects);
    handleClose();
    var postObj =
    {
      "projectName": state.projects.projectName,
      "gitRepo": state.gitRepo,
      "anypointData":state.anypointData.mule[0],
      "id": props.match.params.id,
      "resourceGroupName": state.selected_rg,
      "gitType": state.projects.cloudType === "bitbucket" ? "bitbucket" : state.gitType,
      "deployType": state.deployType,
      "targetRTF": state.targetRTF ? state.targetRTF : null,
      "targetCluster": state.targetCluster ? state.targetCluster : null,
      "projectTemplate": state.projects.projectArchetype.replace('apix-', '').replace('-sapi','')
      
    }
    
    let checkVal = await checkAccessManagement();
    // if(this.state.projects.projectType == 'mule' && checkVal.val ){
    // console.log("inside mule")
    // postObj.projectTemplate = this.state.projects.projectArchetype.replace('apix-', '').replace('-sapi','')
    // postObj.projectType=this.state.projects.projectType
    // postObj.id = this.props.match.params.id
    
    //   var requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('token') },
    //     body: JSON.stringify(postObj)
    //   };
    //   fetch(domain + '/api/v1/mule/migrate?id='+ this.props.match.params.id, requestOptions)
    //   .then(response => response.json())
    //   .then(data => {
    //     // console.log(data);
    //   });
    // }
    // console.log(checkVal)
    if (checkVal.val) {
      var requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('token') },
        body: JSON.stringify(postObj)
      };
      // this.setState({ startedDeployment: true });
      setState(prevState=>({...prevState, buildStarted: true }))
      fetch(domain + '/api/v1/azprojectbuild?id=' + props.match.params.id, requestOptions)
        .then(response => response.json())
        .then(data => {
          // console.log(data);
        });
    } else {
      setState(prevState=>({...prevState,validationError: true }));
      setState(prevState=>({...prevState, validationMessage: checkVal.message }))
    }
    console.log(postObj);

  }
  const deploy = () => {
    setContent({ consoleMessage: 'Deployment in progress' })
    resetState()
    setState(prevState=>({...prevState, startedDeployment: true }));
    clearConsole();
    console.log(state);
    var postObj =
    {
      "projectName": state.projects.projectName,
      "id": props.match.params.id,
      "resourceGroupName": state.projects.resourceGroupName
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('token') },
      body: JSON.stringify(postObj)
    };
    setState(prevState=>({...prevState, startedDeployment: true }));
    fetch(domain + '/api/v1/deployapplication?id=' + props.match.params.id, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }
  const setContent = () => {
    console.log(true);
  }
  const handleOpen = () => {
    console.log('Show modal')
    setState(prevState=>({...prevState,showModal: true }))
  }
 const handleClose = () => {
    setState(prevState=>({...prevState, showModal: false }))
  }
  const handleResourceGroup = (event) => {
    console.log('inside resource')
    console.log(event.value)
    state.resources.map((res) => {
      console.log(res)
      if (res.resource_group_name == event.value) {
        var joined = state.azure_container.concat(res.azure_container_registry_name);
        console.log(joined)
        setState(prevState=>({...prevState,azure_container: joined }))
        console.log('inside condition');
        console.log(state)
      }
    })

  }
  function getContainerBody() {
    console.log('container body');
    return (
      <div>
        <div className="text-label-wrap">
          <label className="form-text-label">Select Container(required)</label>
        </div>
        <div className="text-input-wrap">
          <Select
           name='container'
            value={state.cloudType}
            onChange={onChange}
            options={state.azure_container}
            className="form-imput"
          />
        </div>

      </div>
    )

  }
  const setSelectProperties = (rg) => {
    state.resources.map(res => {
      console.log(res);
      console.log(rg);
      if (res.resource_group_name === rg) {
        console.log("inside");
        let container = state.azure_container.concat(res.azure_container_registry_name);
        setState(prevState=>({...prevState, azure_container: container }))
        console.log(state.azure_container);
      }
    })
  }
  const getMuleEnv = () => {
    return (
      <div>
        {/* <label>Sandbox</label>
        <Row xs={12}>
          <Col xs={6}>
            <div className="text-label-wrap">
              <label className="form-text-label">Username</label>
            </div>
            <div className="text-input-wrap project-name">
              <input className="form-imput" onChange={(event) => { this.setState({ muleUsername: event.target.value }) }}>


              </input>

            </div>

          </Col>
          <Col xs={6}>
            <div className="text-label-wrap">
              <label className="form-text-label">Password</label>
            </div>
            <div className="text-input-wrap">
              <input className="form-imput" onChange={(event) => { this.setState({ mulePassword: event.target.value }) }}>


              </input>

            </div>

          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <div className="text-label-wrap">
              <label className="form-text-label">Client Id</label>
            </div>
            <div className="text-input-wrap">
              <input className="form-imput" onChange={(event) => { this.setState({ sandBoxClientId: event.target.value }) }}>


              </input>

            </div>

          </Col>
          <Col xs={6}>
            <div className="text-label-wrap">
              <label className="form-text-label">Client Secret</label>
            </div>
            <div className="text-input-wrap">
              <input className="form-imput" onChange={(event) => { this.setState({ sandBoxClientSecret: event.target.value }) }}>


              </input>

            </div>

          </Col>
        </Row>

        <label>QA</label>
        <Row>
          <Col xs={6}>
            <div className="text-label-wrap">
              <label className="form-text-label">Username</label>
            </div>
            <div className="text-input-wrap">
              <input className="form-imput" onChange={(event) => { this.setState({ qaUsername: event.target.value }) }}>


              </input>

            </div>

          </Col>
          <Col xs={6}>
            <div className="text-label-wrap">
              <label className="form-text-label">Password</label>
            </div>
            <div className="text-input-wrap">
              <input className="form-imput" onChange={(event) => { this.setState({ qaPassword: event.target.value }) }}>


              </input>

            </div>

          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <div className="text-label-wrap">
              <label className="form-text-label">Client Id</label>
            </div>
            <div className="text-input-wrap">
              <input className="form-imput" onChange={(event) => { this.setState({ qaClientId: event.target.value }) }}>


              </input>

            </div>

          </Col>
          <Col xs={6}>
            <div className="text-label-wrap">
              <label className="form-text-label">Client Secret</label>
            </div>
            <div className="text-input-wrap">
              <input className="form-imput" onChange={(event) => { this.setState({ qaClientSecret: event.target.value }) }}>


              </input>

            </div>

          </Col>
        </Row> */}

      </div>
    )
  }
  const getModalBody = () => {

    switch (state.projectStep) {
      case 1:
        return (
          <div>
            <div>
              {
                state.projects && state.projects.projectType !== 'mule' ?
                  <div>
                    <div className="text-label-wrap">
                      <label className="form-text-label">Select Resource Group(required)</label>
                    </div>
                    <div className="text-input-wrap">
                      <select className="browser-default custom-select" name='selected_rg' onChange={onChange}>
                        <option>Resource Group</option>
                        {state.resource_group_name && state.resource_group_name.map(res => {
                          return (
                            <option value={res}>{res}</option>
                          )
                        })}
                      </select>
                    </div>
                    <div>
                      <div className="text-label-wrap">
                        <label className="form-text-label">Select Container(required)</label>
                      </div>
                      <div className="text-input-wrap">
                        <select className="browser-default custom-select" name='container' onChange={onChange}>
                          <option>Azure Container </option>
                          {state.azure_container && state.azure_container.map(res => {
                            return (
                              <option value={res}>{res}</option>
                            )
                          })}
                        </select>

                      </div>

                    </div>
                  </div> : null
              }

            {
              ( state.projects && state.projects.cloudType )!== "bitbucket" ?<div>
                <div className="text-label-wrap">
                  <label className="form-text-label">Repo type</label>
                </div>
                <div className="text-input-wrap">
                  <select className="browser-default custom-select" name='gitType' onChange={onChange}>
                    <option>Git Type </option>
                    {(state.projects && state.projects.projectType === 'azure') ? <option value="azure"> Azure </option> : null}

                    <option value="github"> Github </option>
                    <option value="bitbucket"> Bitbucket </option>

                  </select>

                </div>
              </div> : null
            }  
               <div>
                <div className="text-label-wrap">
                  <label className="form-text-label">Deployment Method</label>
                </div>
                <div className="text-input-wrap">
                  <select className="browser-default custom-select" name='deployType' onChange={onChange}>
                    
                    <option>Deployment Type </option>
                  
                    <option value="rtf"> RTF </option>
                    <option value="cloudhub"> Cloudhub </option>

                  </select>

                </div>
              </div>
              {
                state.deployType === 'rtf'? 
                  <div>
                <div className="text-label-wrap">
                  <label className="form-text-label">RTF</label>
                </div>
                <div className="text-input-wrap">
                  <select className="browser-default custom-select" name='targetRTF' onChange={onChange}>
                    <option>RTF NAME </option>
                  
                   {state.availableRTF && state.availableRTF.map(rtf =>{
                      return(
                        rtf.status === 'Active' ?
                        <option value={rtf.rtfName}> {rtf.rtfName} </option> : null
                      )
                    })}

                  </select>

                </div>
                {/* <div>
                <div className="text-label-wrap">
                  <label className="form-text-label">Cluster</label>
                </div>
                <div className="text-input-wrap">
                  <select className="browser-default custom-select" onChange={(event) => { this.setState({ targetCluster: event.target.value }) }}>
                    <option>Cluster NAME </option>
                  
                   {this.state.avaialableRTF && this.state.aksClusterResouce.map(cluster =>{
                      return(
                        <option value={cluster.aks_cluster_name}> {cluster.aks_cluster_name} </option>
                      )
                    })}

                  </select>

                </div>
              </div> */}
                </div>
                 : null
              }
              {state.projects && state.projects.projectType === 'mule' ? getMuleEnv() : null}
            </div>
            {/* {this.state.akscontainer && this.state.akscontainer.length ? this.getContainerBody() : <div></div>} */}

          </div>

        )
      case 2:
        return (<div>
          <div>
            <div className="text-label-wrap">
              <label className="form-text-label">Github Repo (required)</label>
            </div>
            <div className="text-input-wrap">
              <select className="browser-default custom-select" name='gitRepo' onChange={onChange}>
                <option>Git Repo</option>
                {state.github &&state.github.map(res => {
                  return (
                    <option value={res.gitRepo}>{res.gitRepo}</option>
                  )
                })}
              </select>
            </div>
          </div>
        </div>

        )

      default: break;
    }
  }
  const next = () => {
    let stateTemp = state.projectStep;
    setState(prevState=>({...prevState,projectStep: stateTemp + 1 }))
  }
  const prev = () => {
    let stateTemp = state.projectStep;
    setState({ projectStep: stateTemp - 1 })
  }
  function checkBuildSuccess() {
    console.log(state);
    var postObj =
    {
      "projectName":state.projects.projectName,
      "id": props.match.params.id
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('token') },
      body: JSON.stringify(postObj)
    };
    setState(prevState=>({...prevState, startedDeployment: true }));
    fetch(domain + '/api/get/buildstatus', requestOptions)
      .then(response => response.json())
      .then(data => {
        return data
      });
  }
  function checkBuildStatus() {
    console.log('eewew')
    let data = checkBuildSuccess();
    if (data && data.message == 'completed') {
      console.log('completed');
      return false;
    }
    else {
      return true;
    }

  }
  function showConsoleOutput() {
    if (state.myclass === '') {
      setState(prevState=>({...prevState, myclass: 'show'}))
    }
    else {
     setState(prevState=>({...prevState,myclass: '', }))
    }
  }
  const clearConsole = () => {
    setState(prevState=>({...prevState,consoleValue: "" }))
  }
  function getStatusElement() {
    let statusBody = null;
    if (state.projectStatus.length == 0) {
      statusBody = (<div></div>)
    } else {
      statusBody = state.projectStatus.map((stat, i) =>
        <Col xs={12} className="status-body">
          {
            <Row className={"completed-status " + stat.status}>
              <Col xs={3}>
                {stat.status === 'completed' ? <FaCheckCircle className="suceesicon"></FaCheckCircle> : <BsFillGearFill className="icon-spin"></BsFillGearFill>}
              </Col>
              <Col xs={9}>
                <div className="status-label">
                  {stat.message}
                </div>
              </Col>
            </Row>
          }
        </Col>

      )
    }
    return statusBody;
  }
  function getConsoleHeader() {
    let header = "";
    if (state.buildStarted) {
      header = (<span className="console-header inprogress">Build in-progress</span>)
    } else if (state.readyToDeploy) {
      header = (<span className="console-header complete">Build Complete</span>)
    } else if (state.startedDeployment) {
      header = (<span className="console-header inprogress">Started Deployment</span>)
    } else if (state.deployed) {
      header = (<span className="console-header deployed">Deployed</span>)
    } else {
      return null;
    }
    return header;
  }
  
    const sidemenuList = ['Azure', 'Github', 'Settings']
    return (
      <div className="root" >
        <CustomHeader></CustomHeader>
        <main className="content project-content">
          <Container >

            {state.projects ?
              <Container>
                {
                  state.validationError ?
                    <Row className="error-label-wrap">
                      <label>
                        {state.validationMessage} <a href="/settings">Go to settings</a>
                      </label>
                    </Row> : null
                }

                <Row>

                  <Col xs={7}>

                    <div className="project-details-wrap">
                      <h3>Application Details</h3>
                      <Row className="auto-height">
                        <Col xs={12}>
                          <div>
                            <div className="text-label-wrap">
                              <label className="form-text-label">Project name </label>
                            </div>
                            <div className="text-input-wrap project-name">
                              <input className="form-imput" placeholder="Project Name" disabled value={state.projects.projectName}></input>
                            </div>
                          </div>
                        </Col>
                        <Col xs={12}>
                          <div>
                            <div className="text-label-wrap">
                              <label className="form-text-label">Cloud Type </label>
                            </div>
                            <div className="text-input-wrap project-name">
                              <input className="form-imput" placeholder="Cloud Type" disabled value={state.projects.cloudType}></input>
                            </div>
                          </div>
                        </Col>
                        <Col xs={12}>
                          <div>
                            <div className="text-label-wrap">
                              <label className="form-text-label">Project Type</label>
                            </div>
                            <div className="text-input-wrap project-name">
                              <input className="form-imput" placeholder="Project Type" disabled value={state.projects.projectType}></input>
                            </div>
                          </div>
                        </Col>
                        <Col xs={12}>
                          <div>
                            <div className="text-label-wrap">
                              <label className="form-text-label">Git Url</label>
                            </div>
                            <div className="text-input-wrap project-name">
                              <input className="form-imput" placeholder="Git Url" disabled value={state.projects.gitUrl}></input>
                            </div>
                          </div>
                        </Col>
                        <Col xs={12}>
                          <div>
                            <div className="text-label-wrap">
                              <label className="form-text-label">Porject Archetype</label>
                            </div>
                            <div className="text-input-wrap project-name">
                              <input className="form-imput" placeholder="Project Archetype" disabled value={state.projects.projectArchetype}></input>
                            </div>
                          </div>
                        </Col>

                        <Col xs={12} className="create-btn-wrap">
                          <button className='create-project-btn' variant="contained" onClick={() => handleOpen()}>

                            {state.projects.projectType === 'mule' ? 'Create Build and Release' : 'Build'}
                          </button>
                          {state.projects && state.projects.projectType !== 'mule' ? <button className="create-project-btn" onClick={() => deploy()}>Deploy</button> : null}

                          {/* {this.state.projects.cloudType !== 'jenkins' ? <button className="create-project-btn" onClick={() => this.createRelease()}>Create Release</button> : null} */}

                          {/* {this.state.readyToDeploy ?
                          <Button className="create-project-btn" disabled={!this.state.readyToDeploy} onClick={() => this.deploy()}>Deploy</Button>
                          : null} */}

                        </Col>

                      </Row>
                    </div>


                  </Col>
                  <Col xs={5} className="project-side-desc-wrap">
                    <div className="status-wrap">
                      <h3>Status</h3>
                      <Row className="full-width status-div">

                        <Col xs={12}>
                          {getStatusElement()}
                        </Col>
                      </Row>
                    </div>

                  </Col>

                </Row>

                <div id="box-console" className={'box box-console ' + state.myclass}>
                  <div className="editor-resizer editor-resizer-console" title="Drag to resize. Double-click to expand."></div>
                  <div className="powers">
                    <div className="powers-drag-handle" title="Drag to resize. Double-click to expand."></div>
                    <div className="editor-actions-left">
                      <h2 className="box-title"><span className="box-title-name">Console</span> <span>{state.consoleMessage}</span></h2>
                    </div>
                    <div className="editor-actions-right">
                      <button className="button button-medium mini-button console-clear-button" title="Clear" onClick={() => clearConsole()}>
                        Clear
                      </button>
                      {/* <button className="button button-medium mini-button close-editor-button" data-type="console" title="Close">

                      </button> */}
                    </div>
                  </div>
                  <div className="console-wrap">
                    <div className="console-entries short-no-scroll">
                      <div className="console-command-line">
                        <span className="console-arrow forwards"></span>
                        <textarea className="console-command-line-input auto-expand" rows="1" data-min-rows="1" value={state.consoleValue}>

                        </textarea>
                        {getConsoleHeader()}

                      </div>
                    </div>
                    {/* <div className="console-command-line">
                      <span className="console-arrow forwards"></span>
                      <textarea className="console-command-line-input auto-expand" rows="1" data-min-rows="1" >

                      </textarea>
                    </div> */}
                  </div>
                </div>


                {/* <Row className="console-output">
                <div className="conole-outpur-header header" onClick={() => this.showConsoleOutput()}>...</div>
                <Row className={'console-output-container ' + this.state.myclass}>
                  {this.getStatusElement()}
                </Row>
              </Row> */}
              </Container>
              : <div></div>}
            <Modal show={state.showModal} onHide={() => handleClose()}>
              <Modal.Header closeButton className="modal-header">
                <Modal.Title>Project Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  {getModalBody()}
                </div></Modal.Body>
              <Modal.Footer className="modal-footer">
                <Button variant="secondary" onClick={() => handleClose()}>
                  Cancel
                </Button>

                <Button variant="primary" onClick={() => submit()}>
                  Ok
                </Button>


              </Modal.Footer>
            </Modal>

          </Container>

        </main >
        <footer id="react-pen-footer" className="site-footer editor-footer">
          <div className="footer-left">
            <div className="footer-actions-menu">

              <div className="footer-actions" data-expanded="false">
                <button className="button footer-button console-toggle-button" onClick={() => showConsoleOutput()}>Console</button>
              </div>

            </div>
          </div>
        </footer>
      </div >
    );
  }


