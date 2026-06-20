import { deleteUrl } from "../services/api";
import toast from "react-hot-toast";
import "./UrlCard.css";

export default function UrlCard({ url, onDelete }) {
  const shortLink = `http://localhost:5000/${url.shortCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortLink);
    toast.success("Copied to clipboard!");
  };

  const handleDelete = async () => {
    try {
      await deleteUrl(url._id);
      toast.success("URL deleted");
      onDelete();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="url-card">
      <div className="url-card-info">
        <p className="url-original">{url.longUrl}</p>
        <a href={shortLink} target="_blank" rel="noreferrer" className="url-short">
          {shortLink}
        </a>
      </div>
      <div className="url-card-actions">
        <span className="url-clicks">👆 {url.clicks} clicks</span>
        <button className="btn-copy" onClick={copyToClipboard}>Copy</button>
        <button className="btn-delete" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}