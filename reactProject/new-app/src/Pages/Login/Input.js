import React from 'react';

export default function Input(props) {

    return(
        <div>
            <label htmlFor={props.id}>{props.label}</label>
            <input 
                id={props.id}
                key={props.id}
                type={props.type}
                name={props.name}
                value={props.value}
                onChange={props.handleChange}
            />
        </div>
    );
}
