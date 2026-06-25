import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAORAA7zBjhrl1T-qY2skRseybS6mzeoIo",
  authDomain: "kmhe-telemetry-f0aa4.firebaseapp.com",
  databaseURL: "https://kmhe-telemetry-f0aa4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kmhe-telemetry-f0aa4",
  storageBucket: "kmhe-telemetry-f0aa4.firebasestorage.app",
  messagingSenderId: "317687900296",
  appId: "1:317687900296:web:8ad8bdf95b2e64b629d73d"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const telemetryRef = ref(db, 'telemetry');

onValue(telemetryRef, (snapshot) => {

  const data = snapshot.val();

  document.getElementById("speed").innerHTML =
    data.speed.toFixed(1);

  document.getElementById("tps").innerHTML =
    data.tps.toFixed(0);

  document.getElementById("lap").innerHTML =
    data.lap;

  document.getElementById("lapTime").innerHTML =
    data.lapTime;

});
