import React, { useState } from "react";

export default function Information() {
  const [darkMode, setDarkMode] = useState(false);

  const sections = [
    { id: "history", title: "Vēsture" },
    { id: "places", title: "Populāras vietas" },
    { id: "education", title: "Izglītība" },
    { id: "transport", title: "Transports un piekļuve" },
    { id: "culture", title: "Kultūras dzīve" },
    { id: "society", title: "Sabiedrība un iedzīvotāji" },
    { id: "economy", title: "Ekonomika" },
    { id: "environment", title: "Vide un ilgtspēja" },
    { id: "future", title: "Nākotnes plāni" },
  ];

  const themeStyles = {
    backgroundColor: darkMode ? "#121212" : "#f9f9f9",
    color: darkMode ? "#e0e0e0" : "#333",
    transition: "all 0.3s ease",
  };

  const buttonStyle = {
    backgroundColor: darkMode ? "#333" : "#e6f0ff",
    color: darkMode ? "#fff" : "#1877f2",
    border: "1px solid #1877f2",
    borderRadius: 5,
    padding: "6px 12px",
    cursor: "pointer",
    marginBottom: 20,
  };

  return (
    <div style={{ ...themeStyles, minHeight: "100vh", padding: 20, fontFamily: "Segoe UI" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", color: darkMode ? "#90caf9" : "#1877f2" }}>
          Informācija par Salaspili
        </h1>

        {/* Tumšā režīma poga */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={() => setDarkMode(!darkMode)} style={buttonStyle}>
            Pārslēgt uz {darkMode ? "gaišo" : "tumšo"} režīmu
          </button>
        </div>

        {/* Navigācija */}
        <nav style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          marginBottom: 30,
        }}>
          {sections.map(section => (
            <a
              key={section.id}
              href={`#${section.id}`}
              style={{
                textDecoration: "none",
                color: darkMode ? "#90caf9" : "#1877f2",
                border: `1px solid ${darkMode ? "#90caf9" : "#1877f2"}`,
                borderRadius: 5,
                padding: "6px 12px",
                fontSize: 14,
                backgroundColor: darkMode ? "#1e1e1e" : "#fff",
                transition: "background 0.2s",
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = darkMode ? "#2a2a2a" : "#e6f0ff"}
              onMouseOut={(e) => e.target.style.backgroundColor = darkMode ? "#1e1e1e" : "#fff"}
            >
              {section.title}
            </a>
          ))}
        </nav>

        {/* Sadaļas */}
        <div style={{ lineHeight: 1.7 }}>
          {sections.map(section => (
            <Section key={section.id} id={section.id} title={section.title} darkMode={darkMode} />
          ))}
        </div>

        <footer style={{
          textAlign: "center",
          fontSize: 12,
          color: darkMode ? "#aaa" : "#888",
          marginTop: 40,
        }}>
          <p>© 2025 Salaspils foruma informācija</p>
        </footer>
      </div>
    </div>
  );
}

function Section({ id, title, darkMode }) {
  const paragraphStyle = { marginBottom: 10 };

  const content = {
    history: (
      <>
        <p style={paragraphStyle}>Salaspils pirmo reizi pieminēta 13. gadsimtā. Tās apkārtnē atrastas vairākas arheoloģiski nozīmīgas vietas. Viduslaikos tā bija svarīgs tirdzniecības un stratēģiskais punkts. Padomju laikos pilsēta strauji attīstījās kā zinātnes un rūpniecības centrs. Šodien tās vēsturiskā identitāte ir cieši saistīta ar kultūras mantojuma saglabāšanu.</p>
      </>
    ),
    places: (
      <ul style={{ paddingLeft: 20 }}>
        <li>Botāniskais dārzs – unikāli augi un zinātniski pētījumi.</li>
        <li>Salaspils memoriāls – piemiņa Otrā pasaules kara upuriem.</li>
        <li>Kultūras nams – koncerti un sabiedriskie pasākumi.</li>
        <li>Dabas parks – pārgājieni, skatu torņi, velotakas.</li>
        <li>Daugavas krasts – atpūta pie ūdens un brīvdabas pasākumi.</li>
      </ul>
    ),
    education: (
      <>
        <p style={paragraphStyle}>Pilsētā darbojas vairākas izglītības iestādes – no bērnudārziem līdz vidusskolai. Ir arī mūzikas un mākslas skola. Salaspils sadarbojas ar universitātēm Rīgā, piedāvājot kopīgus projektus. Skolas ir modernizētas un aprīkotas ar digitālajām tehnoloģijām. Jauniešu centri nodrošina izglītojošas aktivitātes pēc stundām.</p>
      </>
    ),
    transport: (
      <>
        <p style={paragraphStyle}>Salaspils ir lieliski pieejama ar vilcienu no Rīgas, kas kursē bieži. Autobusu satiksme ir regulāra gan uz centru, gan uz attālākiem mikrorajoniem. Ceļu infrastruktūra ir kvalitatīva, ar drošiem veloceliņiem. Līdz Rīgas lidostai iespējams nokļūt mazāk kā stundas laikā. Tiek attīstīti e-transports un viedās pieturas.</p>
      </>
    ),
    culture: (
      <>
        <p style={paragraphStyle}>Salaspils kultūras dzīve ir aktīva visa gada garumā. Iedzīvotāji piedalās deju kolektīvos, kori un teātra trupās. Bieži tiek rīkoti amatiermākslas festivāli un izstādes. Kultūras centrs regulāri uzņem viesmāksliniekus no visas Latvijas. Notiek arī starptautiskas sadarbības ar partneriem Baltijas valstīs.</p>
      </>
    ),
    society: (
      <>
        <p style={paragraphStyle}>Salaspils sabiedrība ir saliedēta un daudzveidīga. Iedzīvotāji aktīvi iesaistās dažādos brīvprātīgajos projektos. Ir daudz iespēju iedzīvotāju līdzdalībai – no kopienu padomēm līdz pilsētas forumiem. Senioriem un jauniešiem tiek piedāvātas īpašas programmas. Tiek veicināta starpkultūru sapratne un iekļaušana.</p>
      </>
    ),
    economy: (
      <>
        <p style={paragraphStyle}>Salaspils ir viens no ekonomiski aktīvākajiem centriem Pierīgā. Pilsētā darbojas vairāki loģistikas centri, ražotnes un pētniecības institūti. Jaunuzņēmumi tiek atbalstīti ar biznesa inkubatoriem un mentoringu. Vietējā pašvaldība piesaista Eiropas fondu līdzekļus uzņēmējdarbības veicināšanai. Lielu nozīmi ekonomikas attīstībā spēlē arī izglītība un inovācijas.</p>
      </>
    ),
    environment: (
      <>
        <p style={paragraphStyle}>Tiek aktīvi īstenoti ilgtspējīgas attīstības principi. Zaļās zonas pilsētā tiek paplašinātas, tiek stādīti jauni koki. Notiek arī atkritumu šķirošanas uzlabošana un ūdens kvalitātes uzraudzība. Salaspils ir viena no vadošajām Latvijas pašvaldībām klimatpolitikas jautājumos. Skolās bērni mācās par vides saglabāšanu praksē.</p>
      </>
    ),
    future: (
      <>
        <p style={paragraphStyle}>Pilsēta plāno veidot viedās ielas, ilgtspējīgus mājokļus un modernus sabiedriskos centrus. Attīstības stratēģija paredz arī reģionālu sadarbību ar citām pašvaldībām. Fokusā ir arī digitālā infrastruktūra – ātrs internets un publiskie WiFi punkti. Tiek plānots piesaistīt jaunas ģimenes un ārvalstu studentus. Salaspils virzās uz ilgtspējīgu, modernu un drošu nākotni.</p>
      </>
    ),
  };

  return (
    <section id={id} style={{ marginBottom: 40, scrollMarginTop: 80 }}>
      <h2 style={{
        color: darkMode ? "#90caf9" : "#333",
        borderBottom: "2px solid #ccc",
        paddingBottom: 5,
        marginBottom: 15
      }}>{title}</h2>
      {content[id]}
    </section>
  );
}
