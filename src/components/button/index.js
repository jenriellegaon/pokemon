import React from 'react'
import PropTypes from 'prop-types'

// Styles
import './index.scss'

/**
 * * Default button
 * @param {*} text - Button label (Required)
 * @param {*} icon - Button icon
 * @param {*} onClick - Button function
 * @param {*} textColor - Set text color
 * @param {*} backgroundColor - Set background color
 * @param {*} borderColor - Set border color
 * @param {*} iconFillColor - Set icon fill color
 * @param {*} disabled - Disable button
 */
const Button = ({ 
    text,
    icon,
    onClick,
    textColor,
    backgroundColor,
    borderColor,
    iconFillColor,
    disabled
 }) => {
  return (
    <button
      className="default-button"
      onClick={onClick}
      type="button"
      disabled={disabled}
      style={{ backgroundColor, borderColor, color: textColor }}
    >
      <span className="default-button"> 
        {text && <span style={{ marginRight: icon ? "8px" : "0px" }}>{text}</span>}
        {icon && <svg className={`icon ${icon}`} style={{ fill: iconFillColor }}><use xlinkHref={`#${icon}`} /></svg>}
      </span>
    </button>
  )
}

Button.defaultProps = {
    text: "",
    icon: "",
    textColor: "",
    backgroundColor: "",
    borderColor: "",
    iconFillColor: "",
    disabled: false,
}

Button.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    textColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    iconFillColor: PropTypes.string,
    disabled: PropTypes.bool,
}

export default Button
