import { createContext, useReducer } from "react";

export const PostListContext = createContext({
  postList :[],
  addPost :()=>{},
  deletePost:()=>{}

});


function postListReducer(currPostList,action){
  let newPostList = currPostList
     if(action.type === "DELETE_POST"){
      newPostList = currPostList.filter(post => post.id !== action.payload.postId)
     }else if(action.type === "ADD_POST"){
      newPostList = [action.payload,...currPostList]
     }
  return newPostList
}

function PostListProvider({ children }) {
 const [postList,dispatchPostList]  = useReducer(postListReducer,defaultPostList)

const addPost = function(userId,posttitle,postBody,reactions,tags){
     const addAction = {
      type : "ADD_POST",
      payload : {
        id :Date.now(),
        title :posttitle,
        body : postBody,
        reactions : reactions,
        userId : userId,
        tags :tags
      }
    }

   console.log(addAction)

    dispatchPostList(addAction)
}

const deletePost = function(postId){
  let deleteAction = {
    type :"DELETE_POST",
    payload:{
      postId :postId
    }
  }
  dispatchPostList(deleteAction)

}

  return <PostListContext.Provider value={{postList,addPost,deletePost}}>{children}</PostListContext.Provider>;
}

const defaultPostList = [
  {
    id : '1',
    title :"Going to Mumbai",
    body :"Hi friends, I am going to Mumbai fro my vacations. Hope to enjoy a lot, Peace out",
    reactions : 7,
    userId :"user-1",
    tags :["vacation", "Mumbai","Enjoying"]

  },
    {
    id : '2',
    title :"Finall pass ho gayaa",
    body :"4 saal ki masti ke baad bhi ho gaye hain pass, Hard to believe",
    reactions :10,
    userId :"user-2",
    tags :["pass", "Graduate","Unbeliveable"]

  },

]

export default PostListProvider;
