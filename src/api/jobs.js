import axios from "axios";

// This function now accepts the Supabase client as its first argument.
export const handleOrder = async (supabase, file, orderData) => {
  try {
    // Step 1: Upload file to Supabase Storage
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("orders-files") // ✅ Correct bucket name to match your dashboard
      .upload(fileName, file);

    if (error) throw error;

    // Step 2: Get public file URL
    const { data: publicUrlData } = supabase.storage
      .from("orders-files") // ✅ Correct bucket name
      .getPublicUrl(fileName);

    const fileUrl = publicUrlData.publicUrl;

    // Step 3: Send metadata to Netlify Function
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