import React from 'react';
import classnames from 'classnames';

import './progressBar.scss'

export default function ProgressBar(props) {
    const {width} = props;
    const divStyle = {
        width
    };
    return (
        <div className={classnames({"progress-bar": true, "completed": width === "100%"})} style={divStyle}></div>
    );
}