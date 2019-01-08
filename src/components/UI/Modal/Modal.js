import React from 'react';

import classes from './Modal.css';
import Hoc from '../../../hoc/Hoc';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) =>(
    <Hoc>
        <Backdrop show={props.show} closeModal={props.closeModal}/>
        <div style={{
            transform : props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity : props.show ? '1' : '0' 
            }}
            className = {classes.Modal}>
            {props.children}
        </div>
       
    </Hoc>
)

export default Modal;