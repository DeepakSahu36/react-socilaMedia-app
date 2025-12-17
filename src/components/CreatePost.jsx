import { useContext, useRef } from "react";
import { ProvidesContext } from "../store/post-list-store";
import { useNavigate } from "react-router-dom";

//import { Form } from "react-router-dom";

function CreatePost() {
  const { addPost } = useContext(ProvidesContext);
   const navigate = useNavigate()
  const userId = useRef("");
  const title = useRef("");
  const content = useRef("");
   const reactions  = useRef("")
  const tags = useRef("");

  const handleSubmit = function(event){
  
    event.preventDefault()
  addPost({
    userId : userId.current.value,
    title :title.current.value,
    body : content.current.value,
    tags : tags.current.value,
    reactions : reactions.current.value

  })
  userId.current.value = ""
  title.current.value = ""
  content.current.value = ""
  tags.current.value = ""
  reactions.current.value = ""
  navigate("/")
  }
  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          Enter your UserId
        </label>
        <input
          type="text"
          ref={userId}
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
          ref={title}
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
          ref={content}
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
          ref={tags}
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
          className="form-control"
          ref={reactions}
          id="reactions"
          placeholder="How many people reacted to this post"
        />
      </div>
      <button type="submit" className="btn btn-primary post-btn">
        Post
      </button>
    </form>
  );
}

export default CreatePost;
