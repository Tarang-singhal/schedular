import React from 'react';
import clsx from 'clsx';
import classes from './index.module.css';
import { X } from 'react-feather';

function Modal({ heading, openModal, handleCloseModal, children }) {
    return (
        <div className={clsx(classes.modal, openModal && classes.openModal)} onClick={handleCloseModal}>
            <div className={classes.modalBox} onClick={(e) => e.stopPropagation()}>
                <span className={classes.modalHeading}>
                    <p className={classes.modalHeadingText}>{heading}</p>
                    <X className={classes.modalClose} size="28" onClick={handleCloseModal} />
                </span>
                <hr />

                {children}

            </div>
        </div>
    )
}

export default Modal;