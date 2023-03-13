import prisma from "../../lib/prismadb";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { PrismaClient, User } from "@prisma/client";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        username,
        password,
        role,
    }: { username: string; password: string; role: string } = req.body;

    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    const user = await prisma.user.create({
        data: {
            username: username,
            password: hash,
            role: role,
        },
        select: {
            id: true,
            username: true,
            role: true,
        },
    });
    res.json(user);
}
