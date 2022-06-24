import React, { useState,useEffect,useContext} from "react";
import {  Modal, Button} from 'react-bootstrap';


function ConfirmModal(props) {
    return(        
          <>            
        <Modal.Body>
            {props.message}
       
   </Modal.Body>
       <Button type="button" data-inline="true" variant="contained"
                    className="confirm-btn" onClick={() => props.onSubmit()}>Submit</Button>
       <Button type="button" variant="contained"  data-inline="true"
                    className="confirm-btn-cancel" onClick={() => props.onCancel()}>Cancel</Button>
                    </>

    )
}

export default ConfirmModal