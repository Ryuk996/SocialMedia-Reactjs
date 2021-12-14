import React, { useEffect,useState } from 'react'
import { snapshot_UNSTABLE } from 'recoil'
import { db } from '../lib/firebase/firebase'
import Post from './Post'
import { collection,onSnapshot,query,orderBy } from '@firebase/firestore'


function Posts() {
    const [posts,setPosts] = useState([])
    // const [session,setSession] = useState(true)

    useEffect(() => {
        try {
            onSnapshot(query(collection(db,'posts'),orderBy('timestamp','desc')), 
            (snapshot) => {
               setPosts(snapshot.docs);
               }
           )
        //    setSession(false)
        } catch (error) {
            console.log(error)
        } 
    }, [db])
    

    return (
        <div>
            {posts.map((post)=>(
                <Post key={post.id} id={post.id}
                username={post.data().username}
                userImg={post.data().profileImg}
                img={post.data().image}
                caption={post.data().caption}
                />
            ))
            }
        </div>
    )
}

export default Posts
