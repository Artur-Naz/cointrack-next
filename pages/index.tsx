
import styles from '../styles/Home.module.css'
import {
    selectAuthState,
} from "../store/slices/authSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import Link from "next/link";

function Home({}: any) {
  const authState = useAppSelector(selectAuthState);
  return (
    <div className={styles.container}>

      <div style={{marginTop: 200}}>
        <p>main</p>
          <Link href={'/home'}>go to home</Link>
        <div>{authState ? "Logged in" : "Not Logged In"}</div>
        <button

        >
          {authState ? "Logout" : "LogIn"}
        </button>
      </div>
    </div>
  )
}
export default Home


