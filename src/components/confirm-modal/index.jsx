
import React from 'react';
import useConfirm from '../../hooks/useconfirm';
import {Modal, Button} from 'react-bootstrap';
import './modal.scss'; 

const ConfirmDialog = () => {
    const { onConfirm, onCancel, confirmState } = useConfirm();
        return(
     <>
       <Modal show={confirmState.show} onHide={onCancel} className="resourceModal">               
        <Modal.Body>
           {confirmState?.text && confirmState.text}   
        </Modal.Body>  
 <div className='inner'><Button type="button"                  
                variant="contained" size="sm"
                className="confirm-btn" onClick={onConfirm} >Yes</Button>
        <Button type="button"                    
                variant="contained" size="sm"
                className="confirm-btn-cancel" onClick={onCancel} >Cancel</Button></div>
                </Modal></>            
           
        )   

};
export default ConfirmDialog;