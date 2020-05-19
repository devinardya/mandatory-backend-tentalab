import React, {useState, useRef, useCallback, useEffect} from 'react';
import {IoMdMenu, IoIosAddCircle} from 'react-icons/io';
import {TiDelete, TiArrowForward} from 'react-icons/ti';
import {MdModeEdit} from 'react-icons/md';
import AddListModal from '../Modal/AddListModal';
import RenameTitleModal from '../Modal/RenameTitleModal';
import RemoveListModal from '../Modal/RemoveListModal';
import RemoveToDoModal from '../Modal/RemoveTodoBoxModal';
import RenameListModal from '../Modal/RenameListModal';
import MoveListModal from '../Modal/MoveListModal';
import AddBoxForm from './AddBoxForm';

const MainBox = ({todobox, updateTodobox, userName}) => {

    
    const [addListModalStatus, updateAddListModalStatus] = useState(false);
    const [renameTitleModalStatus, updateRenameTitleModalStatus] = useState(false);
    const [removeOneListModalStatus, updateRemoveOneListModalStatus] = useState(false);
    const [removeTodoBoxModalStatus, updateRemoveTodoBoxModalStatus] = useState(false);
    const [renameListModalStatus, updateRenameListModalStatus] = useState(false);
    const [moveListModalStatus, updateMoveListModalStatus] = useState(false);
    const [todoID, updatetodoID] = useState("");
    const [listId, updateListId] = useState("");
    const [listTitle, updateListTitle] = useState("");
    const [listDesc, updateListDesc] = useState("");
    const [oldTitle, updateOldTitle] = useState("");
    const [todoboxMenu, updateTodoboxMenu] = useState(false);
    const [activeDropboxID, updateactiveDropboxID] = useState("");
    const nodeDropdown = useRef();

    
    

    const removeTodoBox = (id, title) => {
        updatetodoID(id);
        updateRemoveTodoBoxModalStatus(true);
        updateOldTitle(title);
        updateTodoboxMenu(false);
    };

    const addListModalActive = (id) => {
        updatetodoID(id);
        updateAddListModalStatus(true);

    }

   	const activateMenu = (e, id, index) => {
        e.preventDefault();
        let copyData = [...todobox];
        let indexArr = copyData.findIndex( x => x._id === id);
        if (indexArr === index){
            updateactiveDropboxID(id);
            updateTodoboxMenu(todoboxMenu ? false : true);
        }
    };

    const handleClickOutside = useCallback((e) => {
		if (nodeDropdown.current.contains(e.target)) {
			// inside click
			return;
		}
		// outside click 
		//updateTodoboxMenu(todoboxMenu ? false : true);
	}, [todoboxMenu]);

	useEffect(() => {
		//this document.addEventListerner can only be used inside a useEffect
		if (todoboxMenu) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [todoboxMenu, handleClickOutside]);

    const activateRename = (id, title) => {
        updatetodoID(id);
        updateOldTitle(title);
        updateRenameTitleModalStatus(true);
        updateTodoboxMenu(false);
    }

    const deleteOneList = (todoid, listID, title) => {
        updatetodoID(todoid);
        updateListId(listID);
        updateListTitle(title);
        updateRemoveOneListModalStatus(true);
        updateTodoboxMenu(false);
    }

    const renameOneList = (todoid, listID, title, description) => {
        updatetodoID(todoid);
        updateListId(listID);
        updateListTitle(title);
        updateListDesc(description)
        updateRenameListModalStatus(true);
        updateTodoboxMenu(false);
    }

    const moveOneList = (todoid, listID, title) => {
        updatetodoID(todoid);
        updateListId(listID);
        updateListTitle(title);
        updateMoveListModalStatus(true);
        updateTodoboxMenu(false);
    }

    return <main className="board-block-main">
                <div className="board-block-boxes">
                    {todobox.map( (todo, index) => {
                        return ( <div className="board-block-main--eachbox" key={todo._id}>
                                    <h4>{todo.title}</h4>
                                    <div className="title-menu-button" ref={nodeDropdown}>
                                            <button onClick={ (e) => activateMenu(e, todo._id, index)} >
                                                <IoMdMenu size="18px" />
                                            </button>
                                            {activeDropboxID === todo._id && todoboxMenu ? 
                                                <div className="board-main-dropdown-active">
                                                    <button onClick={() => removeTodoBox(todo._id, todo.title)}><TiDelete size="18px" style={{marginRight: "8px", position: "relative", top:"5px"}}/>Remove</button>
                                                    <button onClick={() => activateRename(todo._id, todo.title)}><MdModeEdit size="18px" style={{marginRight: "8px", position: "relative", top:"5px"}}/>Rename</button>
                                                </div>
                                            :
                                                null
                                            } 
                                    </div>
                                    <ul>
                                    {todo.data.map( (x) => {
                                        return <li className="board-block-main--list" key={x.id}>
                                                    <p className="list-title">{x.todoTitle}</p>
                                                    <p className="list-desc">{x.description}</p>
                                                    
                                                    <div className = "board-block-main--list--buttons">
                                                        <p className="list-date">{x.created}</p>
                                                        <div className="board-block-main--list--buttons__part">
                                                            <button onClick={() => deleteOneList(todo._id, x.id, x.todoTitle)}><TiDelete size="16px" style={{marginRight: "8px", position: "relative", top:"5px"}}/></button>
                                                            <button onClick={() => renameOneList(todo._id, x.id, x.todoTitle, x.description)}><MdModeEdit size="16px" style={{marginRight: "8px", position: "relative", top:"5px"}}/></button>
                                                            <button onClick={() => moveOneList(todo._id, x.id, x.todoTitle)}><TiArrowForward size="16px" style={{marginRight: "0px", position: "relative", top:"5px"}}/></button>
                                                        </div>
                                                    </div>
                                            </li>
                                    })}
                                    </ul>
                                    <div>
                                        <button className="board-block-main-addButton" onClick={() => addListModalActive(todo._id)}><IoIosAddCircle style={{position:"relative", top: "2px", marginRight:"10px"}}/>Add new list</button>
                                    </div>
                                </div>
                                )
                    })}

                    { addListModalStatus && <AddListModal 
                                                todobox = {todobox}
                                                updateTodobox = {updateTodobox}
                                                todoID = {todoID}
                                                updateAddListModalStatus = {updateAddListModalStatus}
                                                userName = {userName}
                                            />
                    }
                    { removeTodoBoxModalStatus && <RemoveToDoModal 
                                                todobox = {todobox}
                                                updateTodobox = {updateTodobox}
                                                todoID = {todoID}
                                                updateRemoveTodoBoxModalStatus = {updateRemoveTodoBoxModalStatus}
                                                oldTitle = {oldTitle}
                                                userName = {userName}
                                            />
                    }
                    { renameTitleModalStatus && <RenameTitleModal 
                                                todoID = {todoID}
                                                updateRenameTitleModalStatus = {updateRenameTitleModalStatus}
                                                oldTitle = {oldTitle}
                                                todobox = {todobox}
                                                updateTodobox = {updateTodobox}
                                                userName = {userName}
                                            />
                    }
                    { removeOneListModalStatus && <RemoveListModal 
                                                todoID = {todoID}
                                                updateRemoveOneListModalStatus = {updateRemoveOneListModalStatus}
                                                listId = {listId}
                                                listTitle = {listTitle}
                                                todobox = {todobox}
                                                updateTodobox = {updateTodobox}
                                                userName = {userName}
                                            />
                    }
                    { renameListModalStatus && <RenameListModal 
                                                todoID = {todoID}
                                                listId = {listId}
                                                updateRenameListModalStatus = {updateRenameListModalStatus}
                                                listTitle = {listTitle}
                                                listDesc = {listDesc}
                                                todobox = {todobox}
                                                updateTodobox = {updateTodobox}
                                                userName = {userName}
                                            />
                    }
                    { moveListModalStatus && <MoveListModal 
                                                todoID = {todoID}
                                                listId = {listId}
                                                listTitle = {listTitle}
                                                updateMoveListModalStatus = {updateMoveListModalStatus}
                                                todobox = {todobox}
                                                updateTodobox = {updateTodobox}
                                                userName = {userName}
                                            />
                    }
                    {todobox.length <= 4 ?
                        <AddBoxForm 
                            todobox = {todobox}
                            updateTodobox = {updateTodobox}
                            userName = {userName}
                        />
                    : null
                    }
                </div>
            </main>
};

export default MainBox;
