import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useDispatch, useSelector} from "react-redux";
import {selectAuthState, setAuthState} from "../store/slices/authSlice";
import Link from "next/link";
import {wrapper} from "../store/store";
import {GetServerSideProps} from "next";

function Home() {
  const authState = useSelector(selectAuthState);

  return (
      <div className={styles.container}>

        <div style={{marginTop: 200}}>
          <p>home</p>
            <Link href={'/'}>go to main</Link>
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

// This function gets called at build time
// @ts-ignore
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ({req, res, rest}) =>{
    return {
        props: {

        },
    }
})
