import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// =========================
// FIREBASE CONFIG
// =========================

const firebaseConfig = {
  apiKey: "AIzaSyAORAA7zBjhrl1T-qY2skRseybS6mzeoIo",
  authDomain: "kmhe-telemetry-f0aa4.firebaseapp.com",
  databaseURL: "https://kmhe-telemetry-f0aa4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kmhe-telemetry-f0aa4",
  storageBucket: "kmhe-telemetry-f0aa4.firebasestorage.app",
  messagingSenderId: "317687900296",
  appId: "1:317687900296:web:8ad8bdf95b2e64b629d73d"
};

// =========================
// FIREBASE INIT
// =========================

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const telemetryRef = ref(db, "telemetry");
alert("APP JS LOADED");

// =========================
// LEAFLET MAP
// =========================

const map = L.map("map").setView([-7.2575, 112.7521], 15);

L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution: "&copy; OpenStreetMap"
  }
).addTo(map);

// Marker GPS

const marker = L.marker([-7.2575, 112.7521]).addTo(map);

// Track History

let trackPoints = [];

const polyline = L.polyline(trackPoints, {
  color: "red",
  weight: 4
}).addTo(map);

// =========================
// FIREBASE REALTIME UPDATE
// =========================

onValue(telemetryRef, (snapshot) => {

  const data = snapshot.val();

  if (!data) return;

  // SPEED

  document.getElementById("speed").innerHTML =
    Number(data.speed || 0).toFixed(1);

  // TPS

  document.getElementById("tps").innerHTML =
    Number(data.tps || 0).toFixed(0);

  // LAP

  document.getElementById("lap").innerHTML =
    data.lap || 0;

  // LAP TIME

  document.getElementById("lapTime").innerHTML =
    data.lapTime || 0;

  // GPS

  const lat = Number(data.lat);
  const lng = Number(data.lng);

  if (!isNaN(lat) && !isNaN(lng)) {

    const pos = [lat, lng];

    marker.setLatLng(pos);

    map.setView(pos, 18);

    trackPoints.push(pos);

    polyline.setLatLngs(trackPoints);

  }

});
