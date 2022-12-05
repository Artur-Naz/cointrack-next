import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useDispatch, useSelector} from "react-redux";
import {selectAuthState, selectServerState, setAuthState, setPosts, setServerState, selectPosts} from "../store/slices/authSlice";
import Link from "next/link";
import {wrapper} from "../store/store";
import {GetServerSideProps} from "next";

function Home({firstProp}: any) {
  const authState = useSelector(selectAuthState);
  const serverState = useSelector(selectServerState);
    const posts = useSelector(selectPosts);
  const dispatch = useDispatch();
    const logIn = (state: boolean) => {
        dispatch(setServerState(firstProp))
        dispatch(setAuthState(state))
    }

  return (
      <div className={styles.container}>

        <div style={{marginTop: 200}}>
          <p>home</p>
            <Link href={'/'}>go to main</Link>
          <p>{serverState}</p>
          <div>{authState ? "Logged in" : "Not Logged In"}</div>
          <button
              onClick={() =>logIn(!authState)}
          >
            {authState ? "Logout" : "LogIn"}
          </button>
            {posts.map((post) => (<li key={post.id}>{post.title}</li>))}
        </div>
      </div>
  )
}
export default Home

// This function gets called at build time
// @ts-ignore
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ({req, res, rest}) =>{
    // console.log('2. Page.getServerSideProps uses the store to dispatch things');
    // store.dispatch({type: 'TICK', payload: 'was set in other page'});
    //console.log(store.getState());
    // Call an external API endpoint to get posts
    const resp = await fetch('https://jsonplaceholder.typicode.com/todos')
    const posts = await resp.json()
    store.dispatch(setPosts(posts))
    store.dispatch(setServerState('new server sttae'))
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            firstProp: 'Hello World',
        },
    }
})
