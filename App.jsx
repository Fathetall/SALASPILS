import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./Home";
import Info from "./Info";
import Calendar from "./Calendar";
import PlacesMap from "./PlacesMap";
import NewsFeed from "./NewsFeed";
import AdminSignup from "./AdminSignup.jsx"; // импортируем компонент
import AdminLogin from "./AdminLogin";
import CreatePost from "./CreatePost";
import { supabase } from './supabaseClient';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-signup" element={<AdminSignup />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/informacija" element={<Info />} />
          <Route path="/kalendars" element={<Calendar />} />
          <Route path="/karte" element={<PlacesMap />} />
          <Route path="/komentari" element={<NewsFeed />} />
          {/* Ja ceļš nav atrasts, rāda Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </>
  );
}
