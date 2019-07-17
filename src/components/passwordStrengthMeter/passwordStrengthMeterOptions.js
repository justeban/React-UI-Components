import React from 'react';

export default function PasswordStrengthMeterOptions (props) {
    const {expandOptions} = props;
    return (
        <ul className={expandOptions ? 'show' : 'hide'}>
            <form>
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
                <buton type="submit">Add Regex</buton>
            </form>
        </ul>
    )
}