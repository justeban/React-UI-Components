import React, {useState} from 'react';

export default function FormBody (props) {

    const [placeholder, setPlaceholder] = useState('Enter Your Secrets Here...');

    const handleOnFocus = () => {
        setPlaceholder('');
    }

    const handleOnBlur = e => {
        let txt = e.target.value;
        if (!txt) {
            setPlaceholder('Enter Your Secrets Here...');
        }
    }
    return (
        <React.Fragment>
            <textarea
                className="loading"
                onBlur={handleOnBlur}
                onFocus={handleOnFocus}
                onChange={props.handleOnChange}
                name="secretMessage"
                placeholder={placeholder}
            />
            <button onClick={props.handleOnSubmit} name="success" disabled={props.submitDisabled}>Simulate Success</button>
            <button onClick={props.handleOnSubmit} name="failure" disabled={props.submitDisabled}>Simulate Error</button>
        </React.Fragment>
    );
}