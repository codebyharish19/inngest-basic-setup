import { connectDB } from "@/utils/db";
import { inngest } from "./client";
import { Message } from "@/model/message";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "2s");

    const message = `Hello ${event.data.email}!`;

    try {
      connectDB().then(async () => {
        const savedMessage = await Message.create({
          username: event.data.email,
          message: `Hello ${event.data.email}, welcome!`,
        });
      })
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }


    // Use the production URL (Vercel deployment)
    await fetch("https://inngest-basic-setup.vercel.app/api/hello-webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });



    return { message, status: 200 };
  },
);
