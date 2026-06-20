import { useEffect, useState } from "react";
import UrlForm from "../components/UrlForm";
import UrlList from "../components/UrlList";
import { getAllUrls } from "../services/api";
import "./Home.css";

export default function Home() {
  const [urls, setUrls] = useState([]);

  const fetchUrls = async () => {
    try {
      const { data } = await getAllUrls();
      setUrls(data);
    } catch {
      console.error("Failed to fetch URLs");
    }
  };

  useEffect(() => { fetchUrls(); }, []);

  return (
    <div className="home">
      <div className="home-hero">
        <h1>Shorten Your Links Instantly</h1>
        <p>Paste a long URL below and get a clean shareable link</p>
      </div>
      <UrlForm onSuccess={fetchUrls} />
      <UrlList urls={urls} onRefresh={fetchUrls} />
    </div>
  );
}