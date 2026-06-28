// ArticlePage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById } from "../services/api";

export default function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadArticle();
  }, [id]);

  const loadArticle = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getArticleById(id);
      if (!data) {
        setError("Article not found.");
        setArticle(null);
        return;
      }
      setArticle(data);
    } catch (err) {
      setError("Failed to fetch article.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading article...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>No article found.</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{article.title}</h2>

      <p>{article.content}</p>

      {/* Updated journalist link - using p tag with better styling */}
      <p 
        onClick={() => navigate(`/journalists/${article.journalist_id}/articles`)}
        style={{ 
          cursor: "pointer", 
          color: "var(--main-color)", 
          fontWeight: "bold",
          fontSize: "1.2em",
          textDecoration: "underline",
          display: "inline-block"
        }}
      >
        {article.journalist_name}
      </p>

      <p>
        <strong>Category:</strong> {article.category}
      </p>
    </div>
  );
}