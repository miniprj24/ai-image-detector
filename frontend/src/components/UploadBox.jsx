// UploadBox.jsx — new UI, old backend API

import { useState } from 'react';

export default function UploadBox({ onPostCreated }) {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    setUploading(true);

    try {
      const form = new FormData();
      form.append("image", image);
      form.append("caption", caption);

      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      // Reset UI
      setImage(null);
      setImagePreview('');
      setCaption('');

      // Refresh feed
      onPostCreated();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to create post");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-md border border-white/5 shadow-glass rounded-2xl p-6 mb-8 max-w-[500px] mx-auto transition-all duration-300 hover:bg-slate-800/50">
      <form onSubmit={handleSubmit}>
        {!imagePreview ? (
          <label className="flex flex-col items-center justify-center cursor-pointer py-12 rounded-xl border-2 border-dashed border-slate-600/50 hover:border-sky-500/50 hover:bg-slate-700/30 transition-all duration-300 group">
            <div className="text-4xl mb-3 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] transition-all duration-300">📸</div>
            <span className="text-sm font-medium text-slate-400 group-hover:text-sky-400 transition-colors">Click to upload image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              required
            />
          </label>
        ) : (
          <div className="space-y-6">
            <div className="relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-slate-900/50">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full aspect-square object-cover rounded-lg"
              />
            </div>

            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              className="w-full p-4 bg-slate-900/50 border border-white/5 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 resize-none transition-all"
              rows="3"
            />

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setImagePreview('');
                }}
                className="flex-1 px-4 py-3 bg-slate-700/50 text-slate-300 rounded-xl text-sm font-bold hover:bg-red-500/20 hover:text-red-400 border border-transparent hover:border-red-500/30 transition-all duration-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={uploading}
                className="flex-1 px-4 py-3 bg-sky-600/20 text-sky-400 border border-sky-500/30 rounded-xl text-sm font-bold hover:bg-sky-500 hover:text-white hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {uploading ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
