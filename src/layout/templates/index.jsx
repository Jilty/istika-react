import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import TextField from '@material-ui/core/TextField';
import CustomHeader from "../../components/header";
import PropTypes from "prop-types";
import './templates.scss';
import { Container, Col, Row, Card, ListGroup, ListGroupItem, Figure, Image, Button, Table, Modal } from 'react-bootstrap';
import Select from 'react-select';
import * as moment from "moment"
import { config } from "@fortawesome/fontawesome-svg-core";
import servicenowicon from '../../assets/icons/servicenow.jpg';
import salesforceicon from '../../assets/icons/salesforce.png';
import genericdbicon from '../../assets/icons/genericdb.png';
import jmetericon from '../../assets/icons/jmeter.png';
import anaplan from '../../assets/icons/anaplan.png';
import workday from '../../assets/icons/workday.png';
import kafka from '../../assets/icons/kafka.png';
import magento from '../../assets/icons/magento.png';
import azureIcon from '../../assets/icons/azure-icon.png';
import springIcon from '../../assets/icons/spring.png'
import reactIcon from '../../assets/icons/react.png'
import awsIcon from '../../assets/icons/aws.png'
import mulesoftIcon from '../../assets/icons/mulesoft.png'
import golangIcon from '../../assets/icons/golang.png'
import jenkinsIcon from '../../assets/icons/jenkins.png'
import CardContainer  from "../../components/cardContainer";
import rtfIcon from '../../assets/icons/rtf.png'
import lamda from '../../assets/icons/lamda.png';
import mongodb from '../../assets/icons/mongodb.png';
import mews from '../../assets/icons/mews.png';
const cloudOptions = [
  { value: 'azure', label: 'Azure' },
  { value: 'aws', label: 'Aws' },
  { value: 'jenkins', label: 'Jenkins' }
];
const techStack= [
          {
            "name": "Spring",
            "description": "Springboot template",
            "selected":false,
            "icon":springIcon
          },
           {
            "name": "React",
            "description": "React template",
             "selected":false,
            "icon":reactIcon
          },  {
        name: "Mule Placeholder Template",
        value: "rtf-apiops-demo",
        description: "Something about the application",
        icon: rtfIcon
      },
      {
        name: "Generic Datbase System API",
        value: "apix-generic-db-sapi",
        description: "Something about the application",
        icon: genericdbicon
      },
      {
        name: "Salesforce System API",
        value: "apix-salesforce-sapi",
        description: "Something about the application",
        icon: salesforceicon
      },
      {
        name: "Servicenow System APi",
        value: "apix-servicenow-sapi",
        description: "Something about the application",
        icon: servicenowicon
      },
      {
        name: "Performance Testing Template",
        value: "apix-jmeter-automation-master",
        description: "Something about the application",
        icon: jmetericon
      },
      {
        name: "Anaplan Template",
        value: "apix-anaplan-sapi",
        description: "Something about the application",
        icon: anaplan
      },
      {
        name: "Kafka  Template",
        value: "apix-kafka-sapi",
        description: "Something about the application",
        icon: kafka
      },
      {
        name: "Magento Template",
        value: "apix-magento-sapi",
        description: "Something about the application",
        icon: magento
      },{
        name: "Workday Testing Template",
        value: "apix-workday-sapi",
        description: "Something about the application",
        icon: workday
      }, {
            "name": "Go Lang",
            "description": "Go template",
             "selected":false,
            "icon":golangIcon
          }
        ]
// const domain = "http://159.65.94.192:8081";
const domain = "http://209.97.183.126:8081";
export default function Templates () {
  // static contextTypes = {
  //   router: PropTypes.object
  // }

  const [state,setState] =useState ({
    resources: [],
    resource_group_name: [],
    azure_container: [],
    azure_cluster: [],
    projects: [],
    showModal: false,
    projectStep: 1,
    searchVal:"",
    archetypes: [
      {
        label: "Generic Datbase System API",
        value: "apiops-generic-db-sapi"
      },
      {
        label: "Salesforce System API",
        value: "apiops-salesforce-sapi"
      },
      {
        label: "Servicenow System APi",
        value: "apiops-servicenow-sapi"
      },
      {
        label: "Performance Testing Template",
        value: "apipos-jmeter-automation-master"
      }
    ],
    projectArchetype: '',
    cloudOptions: [
      { value: 'azure', label: 'Azure' },
      { value: 'aws', label: 'Aws' },
      { value: 'jenkins', label: 'Jenkins' }
    ],
    projectOptions: [
      { value: 'spring', label: 'Spring' },
      { value: 'react', label: 'React' }
    ]
  } ) 
 const handleChange = event => {
   event.persist()
    setState(prevState=>({...prevState, filter: event.target.value }));
  };
  
    const { filter, data } = state;
    // const lowercasedFilter = filter.toLowerCase();
    const filteredData = filter?techStack.filter(item => item.name.toLowerCase().includes(filter.toLowerCase())):techStack;
    console.log(filteredData);
    return (
      <div className="root" >
        <CustomHeader></CustomHeader>
        <main className="content">
          <Container >
            <Row className="template-search-wrap">
              <Col xs={12}>
                <input className="search-template" placeholder="Search templates"  value={filter} onChange={handleChange} ></input>    <button className='create-project-btn searchButon' variant="contained"> Search</button>
              </Col>
              <Col>
                 <CardContainer data={filteredData} onClick={(val) => console.log(val)}></CardContainer>

              </Col>
            </Row>
          </Container >
        </main>
      </div>
    );
  

}
