import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import logo from "./assets/logo.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const menuItems = [
    { name: "Sākums", to: "/" },
    { name: "Informācija", to: "/informacija" },
    { name: "Kalendārs", to: "/kalendars" },
    { name: "Karte", to: "/karte" },
    { name: "Komentāri", to: "/komentari" },
  ];

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Salaspils Forums Logo" />
        </Link>
      </div>

      <ul className="menu">
        {menuItems.map(({ name, to }) => (
          <li key={to} className={location.pathname === to ? "active" : ""}>
            <Link to={to}>{name}</Link>
          </li>
        ))}
      </ul>

      <div className="admin-actions">
        {!user ? (
          <>
            <Link to="/admin-signup" className="btn-link">Reģistrācija</Link>
            <Link to="/admin-login" className="btn-link">Pieslēgties</Link>
          </>
        ) : (
          <>
            <Link to="/create-post" className="btn-link">Pievienot postu</Link>
            <button onClick={handleLogout} className="btn-logout">Iziet</button>
          </>
        )}
      </div>

      <style>{`
        .navbar {
          background-color: #005f73;
          padding: 10px 20px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          gap: 20px;
          justify-content: space-between;
        }
        .logo-container img {
          height: 40px;
          cursor: pointer;
        }
        .menu {
          list-style: none;
          display: flex;
          gap: 25px;
          margin: 0;
          padding: 0;
          flex-grow: 1;
          justify-content: center;
        }
        .menu li {
          font-weight: 600;
          cursor: pointer;
          padding: 8px 15px;
          border-radius: 5px;
          transition: background-color 0.3s ease, transform 0.2s ease;
          user-select: none;
        }
        .menu li a {
          color: #e0fbfc;
          text-decoration: none;
        }
        .menu li:hover {
          background-color: #0a9396;
          transform: scale(1.1);
        }
        .active {
          background-color: #94d2bd;
          color: #001219;
          font-weight: 700;
          box-shadow: 0 0 10px #94d2bd;
          transform: scale(1.1);
        }
        .active a {
          color: #001219;
        }
        .admin-actions a, .admin-actions button {
          background-color: #ee6c4d;
          color: white;
          padding: 8px 15px;
          border-radius: 5px;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          border: none;
          margin-left: 10px;
          transition: background-color 0.3s ease;
        }
        .admin-actions a:hover, .admin-actions button:hover {
          background-color: #d6543a;
        }
        @media (max-width: 600px) {
          .navbar {
            flex-direction: column;
            gap: 15px;
          }
          .menu {
            flex-direction: column;
            gap: 10px;
            justify-content: flex-start;
          }
          .menu li {
            text-align: center;
          }
          .admin-actions {
            align-self: flex-end;
          }
        }
      `}</style>
    </nav>
  );
}
