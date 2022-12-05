import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {
    selectAuthState,
    selectServerState,
    setAuthState, setPortfolios,
    setPosts,
    setServerState
} from "../store/slices/authSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {useSelector} from "react-redux";
import Link from "next/link";
import {GetServerSideProps} from "next";
import {wrapper} from "../store/store";

function Home({}: any) {
  const authState = useAppSelector(selectAuthState);
    const serverState = useSelector(selectServerState);
  const dispatch = useAppDispatch();
  return (
    <div className={styles.container}>

      <div style={{marginTop: 200}}>
        <p>main</p>
          <Link href={'/home'}>go to home</Link>
          <p>{serverState}</p>
        <div>{authState ? "Logged in" : "Not Logged In"}</div>
        <button
            onClick={() =>
                authState
                    ? dispatch(setAuthState(false))
                    : dispatch(setAuthState(true))
            }
        >
          {authState ? "Logout" : "LogIn"}
        </button>
      </div>
    </div>
  )
}
export default Home


