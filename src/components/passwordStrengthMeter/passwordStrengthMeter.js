import React, {useState} from 'react';

import Spinner from '../messageAndSpinner/loadingSpinner/loadingSpinner';

import './passwordStrengthMeter.scss';

export default function PasswordStrengthMeter(props) {

    const [rules] = useState([
        {
            name: 'At Least One Capital Letter',
            regex: '[A-Z]'
        }, 
        {
            name: 'At Least One Number',
            regex: '\\d'
        },
        {
            name: 'A Special Character, like !,?,@, etc',
            regex: '[!@#\\$%\\^\\&*\\)\\(+=._-]+'
        }
    ]);

    const [rulesSuccess, setRulesSuccess] =  useState({
        'At Least One Capital Letter': false,
        'At Least One Number': false,
        'A Special Character, like !,?,@, etc': false
    });

    const handleOnChange = e => {
        const password = e.target.value;
        const _rulesSucces = {};
        rules.forEach((rule, index) => {
            const conditionMet = new RegExp(rule.regex, 'g').test(password);
            _rulesSucces[rule.name] = conditionMet;
        });
        setRulesSuccess(_rulesSucces);
    }

    const renderCheckBoxes = () => {
        return (
            <ul className="password-checks">
                {
                    rules.map((rule, i) => {
                        console.log(rulesSuccess);
                        return (
                        <li key={i}>
                            <div>
                                <p>
                                    {rule.name}
                                </p>
                            </div>
                            <div className="check-box-container">
                                {
                                <Spinner
                                    customCheckMark={true}
                                    success={rulesSuccess[rule.name]}
                                    error={!rulesSuccess[rule.name]}
                                    
                                />
                                }
                            </div>
                        </li>
                        )
                    })
                }
            </ul> 
        )
    }

    return (
        <section className="password-strength-meter">
            <h3>Password Strength Meter</h3>
            <form>
                <input 
                    onChange={handleOnChange}
                    type="password"
                />
                {
                    rules && rules.length && renderCheckBoxes()
                }
            </form>
        </section>
    )
}