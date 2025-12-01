import { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { PostListContext } from "../store/post-list-store";
import WelcomeMsg from "./WelcomeMsg";
import LoadingSpinner from "./LoadingSpinner";

function PostList() {
  const { postList: postListData, addInitialPosts } =
    useContext(PostListContext);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);

    const controler = new AbortController();
    const signal = controler.signal;

    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setFetching(false);
      });

    return () => {
      controler.abort();
    };
  }, []);

  return (
    <>
      {fetching && <LoadingSpinner></LoadingSpinner>}
      {!fetching && postListData.length === 0 && <WelcomeMsg></WelcomeMsg>}
      {!fetching &&
        postListData.map((post) => (
          <Card key={post.id} postDetails={post}></Card>
        ))}
    </>
  );
}

export default PostList;
