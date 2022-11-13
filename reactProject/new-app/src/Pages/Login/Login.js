import React from "react";
import Input from "./Input.js";

export default function Login() {
    const [value, setValue] = React.useState("");

    function handleChange(event) {
        const newValue = event.target.name;
        setValue({...value,  [newValue]: event.target.value});
    }

    const inputList = [
        {
            id : "login-email",
            label : "Email",
            type : "email",   
        },

        {
            id : "login-pwd",
            label : "Password",
            type : "password",   
        },

        {
            id : "login-cb",
            label : "Accept the terms and policies",
            type : "checkbox",   
        },
    ];

    const inputElementList = inputList.map(item => 
        <Input
            label={item.label}
            type={item.type}
            id={item.id}
            key={item.id}
            name={item.id}
            value={value[item.id] ? value[item.id] : ""}
            handleChange={handleChange}
        />
    );

    return (
        <div>
            {inputElementList}
        </div>
    );
}