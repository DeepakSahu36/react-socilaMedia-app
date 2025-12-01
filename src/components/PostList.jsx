import { useContext } from "react"
import Card from "./Card"
import { PostListContext } from "../store/post-list-store"

function PostList(){

 const {postList : postListData}  = useContext(PostListContext)
  return(
    <>
    {postListData.map((post)=><Card key={post.id} postDetails={post}></Card>)}
    </>
  )
}

export default PostList