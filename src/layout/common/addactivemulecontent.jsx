import {  Modal, Button } from 'react-bootstrap';
import {environmentList,vpcRequestList,vpnRequestList,roleRequestList,rtfRequestList,grafanaList}  from "../../constants/configurationPageConstants";
import React from "react";
import {AddNewInput,ValidationComponet} from "../../components/new-resource-form/index.js"


function AddActiveMuleContent (props){
    return(
      <>
      <Modal.Header closeButton className="modal-header">
                                <Modal.Title>Add New {props.state.activeMuleContent}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {props.state.activeMuleContent === 'VPC' ? <div>
                                    {
                                        vpcRequestList.map(res => {
                                            return (
                                                <div className="form-content">
                                                 <AddNewInput res={res} onChange={props.onChange}/>                                                
                                                </div>
                                            )
                                        })
                                    }
                                    <Button type="button"  fullWidth variant="contained"
                                        className="submit-btn" onClick={() => props.createVpc()}>Submit</Button>
                                </div> : props.state.activeMuleContent === 'VPN' ? <div>
                                    <div className="form-content">
                                        <div className="text-label-wrap">
                                            <label className="form-text-label">VPC ID</label>
                                        </div>
                                        <div className="text-input-wrap">
                                            <select className="form-input custom-select" name='vpcId' onChange={props.onChange}>
                                                {
                                                    props.state.vpcLists.map(vpc => {
                                                        if (vpc.organization === props.state.selectedMuleOrg) {
                                                            return (
                                                                <option val={vpc.id}>{vpc.id}</option>
                                                            )
                                                        }


                                                    })
                                                }
                                            </select>

                                        </div>
                                    </div>
                                    {
                                     vpnRequestList.map(res => {
                                            return (
                                                <div className="form-content">
                                                 <AddNewInput res={res} onChange={props.onChange}/>                                                 
                                                </div>
                                            )
                                        })

                                    }
                                    <Button type="button" fullWidth variant="contained"
                                        className="submit-btn" onClick={() => props.createVpn()}>Submit</Button>
                                </div> : props.state.activeMuleContent === 'Environment' ? <div>
                                    {
                                        environmentList.map(res => {
                                            return (
                                                <div className="form-content">
                                                    <AddNewInput res={res} onChange={props.onChange}/>                                                  
                                                </div>
                                            )
                                        })
                                    }
                                    <Button type="button" fullWidth variant="contained"
                                        className="submit-btn" onClick={() => props.createMuleEnvironment()}>Submit</Button>
                                </div> : props.state.activeMuleContent === 'Role' ? <div>
                                    {
                                        roleRequestList.map(res => {
                                            return (
                                                <div className="form-content">
                                                    <AddNewInput res={res} onChange={props.onChange}/>                                                  
                                                </div>
                                            )
                                        })
                                    }
                                    {/* <Button type="button"
                                        fullWidth
                                        variant="contained"
                                        className="submit-btn" onClick={() => createRole()}>Submit</Button> */}
                                </div> : props.state.activeMuleContent === 'Grafana' ? <div>
                                    {
                                        grafanaList.map(res => {
                                            return (
                                                <div className="form-content">
                                                    <AddNewInput res={res} onChange={props.onChange}/>                                                
                                                </div>
                                            )
                                        })
                                    }
                                    {/* <Button type="button"
                                        fullWidth
                                        variant="contained"
                                        className="submit-btn" onClick={() => createRole()}>Submit</Button> */}
                                </div> : props.state.activeMuleContent === 'RTF' ?<div>
                                    {
                                        rtfRequestList.map(res => {
                                            return (
                                                <div className="form-content">
                                                    <div className="text-label-wrap">
                                                        <label className="form-text-label">{res.label} (required)</label>
                                                    </div>
                                                    {
                                                        res.type === 'select' ?  
                                                      <div className="text-input-wrap">
                                                        <select className="form-input custom-select" name={res.stateVal}onChange={props.onChange}>
                                                             <option>{res.label}</option>
                                                        {
                                                            res&& res.options && res.options.map(opt => <option value={opt}>{opt}</option>)
                                                        }
                                                        </select>
                                                    </div> :
                                                   <div className="text-input-wrap">
                                                        <input type={res.type} name={res.stateVal} className="form-imput" placeholder={res.label} onChange={props.onChange}></input>
                                                    </div>
                                                    }
                                                   
                                                </div>
                                            )
                                        })
                                        
                                    }
                                    <div className="form-content">
                                        <div className="text-label-wrap">
                                            <label className="form-text-label">Target Environment</label>
                                        </div>
                                        <div className="text-input-wrap">
                                            <select className="form-input custom-select" name='deployTargetEnv'onChange={props.onChange}>
                                                 <option val="">Select Environment</option>
                                                {
                                                    props.state.organizationEnvironment.map(org => {
                                                         return (
                                                                <option val={org}>{org}</option>
                                                            )
                                                    })
                                                }
                                            </select>

                                        </div>
                                    </div>
                                    <div className="form-content">
                                        <div className="text-label-wrap">
                                            <label className="form-text-label">Target Cluster</label>
                                        </div>
                                        <div className="text-input-wrap">
                                            <select className="form-input custom-select" name="targetCluster" onChange={props.onChange}>
                                                 <option val="">Select Cluster</option>
                                                {
                                                  props.state.rtfVendor == 'aks' ?  props.state.resource.map(res => {
                                                         return (
                                                                <option val={res.aks_cluster_name}>{res.aks_cluster_name}</option>
                                                            )
                                                    }) : props.state.awsresources.map(res => {
                                                         return (
                                                                <option val={res.awscluster}>{res.awscluster}</option>
                                                            )
                                                    })
                                                }
                                            </select>

                                        </div>
                                    </div>
                                    <Button type="button"  fullWidth variant="contained"
                                        className="submit-btn" onClick={() => props.createRTF()}>Submit</Button>
                                </div>: null}
                            </Modal.Body>

      </>
    )
}
export default AddActiveMuleContent;    
