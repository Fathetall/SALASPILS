import React from "react";

export default function Information() {
  return (
    <div style={{
      maxWidth: 700,
      margin: "20px auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: 1.6,
      color: "#333",
      padding: 20,
      backgroundColor: "#f9f9f9",
      borderRadius: 8,
    }}>
      <h1 style={{ textAlign: "center", color: "#1877f2", marginBottom: 20 }}>Informācija par Salaspili</h1>

      <section style={{ marginBottom: 20 }}>
        <h2>Vēsture</h2>
        <p>
          Salaspils ir pilsēta Latvijā, kas atrodas tikai 15 kilometrus no Rīgas centra. Tā ir bagāta ar vēsturi — tās teritorijā agrāk atradās nozīmīgas arheoloģiskās vietas, un pilsēta ir bijusi svarīgs transporta un rūpniecības centrs jau vairāk nekā gadsimtu.
        </p>
        <p>
          20. gadsimtā Salaspils bija pazīstams arī ar Salaspils koncentrācijas nometni, kas bija viens no Otrā pasaules kara tumšajiem vēstures periodiem. Šodien tur atrodas piemiņas memoriāls.
        </p>
      </section>

      <section style={{ marginBottom: 20 }}>
        <h2>Populāras vietas</h2>
        <ul>
          <li>Salaspils Dabas parks — lieliska vieta pastaigām un dabas baudīšanai.</li>
          <li>Salaspils memoriāls — piemiņas vieta Otrā pasaules kara upuriem.</li>
          <li>Latvijas Universitātes Salaspils Dabas zinātņu centrs — zinātniskā pētniecība un izglītība.</li>
          <li>Lokālās sporta un atpūtas vietas ar dažādām aktivitātēm ģimenēm un jauniešiem.</li>
        </ul>
      </section>

      <section style={{ marginBottom: 20 }}>
        <h2>Rekordi un nozīmīgums</h2>
        <p>
          Salaspils ir viens no nozīmīgākajiem dzelzceļa mezgliem Latvijā, kas savieno galvenos transporta maršrutus. Tāpat pilsētā darbojas vairākas rūpniecības un pētniecības iestādes, kas veicina Latvijas tautsaimniecības attīstību.
        </p>
        <p>
          Pilsēta ir arī populāra ar savām sporta sacensībām un kultūras pasākumiem, kas piesaista apmeklētājus no visas Latvijas.
        </p>
      </section>

      <section style={{ marginBottom: 20 }}>
        <h2>Salaspils šodien</h2>
        <p>
          Mūsdienās Salaspils ir moderns un dinamisku attīstību piedzīvojošs reģions, kas piedāvā labas dzīves kvalitātes iespējas, daudzveidīgu kultūras dzīvi un daudz dabas aktivitāšu. Pilsēta turpina attīstīties, lai kļūtu par pievilcīgu vietu gan iedzīvotājiem, gan tūristiem.
        </p>
      </section>

      <section style={{ marginBottom: 20 }}>
        <h2>Nākotnes plāni</h2>
        <p>
          Plānotās attīstības ietvaros tiek paredzētas investīcijas infrastruktūrā, jaunu sabiedrisko vietu izveidē un vides aizsardzībā. Salaspils mērķis ir kļūt par vienu no vadošajiem reģioniem Latvijā ar augstu dzīves kvalitāti un spēcīgu kopienas garu.
        </p>
      </section>

      <footer style={{ textAlign: "center", fontSize: 12, color: "#888", marginTop: 30 }}>
        <p>© 2025 Salaspils foruma informācija</p>
      </footer>
    </div>
  );
}
