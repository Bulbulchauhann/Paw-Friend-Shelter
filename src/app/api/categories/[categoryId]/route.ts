import { NextResponse } from "next/server";

import { userAuth } from "@/lib/user-auth";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return NextResponse.json(
        { success: false, message: "Category id is required!" },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json({
      success: true,
      category,
    });
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return NextResponse.json(
      { success: false, message: "Internal Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const user = await userAuth();
    const userId = user?.userId;

    const body = (await req.json()) as {
      name: string;
      imageUrl: string;
    };

    const { name, imageUrl } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthenticated" },
        { status: 401 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Name is required!" },
        { status: 400 }
      );
    }

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, message: "Image is required!" },
        { status: 400 }
      );
    }

    if (!params.categoryId) {
      return NextResponse.json(
        { success: false, message: "Category id is required!" },
        { status: 400 }
      );
    }

    const category = await prisma.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Category Updated Successfully!",
      updatedCategory: category,
    });
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return NextResponse.json(
      { success: false, message: "Internal Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const user = await userAuth();
    const userId = user?.userId;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthenticated" },
        { status: 401 }
      );
    }

    if (!params.categoryId) {
      return NextResponse.json(
        { success: false, message: "Category id is required!" },
        { status: 400 }
      );
    }

    const category = await prisma.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Category deleted Successfully!",
      deletedCategory: category,
    });
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return NextResponse.json(
      { success: false, message: "Internal Error" },
      { status: 500 }
    );
  }
}
