import styles from "./Memory.module.css";

function Memory({ list }) {
  if (list.length !== 0) {
    return (
      <div className={styles.container}>
        <ul>
          {list.map((exp, key) => {
            return <li key={key}>{exp}</li>;
          })}
        </ul>
      </div>
    );
  } else {
    return <div className={styles.container}></div>;
  }
}

export default Memory;
