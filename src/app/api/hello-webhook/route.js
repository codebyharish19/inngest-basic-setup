import { NextResponse, NextRequest } from "next/server";

export async function POST(req) {
    const body = await req.json();
    console.log("Received webhook:", body);
    return NextResponse.json({ message: "Webhook received!" });
}