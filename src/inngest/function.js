import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "30s");

    const message = `Hello ${event.data.email}!`;
     
    
    // ✅ Absolute URL required
    await fetch("http://localhost:3000/api/hello-webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    return { message,status:200 };
  },
);
