import React from 'react'
import ReactDOM from 'react-dom'

const Form = (props) => {
    return ReactDOM.createPortal(

        <div className='pop'>
            <div className='form'>
                <input type="text" id='name' placeholder='Name' />
                <br />
                <input type="text" id='subject' placeholder='Subject' />
                <br />
                <input type="date" id='due' />
                <br />
                <button onClick={() => props.newTask(document.getElementById("name").value, document.getElementById("subject").value, 
                                            document.getElementById("due").value)}>New</button>
                
                <button className='exit_bt' id='closeForm' onClick={props.closeFunc}>X</button>
            </div>
        </div>

        , document.getElementById("popup")
    ) 
}

export default Form