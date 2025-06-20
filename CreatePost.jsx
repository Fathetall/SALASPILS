import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAdmin() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
        const { data, error } = await supabase
          .from("admins")
          .select("*")
          .eq("id", user.id)
          .single();

        if (data) setIsAdmin(true);
        if (error) console.error("Admin check error:", error);
      } else if (userError) {
        console.error("User fetch error:", userError);
      }
    }
    checkAdmin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Lūdzu, aizpildi virsrakstu un saturu");
      return;
    }

    const { data, error } = await supabase
      .from("posts")
      .insert([{ title, content, author_email: userEmail }])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      alert("Kļūda: " + error.message);
    } else {
      alert("Ziņa veiksmīgi publicēta!");
      setTitle("");
      setContent("");
      navigate("/");
    }
  };

  if (!isAdmin) return <p>Piekļuve liegta. Tikai administratoriem.</p>;

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 500, margin: "20px auto" }}
    >
      <h2>Pievienot ziņu</h2>
      <input
        type="text"
        placeholder="Virsraksts"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />
      <textarea
        placeholder="Saturs"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        rows={6}
        style={{ width: "100%", padding: 10 }}
      />
      <button
        type="submit"
        style={{ marginTop: 10, padding: "10px 20px" }}
      >
        Publicēt
      </button>
    </form>
  );
}
