import { useContext, useRef } from "react";
import { PostListContext } from "../store/post-list-store";

function CreatePost() {
  const { addPost } = useContext(PostListContext);

  const userIdElement = useRef("");
  const postTitleElement = useRef("");
  const postBodyElement = useRef("");
  const reactionsElement = useRef("");
  const tagsElement = useRef("");

  function handleAddClick(event) {
    event.preventDefault();
    
    const userId = userIdElement.current.value;
    const posttitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const reactions = reactionsElement.current.value;
    const tags = tagsElement.current.value.split(" ");
  
    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: posttitle,
        body: postBody,
        reactions: {
          likes: reactions,
        },
        userId: userId,
        tags: tags,
      }),
    })
      .then((res) => res.json())
      .then((resObj)=> addPost(resObj))
      .catch(error =>{
        console.log(error)
      })
         
    
    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    tagsElement.current.value = "";
    reactionsElement.current.value = "";

    
  }
  return (
    <form className="create-post">
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          Enter your UserId
        </label>
        <input
          type="text"
          ref={userIdElement}
          className="form-control"
          id="userId"
          placeholder="Your user id"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          ref={postTitleElement}
          className="form-control"
          id="title"
          placeholder="How are you feeling today."
        />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>
        <textarea
          className="form-control"
          ref={postBodyElement}
          id="body"
          rows={4}
          placeholder="Tell us about it"
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Enter your Tags
        </label>
        <input
          type="text"
          ref={tagsElement}
          className="form-control"
          id="tags"
          placeholder="Please enter your tags here with space"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          No. of Reactions
        </label>
        <input
          type="text"
          ref={reactionsElement}
          className="form-control"
          id="reactions"
          placeholder="How many people reacted to this post"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary post-btn"
        onClick={handleAddClick}
      >
        Post
      </button>
    </form>
  );
}

export default CreatePost;
