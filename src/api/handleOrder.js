export async function handleOrder(file, details) {
  console.log("🚀 handleOrder CALLED"); // 👀 First checkpoint

  const filename = `${Date.now()}_${file.name}`;

  // 1️⃣ Upload file to Supabase
  const { data: upload, error: uploadError } = await supabase
    .storage
    .from("order-files")
    .upload(filename, file);

  if (uploadError) {
    console.error("❌ Upload failed:", uploadError.message);
    return;
  }

  console.log("✅ Upload success:", upload); // 👀 Second checkpoint

  // 2️⃣ Build public URL
  const { data: publicUrlData } = supabase
    .storage
    .from("order-files")
    .getPublicUrl(upload.path);

  console.log("🌐 Public URL:", publicUrlData.publicUrl); // 👀 Third checkpoint

  // 3️⃣ Send to backend
  const res = await axios.post("/api/jobs", {
    ...details,
    filename: file.name,
    file_url: publicUrlData.publicUrl,
  });

  console.log("📩 Backend response:", res.data); // 👀 Fourth checkpoint
  return res.data;
}
