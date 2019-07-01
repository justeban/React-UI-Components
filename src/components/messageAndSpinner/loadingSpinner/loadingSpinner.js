import React from 'react';
import classNames from 'classnames';

import './loadingSpinner.scss';

// Component taken from https://codepen.io/scottloway/pen/zqoLyQ
export default function LoadingSpinner(props) {

  const successDivStyle = {
    display: props.success ? 'block' : 'none',
  };

  const failureDivStyle = {
    display: props.error ? 'block' : 'none',
  };

  return (
    <div className="spinner-container">
      <div className="circle-loader-container">
        {/*toggle "load-complete" to stop spinner */}
        <div className={
          classNames({
            'circle-loader': true, 
            'load-complete': props.success || props.error,
            'error': props.error,
          })
        }>
          <div style={successDivStyle} className="checkmark draw"></div>
          <div style={failureDivStyle} className="x draw"></div>
        </div>
      </div>
    </div>
  );
}