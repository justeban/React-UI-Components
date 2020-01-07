import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from 'classnames';

import Spinner from '../messageAndSpinner/loadingSpinner/loadingSpinner';
import ProgressBar from './progressBar/progressBar';

import './passwordStrengthMeter.scss';

export default function PasswordStrengthMeter(props) {
    const [rules, setRules] = useState(props.config.rules);
    const [ruleKeys, setRuleKeys] = useState(Object.keys(props.config.rules));
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
    const [rulesSuccess, setRulesSuccess] = useState(
      Object.keys(props.config.rules).reduce((acc, ruleKey) => {
        acc[ruleKey] = false;
        return acc;
      }, {})
    );

    useEffect(() => {
        setRules(props.config.rules);
        setRuleKeys(Object.keys(props.config.rules))
    }, [props.config.rules])

    useEffect(() => {
        const _rulesSucces = {};
        Object.keys(props.config.rules).forEach((rule, index) => {
            const conditionMet = new RegExp(props.config.rules[rule].regex, 'g').test(password);
            _rulesSucces[rule] = conditionMet;
        });
        setRulesSuccess(_rulesSucces);
    }, [password, props.config.rules, ruleKeys]);

    const handleOnChange = e => {
        const password = e.target.value;
        setPassword(password);
    };
    
    const handleOnSubmit = e => {
        e.preventDefault();
    };
    
    const determineProgress = () => {
        const numOfRules = Object.keys(props.config.rules).length;
        const numSuccess = Object.values(rulesSuccess).filter(Boolean).length;
        return `${numSuccess / numOfRules * 100}%`;
    };

    const renderCheckBoxes = () => {
        return (
            <ul className="password-checks">
                {
                    Object.keys(props.config.rules).map((ruleKey, i) => (
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
        <section className={classNames({ 'password-strength-meter': true, 'exiting': props.config.exiting })}>
        <h3>Password Strength Meter</h3>
        <form onSubmit={handleOnSubmit}>
            <ProgressBar width={determineProgress()} />
            <input
                onChange={handleOnChange}
                type={isPasswordVisible ? "text" : "password"}
                value={password}
            />
            {
                isPasswordVisible
                ? <FontAwesomeIcon
                    icon="eye-slash" 
                    onMouseUp={() => setIsPasswordVisible(false)}
                    onMouseLeave={() => setIsPasswordVisible(false)}/> 
                : <FontAwesomeIcon 
                    icon="eye" 
                    onMouseDown={() => setIsPasswordVisible(true)} />
            }
            {ruleKeys && ruleKeys.length && renderCheckBoxes()}
        </form>
      </section>
    );
}