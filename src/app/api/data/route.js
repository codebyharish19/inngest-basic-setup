import { connectDB } from "@/utils/db.js";
import { Message } from "@/model/message.js";

export async function GET() {
  try {
    await connectDB();

    const messages = await Message.find().sort({ createdAt: -1 });

    return Response.json({ success: true, data: messages });
  } catch (error) {
    console.error("❌ Error fetching messages:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
        