// netlify/functions/jobs.js
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    console.log("📥 Incoming headers:", event.headers);
    console.log("📥 Incoming raw body:", event.body);

    let body;
    try {
      body = JSON.parse(event.body);
    } catch (parseErr) {
      console.error("⚠️ Failed to parse body as JSON:", parseErr.message);
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Invalid JSON body",
          raw: event.body?.slice(0, 200) || "", // show first 200 chars
        }),
      };
    }

    console.log("📦 Parsed request body:", body);

    const { data, error } = await supabase.from("jobs").insert([
      {
        customer_name: "Anonymous",
        phone: null,
        email: null,
        file_path: body.file_url,
        filename: body.filename,
        pages: body.pages || 0,
        color: body.color === "color",
        copies: 1,
        binding: body.binding ? "yes" : "no",
        photo_set: body.photoSets > 0,
        price: body.totalCost || 0,
        status: "pending",
        note: null,
        user_id: null,
      },
    ]);

    if (error) {
      console.error("❌ Supabase insert error:", error);
      throw error;
    }

    console.log("✅ Insert successful:", data);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, job: data[0] }),
    };
  } catch (err) {
    console.error("❌ Uncaught error in jobs.js:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
        stack: err.stack,
      }),
    };
  }
}
