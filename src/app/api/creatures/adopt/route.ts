import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

type RequestBody = {
  fullName: string;
  email: string;
  phone: string;
  properConditions: string;
  otherPets: string;
  creatureId: string;
};

export const POST = async (req: Request) => {
  try {
    const body: RequestBody = await req.json();
    const { fullName, email, phone, properConditions, otherPets, creatureId } =
      body;

    if (!fullName) {
      return NextResponse.json(
        { success: false, message: "Name is required!" },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email are required" },
        { status: 400 }
      );
    }

    if (!phone) {
      return NextResponse.json(
        { success: false, message: "Category id is required!" },
        { status: 400 }
      );
    }

    if (!creatureId) {
      return NextResponse.json(
        { success: false, message: "Creature is required!" },
        { status: 400 }
      );
    }

    const newAdoptForm = await prisma.adoptForm.create({
      data: {
        fullName,
        email,
        phone,
        properConditions,
        otherPets,
        creatureId,
      },
    });

    return NextResponse.json(
      { success: true, message: "Form Submitted successfully!", newAdoptForm },
      { status: 201 }
    );
  } catch (error) {
    console.log("[ADOP_FORM_POST]", error);
    return NextResponse.json(
      { success: false, message: "Internal Error" },
      { status: 500 }
    );
  }
};
