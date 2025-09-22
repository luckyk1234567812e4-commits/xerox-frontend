// src/api/jobs.js
import axios from "axios";

// This function now accepts the 'supabase' client as an argument.
export const handleOrder = async (supabase, file, orderData) => {
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("orders-files") // ✅ Ensure this is your correct bucket name
      .upload(fileName, file);

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("orders-files") // ✅ Ensure this is your correct bucket name
      .getPublicUrl(fileName);

    const fileUrl = publicUrlData.publicUrl;

    const response = await axios.post("/.netlify/functions/jobs", {
      filename: file.name,
      file_url: fileUrl,
      ...orderData,
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error in handleOrder:", error);
    throw error;
  }
};