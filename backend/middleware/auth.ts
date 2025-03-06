import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export const isAuthenticated = async (c: Context, next: Next) => {
    try {
        const jwt = c.req.header("authorization");

        if (!jwt) {
            return c.json({ message: "Unauthorized: Token missing" }, 401);
        }

        const token = jwt.startsWith("Bearer ") ? jwt.slice(7) : jwt;

        const decoded = await verify(token, c.env.JWT_SECRET);

        if (!decoded) {
            return c.json({ message: "Unauthorized: Invalid token" }, 403);
        }

        const userId = decoded.id;
        c.set("userId", userId)

        await next()

    } catch (error) {
        return c.json({ message: "Unauthorized: Invalid or expired token" }, 401);
    }

}