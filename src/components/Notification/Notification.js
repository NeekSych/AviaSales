import React from 'react';
import cn from 'classnames';
import propTypes from 'prop-types';

import css from './Notification.module.scss';

function Notification({ children, type }) {
  const classes = cn([css.Notification, css[type]]);
  return (
    <div className={classes}>
      <div className={css.text}>{children}</div>
    </div>
  );
}

Notification.defaultProps = {
  children: undefined,
  type: undefined,
};
Notification.propTypes = {
  children: propTypes.element,
  type: propTypes.oneOf(['notify', 'alert']),
};

export default Notification;
