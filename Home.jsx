import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("lv-LV", options);
}

function Avatar({ name }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const colors = ["#4caf50", "#2196f3", "#ff5722", "#9c27b0", "#ff9800"];
  const color = colors[name.length % colors.length];

  return (
    <div
      style={{
        backgroundColor: color,
        width: 48,
        height: 48,
        borderRadius: "50%",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: 18,
        userSelect: "none",
        marginRight: 12,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: adminData } = await supabase
          .from("admins")
          .select("*")
          .eq("id", user.id)
          .single();
        if (adminData) setIsAdmin(true);
      }

      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (postsError) console.error(postsError);
      else setPosts(postsData);

      const { data: likesData, error: likesError } = await supabase
        .from("post_likes")
        .select("*");
      if (likesError) console.error(likesError);
      else setLikes(likesData);
    }

    fetchData();

    const postsChannel = supabase
      .channel("public:posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => setPosts((posts) => [payload.new, ...posts])
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "posts" },
        (payload) =>
          setPosts((posts) => posts.filter((p) => p.id !== payload.old.id))
      )
      .subscribe();

    const likesChannel = supabase
      .channel("public:post_likes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "post_likes" },
        (payload) => setLikes((likes) => [...likes, payload.new])
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "post_likes" },
        (payload) => setLikes((likes) => likes.filter((l) => l.id !== payload.old.id))
      )
      .subscribe();

    return () => {
      supabase.removeChannel(postsChannel);
      supabase.removeChannel(likesChannel);
    };
  }, []);

  const userLikedPost = (postId) => {
    if (!user) return false;
    return likes.some((like) => like.post_id === postId && like.user_id === user.id);
  };

  const countLikes = (postId) => likes.filter((like) => like.post_id === postId).length;

  const toggleLike = async (postId) => {
    if (!user) {
      alert("Lūdzu, pierakstieties, lai liktu patīk!");
      return;
    }

    const liked = userLikedPost(postId);

    if (liked) {
      const { error } = await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user.id);
      if (error) alert("Kļūda noņemot patīk: " + error.message);
    } else {
      const { error } = await supabase
        .from("post_likes")
        .insert([{ post_id: postId, user_id: user.id }]);
      if (error) alert("Kļūda pievienojot patīk: " + error.message);
    }
  };

  const deletePost = async (id) => {
    if (!isAdmin) return;
    if (!window.confirm("Vai tiešām vēlies dzēst šo ziņu?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) alert("Kļūda dzēšot ziņu: " + error.message);
    else setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "20px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f0f2f5",
        padding: 20,
        borderRadius: 8,
      }}
    >
      <h2 style={{ marginBottom: 20, color: "#1877f2" }}>Jaunumi</h2>

      {posts.length === 0 && <p>Nav pieejamu ziņu.</p>}

      {posts.map(({ id, author_email, content, created_at, title }) => (
        <div
          key={id}
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 16,
            marginBottom: 16,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
            <Avatar name={author_email || "Anonīms"} />
            <div>
              <strong style={{ fontSize: 16 }}>Admins</strong>
              <div style={{ fontSize: 12, color: "#606770" }}>
                {formatDate(created_at)}
              </div>
            </div>
          </div>
          <h3>{title}</h3>
          <p style={{ fontSize: 14, lineHeight: 1.4, marginBottom: 12 }}>{content}</p>

          <div
            style={{
              borderTop: "1px solid #ddd",
              paddingTop: 8,
              display: "flex",
              gap: 20,
              alignItems: "center",
            }}
          >
            <button
              onClick={() => toggleLike(id)}
              style={{
                border: "none",
                background: "none",
                color: userLikedPost(id) ? "#1877f2" : "#606770",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              👍 Patīk {countLikes(id) > 0 && <span>({countLikes(id)})</span>}
            </button>

            <button
              onClick={() => alert("Komentēt!")}
              style={{
                border: "none",
                background: "none",
                color: "#606770",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              💬 Komentēt
            </button>

            {isAdmin && (
              <button
                onClick={() => deletePost(id)}
                style={{
                  border: "none",
                  background: "none",
                  color: "red",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: 14,
                }}
              >
                🗑️ Dzēst
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
