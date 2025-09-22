var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var jobs_exports = {};
__export(jobs_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(jobs_exports);
var import_supabase_js = require("@supabase/supabase-js");
const supabase = (0, import_supabase_js.createClient)(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    console.log("\u{1F4E5} Incoming headers:", event.headers);
    console.log("\u{1F4E5} Incoming raw body:", event.body);
    let body;
    try {
      body = JSON.parse(event.body);
    } catch (parseErr) {
      console.error("\u26A0\uFE0F Failed to parse body as JSON:", parseErr.message);
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Invalid JSON body",
          raw: event.body?.slice(0, 200) || ""
          // show first 200 chars
        })
      };
    }
    console.log("\u{1F4E6} Parsed request body:", body);
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
        user_id: null
      }
    ]);
    if (error) {
      console.error("\u274C Supabase insert error:", error);
      throw error;
    }
    console.log("\u2705 Insert successful:", data);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, job: data[0] })
    };
  } catch (err) {
    console.error("\u274C Uncaught error in jobs.js:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
        stack: err.stack
      })
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
