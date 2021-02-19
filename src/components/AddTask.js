import React, { useState } from 'react';

const AddTask = ({ task, setTask, putTaskList, url }) => {

    // ---------------------------------------------------------------------------------

    const [inputValue, setInputValue] = useState('');

    // ---------------------------------------------------------------------------------

    const handleInputChange = ({ target }) => {

        setInputValue(target.value)

    };

    const handleSubmit = (e) => {

        e.preventDefault()

        let newTask = [...task, { label: inputValue, done: false }]
        setTask( newTask );
        setInputValue('');

        putTaskList( url, newTask );

    };

    // ---------------------------------------------------------------------------------

    return (

        <form onSubmit={handleSubmit}>
            <ul className="list-group">
                <li style={{ width: '50%' }} className="list-group-item bg-warning">
                    <input
                        onChange={handleInputChange}
                        value={inputValue}
                        placeholder="Ingrese tarea"
                        type="text"
                    />

                </li>
            </ul>
        </form>
    )
}

export default AddTask;
