import { TextureRounded } from "@material-ui/icons";
import React from "react";
import {Col, Row,Button,Container,Card} from 'react-bootstrap';
import notFoundIcon from '../../assets/icons/nodata.png';
import Icon from 'react-crud-icons';
import ProjectCard from '../projectCard/index'
import JenkinsCard from '../jenkinsCard/index'

// import "@react-crud-icons/dist/css/react-crud-icons.css";



export function TableHeader (props){
    console.log("header",props)
    return(
        <>
        <thead>
        <tr>
            {props.list.map(item => {
              return(           
                <th>{item}</th>                
            ) })}
        </tr>  
        </thead>

        </>
    )
}

export function TableName (props){
    return(
        <>
         {/* <Row> */}
            <Col xs={6}>
                <div>{props.name}</div>
            </Col>
            <Col xs={6}>
                <Button className="create-az-btn" onClick={() => props.handleOpen()}>Add new</Button>
            </Col>
        {/* </Row> */}
        </>
    )
}
export function NoSettingsFound (props){
    return(
        <>
        <div className="no-settings-found">
            <img src={notFoundIcon} alt="Not Found" />
                <div> {props.message}</div>
        </div>
        </>
    )
}

export function TableBody (props){
    console.log(props)
    return(
        <>
            <tbody>
                {props.resourceList.map((resource,index) => {
                    return(
                        <>
                        <tr >
                    {props.headerList.map((item,ind)=>{     
                        const arr = item.split(" ");
                        arr[0]=arr[0].toLowerCase();
                        const keyword = arr.join("");
                                //    let keyword = ((item[0].toLowerCase() + item.substring(1)).replace(/ /g, ""))
                     return (
                        <>
                            {(keyword.includes("Pat")||keyword.includes("Token"))?
                            <td><input className="table-apssword" type="password" value = {resource[keyword]}></input></td>:
                            <td>{resource[keyword]}</td>
                            }    
                         {ind==props.headerList.length-1? <td><Icon name = "delete"  theme = "dark"  size = "small" onClick ={() => props.deleteResource(resource._id,props.url,props.stateVar)}/></td>:null}
                        </>
                     )
                        })}
                </tr></>                                                       
                )
                    })
                }
            </tbody>
        </>
    )
}
export function TableBodyWithCondition (props){
    return(
        <>
            <tbody>
                {props.mule.map(muleItem => {
                    if (muleItem.muleOrg === props.muleOrgItem.organization) {
                        return (
                            <tr>
                                <td>{muleItem.muleClientId}</td>
                                <td><input className="table-apssword" type="password" value={muleItem.muleClientSecret}></input></td>
                                <td>{muleItem.anypointUsername}</td>
                                <td><input className="table-apssword" type="password" value={muleItem.anypointPassword}></input></td>
                                <td><Icon name = "delete"  theme = "dark"  size = "small" onClick = {()=>props.deleteResource(muleItem._id,props.url,props.stateVar)}/></td>   
                                </tr>
                        )
                    } else {
                        return null;
                    }    
                })}
            </tbody>
        </>
    )
}
export function Table(props){
    return(
        <> 
        <Container>
                        <Row className="no-margin">
                            <Col xs={12} className="no-padding no-margin">
                            <Row><TableName name={props.name} handleOpen={props.handleOpen}/></Row>                               
                                <Row className="setting-table-wrap ">
                                    {
                                        props.resourceList.length ?
                                            <div className=" table-wrap">    
                                                <table className="custom-table" hover>
                                                   <TableHeader list={props.headerList}/>
                                                   <TableBody headerList={props.headerList} resourceList={props.resourceList} deleteResource={props.deleteResource} url={props.url} stateVar={props.stateVar} />                                                    
                                                </table>
                                            </div> :<NoSettingsFound message={props.message}/> }
                                </Row>
    
                            </Col>
                        </Row>
    
                    </Container>
        </>
                                                 
                       /* <Row xs={2} md={4} className="card-row" >


                        {props.resourceList.length ?
                        props.resourceList.map((item,ind)=>{  
                         return(   
                        <Col>
                          <ProjectCard value1='username' value2={item.gitUsername} value3='gitPat' value4={item.gitPat}/>

                      
                        </Col>
                        )})
                        :<NoSettingsFound message={props.message}/> } 
                        </Row> */

    
        
    )
}