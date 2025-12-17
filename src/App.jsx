import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import "./App.css";
import { Outlet } from "react-router-dom";
import ContextProviderWrapper from "./store/post-list-store";

function App() {
  return (
    <ContextProviderWrapper>
      <div className="app-container">
        <Sidebar></Sidebar>
        <div className="content">
          <Header></Header>
          <Outlet />
          <Footer></Footer>
        </div>
      </div>
    </ContextProviderWrapper>
  );
}

export default App;
