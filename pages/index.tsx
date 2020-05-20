import Head from 'next/head'
import styles from '../styles/index.module.scss'

import LoginButton from '../components/login_button';
import SignupButton from '../components/signup_button';

export default function Home() {
  return (
    <>
      <Head>
        <title>ブログ用サンプル</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.main__text}>
            ブログ用のサンプルだよ
          </div>
        </main>
        <div className={styles.buttons}>
          <SignupButton />
          <LoginButton />
        </div>
      </div>
    </>
  )
}