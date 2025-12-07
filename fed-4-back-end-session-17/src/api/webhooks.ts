import express from "express";
import { verifyWebhook } from "@clerk/express/webhooks";
import { User } from "../infrastructure/entities/User";

const webhooksRouter = express.Router();

webhooksRouter.post(
  "/clerk",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const evt = await verifyWebhook(req);

      // Do something with payload
      // For this guide, log payload to console
      const { id } = evt.data;
      const eventType = evt.type;
      console.log(
        `Received webhook with ID ${id} and event type of ${eventType}`
      );
      console.log("Webhook payload:", evt.data);

      if (eventType === "user.created") {
        const { id } = evt.data;
        const user = await User.findOne({ clerkUserId: id });
        if (user) {
          console.log("User already exists");
          return;
        }
        await User.create({
          firstName: evt.data.first_name,
          lastName: evt.data.last_name,
          email: evt.data.email_addresses[0].email_address,
          clerkUserId: id,
        });
      }

      if (eventType === "user.updated") {
        const { id } = evt.data;
        const user = await User.findOneAndUpdate({ clerkUserId: id }, {
          role: evt.data.public_metadata.role,
        });
      }

      if (eventType === "user.deleted") {
        const { id } = evt.data;
        await User.findOneAndDelete({ clerkUserId: id });
      }

      return res.send("Webhook received");
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return res.status(400).send("Error verifying webhook");
    }
  }
);

export default webhooksRouter;
