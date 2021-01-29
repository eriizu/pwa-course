import React from "react";
import logo from "./logo.svg";
import "./App.css";

function urlBase64ToUint8Array(base64String: string) {
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function registerPush() {
  let registration = await navigator.serviceWorker.getRegistration();
  if (registration) {
    try {
      let pushsubscription = await registration.pushManager.subscribe({
        applicationServerKey: urlBase64ToUint8Array(
          "BPdTu_dImk8UZqr1-paVPIUjGjaWbLRRRlXTt4D7FqzxtVAvvzdyQd7eeIboxZdX2Jx_-oVKXSOhTQG-XXOuRwo"
        ),
        userVisibleOnly: true,
      });
      console.log(pushsubscription);
    } catch (err) {
      console.log(err);
    }
  } else {
    console.error("no registration");
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => registerPush()}>bonjour</button>
      </header>
    </div>
  );
}

export default App;
