import PropTypes from "prop-types";
import style from "./Button.module.css";

Button.propTypes={
    children : PropTypes.string,
    onClick : PropTypes.func,
    type : PropTypes.string
}
export default function Button({children,onClick,type}) {
    return (
        <button onClick={onClick} className={`${style.btn} ${style[type]}`} >
            {children}
        </button>
    )
}
