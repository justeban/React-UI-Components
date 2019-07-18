import React, {useState} from 'react';

export default function PasswordStrengthMeterOptions (props) {

    const {config, configHandler, expandOptions} = props;

    const handleOnSubmit = e => {
        e.preventDefault();
        const{regexName, regexValue} = e.target;
        const newRules = {
            ...config.rules,
            [regexName.value]: {
                regex: regexValue.value
            }
        }
        configHandler('Password Strength Meter', {rules: newRules});
    }
    return (
        <ul className={expandOptions ? 'show' : 'hide'}>
            <form onSubmit={handleOnSubmit}>
                <li>
                    <label htmlFor="regexName">Name</label>
                    <input
                        autoComplete="false" 
                        disabled={!expandOptions}
                        name="regexName"
                    />
                </li>
                <li>
                    <label htmlFor="regexValue">Regex</label>
                    <input 
                        autoComplete="false"
                        disabled={!expandOptions}
                        name="regexValue"
                    />
                </li>
                <input type="submit" value="Add +" />
            </form>
        </ul>
    )
}