import React, { useState, useEffect, useContext } from "react";
import CustomHeader from "../../components/header";
import './accessmanagement.scss';
import { Container, Col, Row, Modal, Button } from 'react-bootstrap';
import socketIOClient from "socket.io-client";
import notFoundIcon from '../../assets/icons/nodata.png';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Icon from 'react-crud-icons';
import "../../../node_modules/react-crud-icons/dist/css/react-crud-icons.css";
import { sidemenuList, orgList, azureList, githubList, jenkinsList, muleEnvList, grafanaList, bitbucketList, awsList } from "../../constants/configurationPageConstants";
import {
    muleTableHeader, gitTableHeader, rtfTableHeader, bitbucketTableHeader, awsTableHeader,
    azureTableHeader, jenkinsTableHeader, grafanaTableHeader
} from "../../constants/tableHeaderConstants.js";
import { anypoint, domain, ENDPOINT } from "../../config.js";
import ConfirmModal from "../common/confirmmodal";
import AddNewResource from "../common/addnewresourcemodal";
import AddActiveMuleContent from "../common/addactivemulecontent";
import useConfirm from "../../hooks/useconfirm";
import ConfirmDialog from "../../components/confirm-modal/index";
import { TableHeader, TableName, NoSettingsFound, TableBodyWithCondition, Table } from "../../components/tableComponent/index"
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useLocation } from 'react-router-dom';
import TransformIcon from '@material-ui/icons/Transform';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ProjectCard from '../../components/projectCard/index';
import JenkinsCard from '../../components/jenkinsCard/index'





function getActiveStatus(aks, id) {
    var postObj =
    {
        "aks": aks,
        "id": id
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('token') },
        body: JSON.stringify(postObj)
    };
    fetch(domain + '/api/v1/aksstatus', requestOptions)
        .then(response => response.json())
        .then(data => {
            return data[0].aks_created;
        });
}

function Accessmanagement() {
    const { confirm } = useConfirm();
    const [state, setState] = useState({
        username: "",
        password: "",
        organization: "",
        location: "",
        resource_group_name: "",
        containerRepository: "",
        azure_container_registry_name: "",
        aks_cluster_name: "",
        open: false,
        resourcesAvailable: false,
        resource: [],
        grafana: [],
        github: [],
        jenkins: [],
        mule: [],
        muleOrg: [],
        myclass: '',
        activePage: 'Onboarding',
        gitUsername: '',
        gitPat: '',
        newOrg: '',
        gitRepo: '',
        muleOrganization: '',
        activeMuleContent: 'VPC',
        selectedMuleOrg: '',
        selectedMuleUsername: '',
        selectedMulePassword: '',
        selectedMuleOrgId: '',
        muleSettingsId: '',
        organizationEnvironment: ["dev", "prod", "test"],
        deployTargetEnv: '',
        targetCluster: '',
        rtfData: [],
        bitbucket: [],
        awsresources: [],
        azureValidation: {},
        jenkinsValidation: {},
        muleValidation: {},
        grafanaValidation: {},
        awsValidation: {},
        bitbucketValidation: {},
        githubValidation: {},
        muleOrgValidation: {},
        azureResourceCreating: false,
        muleOrgNotDelete: false,
        showMuleSettings: false,
        showConfirmModal: false,
        confirm: false,
        id: '',
        index: '',
        stateVar: '',
        url: ''

    });
    function onChange(event) {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));
        console.log("onchange", state)
    }


    function getBodyContent() {
        switch (state.activePage) {
            case 'Onboarding':
                return (
                    <Container>
                        <Row className="no-margin">
                            <Col xs={10} className="no-padding no-margin">Organization</Col>
                            <Col xs={2} className="no-padding no-margin"><Button className="create-az-btn" onClick={() => handleOpen()}> Add new</Button></Col>
                        </Row>
                        <Row>
                            {state.muleOrg && state.muleOrg.length ? state.muleOrg.map((muleOrgItem, index) => {

                                return (
                                    <Col xs={12}>
                                        <Row className="org-panel">
                                            <span className="org-toggle" onClick={() => toggleMuleOrg(muleOrgItem)}>
                                                {
                                                    state.muleOrg[index].toggleElement ? <ChevronRightIcon></ChevronRightIcon> : <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                                                }
                                            </span>
                                            <span className="orgname" onClick={() => changeOrg(muleOrgItem.organization)}>{muleOrgItem.organization}</span>
                                            <span className="settings-add"><Icon name="delete" theme="dark" size="small" onClick={() => deleteResource(muleOrgItem._id, 'mule/org', 'muleOrg')} /></span>

                                            <span className="settings-add" onClick={() => createMuleSettings(muleOrgItem.organization)}>
                                                + Add Mule Settings
                                            </span>
                                        </Row>
                                        <Container className={"mule-org-panel " + (state.muleOrg[index].toggleElement ? "toggled" : "not-toggled")}>
                                            <Row className="setting-table-wrap">
                                                {
                                                    state.mule.length ?
                                                        <div className="table-wrap">
                                                            <table className="custom-table" hover>
                                                                <TableHeader list={muleTableHeader} />
                                                                <TableBodyWithCondition mule={state.mule} muleOrgItem={muleOrgItem} deleteResource={deleteResource} url='mule' stateVar='mule' />

                                                            </table>
                                                        </div>
                                                        : <NoSettingsFound message='No mule settings found' />}
                                            </Row>
                                            {/* <div className="mule-resource-sub">VPC</div>
                                            <Row className="setting-table-wrap">
                                                {this.state.vpcLists && this.state.vpcLists.length ? <div className="table-wrap">
    
                                                    <table className="custom-table" hover>
                                                        <thead>
                                                            <tr>
                                                                <th>VPC ID</th>
                                                                <th>VPC Name</th>
                                                                <th>Region </th>
                                                                <th>CIDR Block </th>
    
                                                            </tr>
    
                                                        </thead>
                                                        <tbody>
                                                            {this.state.vpcLists.map(vpc => {
                                                                if (vpc.organization === muleOrg.organization) {
                                                                    return (
                                                                        <tr>
                                                                            <td>{vpc.id}</td>
                                                                            <td>{vpc.name}</td>
                                                                            <td>{vpc.region}</td>
                                                                            <td>{vpc.cidrBlock}</td>
    
                                                                        </tr>
                                                                    )
                                                                } else {
                                                                    return null;
                                                                }
    
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                    : <div>No VPC Available </div>}
                                            </Row> */}
                                            {/* <div className="mule-resource-sub">VPN</div>
                                            <Row className="setting-table-wrap">
                                                {this.state.vpnLists && this.state.vpnLists.length ? <div className="table-wrap">
    
                                                    <table className="custom-table" hover>
                                                        <thead>
                                                            <tr>
                                                                <th>VPN ID</th>
                                                                <th>VPN Name</th>
    
                                                            </tr>
    
                                                        </thead>
                                                        <tbody>
                                                            {this.state.vpnLists.map(vpn => {
                                                                if (vpn.organization === muleOrg.organization) {
                                                                    return (
                                                                        <tr>
                                                                            <td>{vpn.id}</td>
                                                                            <td>{vpn.name}</td>
    
    
                                                                        </tr>
                                                                    )
                                                                } else {
                                                                    return null;
                                                                }
    
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                    : <div>No VPN Available</div>}
                                            </Row> */}
                                            <div className="mule-resource-sub">RTF</div>
                                            <Row className="setting-table-wrap">
                                                {state.rtfData && state.rtfData.length ? <div className="table-wrap">
                                                    <table className="custom-table" hover>
                                                        <TableHeader list={rtfTableHeader} />

                                                        <tbody>
                                                            {state.rtfData.map(rtf => {
                                                                if (rtf.organizationID === state.muleOrg.organization) {
                                                                    return (
                                                                        <tr>
                                                                            <td>{rtf.rtfName}</td>
                                                                            <td>{rtf.status}</td>
                                                                        </tr>
                                                                    )
                                                                } else {
                                                                    return null;
                                                                }

                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                    : <div>No RTF Available</div>}
                                            </Row>
                                            {/* <div className="mule-resource-sub">Environment</div>
                                            <Row className="setting-table-wrap">
                                                {this.state.envLists && this.state.envLists.length ? <div className="table-wrap">
    
                                                    <table className="custom-table" hover>
                                                        <thead>
                                                            <tr>
                                                                <th>Environment Name</th>
    
                                                            </tr>
    
                                                        </thead>
                                                        <tbody>
                                                            {this.state.envLists.map(env => {
                                                                if (env.organization === muleOrg.organization) {
                                                                    return (
                                                                        <tr>
    
                                                                            <td>{env.name}</td>
    
    
                                                                        </tr>
                                                                    )
                                                                } else {
                                                                    return null;
                                                                }
    
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                    : <div>No Environement Available</div>}
                                            </Row> */}
                                            {/* <Row className="setting-table-wrap">
                                                {this.state.envLists && this.state.envLists.length ? <div className="table-wrap">
    
                                                    <table className="custom-table" hover>
                                                        <thead>
                                                            <tr>
                                                                <th>Environment Name</th>
    
                                                            </tr>
    
                                                        </thead>
                                                        <tbody>
                                                            {this.state.envLists.map(env => {
                                                                if (env.organization === muleOrg.organization) {
                                                                    return (
                                                                        <tr>
    
                                                                            <td>{env.name}</td>
    
    
                                                                        </tr>
                                                                    )
                                                                } else {
                                                                    return null;
                                                                }
    
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                    : <div>No Environement Available</div>}
                                            </Row> */}
                                            <Row className="buton-container">
                                                <Button className="create-az-btn create-vpc" onClick={() => setActiveMuleContent("RTF", muleOrgItem)} > Add RTF</Button>
                                                {/* <Button className="create-az-btn create-vpc" onClick={() => this.setActiveMuleContent("VPC", muleOrg)} > Add VPC</Button>
                                                <Button className="create-az-btn create-vpn" onClick={() => this.setActiveMuleContent("VPN", muleOrg)} > Add VPN</Button>
                                                <Button className="create-az-btn create-vpn" onClick={() => this.setActiveMuleContent("Environment", muleOrg)} > Add Environment</Button>
                                                <Button className="create-az-btn create-vpn" onClick={() => this.refreshMuleResources(muleOrg)} >Refresh </Button> */}
                                                <Button className="create-az-btn create-vpn" disabled > Add Access Control</Button>
                                            </Row>
                                        </Container>

                                    </Col>
                                )
                            })
                                : <NoSettingsFound message='No organization  found' />}
                        </Row>
                    </Container>
                );
            case 'Azure':
                return (
                    <Container>
                        <Row className="no-margin">
                            <Col xs={12} className="no-padding no-margin">
                                <Row><TableName name='Azure Settings' handleOpen={handleOpen} /></Row>
                                <Row className="setting-table-wrap">
                                    {
                                        state.resource.length ?
                                            state.resource.map((resource, index) => {
                                                return (
                                                    <Col xs={6}>

                                                        <div className="azurecontainer">
                                                            <div className="azurecolumn" >
                                                                <p>Username<br/>{resource.azpusername}</p>                                                                
                                                                <p>DevOps Org<br/>{resource.organization}</p>
                                                                <p>Aks Cluster<br/>{resource.aks_cluster_name}</p>
                                                            </div>
                                                            <div className="azurecolumn" >
                                                                <p>Resource Group Name<br/>{resource.resource_group_name}</p>
                                                                <p>Container Registry<br/>{resource.azure_container_registry_name}</p>
                                                                
                                                            </div>
                                                        </div>
                                                    </Col>
                                                )})
                                                : <NoSettingsFound message='No azure settings found' />}
                                                
                                </Row>
                            </Col>

                        </Row>

                    </Container>
                );
            // <div className="table-wrap">
            //     <table className="custom-table" hover>
            //         <TableHeader list={azureTableHeader} />
            //         <tbody>
            //             {state.resource.map((resource, index) => {
            //                 return (
            //                     <tr>
            //                         <td>{resource.azusername}</td>
            //                         <td>{resource.resource_group_name}</td>
            //                         <td>{resource.organization}</td>
            //                         <td>{resource.azure_container_registry_name} </td>
            //                         <td>{resource.aks_cluster_name}</td>
            //                         <td><Icon name="delete" theme="dark" size="small" onClick={() => deleteResource(resource._id, 'resource', 'resource')} /></td>
            //                         {/* <td>{resource.aks_created ? <span>Active <FaRegCheckCircle className="created"></FaRegCheckCircle></span> : <span>In Progress <FaCloudUploadAlt className="Blink creating"></FaCloudUploadAlt></span>}</td> */}
            //                     </tr>
            //                 )
            //             })}
            //         </tbody>
            //     </table>
            // </div>

            case 'Github':
                return (
                    <>
                        {/* <Table name="Github Settings" handleOpen={handleOpen} headerList={gitTableHeader} message='No git settings found'
                            resourceList={state.github} deleteResource={deleteResource} url='repo' stateVar='github' /> */}

                        <Row className="no-margin">
                            <TableName name='Github Settings' handleOpen={handleOpen} />
                        </Row>
                        <Row xs={3} md={4} className="card-row" >


                            {state.github.length ?
                                state.github.map((item, ind) => {
                                    return (
                                        <Col>
                                            <ProjectCard value1='username' value2={item.gitUsername} value3='gitPat' value4={item.gitPat} />
                                        </Col>
                                    )
                                })
                                : <NoSettingsFound message='No git settings found' />}
                        </Row>
                    </>

                );
            case 'Jenkins':
                return (
                    <>
                        {/* <Table name="Jenkins Settings" handleOpen={handleOpen} headerList={jenkinsTableHeader} message='No Jenkins settings found'
                        resourceList={state.jenkins} deleteResource={deleteResource} url='jenkins' stateVar='jenkins' /> */}
                        <Row className="no-margin">
                            <TableName name='Jenkins Settings' handleOpen={handleOpen} />
                        </Row>
                        {state.jenkins.length ?
                            state.jenkins.map((item, ind) => {
                                return (
                                    <Col>
                                        <JenkinsCard item={item} />
                                    </Col>
                                )
                            })
                            : <NoSettingsFound message='No jenkins settings found' />}
                        {/* </Row> */}
                    </>

                );
            case 'Grafana':
                return (
                    <Table name="Grafana Settings" handleOpen={handleOpen} headerList={grafanaTableHeader} message='No grafana settings found'
                        resourceList={state.grafana} deleteResource={deleteResource} url='grafana' stateVar='grafana' />
                );
            case 'AWS':
                return (
                    <Container>
                        <Row className="no-margin">
                            <Col xs={12} className="no-padding no-margin">
                                <Row> <TableName name='AWS Settings' handleOpen={handleOpen} /></Row>
                                <Row className="setting-table-wrap">
                                    {
                                        state.awsresources.length ?
                                            <div className="table-wrap">
                                                <table className="custom-table" hover>
                                                    <TableHeader list={awsTableHeader} />
                                                    <tbody>
                                                        {state.awsresources.length && state.awsresources.map((resource, index) => {
                                                            return (
                                                                <tr>
                                                                    <td>{resource.awsaccesskeyid}</td>
                                                                    <td>{resource.location}</td>
                                                                    <td>{resource.awscluster}</td>
                                                                    <td><Icon name="delete" theme="dark" size="small" onClick={() => deleteResource(resource._id, 'awsresource', 'awsresources')} /></td>

                                                                    {/* <td>{resource.aks_created ? <span>Active <FaRegCheckCircle className="created"></FaRegCheckCircle></span> : <span>In Progress <FaCloudUploadAlt className="Blink creating"></FaCloudUploadAlt></span>}</td> */}
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                            : <NoSettingsFound message='No AWS Settings Found' />}
                                </Row>
                            </Col>

                        </Row>

                    </Container>
                );
            case 'Bitbucket':
                return (
                    <Table name="Bitbucket Settings" handleOpen={handleOpen} headerList={bitbucketTableHeader} message='No bitbucket settings found'
                        resourceList={state.bitbucket} deleteResource={deleteResource} url='bitbucket' stateVar='bitbucket' />
                );
            default: break;
        }
    }

    function getResource(item, stateVar) {
        const requestOptions = {
            method: 'GET',
            headers: { 'x-access-token': localStorage.getItem('token') }
        };
        try {
            fetch(domain + '/api/v1/' + item, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (item.indexOf('mule') !== -1)
                        setState(prevState => ({ ...prevState, [stateVar]: data.mule }));
                    else if (item.indexOf('jenkins') !== -1)
                        setState(prevState => ({ ...prevState, [stateVar]: data.jenkins }));
                    else
                        setState(prevState => ({ ...prevState, [stateVar]: data }));
                });
        }
        catch (e) {
            console.log("Fetching Error", e)
        }
    }

    const deleteResource = async (id, item, stateVar) => {
        const isConfirmed = await confirm('Do you confirm your choice?');
        setState(prevState => ({ ...prevState, confim: false }))
        if (isConfirmed) {
            var obj = { "id": id }
            const requestOptions = {
                method: 'DELETE',
                headers: { 'x-access-token': localStorage.getItem('token'), 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            };
            let url = (item == 'resource') ? (domain + `/api/v1/` + item) : domain + `/api/v1/` + item + `?id=${id}`
            try {
                fetch(url, requestOptions)
                    .then(response => { var data = response.json(); console.log("delete", data) })
                    .then(data => {
                        getResource(item, stateVar)
                    });
            }
            catch (e) { console.log("Error:", e) }
        }

    }
    function postResource(postObj, url, stateVar) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('token') },
            body: JSON.stringify(postObj)
        };
        fetch(domain + '/api/v1/' + url, requestOptions)
            .then(response => response.json())
            .then(data => {
                getResource(url, stateVar);
            });

    }

    function Validation(resourceLists, validationState) {
        resourceLists.map((item) => {
            if (state[item.stateVal] === '' || state[item.stateVal] === undefined) {
                let validObj = state[validationState];
                validObj[item.stateVal] = false;
                setState(prevState => ({ ...prevState, [validationState]: validObj }))
            }
            else {
                let validObj = state[validationState];
                validObj[item.stateVal] = true;
                setState(prevState => ({ ...prevState, [validationState]: validObj }))

            }
        })
        console.log("valll", state.azureValidation)
        if (Object.values(state[validationState]).every(item => item))
            return true
    }

    useEffect(() => {
        getResource('repo', 'github');
        getResource('azresource', 'resource');
        getResource('awsresource', 'awsresources');
        getResource('jenkins', 'jenkins');
        getResource('mule', 'mule');
        getResource('mule/org', 'muleOrg');
        getResource('mule/rtf', 'rtfData');
        getResource('bitbucket', 'bitbucket');
        const socket = socketIOClient(ENDPOINT);
        socket.on("create-resource", data => {
            if (data.status === "done") {
                getResource();
            }

        })
    }, [])

    const handleOpen = () => {
        console.log('Show modal')
        setState(prevState => ({ ...prevState, showModal: true }))
    }
    const handleClose = () => {
        setState(prevState => ({ ...prevState, showModal: false }))
    }

    const openMuleSettings = () => {

        setState(prevState => ({ ...prevState, showMuleSettings: true }))
    }
    const closeMuleSettings = () => {
        setState(prevState => ({ ...prevState, showMuleSettings: false }))
    }


    const submit = async () => {
        let valid = await Validation(azureList, 'azureValidation')
        if (valid) {
            handleClose();
            setState(prevState => ({ ...prevState, azureResourceCreating: true }))

            setTimeout(function () {
                setState(prevState => ({ ...prevState, azureResourceCreating: false }))

            }, 600000)
            let orgName = state.organization.split("/dev.azure.com/")[1]
            var postObj =
            {
                "azpusername": state.username,
                "azppassword": null,
                "azusername": state.azusername,
                "azpassword": state.azpassword,
                "aztenantid": state.aztenantid,
                "azDevopsPat": state.azDevopsPat,
                "organization": state.organization,
                "location": "eastus",
                "resource_group_name": (orgName + (Math.random() + 1).toString(36).substring(7) + 'rg').replace(/[^a-zA-Z ]/g, ""),
                "containerRepository": (orgName + (Math.random() + 1).toString(36).substring(7) + 'containerRepo').replace(/[^a-zA-Z ]/g, ""),
                "azure_container_registry_name": (orgName + (Math.random() + 1).toString(36).substring(7) + 'containerReg').replace(/[^a-zA-Z ]/g, ""),
                "aks_cluster_name": (orgName + (Math.random() + 1).toString(36).substring(7) + 'cluster').replace(/[^a-zA-Z ]/g, "")
            }
            postResource(postObj, 'azresource', 'resource');

        }
    }
    const submitResource = async (resource) => {
        let valid = (resource == 'github') ? submitRepo() : (resource == 'jenkins') ? submitJenkins() : (resource == 'bitbucket') ?
            createBitBucket() : (resource == 'grafana') ? createGrafana() : (resource === 'aws') ? createAWS() :
                (resource == 'azure') ? submit() : (resource == 'mule') ? submitMule() : (resource == 'muleorg') ? submitMuleOrg() : ''


    }
    const submitRepo = async () => {
        console.log("inside Repo Submit")
        let valid = await Validation(githubList, 'githubValidation')
        if (valid) {
            handleClose();
            var postObj =
            {
                "gitUsername": state.gitUsername,
                "gitPat": state.gitPat,
                "gitRepo": state.gitRepo
            }

            postResource(postObj, 'repo', 'github')
        }
    }
    const createBitBucket = async () => {
        let valid = await Validation(bitbucketList, 'bitbucketValidation')
        if (valid) {
            handleClose();
            var postObj =
            {
                "bitbucketUsername": state.bitbucketUsername,
                "bitbucketPat": state.bitbucketPat,
                "bitbucketWorkspace": state.bitbucketWorkspace,
                "bitbucketProject": state.bitbucketProject
            }
            postResource(postObj, 'bitbucket', 'bitbucket')
        }

    }
    const submitJenkins = async () => {
        let valid = await Validation(jenkinsList, 'jenkinsValidation')
        if (valid) {
            handleClose();
            var postObj =
            {
                "jenkinsServer": state.jenkinsServer,
                "jenkinsToken": state.jenkinsToken,
                "jenkinsUsername": state.jenkinsUsername
            }
            postResource(postObj, 'jenkins', 'jenkins')
        }

    }
    const createGrafana = async () => {
        let valid = await Validation(grafanaList, 'grafanaValidation')
        if (valid) {
            handleClose();
            var postObj =
            {
                "grafanaServer": state.grafanaServer,
                "grafanaToken": state.grafanaToken
            }
            postResource(postObj, 'grafana', 'grafana')
        }
    }
    const submitMule = async () => {
        let valid = await Validation(muleEnvList, 'muleValidation')
        // if(valid){  
        if (state.muleValidation.muleClientId && state.muleValidation.muleClientPassword && state.muleValidation.anypointUsername
            && state.muleValidation.anypointPassword) {
            handleClose();
            var postObj =
            {
                "muleClientId": state.muleClientId,
                "muleClientSecret": state.muleClientPassword,
                "anypointUsername": state.anypointUsername,
                "anypointPassword": state.anypointPassword,
                "qaUsername": state.qaUsername,
                "qaPassword": state.qaPassword,
                "prodUsername": state.prodUsername,
                "prodPassword": state.prodPassword,
                "muleOrg": state.newOrg
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('token') },
                body: JSON.stringify(postObj)
            };
            try {
                fetch(domain + '/api/v1/mule', requestOptions)
                    .then((response) => {
                        if (!response.ok) {
                            console.log(response)
                            setState(prevState => ({ ...prevState, validationError: "Error creating mule settings, please verify your credntials and organization details" }))
                            setState(prevState => ({ ...prevState, validationFailed: true }));
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        getResource('mule', 'mule');
                    });
            } catch (e) {
                console.log(e)
                setState(prevState => ({ ...prevState, validationError: e }));
                setState(prevState => ({ ...prevState, validationFailed: true }));
            }

        }
    }
    const submitMuleOrg = async () => {
        let valid = await Validation(orgList, 'muleOrgValidation')
        if (valid) {
            handleClose();
            var postObj =
            {
                "organization": state.muleOrganization
            }
            postResource(postObj, 'mule/org', 'muleOrg');
        }
    }
    const postServices = async (url, obj) => {
        console.log("inside post", url, obj)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        //const response = await fetch(url, requestOptions);
        // const data = await response.json();
        // return data;
    }
    const getServices = async (url, obj) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                return data;
            });
    }
    const setContent = async (e, item) => {
        e.preventDefault()
        console.log(item)
        setState(prevState => ({ ...prevState, activePage: item }))
        getResource('repo', 'github');
        getResource('jenkins', 'jenkins');
        await getResource('mule', 'mule');
        await getResource('mule/org', 'muleOrg');
        // await createVpc();
        await createMuleEnvironment();
    }


    const createMuleSettings = (org) => {
        changeOrg(org)
        setState(prevState => ({ ...prevState, activePage: 'Mule' }));
        handleOpen();
    }
    const changeOrg = (org) => {
        setState(prevState => ({ ...prevState, newOrg: org }))
    }
    const createVpc = async () => {
        var vpcObj = {
            "username": state.selectedMuleUsername,
            "password": state.selectedMulePassword,
            "organizationID": state.selectedMuleOrg,
            "vpcName": state.vpcName,
            "region": state.muleRegionName,
            "cidrBlock": state.cidrBlockName
        }
        console.log(vpcObj);
        let vpcCreateObj = await postServices(anypoint + '/vpc/create', vpcObj)
        console.log(vpcCreateObj);
        // this.getAllVpc();
        // this.closeMuleSettings();
    }

    const createRTF = async () => {

        var rtfObj = {
            "muleSettingsId": state.muleSettingsId,
            "organizationID": state.selectedMuleOrg,
            "mulePassword": state.selectedMulePassword,
            "rtfRegion": state.rtfRegion,
            "rtfVendor": state.rtfVendor,
            "rtfLicenseKey": state.rtfLicenseKey,
            "rtfName": state.rtfName,
            "rtfOrg": state.selectedMuleOrgId,
            "muleUsername": state.selectedMuleUsername,
            "deployTargetEnv": state.deployTargetEnv,
            "targetCluster": state.targetCluster
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('token') },
            body: JSON.stringify(rtfObj)
        };
        console.log(rtfObj);
        fetch(domain + '/api/v1/mule/rtf', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                closeMuleSettings();
                return data;
            });

    }

    const createAWS = async () => {
        let valid = await Validation(awsList, 'awsValidation')
        if (valid) {
            handleClose();
            var postObj = {
                "awsaccesskey": state.awsaccesskey,
                "awsaccesskeyid": state.awsaccesskeyid,
                "location": state.awsregion,
                "awscluster": state.awscluster
            }
            setState(prevState => ({ ...prevState, azureResourceCreating: true }))
            postResource(postObj, 'awsresource', 'awsresources')

        }
    }
    //getVpc = async (orgId, username, password) => {
    //     if (orgId) {
    //         if (this.state.mule.length) {
    //             var gVpcObj = {
    //                 "username": username,
    //                 "password": password,
    //                 "organizationID": orgId
    //             }
    //             console.log(gVpcObj);
    //             let vpcRes = await this.postServices(anypoint + '/vpc/list', gVpcObj);
    //             console.log(vpcRes)
    //             return (vpcRes && vpcRes.Response && vpcRes.Response.data) ? vpcRes.Response.data : null;

    //         }
    //     }

    // }

    // getAllVpc = async () => {
    //     if (this.state.muleOrg.length) {
    //         let vpcLists = [];
    //         await this.state.muleOrg.forEach(async org => {
    //             console.log(org);
    //             await this.state.mule.forEach(async mule => {
    //                 console.log(mule)
    //                 if (mule.muleOrg === org.organization) {
    //                     let vpcres = await this.getVpc(org.organization, mule.muleUsername, mule.mulePassword)
    //                     console.log(vpcres);
    //                     if (vpcres && vpcres.length) {
    //                         vpcres.forEach(async vpcContent => {
    //                             console.log(vpcres)
    //                             vpcContent.organization = org.organization;
    //                             vpcLists.push(vpcContent);
    //                             this.closeMuleSettings();
    //                         })

    //                     }

    //                 }
    //             })

    //         })
    //         this.setState({ vpcLists: vpcLists })
    //         console.log("All VPC LISTS");
    //         console.log(vpcLists);
    //         console.log(this.state.vpcLists)
    //     }
    // }
    // getAllVpn = async () => {
    //     if (this.state.muleOrg.length) {
    //         let vpnLists = [];
    //         await this.state.muleOrg.forEach(async org => {
    //             this.state.mule.forEach(async mule => {
    //                 if (mule.organization === org) {
    //                     if (this.state.vpcLists && this.state.vpcLists.length) {
    //                         await this.state.vpcLists.forEach(async vpc => {
    //                             if (vpc.organization === mule.organization) {
    //                                 let vpnres = this.getVpn(org, mule.muleUsername, mule.mulePassword, vpc.id);
    //                                 if (vpnres && vpnres.length) {
    //                                     await vpnres.forEach(async vpnContent => {
    //                                         console.log(vpnres)
    //                                         vpnContent.organization = org.organization;
    //                                         vpnLists.push(vpnContent);
    //                                     })
    //                                 }
    //                             }
    //                         })
    //                     }
    //                 }
    //             })

    //         })
    //         this.setState({ vpnLists: vpnLists })
    //         console.log("All VPN LISTS");
    //         console.log(vpnLists)
    //     }
    // }
    // getVpn = async (orgId, username, password, vpcid) => {
    //     var gVpnObj = {
    //         "username": username,
    //         "password": password,
    //         "organizationID": orgId,
    //         "vpcID": vpcid
    //     }

    //     let vpnRes = await this.postServices(anypoint + '/vpn/list', gVpnObj);
    //     console.log(vpnRes)
    //     return (vpnRes && vpnRes.Response && vpnRes.Response.data) ? vpnRes.Response.data : null;

    // }
    const createVpn = async () => {
        var vpnObj = {
            "username": state.selectedMuleUsername,
            "password": state.selectedMulePassword,
            "organizationID": state.selectedMuleOrg,
            "vpcID": state.vpcId,
            "vpnName": state.vpcName,
            "remoteIpAddress": state.remoteIpAddress
        }
        let vpnCreate = await postServices(anypoint + '/vpn/create', vpnObj);
        console.log("After VPN Created");
        // this.getAllVpn();
        // this.closeMuleSettings();

    }
    // getMuleEnvironment = async (username, password, orgId) => {
    //     var gEnvObj = {
    //         "username": username,
    //         "password": password,
    //         "organizationID": orgId,
    //     }
    //     let envRes = await this.postServices(anypoint + '/env/list', gEnvObj);
    //     return (envRes && envRes.Response && envRes.Response.data) ? envRes.Response.data : null;

    // }
    // getAllMuleEnvironment = async () => {
    //     if (this.state.muleOrg.length) {
    //         let envLists = [];
    //         await this.state.muleOrg.forEach(async org => {
    //             console.log(org);
    //             await this.state.mule.forEach(async mule => {
    //                 console.log(mule)
    //                 if (mule.muleOrg === org.organization) {
    //                     let envres = await this.getMuleEnvironment(mule.muleUsername, mule.mulePassword, org.organization)
    //                     console.log(envres);
    //                     if (envres && envres.length) {
    //                         envres.forEach(async envContent => {
    //                             console.log(envContent)
    //                             envContent.organization = org.organization;
    //                             envLists.push(envContent);
    //                         })
    //                     }
    //                     // this.setState({ vpcLists: vpcLists })
    //                     // console.log(this.state.vpcLists)

    //                 }
    //             })

    //         })
    //         this.setState({ muleEnvironmentList: envLists })
    //         console.log("All ENV LISTS");
    //         console.log(envLists);
    //         console.log(this.state.muleEnvironmentList)
    //     }
    // }
    const createMuleEnvironment = async () => {
        var envObj = {
            "username": state.selectedMuleUsername,
            "password": state.selectedMulePassword,
            "organizationID": state.selectedMuleOrg,
            "envName": state.environmentName,
            "isProduction": false
        }
        let envCreate = await postServices(anypoint + '/env/create', envObj);
        console.log("Mule Environement");
        // this.getAllMuleEnvironment();
        // this.closeMuleSettings();
    }
    function toggleMuleOrg(muleOrgItem, index) {
        if (muleOrgItem.toggleElement === undefined) {
            muleOrgItem.toggleElement = true
        } else {
            muleOrgItem.toggleElement = !muleOrgItem.toggleElement
        }
        let muleOrganization = state.muleOrg;
        muleOrganization[index] = muleOrgItem;
        setState(prevState => ({ ...prevState, muleOrg: muleOrganization }));      // setMuleOrg(muleOrganization) 
    }

    const setActiveMuleContent = (val, muleOrg) => {
        console.log("rtf", muleOrg)
        setState(prevState => ({ ...prevState, selectedMuleOrg: muleOrg.organization }))
        state.mule.forEach(mule => {
            if (mule.muleOrg === muleOrg.organization) {
                setState(prevState => ({ ...prevState, selectedMuleUsername: mule.muleUsername }));
                setState(prevState => ({ ...prevState, selectedMulePassword: mule.mulePassword }));
                setState(prevState => ({ ...prevState, selectedMuleOrgId: mule.muleOrgId }));
                setState(prevState => ({ ...prevState, muleSettingsId: mule._id }))
                // this.getOrganizationEnvironment(mule.muleOrgId,mule.muleUsername,mule.mulePassword);
            }
        })
        setState(prevState => ({ ...prevState, activeMuleContent: val }))
        openMuleSettings();
    }
    return (
        <div className="root" >
            <CustomHeader></CustomHeader>
            <main className="content">
                {
                    state.azureResourceCreating ?
                        <Row className="progress-label-wrap">
                            <label>Resource creating in progress.</label>
                        </Row> : state.muleOrgNotDelete ? <Row className="progress-label-wrap">
                            <label>Delete the Mule Settings.</label>
                        </Row> : null
                }
                {/* <div>
                                    <a href="/dashboard">
                                        <ListItem button  >
                                        <ListItemIcon>
                                            <AccountTreeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Project Center" />
                                        </ListItem>
                                    </a>
                                    <a href="/templates" >
                                        <ListItem button >
                                        <ListItemIcon>
                                            <TransformIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Project Templates" />
                                        </ListItem>
                                    </a>

                                    </div>           */}
                <Container >

                    <Col className="access-menu" xs={12}>
                        <div>
                            <h6 className="sidemenu-title">Configurations</h6>
                            <ul className="sidemenuList">
                                {sidemenuList.map(item => {
                                    return (
                                        <li className={item === state.activePage ? 'selected' : ' ' + item}>
                                            <a onClick={(e) => setContent(e, item)}>{item}</a>  </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </Col>
                    <Row className="no-margin no-padding">
                        <Col className="settings-content" xs={12}>
                            <div className={'error-container ' + state.validationFailed} >
                                <label>{state.validationError}</label>
                            </div>
                            {getBodyContent()}

                        </Col>
                    </Row>
                    <Modal show={state.showModal} onHide={() => handleClose()} className="resourceModal">
                        <AddNewResource onChange={onChange} submitResource={submitResource}
                            state={state} />
                    </Modal>
                    <Modal show={state.showMuleSettings} onHide={() => closeMuleSettings()} className="muleResourceModal">
                        <AddActiveMuleContent onChange={onChange} state={state} createVpc={createVpc} createRTF={createRTF}
                            createVpn={createVpn} createMuleEnvironment={createMuleEnvironment} />
                    </Modal>
                    <ConfirmDialog />
                </Container>
            </main>
        </div >
    );
}
export default Accessmanagement;