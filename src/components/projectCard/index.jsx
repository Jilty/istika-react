import React from 'react'
import styled from 'styled-components'
import {Col, Row,Button,Container,Card} from 'react-bootstrap';
import './projectCard.scss';



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

const ProjectCard = (props) => (
    <Col xs={6}>

  <div className= "projectcontainer">
      <div className='firstdiv'>
        <p>{props.value1}<br/>{props.value2}</p>
    {/* <Title>{props.value1}</Title>
    <Date>{props.value2}</Date> */}
    </div>
    <div >
        <p> {props.value3}<br/>
        <input className="table-apssword" type="password" value={props.value4}></input></p>
        {/* <Date type='password'>{props.value4}</Date> */}

    
    </div>
  </div>
  </Col>
)
export default ProjectCard