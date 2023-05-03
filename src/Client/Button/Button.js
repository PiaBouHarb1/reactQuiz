import React from 'react';
import './Button.css';

const Button = ({ className, children, tag = 'button', ...rest }) => {
  const classes = `Button ${className}`;
  
  if (tag === 'a') {
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }
  
  if (tag === 'input') {
    return (
      <input type="button" className={classes} value={children} {...rest} />
    );
  }
  
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
