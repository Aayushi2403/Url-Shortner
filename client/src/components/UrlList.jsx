import UrlCard from "./UrlCard";
import "./UrlList.css";

export default function UrlList({ urls, onRefresh }) {
  if (urls.length === 0) {
    return <p className="no-urls">No URLs shortened yet. Try one above! 👆</p>;
  }

  return (
    <div className="url-list">
      <h3>Your Shortened URLs</h3>
      {urls.map((url) => (
        <UrlCard key={url._id} url={url} onDelete={onRefresh} />
      ))}
    </div>
  );
}