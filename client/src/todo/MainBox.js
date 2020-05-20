import React from 'react';
import AddBoxForm from './AddBoxForm';
import TodoBox from './TodoBox';

const MainBox = ({todobox, updateTodobox, userName}) => {


    return <main className="board-block-main">
                <div className="board-block-boxes">
                {todobox.map( (todo) => {
                    return <TodoBox 
                        key={todo._id}
                        todobox = {todobox}
                        todo = {todo}
                        updateTodobox = {updateTodobox}
                        userName = {userName}
                    />
                    })
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
