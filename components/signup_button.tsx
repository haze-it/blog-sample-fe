import Link from 'next/link';
import styles from '../styles/signup_button.module.scss';

type Props = {}

export default function SignupButton({}: Props) {
  return <Link href="/signup">
    <button className={styles.signup_button}>
        <div className={styles.button_inner}>
          <p>登録フォーム</p>
        </div>
      </button>
    </Link>
}