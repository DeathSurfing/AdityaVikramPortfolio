import { v } from "convex/values";
import { mutation } from "./_generated/server";

const RATE_LIMIT_MS = 60 * 60 * 1000; // 1 hour in milliseconds

export const submitContactForm = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    ipAddress: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const oneHourAgo = now - RATE_LIMIT_MS;

    // Check for recent submissions from this IP
    const recentSubmissions = await ctx.db
      .query("submissions")
      .withIndex("by_ip_and_timestamp", (q) =>
        q.eq("ipAddress", args.ipAddress).gt("timestamp", oneHourAgo)
      )
      .collect();

    if (recentSubmissions.length > 0) {
      const lastSubmission = recentSubmissions[recentSubmissions.length - 1];
      const timeSinceLastSubmission = now - lastSubmission.timestamp;
      const timeRemaining = RATE_LIMIT_MS - timeSinceLastSubmission;
      const minutesRemaining = Math.ceil(timeRemaining / 60000);

      throw new Error(
        `Rate limit exceeded. Please try again in ${minutesRemaining} minute${
          minutesRemaining === 1 ? "" : "s"
        }.`
      );
    }

    // Insert the submission
    const submissionId = await ctx.db.insert("submissions", {
      name: args.name,
      email: args.email,
      subject: args.subject,
      message: args.message,
      ipAddress: args.ipAddress,
      timestamp: now,
      read: false,
    });

    return { success: true, submissionId };
  },
});

export const getSubmissions = mutation({
  args: {
    limit: v.optional(v.number()),
    onlyUnread: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("submissions").order("desc");

    if (args.onlyUnread) {
      query = query.filter((q) => q.eq(q.field("read"), false));
    }

    const submissions = await query.take(args.limit ?? 50);
    return submissions;
  },
});

export const markAsRead = mutation({
  args: {
    submissionId: v.id("submissions"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.submissionId, { read: true });
    return { success: true };
  },
});
