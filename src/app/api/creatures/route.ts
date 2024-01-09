import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { userAuth } from "@/lib/user-auth";

type RequestBody = {
  name: string;
  imageUrl: string;
  categoryId: string;
};

export const POST = async (req: Request) => {
  try {
    const user = await userAuth();
    const userId = user?.userId;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthenticated" },
        { status: 401 }
      );
    }

    const body: RequestBody = await req.json();
    const { name, categoryId, imageUrl } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Name is required!" },
        { status: 400 }
      );
    }

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, message: "Image are required" },
        { status: 400 }
      );
    }

    if (!categoryId) {
      return NextResponse.json(
        { success: false, message: "Category id is required!" },
        { status: 400 }
      );
    }

    const creature = await prisma.creature.create({
      data: {
        name,
        imageUrl,
        categoryId,
      },
    });

    return NextResponse.json(
      { success: true, message: "Creature created successfully!", creature },
      { status: 201 }
    );
  } catch (error) {
    console.log("[CREATURES_POST]", error);
    return NextResponse.json(
      { success: false, message: "Internal Error" },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;

    const creatures = await prisma.creature.findMany({
      where: {
        categoryId,
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, creatures }, { status: 200 });
  } catch (error) {
    console.log("[CREATURES_GET]", error);
    return NextResponse.json(
      { success: false, message: "Internal Error" },
      { status: 500 }
    );
  }
};
