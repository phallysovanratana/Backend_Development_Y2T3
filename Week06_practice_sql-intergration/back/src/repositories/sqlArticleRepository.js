import { pool } from "../utils/database.js";

// Get all articles (JOIN with journalists)
export async function getArticles() {
  const [rows] = await pool.query(`
    SELECT 
      a.id,
      a.title,
      a.content,
      a.category,
      j.id AS journalist_id,
      j.name AS journalist_name
    FROM articles a
    JOIN journalists j ON a.journalist_id = j.id
  `);

  return rows;
}

// Get one article by ID (JOIN)
export async function getArticleById(id) {
  const [rows] = await pool.query(
    `
    SELECT 
      a.id,
      a.title,
      a.content,
      a.category,
      j.id AS journalist_id,
      j.name AS journalist_name,
      j.email AS journalist_email,
      j.bio AS journalist_bio
    FROM articles a
    JOIN journalists j ON a.journalist_id = j.id
    WHERE a.id = ?
    `,
    [id]
  );

  return rows[0] || null;
}

// Create article
export async function createArticle(article) {
  const { title, content, journalist_id, category } = article;

  const [result] = await pool.query(
    `INSERT INTO articles (title, content, journalist_id, category)
     VALUES (?, ?, ?, ?)`,
    [title, content, journalist_id, category]
  );

  return {
    id: result.insertId,
    title,
    content,
    journalist_id,
    category,
  };
}

// Update article
export async function updateArticle(id, updatedData) {
  const { title, content, journalist_id, category } = updatedData;

  const [result] = await pool.query(
    `UPDATE articles
     SET title = ?, content = ?, journalist_id = ?, category = ?
     WHERE id = ?`,
    [title, content, journalist_id, category, id]
  );

  if (result.affectedRows === 0) return null;

  return {
    id,
    title,
    content,
    journalist_id,
    category,
  };
}

// Delete article
export async function deleteArticle(id) {
  const [result] = await pool.query(
    "DELETE FROM articles WHERE id = ?",
    [id]
  );

  return result.affectedRows > 0;
}

// Articles by journalist
export async function getArticlesByJournalistId(journalistId) {
  const [rows] = await pool.query(
    `
    SELECT 
      a.id,
      a.title,
      a.content,
      a.category,
      j.id AS journalist_id,
      j.name AS journalist_name
    FROM articles a
    JOIN journalists j ON a.journalist_id = j.id
    WHERE j.id = ?
    `,
    [journalistId]
  );

  return rows;
}