import styles from "./Button.module.css";

function Button({ value, exp, onClick }) {
  if (!isNaN(value)) {
    return (
      <div>
        <button value={value} className={styles.button1} onClick={onClick}>
          {value}
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button value={value} className={styles.button2} onClick={onClick}>
          {value}
        </button>
      </div>
    );
  }
}

export default Button;
