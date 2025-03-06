import { createBlogInput } from "@ahhmd235/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { Context } from "hono";



// Blog Controllers 

// Add a new blog
export const addBlog = async (c: Context) => {
    const body = await c.req.json()

    const parsedInput = createBlogInput.safeParse(body);

    if (!parsedInput.success) {
        const errorMessage = parsedInput.error.errors.map(err => err.message).join(", ") || "Something went wrong";
        return c.json({
            success: false,
            message: `Invalid Inputs: ${errorMessage}`
        })
    }

    const prisma = new PrismaClient(
        {
            datasourceUrl: c.env.DATABASE_URL,
        }
    ).$extends(withAccelerate());

    const userId = c.get("userId");
    if (!userId) {
        return c.json({ success: false, message: "Unauthorized" }, 401);
    }

    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })

        return c.json({
            success: true,
            message: "Post created successfully",
            post
        })
    } catch (error: any) {
        return c.json({
            success: false,
            message: "Post creation failed",
            error: error.message
        }, 400)
    }
}

// Get the blog with their id
export const getBlog = async (c: Context) => {

    const prisma = new PrismaClient(
        {
            datasourceUrl: c.env.DATABASE_URL,
        }
    ).$extends(withAccelerate())

    try {
        const blogId = c.req.param("id");

        const blog = await prisma.post.findUnique({
            where: {
                id: blogId
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({
            blog
        })
    } catch (error: any) {
        return c.json({
            success: false,
            message: "Post not found, Invalid Id"
        }, 400)
    }
}

// Update the blog
export const updateBlog = async (c: Context) => {
    const body = await c.req.json()

    const parsedInput = createBlogInput.safeParse(body);
    if (!parsedInput.success) {
        const errorMessage = parsedInput.error.errors.map(err => err.message).join(", ") || "Something went wrong";
        return c.json({
            success: false,
            message: `Invalid Inputs: ${errorMessage}`
        })
    }

    const prisma = new PrismaClient(
        {
            datasourceUrl: c.env.DATABASE_URL,
        }
    ).$extends(withAccelerate())

    const postId = c.req.param("id");

    try {

        const post = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                title: body.title,
                content: body.content
            }
        })

        return c.json({
            success: true,
            message: "Post updated successfully",
            post
        })

    } catch (error: any) {
        return c.json({
            success: false,
            message: error.message
        }, 400)
    }

}

// Get all the blogs  
export const bulkBlog = async (c: Context) => {
    const prisma = new PrismaClient(
        {
            datasourceUrl: c.env.DATABASE_URL,
        }
    ).$extends(withAccelerate())

    try {
        const blogs = await prisma.post.findMany({
            select: {
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({
            blogs
        }, 200)
    } catch (error: any) {
        return c.json({
            success: false,
            message: error.message
        }, 400)
    }

}


