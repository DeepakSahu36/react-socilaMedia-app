import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App"
import PostList, { getFetchPost } from "./components/PostList"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreatePost from "./components/CreatePost";

const router = createBrowserRouter([
  {
     path : "/",
     element : <App />,
     children : [{
      path : "",
      element : <PostList />,
      loader : getFetchPost

     },
     {
      path : "create-post",
      element : <CreatePost />
     },
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
