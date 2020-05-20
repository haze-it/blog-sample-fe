import Head from 'next/head'
import styles from '../styles/index.module.scss'

import { GetServerSideProps } from 'next';
import NextCookies from 'next-cookies';
import { request } from '../lib/api';

type User = {
  user: {
    name: string,
    email: string
  }
}

export default function Profile({ user }: User) {
  return (
    <>
      <Head>
        <title>プロフィール</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.main__text}>
            プロフィールだよ
            <p>name: { user.name }</p>
            <p>email: { user.email }</p>
          </div>
        </main>
        <a href="/signout">ログアウト</a>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res } = context
  const token = NextCookies(context).token;

  if (! token) {
    res.writeHead(302, { Location: '/signin' }).end()
  }

  const response = await request({
                                  path: `/profile/`,
                                  method: 'get',
                                  token: token
                                })

  const user = response.data.user
  console.log(user)
  return {
    props: {
      user
    }
  }
}