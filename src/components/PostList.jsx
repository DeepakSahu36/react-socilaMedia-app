import { useContext } from "react";
import Card from "./Card";
import { PostListContext } from "../store/post-list-store";
import WelcomeMsg from "./WelcomeMsg";
import LoadingSpinner from "./LoadingSpinner";
import OfflineBanner from "./OfflineBanner";

function PostList() {
  const { postList: postListData,fetching,isOffline} =
    useContext(PostListContext);

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
