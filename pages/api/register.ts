import prisma from "../../lib/prismadb";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { PrismaClient, User } from "@prisma/client";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        name,
        email,
        password,
        role,
    }: { name: string; email: string; password: string; role: string } =
        req.body;

    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hash,
            role: role,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });
    res.json(user);
}
