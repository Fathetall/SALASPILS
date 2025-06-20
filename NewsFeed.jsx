// src/NewsFeed.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function NewsFeed() {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error(error);
    } else {
      setComments(data);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      alert("Lūdzu, aizpildiet gan vārdu, gan komentāru!");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("comments").insert([
      {
        name,
        text,
      },
    ]);
    if (error) {
      alert("Kļūda, mēģiniet vēlreiz.");
      console.error(error);
    } else {
      setName("");
      setText("");
      fetchComments();
    }
    setLoading(false);
  }

  return (
    <div className="newsfeed">
      <h2>Komentāri</h2>
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Jūsu vārds"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          required
        />
        <textarea
          placeholder="Rakstiet savu komentāru šeit..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Iesniedz..." : "Pievienot komentāru"}
        </button>
      </form>
      <ul className="comments-list">
        {comments.map(({ id, name, text, created_at }) => (
          <li key={id} className="comment-item">
            <strong>{name}</strong> <em>({new Date(created_at).toLocaleString()})</em>
            <p>{text}</p>
          </li>
        ))}
      </ul>

      <style>{`
        .newsfeed {
          max-width: 600px;
          margin: 0 auto;
          padding: 10px;
        }
        .comment-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }
        input[type="text"], textarea {
          padding: 8px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          resize: vertical;
        }
        button {
          background-color: #005f73;
          color: #e0fbfc;
          border: none;
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }
        button:hover:not(:disabled) {
          background-color: #0a9396;
        }
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .comments-list {
          list-style: none;
          padding: 0;
        }
        .comment-item {
          background: #94d2bd;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 10px;
        }
        .comment-item strong {
          color: #001219;
        }
        .comment-item em {
          color: #001219;
          font-size: 0.85rem;
          margin-left: 8px;
        }
      `}</style>
    </div>
  );
}
