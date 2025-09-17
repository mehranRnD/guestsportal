import { useEffect, useState } from "react";

function App() {
  const [params, setParams] = useState({});
  const [token, setToken] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setParams({
      client_mac: urlParams.get("id") || "unknown",
      ap_mac: urlParams.get("ap") || "unknown",
      redirect: urlParams.get("url") || "/",
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: 420, margin: "2rem auto", fontFamily: "Arial" }}>
      <h2>Guest Wi-Fi</h2>
      <p>Enter any 6-digit code to connect.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          maxLength={6}
          pattern="\d{6}"
          required
          style={{ padding: 10, width: "100%", marginBottom: 10 }}
        />
        <button style={{ padding: 10, width: "100%" }} type="submit">
          Connect
        </button>
      </form>

      {submitted && (
        <div style={{ marginTop: 20 }}>
          <p>✅ Code accepted: {token}</p>
          <p>📡 Client MAC: {params.client_mac}</p>
          <p>📶 AP MAC: {params.ap_mac}</p>
          <a href={params.redirect}>Continue</a>
        </div>
      )}
    </div>
  );
}

export default App;
