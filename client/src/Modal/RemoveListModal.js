import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './removeModal.scss'

const DeleteListModal = ({todoID, listId, updateRemoveOneListModalStatus, listTitle, todobox, updateTodobox, userName}) => {

    const deleteList = (todoId, listID) => {
        console.log(listID)
        console.log(todoID)
        axios.delete("/todos/"+todoId+"/list/"+listID+"/user/"+userName)
        .then(response => {
            console.log(response);
            let copyData = [...todobox];
            let findIndex = copyData.findIndex(x => x._id === todoId);
            copyData[findIndex].data = copyData[findIndex].data.filter(y => y.id !== listID);
            updateTodobox(copyData);
            updateRemoveOneListModalStatus(false);
        })
        .catch( err => {
            console.log(err);
        })
    }
    const cancel = () => {
        updateRemoveOneListModalStatus(false);
    }    

    return ReactDOM.createPortal(
            <div className ="modal-block-container">
                <div className = "modal-block-box">
                    <h2>Delete List</h2>
                    <p className="modal-block-box--text">Remove <span>{listTitle}</span> from the todo list box ?</p>
                    <div className="modal-block-buttons">
                        <div className="modal-block-cancel" onClick={cancel}>Cancel</div>
                        <div className="modal-block-remove" onClick={() => deleteList(todoID, listId)}>Remove</div>
                    </div>
                </div>
            </div>,
		document.body
	);
};

export default DeleteListModal;