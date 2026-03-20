export default function MarketIndices() {

  const data = [
    { name: "NIFTY 50", value: 22450 },
    { name: "SENSEX", value: 73800 },
    { name: "NASDAQ", value: 16000 },
    { name: "DOW JONES", value: 38900 }
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
        gap: "15px",
        marginBottom: "20px"
      }}
    >
      {data.map((i) => (
        <div
          key={i.name}
          style={{
            background: "#0b1220",
            padding: "15px",
            borderRadius: "12px",
            color: "white",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)"
          }}
        >
          <h4 style={{ margin: 0, color: "#9ca3af" }}>{i.name}</h4>
          <h2 style={{ marginTop: "8px" }}>{i.value}</h2>
        </div>
      ))}
    </div>
  );
}