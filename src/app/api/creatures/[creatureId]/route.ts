import { NextResponse } from "next/server";

import { userAuth } from "@/lib/user-auth";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { creatureId: string } }
) {
  try {
    if (!params.creatureId) {
      return NextResponse.json(
        { success: false, message: "Creature id is required!" },
        { status: 400 }
      );
    }

    const creature = await prisma.creature.findUnique({
      where: {
        id: params.creatureId,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({
      success: true,
      creature,
    });
  } catch (error) {
    console.log("[CREATURE_GET]", error);
    return NextResponse.json(
      { success: false, message: "Internal Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { creatureId: string } }
) {
  try {
    const user = await userAuth();
    const userId = user?.userId;

    const body = (await req.json()) as {
      name: string;
      imageUrl: string;
      categoryId: string;
    };

    const { name, imageUrl, categoryId } = body;

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

    if (!params.creatureId) {
      return NextResponse.json(
        { success: false, message: "Creature id is required!" },
        { status: 400 }
      );
    }

    const creature = await prisma.creature.update({
      where: {
        id: params.creatureId,
      },
      data: {
        name,
        imageUrl,
        categoryId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Creature Updated Successfully!",
      updatedCreature: creature,
    });
  } catch (error) {
    console.log("[CREATURE_PATCH]", error);
    return NextResponse.json(
      { success: false, message: "Internal Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { creatureId: string } }
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

    if (!params.creatureId) {
      return NextResponse.json(
        { success: false, message: "Creature id is required!" },
        { status: 400 }
      );
    }

    const creature = await prisma.creature.deleteMany({
      where: {
        id: params.creatureId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Creature deleted Successfully!",
      deletedCreature: creature,
    });
  } catch (error) {
    console.log("[CREATURE_DELETE]", error);
    return NextResponse.json(
      { success: false, message: "Internal Error" },
      { status: 500 }
    );
  }
}
