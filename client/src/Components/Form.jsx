import React from 'react'
import ReactDOM from 'react-dom'

const Form = (props) => {
    return ReactDOM.createPortal(

        <div id='Form'>
            <input type="text" id='name' placeholder='Name' />
            <br />
            <input type="text" id='subject' placeholder='Subject' />
            <br />
            <input type="date" id='due' />
            <br />
            <button onClick={() => props.newTask(document.getElementById("name").value, document.getElementById("subject").value, 
                                        document.getElementById("due").value)}>New</button>
        </div>

        , document.getElementById("popup")
    ) 
}

export default Form