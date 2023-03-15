import styles from '../styles/Home.module.css';

export default function Home() {
  return <div className={styles.container}></div>;
}

Home.auth = {
  entrance: 'notEntered',
  redirection: '/herolist',
  secondRedirection: '/login',
};
