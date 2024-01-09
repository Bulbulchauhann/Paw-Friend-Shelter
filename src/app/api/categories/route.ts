import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { userAuth } from "@/lib/user-auth";

type RequestBody = {
  name: string;
  imageUrl: string;
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
    const { name: ReceivedCategoryLabel, imageUrl } = body;

    if (!ReceivedCategoryLabel) {
      return NextResponse.json(
        { success: false, message: "Label is required!" },
        { status: 400 }
      );
    }

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, message: "Image is required!" },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name: ReceivedCategoryLabel,
        imageUrl,
        userId,
      },
    });

    return NextResponse.json(
      { success: true, message: "Category created successfully!", category },
      { status: 201 }
    );
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return NextResponse.json(
      { success: false, message: "Internal Error" },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request) => {
  try {
    const categories = await prisma.category.findMany();

    return NextResponse.json({ success: true, categories }, { status: 200 });
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return NextResponse.json(
      { success: false, message: "Internal Error" },
      { status: 500 }
    );
  }
};
