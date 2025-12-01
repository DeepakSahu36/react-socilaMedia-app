import { useContext } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { PostListContext } from "../store/post-list-store";
function Card({ postDetails }) {
 const {deletePost} = useContext(PostListContext)
  return (
    <div className="card myCard">
      <div className="card-body">
        <h5 className="card-title">
          {postDetails.title}
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" onClick={()=>{deletePost(postDetails.id)}}>
            <MdDeleteOutline  />
          </span>
        </h5>
        <p className="card-text">{postDetails.body}</p>

        {postDetails.tags.map((tag) => (
          <span key={tag} className="badge text-bg-primary my-badge">
            {tag}
          </span>
        ))}
        <div className="alert alert-success reactions" role="alert">
          This post has been reacted by {postDetails.reactions} people
        </div>
      </div>
    </div>
  );
}

export default Card;
