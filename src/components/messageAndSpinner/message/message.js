import React from 'react';

import './message.scss';

export default function Message (props) {
  const {
    children,
    showHandler,
  } = props;
  return (
    <section className="message-block">
      <div className="content">
        {children}
        <button onClick={showHandler}>Ok</button>
      </div>
    </section>
  );
}