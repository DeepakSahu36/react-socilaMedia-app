import { createContext, useCallback, useReducer } from "react";

export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  addInitialPosts: () => {},
});

function postListReducer(currPostList, action) {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  } else if (action.type === "ADD_INITIAL_POST") {
    newPostList = action.payload.posts;
  }
  return newPostList;
}

function PostListProvider({ children }) {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const addPost = function (userId, posttitle, postBody, reactions, tags) {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: posttitle,
        body: postBody,
        reactions: reactions,
        userId: userId,
        tags: tags,
      },
    });
  };

  const addInitialPosts = function (initialPosts) {
    dispatchPostList({
      type: "ADD_INITIAL_POST",
      payload: {
        posts: initialPosts,
      },
    });
  };

  const deletePost = useCallback(
    function (postId) {
      dispatchPostList({
        type: "DELETE_POST",
        payload: {
          postId: postId,
        },
      });
    },
    [dispatchPostList]
  );

  return (
    <PostListContext.Provider
      value={{ postList, addPost, deletePost, addInitialPosts }}
    >
      {children}
    </PostListContext.Provider>
  );
}

export default PostListProvider;
