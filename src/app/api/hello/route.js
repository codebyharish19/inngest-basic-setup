import { NextResponse, NextRequest } from "next/server";
import { inngest } from "../../../inngest/client"; // Adjust if your path differs

export const dynamic = "force-dynamic";

export async function POST(req) {
  const body = await req.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const event = await inngest.send({
    name: "test/hello.world",
    data: {
      email
        },
  });

  console.log("Event sent to Inngest:", event);
  console.log(event?.data || "No data");
  
  

  return NextResponse.json({ message: "Event sent to Inngest!", email });
}
