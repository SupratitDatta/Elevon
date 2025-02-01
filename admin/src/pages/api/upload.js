import { NextRequest, NextResponse } from "next/server";

export const POST = async (req, res) => {
    const formData = await req.formData();

    const images = formData.get("images");
    return res.json({ images }, { status: 200 });
}