import { createContext, useEffect,useCallback, useReducer, useState } from "react";

export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  fetching :false,
  isOffline :false
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

  const [fetching, setFetching] = useState(false);
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
    useEffect(() => {
      // Listen to online / offline events
      const goOnline = () => setIsOffline(false);
      const goOffline = () => setIsOffline(true);
  
      window.addEventListener("online", goOnline);
      window.addEventListener("offline", goOffline);
  
      return () => {
        window.removeEventListener("online", goOnline);
        window.removeEventListener("offline", goOffline);
      };
    }, []);
  
    useEffect(() => {
      if (isOffline) return; // offline me fetch mat karo
  
      setFetching(true);
  
      const controller = new AbortController();
  
      fetch("https://dummyjson.com/posts", { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => {
          addInitialPosts(data.posts);
          setFetching(false);
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            setFetching(false);
            setIsOffline(true); // fetch fail hua → offline message dikhaa do
          }
        });
  
      return () => controller.abort();
    }, [isOffline]);
    

  const addPost = function (newPost) {
    dispatchPostList({
      type: "ADD_POST",
      payload: newPost,
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
      value={{ postList, addPost, deletePost,fetching,isOffline }}
    >
      {children}
    </PostListContext.Provider>
  );
}

export default PostListProvider;
