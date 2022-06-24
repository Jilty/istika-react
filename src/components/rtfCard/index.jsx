import React from 'react'
import { Col, Row, Button, Container, Card } from 'react-bootstrap';
import './onBoardingCard.scss';

const rtfCard = (props) => (
    props.rtfData.map(rtf => {
        if (rtf.organizationID === props.muleOrg.organization) {
     return(       
    <Col xs={6}>

        <div className="onboardingcontainer">
            <div className="onboardingcolumn1" >
                <p>RTF Name<br />{muleItem.muleClientId}</p>
                <p>Status<br />{muleItem.anypointUsername}</p>
            </div>
            
        </div>
    </Col>
    )
     }}))
export default rtfCard                                                   