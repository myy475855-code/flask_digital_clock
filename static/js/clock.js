(function () {
  const timeEl = document.getElementById("time");
  const secondsEl = document.getElementById("seconds");
  const dateEl = document.getElementById("date");
  const dayEl = document.getElementById("day");
  const toggle24 = document.getElementById("toggle24");
  const toggleThemeBtn = document.getElementById("toggleTheme");
  const copyBtn = document.getElementById("copyBtn");

  let use24 = false;

  try {
    const saved = localStorage.getItem("clock_24h");
    if (saved !== null) use24 = saved === "1";
    toggle24.checked = use24;
  } catch (e) {}

  toggle24.addEventListener("change", () => {
    use24 = toggle24.checked;
    try { localStorage.setItem("clock_24h", use24 ? "1" : "0"); } catch(e){}
    renderTime();
  });

  toggleThemeBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("light-theme");
  });

  copyBtn.addEventListener("click", async () => {
    const text = `${timeEl.textContent} • ${dateEl.textContent}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  });

  function formatParts(d) {
    const timeOptions = use24
      ? { hour: "2-digit", minute: "2-digit", hour12: false }
      : { hour: "numeric", minute: "2-digit", hour12: true };

    const sec = d.getSeconds().toString().padStart(2, "0");
    const hourMin = new Intl.DateTimeFormat(navigator.language, timeOptions).format(d);

    const dateStr = new Intl.DateTimeFormat(navigator.language, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(d);

    const weekday = new Intl.DateTimeFormat(navigator.language, { weekday: "long" }).format(d);

    return { hourMin, sec, dateStr, weekday };
  }

  function renderTime() {
    const now = new Date();
    const { hourMin, sec, dateStr, weekday } = formatParts(now);

    timeEl.textContent = hourMin;
    secondsEl.textContent = `:${sec}`;
    dateEl.textContent = dateStr;
    dayEl.textContent = weekday;
  }

  function startClock() {
    renderTime();
    const now = Date.now();
    const delay = 1000 - (now % 1000);
    setTimeout(function tick() {
      renderTime();
      setTimeout(tick, 1000);
    }, delay);
  }

  startClock();
})();
