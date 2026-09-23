const REFRESH_MS = 10000;

function number(value) {
  return Number(value || 0).toLocaleString();
}

async function loadData() {
  const status = document.getElementById("refresh-status");
  try {
    const response = await fetch(`data.json?t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    document.getElementById("xp").textContent = number(data.xp);
    document.getElementById("coins").textContent = number(data.coins);
    document.getElementById("runs").textContent = number(data.runs);
    document.getElementById("last-xp").textContent = `+${number(data.last_reward?.xp)}`;
    document.getElementById("last-coins").textContent = `+${number(data.last_reward?.coins)}`;

    const date = data.updated ? new Date(data.updated) : null;
    document.getElementById("updated").textContent = date && !Number.isNaN(date.getTime())
      ? date.toLocaleString()
      : "Unknown";

    status.textContent = `Updated ${new Date().toLocaleTimeString()}`;
  } catch (error) {
    status.textContent = "Waiting for data.json...";
  }
}

loadData();
setInterval(loadData, REFRESH_MS);
