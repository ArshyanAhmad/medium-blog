// cloudflare is backend
// react as a frontend
// zod as validation for both frontend and backend 


import { Hono, Context } from 'hono'
import { getUserData, signIn, signUp } from '../controllers/user.controller'
import { isAuthenticated } from '../middleware/auth'


// User Routes
const routes = new Hono()

routes.post("/signup", signUp)
routes.post("/signin", signIn)
routes.get("/data", isAuthenticated, getUserData)

routes.get('/', (c: Context) => {
    return c.text('Hello From user!')
})

export default routes
