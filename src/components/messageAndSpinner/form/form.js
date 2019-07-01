import React, {useState} from 'react';

// COMPONENTS
import FormBody from './formBody';

export default function Form(props) {
    const [secretMessage, setSecretMessage] = useState('');
    const handleOnChange = e => {
       setSecretMessage(e.target.value);
    }
    const handleOnSubmit = e => {
        e.preventDefault();
        const success = e.target.name === 'success' ? true : false;
        props.handleOnSubmit({secretMessage, success});
    }
    const handleOnFormSubmit = e => {
        e.preventDefault();
    }
    const isDisabled = props.submitDisabled || !secretMessage.length;
    return (
        <form onSubmit={handleOnFormSubmit}>
            <FormBody
                handleOnChange={handleOnChange}
                handleOnSubmit={handleOnSubmit}
                submitDisabled={isDisabled}
            />
            {props.children}
        </form>
    );
}