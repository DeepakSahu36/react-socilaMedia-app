import { createContext, useReducer } from "react";

export const ProvidesContext = createContext({
  postList: [],
  deletePost: () => {},
  addPost: () => {},
  setInitialPosts: () => {},
});

function reducerFunction(currPostList, actionObject) {
  let newPostList = currPostList;
  if (actionObject.type === "INITIAL_POSTS") {
    newPostList = actionObject.payload.posts;
  } else if (actionObject.type === "ADD_POST") {
    newPostList = [actionObject.payload.newPost, ...currPostList];
  } else if (actionObject.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== actionObject.payload.postId
    );
  }

  return newPostList;
}

function ContextProviderWrapper({ children }) {
  const [postList, dispatchPostList] = useReducer(reducerFunction, []);

  const addPost = function (addNew) {
    addNew.id = Math.floor(Math.random() * 100 + 1);
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        newPost: addNew,
      },
    });
  };

  const setInitialPosts = function (initialPostList) {
    dispatchPostList({
      type: "INITIAL_POSTS",
      payload: {
        posts: initialPostList,
      },
    });
  };

  const deletePost = function (postId) {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId: postId,
      },
    });
  };

  return (
    <ProvidesContext.Provider
      value={{
        postList,
        deletePost,
        addPost,
        setInitialPosts,
      }}
    >
      {children}
    </ProvidesContext.Provider>
  );
}
/*
const defaultPostList = [
  {
    id: "1",
    title: "one post",
    userId: "23",
    body: "hadk d kajdbhaksdb dasdhad",
    tags: "one two three",
    reactions: {
      likes: 345,
    },
  },
  {
    id: "2",
    title: "two post",
    userId: "26",
    body: "hadk d kajdbhaksdb dasdhad",
    tags: "one two three",
    reactions: {
      likes: 35,
    },
  },
];
*/

export default ContextProviderWrapper;
