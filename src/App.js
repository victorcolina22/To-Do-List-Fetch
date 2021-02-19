import React, { useEffect, useState } from 'react';
import AddTask from './components/AddTask';

const App = () => {

    // ---------------------------------------------------------------------------------

    const [ task, setTask ] = useState([])

    const [ success, setSuccess ] = useState(null);

    const [ error, setError ] = useState(null);

    const url = 'https://assets.breatheco.de/apis/fake/todos/user/victorColina';

    // ---------------------------------------------------------------------------------

    useEffect(() => {

        getTaskList( url );

    }, []);

    // ---------------------------------------------------------------------------------

    const getTaskList = async ( url ) => {

        try {

            const resp = await fetch( url );
            const data = await resp.json();

            if ( data.msg ) {

                setError( data.msg );

            } else {

                setTimeout(() => {
                    setSuccess( null );
                }, 1000);
                setError( null );
                setTask( data );

            }

        } catch ( error ) {

            console.log( error );

        }

    };

    const postTaskList = async ( url ) => {

        try {

            const resp = await fetch( url, {
                method: 'POST',
                body: JSON.stringify([]),
                headers: {
                    'Content-Type':'application/json'
                }
            } );
            const data = await resp.json();

            if ( data.msg ) {

                setError( data.msg );

            } else {

                setSuccess( data.result );
                setError( null );
                getTaskList( url );

            }

        } catch ( error ) {

            console.log( error );

        }

    };

    const putTaskList = async ( url, task ) => {

        try {

            const resp = await fetch( url, {
                method: 'PUT',
                body: JSON.stringify( task ),
                headers: {
                    'Content-Type':'application/json'
                }
            } );
            const data = await resp.json();

            if ( data.msg ) {

                setError( data.msg );

            } else {

                setSuccess( data.result );
                setError( null );
                getTaskList( url );

            }

        } catch ( error ) {

            console.log( error );

        }

    };

    const deleteAll = async ( url ) => {

        try {

            const resp = await fetch( url, {
                method: 'DELETE',
                headers: {
                    'Content-Type':'application/json'
                }
            } );
            const data = await resp.json();

            if ( data.msg ) {

                setError( data.msg );

            } else {

                setSuccess( data.result );
                setError( null );
                getTaskList( url );

            }

        } catch ( error ) {

            console.log( error );

        }

    }
    // ---------------------------------------------------------------------------------

    const deleteTask = ( i ) => {

        let newTask = [ ...task ];
        newTask.splice( i, 1 );
        setTask( newTask );

        putTaskList( url, newTask );

    }

    // ---------------------------------------------------------------------------------

    return (
        <div className="container">
            <h1>To Do List</h1>

            {
                !!error && (
                    <>

                        <div className="alert alert-warning alert-dismissible fade show w-50" role="alert">
                            <strong>Ouch!</strong>
                        &nbsp; {error}
                        </div>

                        <button
                            style={{ marginBottom: '9px' }}
                            onClick={ () => postTaskList( url ) }
                            className="btn btn-info btn-block w-50 mt-2"
                        >
                            Create Task List
                    </button>

                    </>
                )
            }

            {
                !!success && (
                    <>

                        <div className="alert alert-success alert-dismissible fade show w-50" role="alert">
                            <strong>Awesome!</strong>
                        &nbsp; {success}
                            <button 
                                type="button" 
                                className="btn-close" 
                                data-bs-dismiss="alert" 
                                aria-label="Close" 
                                onClick={ () => setSuccess( null ) }
                            >
                            </button>
                        </div>

                    </>
                )
            }

            <AddTask task={ task } setTask={setTask} putTaskList={ putTaskList } url={ url } />

            <ul className="list-group">
                {
                    task.length > 0 ?

                        (
                            task.map((valor, index) => (

                                <li
                                    style={{ width: '50%' }}
                                    className="list list-group-item bg-warning animate__animated animate__fadeInUp"
                                    key={index}
                                >
                                    { valor.label}
                                    <i
                                        className="far fa-trash-alt mt-1 animate__animated animate__fadeInLeft"
                                        style={{ float: 'right', cursor: 'pointer' }}
                                        onClick={() => deleteTask(index)}
                                    >
                                    </i>
                                </li>

                            ))

                        )
                        :
                        (
                            <span>List of tasks empty</span>
                        )
                }
            </ul>
            <button onClick={ () => deleteAll( url ) } className="btn btn-danger btn-block w-50 mt-2">Delete All</button>
        </div>
    )
}

export default App;
