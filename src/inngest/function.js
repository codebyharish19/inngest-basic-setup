import { connectDB } from "@/utils/db";
import { inngest } from "./client";
import { Message } from "@/model/message";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // Step 1: Sleep for 2 seconds (you can modify as necessary)
    await step.sleep("wait-a-moment", "2s");

    // Constructing the message
    const message = `Hello ${event.data.email}!`;

    try {
      // Step 2: Database connection and message saving inside the same try block
      await connectDB();

      const savedMessage = await Message.create({
        username: event.data.email,
        message: `Hello ${event.data.email}, welcome!`,
      });

      console.log("Saved message:", savedMessage);

      // Step 3: Sending the result to the webhook (same try block)
      await step.run("Send result to webhook", async () => {
        const response = await fetch("https://inngest-basic-setup.vercel.app/api/hello-webhook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        });

        if (!response.ok) {
          console.error("Webhook call failed:", response.statusText);
        }
      });

      return { message, status: 200 };
    } catch (error) {
      // Catch all errors in one place
      console.error("Error occurred:", error);
      return { error: error.message, status: 500 };
    }
  }
);
