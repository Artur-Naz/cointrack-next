import React from 'react';

function About(props: any) {
    return (
        <div>
            about
            <ul>
                {props.posts.map((post:any) => <li key={post.id}>{post.title}</li>)}
            </ul>
        </div>
    );
}

export default About;

// This function gets called at build time
export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await res.json()

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            posts,
        },
    }
}

