import { signinInput, signupInput } from '@ahhmd235/medium-common'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import { Context } from "hono"
import { sign } from 'hono/jwt'

// User Controllers
export const signUp = async (c: Context) => {
    const body = await c.req.json();
    const parsedInput = signupInput.safeParse(body);

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

    try {
        const user = await prisma.user.create({
            data: {
                name: body.name,
                username: body.username,
                password: body.password
            }
        })

        const token = await sign({
            id: user.id
        }, c.env.JWT_SECRET);

        c.header('authorization', `Bearer ${token}`);

        c.status(201);
        return c.json({
            token
        })

    } catch (error: any) {
        c.status(413)
        return c.json({
            success: false,
            message: `Invalid Credentials, ${error.message}`
        })
    }
}

export const signIn = async (c: Context) => {
    const body = await c.req.json();

    const parsedInput = signinInput.safeParse(body);

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

    try {
        const user = await prisma.user.findFirst({
            where: {
                username: body.username,
                password: body.password
            }
        })

        if (!user) {
            c.status(404)
            return c.json({
                success: false,
                message: "User doestn't exist"
            })
        }

        const token = await sign({
            id: user.id
        }, c.env.JWT_SECRET);

        c.header("Authorization", `Bearer ${token}`)

        return c.json({
            token
        }, 200)

    } catch (error: any) {

        return c.json({
            success: false,
            message: `Login failed", ${error.message}`
        }, 403)
    }

}


export const getUserData = async (c: Context) => {
    try {
        const userId = c.get("userId");

        const prisma = new PrismaClient(
            {
                datasourceUrl: c.env.DATABASE_URL,
            }
        ).$extends(withAccelerate())

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                name: true
            }
        })

        return c.json({
            name: user?.name
        }, 200)

    } catch (error: any) {
        return c.json({
            success: false,
            message: `Something went wrong, ${error.message}`
        }, 403)
    }
}