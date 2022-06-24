import React from 'react'
import { Col, Row, Button, Container, Card } from 'react-bootstrap';
import './onBoardingCard.scss';

const OnBoardingCard = (props) => (
    props.mule.map(muleItem => {
        if (muleItem.muleOrg === props.muleOrgItem.organization) {
     return(       
    <Col xs={6}>

        <div className="onboardingcontainer">
            <div className="onboardingcolumn1" >
                <p>Mule Client Id<br />{muleItem.muleClientId}</p>
                <p>Anypoint Username<br />{muleItem.anypointUsername}</p>
            </div>
            <div className="onboardingcolumn2" >
                <p>Mule Client Secret<br /><input className="table-apssword" type="password" value={muleItem.muleClientSecret}/></p>
                <p>Antpoint Password<br />{muleItem.anypointPassword}</p>

            </div>
        </div>
    </Col>
    )
     }}))
export default OnBoardingCard                                                   