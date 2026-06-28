// JournalistArticles.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function JournalistArticles() {
  const { id } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `http://localhost:4000/api/articles/journalists/${id}/articles`
      );
      setArticles(res.data);
    } catch (err) {
      setError("Failed to load articles for this journalist.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Articles by Journalist</h2>
      {articles.length === 0 ? (
        <p>No articles found for this journalist.</p>
      ) : (
        articles.map((a) => (
          <div key={a.id} style={{ 
            border: "1px solid #ccc", 
            padding: "15px", 
            margin: "10px 0",
            borderRadius: "8px"
          }}>
            <h3>
              <Link to={`/articles/${a.id}`} style={{ textDecoration: "none", color: "#4b84c5" }}>
                {a.title}
              </Link>
            </h3>
            <p>{a.content}</p>
            <p><strong>Category:</strong> {a.category}</p>
            <p><strong>Journalist:</strong> {a.journalist_name}</p>
          </div>
        ))
      )}
    </div>
  );
}