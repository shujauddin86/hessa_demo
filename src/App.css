import React, { useState } from "react";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("landing");

  return (
    <div className="container">

      {/* SCREEN 1 — LANDING */}
      {screen === "landing" && (
        <div className="center">
          <h1>Hessa Search</h1>
          <p>Every video you own is a story waiting</p>
          <p style={{ color: "red", fontSize: "14px" }}>
            Demo Testing Phase
          </p>

          <div className="legal">
            <p>By continuing, you agree to our Terms & Privacy Policy</p>
          </div>

          <button onClick={() => setScreen("login")}>
            Continue
          </button>
        </div>
      )}

      {/* SCREEN 2 — LOGIN */}
      {screen === "login" && (
        <div className="center">
          <h2>Login / Signup</h2>

          <button>Continue with Google</button>
          <button>Continue with Phone</button>
          <button>Continue with Email</button>

          <button onClick={() => setScreen("home")}>
            Enter App
          </button>
        </div>
      )}

      {/* SCREEN 3 — HOME */}
      {screen === "home" && (
        <div className="center">
          <h2>Your Videos</h2>

          <button onClick={() => setScreen("reel")}>
            Generate Reel
          </button>
        </div>
      )}

      {/* SCREEN 4 — REEL READY */}
      {screen === "reel" && (
        <div className="center">
          <h2>Your Reel is Ready 🎬</h2>

          <button onClick={() => setScreen("download")}>
            ₹99 Payout
          </button>

          <button onClick={() => setScreen("plans")}>
            Get Unlimited Access
          </button>
        </div>
      )}

      {/* SCREEN 5 — DOWNLOAD ONLY */}
      {screen === "download" && (
        <div className="center">
          <h2>Download Your Reel</h2>

          <button>Download</button>
        </div>
      )}

      {/* SCREEN 6 — PLANS (NO PRICE) */}
      {screen === "plans" && (
        <div className="center">
          <h2>Unlimited Access</h2>

          <div className="plan">
            <p>Basic Plan</p>
            <h3>₹0</h3>
          </div>

          <div className="plan">
            <p>Pro Plan</p>
            <h3>₹0</h3>
          </div>

          <button>Subscribe</button>
        </div>
      )}
    </div>
  );
}

export default App;