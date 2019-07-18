import React, {useEffect, useState} from 'react';

import Spinner from '../messageAndSpinner/loadingSpinner/loadingSpinner';

import './passwordStrengthMeter.scss';

export default function PasswordStrengthMeter(props) {
    const [rules, setRules] = useState(props.config.rules);
    const [ruleKeys, setRuleKeys] = useState(Object.keys(rules));
    const [password, setPassword] = useState('');

    const [rulesSuccess, setRulesSuccess] =  useState(
        Object.keys(rules).reduce((acc, ruleKey) => {
            acc[ruleKey] = false;
            return acc
        }, {})
    );

    useEffect(() => {
        setRules(props.config.rules);
        setRuleKeys(Object.keys(props.config.rules))
    }, [props.config.rules])

    useEffect(() => {
        const _rulesSucces = {};
        ruleKeys.forEach((rule, index) => {
            const conditionMet = new RegExp(rules[rule].regex, 'g').test(password);
            _rulesSucces[rule] = conditionMet;
        });
        setRulesSuccess(_rulesSucces);
    }, [password, rules, ruleKeys]);

    const handleOnChange = e => {
        const password = e.target.value;
        setPassword(password);
    };

    const renderCheckBoxes = () => {
        return (
            <ul className="password-checks">
                {
                    ruleKeys.map((ruleKey, i) => (
                        <li key={i}>
                            <div>
                                <p>
                                    {ruleKey}
                                </p>
                            </div>
                            <div className="check-box-container">
                                {
                                <Spinner
                                    customCheckMark={true}
                                    success={rulesSuccess[ruleKey]}
                                    error={!rulesSuccess[ruleKey]}
                                    
                                />
                                }
                            </div>
                        </li>
                        )
                    )
                }
            </ul> 
        )
    };

    return (
        <section className="password-strength-meter">
            <h3>Password Strength Meter</h3>
            <form>
                <input 
                    onChange={handleOnChange}
                    type="password"
                    value={password}
                />
                {
                    ruleKeys && ruleKeys.length && renderCheckBoxes()
                }
            </form>
        </section>
    )
}