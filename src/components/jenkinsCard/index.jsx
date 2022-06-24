import React from 'react'
import {Col, Row,Button,Container,Card} from 'react-bootstrap';
import './jenkinsCard.scss';


const JenkinsCard = (props) => (
   <Row style={{'margin-bottom': "10px"}}>
    <div className= "jenkinscontainer">
    <div className="column" >
      <p>Username<br/>{props.item.jenkinsUsername}</p>
    </div>
    <div className="column" >
    <p>Jenkins Server<br/>{props.item.jenkinsServer}</p>
    </div>
    <div className="column">
    <p>Jenkins Pat<br/><input className="table-apssword" type="password" value={props.item.jenkinsToken}></input></p>
    </div>
  </div>
  </Row>
)
export default JenkinsCard