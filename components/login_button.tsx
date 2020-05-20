import Link from 'next/link';
import styles from '../styles/Login_button.module.scss';

type Props = {}

export default function LoginButton({}: Props) {
  return <Link href="/signin">
    <button className={styles.login_button}>
        <div className={styles.button_inner}>
          <p>ログインフォーム</p>
        </div>
      </button>
    </Link>
}