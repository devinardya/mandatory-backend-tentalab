import React, {useState, useRef, useCallback, useEffect} from 'react';
import {IoMdList, IoIosMore} from 'react-icons/io';
import {TiDelete, TiArrowForward} from 'react-icons/ti';
import {MdModeEdit} from 'react-icons/md';
import RemoveListModal from '../Modal/RemoveListModal';
import RenameListModal from '../Modal/RenameListModal';
import MoveListModal from '../Modal/MoveListModal';
import ListInfoModal from '../Modal/ListInfoModal';

const ListBox = ({
    todobox,
    todo,
    userName,
    updateTodobox,
    x,
}) => {

    const [removeOneListModalStatus, updateRemoveOneListModalStatus] = useState(false);
    const [renameListModalStatus, updateRenameListModalStatus] = useState(false);
    const [moveListModalStatus, updateMoveListModalStatus] = useState(false);
    const [listInfoModalStatus, updateListInfoModalStatus] = useState(false);
    const [ItemMenuStatus, updateItemMenuStatus] = useState(false);
    const itemMenu = useRef();

    const deleteOneList = () => {
        updateRemoveOneListModalStatus(true);
    };

    const renameOneList = () => {
        updateRenameListModalStatus(true);
    };

    const moveOneList = () => {
        updateMoveListModalStatus(true);
    };

    const showInfoModal = () => {
        updateListInfoModalStatus(true);
    };

    const activateItemMenu = useCallback( () => {
        updateItemMenuStatus(ItemMenuStatus ? false : true);
    }, [ItemMenuStatus]);

    const handleClickOutside = useCallback((e) => {
		if (itemMenu.current.contains(e.target)) {
			// inside click
			return;
		}
		// outside click 
        activateItemMenu(ItemMenuStatus)
	}, [ItemMenuStatus, activateItemMenu]);

	useEffect(() => {
		//this document.addEventListerner can only be used inside a useEffect
		if (ItemMenuStatus) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
    }, [ItemMenuStatus, handleClickOutside]);

    let dropdownItemClass;
	if (ItemMenuStatus) {
		dropdownItemClass = 'board-block-main--list--buttons__part active';
	} else {
		dropdownItemClass = 'board-block-main--list--buttons__part';
    };

    return <li className="board-block-main--list">
                <div className="board-block-main--list__menu">
                    <div className="board-block-main--list__info">
                        <p className="list-title" onClick={showInfoModal}>{x.todoTitle}</p>
                        {x.description.length > 0 ? <span className="list-desc" onClick={showInfoModal}><IoMdList /></span> : null}
                        {listInfoModalStatus && <ListInfoModal 
                            todobox = {todobox}
                            todo = {todo}
                            userName = {userName}
                            updateTodobox = {updateTodobox}
                            x = {x}
                            updateListInfoModalStatus = {updateListInfoModalStatus}
                        />}
                    </div>
                    <div className="item-menu-dropbox" ref={itemMenu}>
                            <button onClick={activateItemMenu} >
                                <IoIosMore size="18px" />
                            </button>
                            <div className= {dropdownItemClass}>
                                <button onClick={() => deleteOneList()}>
                                    <TiDelete size="16px" style={{marginRight: "8px", position: "relative", top:"3px"}}/>
                                    Remove item
                                </button>
                                { removeOneListModalStatus && <RemoveListModal 
                                    todoID = {todo._id}
                                    todoTitle = {todo.title}
                                    updateRemoveOneListModalStatus = {updateRemoveOneListModalStatus}
                                    listId = {x.id}
                                    listTitle = {x.todoTitle}
                                    todobox = {todobox}
                                    updateTodobox = {updateTodobox}
                                    userName = {userName}
                                />
                                }
                                <button onClick={() => renameOneList()}>
                                    <MdModeEdit size="16px" style={{marginRight: "8px", position: "relative", top:"3px"}}/>
                                    Edit item
                                </button>
                                { renameListModalStatus && <RenameListModal 
                                    todoID = {todo._id}
                                    listId = {x.id}
                                    updateRenameListModalStatus = {updateRenameListModalStatus}
                                    listTitle = {x.todoTitle}
                                    listDesc = {x.description}
                                    todobox = {todobox}
                                    updateTodobox = {updateTodobox}
                                    userName = {userName}
                                />
                                }
                                <button onClick={() => moveOneList()}>
                                    <TiArrowForward size="16px" style={{marginRight: "8px", position: "relative", top:"3px"}}/>
                                    Move item
                                </button>
                                { moveListModalStatus && <MoveListModal 
                                    todoID = {todo._id}
                                    listId = {x.id}
                                    listTitle = {x.todoTitle}
                                    updateMoveListModalStatus = {updateMoveListModalStatus}
                                    todobox = {todobox}
                                    updateTodobox = {updateTodobox}
                                    userName = {userName}
                                />
                                }
                        </div>
                    </div>
                </div>
        </li>        
};

export default ListBox;