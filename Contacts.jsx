import React from "react";

export default function Contacts() {
  return (
    <div style={{
      maxWidth: 600,
      margin: "30px auto",
      padding: 25,
      backgroundColor: "#f0f4f8",
      borderRadius: 12,
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      color: "#023047",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: 1.6,
    }}>
      <h2 style={{ textAlign: "center", marginBottom: 20, color: "#0077b6" }}>Kontakti</h2>
      <p style={{ fontStyle: "italic", marginBottom: 20 }}>
        Šeit ir oficiālie saziņas dati ar Salaspils Forums īpašniekiem.
      </p>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li style={{ marginBottom: 12 }}>
          <strong>Tālrunis:</strong> <a href="tel:+37125843057" style={{ color: "#0096c7", textDecoration: "none" }}>25843057</a>
        </li>
        <li style={{ marginBottom: 12 }}>
          <strong>Juridiskā adrese:</strong> Enerģetiku iela 7
        </li>
        <li style={{ marginBottom: 12 }}>
          <strong>E-pasts:</strong> <a href="mailto:nikitaskvorcov6916@gmail.com" style={{ color: "#0096c7", textDecoration: "none" }}>nikitaskvorcov6916@gmail.com</a>
        </li>
        <li style={{ marginBottom: 12 }}>
          <strong>Juridiskā persona:</strong> Nikita Skvorcovs
        </li>
      </ul>
      <p style={{ marginTop: 20 }}>
        Jautājumu vai palīdzības gadījumā lūdzu sazinieties ar mums, izmantojot iepriekš minētos kontaktus.
      </p>
    </div>
  );
}
