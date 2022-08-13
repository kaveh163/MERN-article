import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Article from "./pages/Article";
import Articles from "./pages/Articles";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import ArticlesList from './pages/ArticlesList';
import UpdateArticle from './pages/UpdateArticle';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="article" element={<Article />} />
          <Route path="articles" element={<Articles />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="articles/list/:id" element= {< ArticlesList/>}/>
          <Route path="articles/update/:id" element={<UpdateArticle/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
