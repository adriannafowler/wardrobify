import React from 'react';
import x from './x.svg'

function DeleteModal({ show, onClose, onDelete }) {
    if (!show) {
        return null;
    }
    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">DELETE</h5>
                        <button type="button" className="close" onClick={onClose} aria-label="Close">
                            <img src={x} alt="Close" />
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this item?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-danger" onClick={onDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
