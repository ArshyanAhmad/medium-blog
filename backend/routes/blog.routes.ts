// cloudflare is backend
// react as a frontend
// zod as validation for both frontend and backend 


import { Hono } from 'hono'
import { addBlog, bulkBlog, getBlog, updateBlog } from '../controllers/blog.controller'
import { isAuthenticated } from '../middleware/auth';

// Blog Routes
const routes = new Hono()

routes.post("/blog", isAuthenticated, addBlog);       // ✅ Create a new blog
routes.get("/blogs", isAuthenticated, bulkBlog)      // ✅ Get all blogs (bulk)

routes.get("/blog/:id", isAuthenticated, getBlog);    // ✅ Get a single blog by ID
routes.put("/blog/:id", isAuthenticated, updateBlog); // ✅ Update a specific blog



export default routes
