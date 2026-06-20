import { useEffect, useState } from "react";
import { getAllUrls } from "../services/api";
import "./Dashboard.css";

export default function Dashboard() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    getAllUrls().then(({ data }) => setUrls(data));
  }, []);

  const totalClicks = urls.reduce((sum, u) => sum + u.clicks, 0);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="stat-card">
          <h2>{urls.length}</h2>
          <p>Total Links</p>
        </div>
        <div className="stat-card">
          <h2>{totalClicks}</h2>
          <p>Total Clicks</p>
        </div>
      </div>

      <table className="url-table">
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short Code</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((u) => (
            <tr key={u._id}>
              <td className="td-original">{u.longUrl}</td>
              <td>{u.shortCode}</td>
              <td>{u.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}