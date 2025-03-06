import { Hono, Context } from 'hono'

// Importing All Routes File
import userRoutes from '../routes/user.routes'
import blogRoutes from '../routes/blog.routes';
import { cors } from 'hono/cors';

const app = new Hono()
app.use(
    cors({
        origin: "*", // Allows all origins
    })
);


// User and Blog related routes accessable here
app.route("/api/v1/users", userRoutes);
app.route("/api/v1", blogRoutes);



export default app
