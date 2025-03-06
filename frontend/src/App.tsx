import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blogs } from "./pages/Blogs";
import { Blog } from "./pages/Blog";
import { AddBlog } from "./pages/AddBlog";
import { NotAuthenticated } from "./components/NotAuthenticated";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotAuthenticated />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/blog/new" element={<AddBlog />} />
      </Routes>
    </Router>
  );
};

export default App;
