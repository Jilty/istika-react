import React  from "react";
import { Button } from 'react-bootstrap';



export function AddNewInput(props){
    return(
    <>
     <div className="text-label-wrap">
        <label className="form-text-label">{props.res.label} (required)</label>            
    </div>
    <div className="text-input-wrap">
        <input name = {props.res.stateVal} type={props.res.type} className="form-imput" placeholder={props.res.label} onChange={props.onChange}></input>
    </div>
    </>)
}

export function SubmitButton(props){
    return(
    <>
     <Button type="button" fullWidth
        variant="contained"
        className="submit-btn" onClick={() => props.submitResource}>Submit</Button>
    </>)
}

export function ValidationComponent(props){
    return(
        <>
        <div className="invalid-value-wrap" >
          <label  style={{colour: "red"}}>{props.message}</label>
        </div>
        </>
    )
}