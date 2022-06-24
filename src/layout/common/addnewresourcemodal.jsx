import {  Modal, Button } from 'react-bootstrap';
import * as myConst  from "../../constants/configurationPageConstants";
import React  from "react";
import {AddNewInput, SubmitButton, ValidationComponent} from "../../components/new-resource-form/index.js"

const orgList = myConst.orgList;
const azureList = myConst.azureList;
const githubList = myConst.githubList;
const jenkinsList = myConst.jenkinsList;
const muleEnvList = myConst.muleEnvList;
const grafanaList = myConst.grafanaList;
const bitbucketList = myConst.bitbucketList;
const awsList = myConst.awsList;

function AddNewResource (props){
    return(
                        <>
                            <Modal.Header closeButton className="modal-header">   
                            <Modal.Title>Add New {(props.activePage === 'Github') ?'Github Repo': 'Resources'}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                               
                                {props.state.activePage === 'Azure' ? <div>
                                    {
                                        azureList.map(res => {
                                            return (
                                                <div className="form-content">
                                            <AddNewInput res={res} onChange={props.onChange}/>                                                   
                                                    {props.state.azureValidation[res.stateVal]==false?
                                                   <ValidationComponent message='please provide value here'/>:null}
                                                </div>
                                            )
                                        })
                                    }
                                    <Button type="button" fullWidth variant="contained"
                                        className="submit-btn" onClick={() => props.submitResource('azure')}>Submit</Button>
                                </div> : props.state.activePage === 'Github' ? <div>
                                    {
                                        githubList.map(res => {
                                            return (
                                                <div className="form-content">
                                                    <AddNewInput res={res} onChange={props.onChange}/>                                                   
                                                    {props.state.githubValidation[res.stateVal]==false?
                                                    <ValidationComponent message='please provide value here'/>:null}
                                                </div>
                                            )
                                        })
                                    }
                                   <Button type="button" fullWidth  variant="contained"
                                        className="submit-btn" onClick={() => props.submitResource('github')}>Submit</Button>                              
                                </div> : props.state.activePage === 'Jenkins' ? <div>
                                    {
                                        jenkinsList.map(res => {
                                            return (
                                                <div className="form-content">
                                                   <AddNewInput res={res} onChange={props.onChange}/>                                               
                                                    {props.state.jenkinsValidation[res.stateVal]==false?
                                                    <ValidationComponent message='please provide value here'/>:null}
                                                </div>
                                            )
                                        })
                                    }
                                    <Button type="button" fullWidth variant="contained"
                                        className="submit-btn" onClick={() => props.submitResource('jenkins')}>Submit</Button>
                                </div> : props.state.activePage === 'Mule' ? <div>
                                    {
                                        muleEnvList.map(res => {
                                            return (
                                                <div className="form-content">
                                                    <AddNewInput res={res} onChange={props.onChange}/>                                             
                                                    {props.state.muleValidation[res.stateVal]==false?
                                                   <ValidationComponent message='please provide value here'/>:null}
                                                </div>
                                            )
                                        })
                                    }
                                    <Button type="button" fullWidth variant="contained"
                                        className="submit-btn" onClick={() => props.submitResource('mule')}>Submit</Button>
                                </div> : props.state.activePage === 'Grafana' ? <div>
                                    {
                                        grafanaList.map(res => {
                                            return (
                                                <div className="form-content">
                                                    <AddNewInput res={res} onChange={props.onChange}/>                                            
                                                    {props.state.grafanaValidation[res.stateVal]==false?
                                                   <ValidationComponent message='please provide value here'/>:null}
                                                </div>
                                            )
                                        })
                                    }
                                    <Button type="button" fullWidth  variant="contained"
                                        className="submit-btn" onClick={() => props.submitResource('grafana')}>Submit</Button>
                                </div> :  props.state.activePage === 'Bitbucket' ? <div>
                                    {
                                        bitbucketList.map(res => {
                                            return (
                                                <div className="form-content">
                                                     <AddNewInput res={res} onChange={props.onChange}/>                                         
                                                    {props.state.bitbucketValidation[res.stateVal]==false?
                                                    <ValidationComponent message='please provide value here'/>:null}
                                                </div>
                                            )
                                        })
                                    }
                                    <Button type="button" fullWidth  variant="contained"
                                        className="submit-btn" onClick={() => props.submitResource('bitbucket')}>Submit</Button>
                                </div> :  props.state.activePage === 'AWS' ? <div>
                                    {
                                       awsList.map(res => {
                                            return (
                                                <div className="form-content">
                                                    <AddNewInput res={res} onChange={props.onChange}/>                                         
                                                    {props.state.awsValidation[res.stateVal]==false?
                                                   <ValidationComponent message='please provide value here'/>:null}
                                                </div>
                                            )
                                        })
                                    }
                                    <Button type="button" fullWidth variant="contained"
                                        className="submit-btn" onClick={() => props.submitResource('aws')}>Submit</Button>
                                </div> : <div>
                                    {
                                       orgList.map(res => {
                                            return (
                                                <div className="form-content">
                                                   <AddNewInput res={res} onChange={props.onChange}/>                                       
                                                    {props.state.muleOrgValidation[res.stateVal]==false?
                                                   <ValidationComponent message='please provide value here'/>:null}
                                                </div>
                                            )
                                        })
                                    }
                                    <Button type="button" fullWidth variant="contained"
                                        className="submit-btn" onClick={() => props.submitResource('muleorg')}>Submit</Button>
                                </div>}
                            </Modal.Body>
                            </>
        )
}
export default AddNewResource;