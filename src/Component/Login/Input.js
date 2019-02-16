import React from 'react';
import './Input.css'

function Input(props) {
    const { type, id, name, value, onChange, placeHolder, label, error } = props;
    return (
        <div className="row inputContainer">
            <div className="input-field col s12 inputWrapper">
                {id==="user_name"?<i className="material-icons prefix">account_circle</i>:<i className="material-icons prefix">vpn_key</i> } 
                <input 
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    placeholder={placeHolder}
                    onChange={(ev) => onChange(ev)} />
                <label
                    htmlFor={id} >{label}
                </label>
                <span> </span>
            </div>
        </div>
    );
}

export default Input;