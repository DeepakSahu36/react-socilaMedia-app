import { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { PostListContext } from "../store/post-list-store";
import WelcomeMsg from "./WelcomeMsg";
import LoadingSpinner from "./LoadingSpinner";
import OfflineBanner from "./OfflineBanner";

function PostList() {
  const { postList: postListData, addInitialPosts } =
    useContext(PostListContext);

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

  return (
    <>
      {isOffline && (
       <OfflineBanner></OfflineBanner>
      )}

      {fetching && <LoadingSpinner />}

      {!fetching && !isOffline && postListData.length === 0 && (
        <WelcomeMsg />
      )}

      {!fetching && !isOffline &&
        postListData.map((post) => (
          <Card key={post.id} postDetails={post} />
        ))}
    </>
  );
}

export default PostList;
