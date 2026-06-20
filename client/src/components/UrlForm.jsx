import { useState } from "react";
import { shortenUrl } from "../services/api";
import toast from "react-hot-toast";
import "./UrlForm.css";

export default function UrlForm({ onSuccess }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return toast.error("Please enter a URL");
    setLoading(true);
    try {
      await shortenUrl(url);
      toast.success("URL shortened successfully!");
      setUrl("");
      onSuccess();
    } catch {
      toast.error("Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="url-form" onSubmit={handleSubmit}>
      <input
        type="url"
        placeholder="https://your-long-url.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Shortening..." : "Shorten ✂️"}
      </button>
    </form>
  );
}