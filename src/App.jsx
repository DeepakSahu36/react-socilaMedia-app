  import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import "./App.css"
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";

 function App(){
  return (
    <div className="app-container">
      <Sidebar></Sidebar>
        <div className="content">
           <Header></Header>
            <PostList></PostList>
           <CreatePost></CreatePost>
           <Footer></Footer>
        </div>
   </div>
    

  );
 }


 export default App