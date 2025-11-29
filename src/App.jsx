  import "bootstrap/dist/css/bootstrap.min.css"
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import "./App.css"
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import { useState } from "react";

 function App(){
  const [selectTab,setSelectTab] = useState("Home")
  const [activeTab,setActiveTab] = useState("Home")
  const handleSelectTab = function(tabName){
    setSelectTab((currTab)=> currTab = tabName)
    setActiveTab(currActive => currActive = tabName)
  }

  return (
    <div className="app-container">
      <Sidebar handleTab={handleSelectTab} activeFlag={activeTab} ></Sidebar>
        <div className="content">
           <Header></Header>
             {selectTab === "Home" ? <PostList></PostList>: <CreatePost></CreatePost>}
           <Footer></Footer>
        </div>
   </div>
    

  );
 }


 export default App