import { useContext, useEffect, useState } from "react"
import { ProvidesContext } from "../store/post-list-store"
import Card from "./Card"
import WelcomeMsg from "./WelcomeMsg"
import { useLoaderData } from "react-router-dom"
import LoadingSpinner from "./LoadingSpinner"

function PostList(){
 const [loading,setLoading] = useState(true)
 const {posts} = useLoaderData()  //destructure bcz data is comming as object wrapping
 const {postList,setInitialPosts} = useContext(ProvidesContext)
       useEffect(function(){
           setInitialPosts(posts)
            setLoading(false)
       },[])

       if(loading){
        return <LoadingSpinner />
       }

  return (
  <>

  {postList.length === 0 &&  <WelcomeMsg />}
  {
   postList.map(post => <Card key={post.id} postDetails={post}/>)}
  </>
  )
}

export default PostList

export async function getFetchPost(){
const data = await fetch('https://dummyjson.com/posts')
return data.json()
}