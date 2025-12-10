// ===== روابط المحاضرات =====
const summaries = [
  { title: "تلخيص محاضرة 1", description: "بروتوكولات الشبكات", subject: "شبكات الحاسوب", file: "files/م1.pdf" },
  { title: "تلخيص محاضرة 2", description: "الشبكات المحلية", subject: "شبكات الحاسوب", file: "files/تلخيص محاضرة 2 شبكات الحاسوب.pdf" },
  { title: "تلخيص محاضرة 3", description: "الشبكات ", subject: "شبكات الحاسوب", file: "files/محاضرة رقم 3 تلخيص.pdf" },
  { title: "تلخيص شابتر 1", description: "مفاهيم اساسية", subject: "os", file: "files/Operating System _chap1.pdf" },
  { title: "تلخيص شابتر 1", description: "تراكيب منفصلة", subject: "تراكيب المنفصلة", file: "files/_تلخيص تراكيب منفصلة First Chapter (1).pdf" },
  { title: "تلخيص شابتر 1", description: "تصميم المنطق الرقمي", subject: "تصميم", file: "files/منطق رقمي شابتر 1 (1).pdf" },
   { title: "تلخيص شابتر 1", description: "برمجو حاسوب 2 (OOP)", subject: "جافا2", file: "files/جافا 2 'شابتر 1' (1).pdf" },
 
 
 
];

//  DOM
const summariesList = document.getElementById("summariesList");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const clearSearch = document.getElementById("clearSearch");

// عرض التلخيصات
function displaySummaries() {
  const query = searchInput.value.toLowerCase();
  const filter = filterSelect.value;

  summariesList.innerHTML = "";

  const filtered = summaries
    .filter(s => filter === "all" || s.subject === filter)
    .filter(s =>
      s.title.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query)
    );

  if (filtered.length === 0) {
    summariesList.innerHTML = `<p class="muted">لا توجد نتائج مطابقة.</p>`;
    return;
  }

  filtered.forEach(s => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-info">
        <div class="card-thumb">${s.subject.slice(0,2)}</div>
        <div class="card-meta">
          <h3>${s.title}</h3>
          <p>${s.description} • <span class="tag">${s.subject}</span></p>
        </div>
      </div>

      <a class="download-btn" href="${s.file}" target="_blank">
        <i class="fa-solid fa-download"></i> تحميل
      </a>
    `;

    summariesList.appendChild(card);
  });
}

searchInput.addEventListener("input", () => {
  clearSearch.style.display = searchInput.value ? "block" : "none";
  displaySummaries();
});

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  clearSearch.style.display = "none";
  displaySummaries();
});

filterSelect.addEventListener("change", displaySummaries);

displaySummaries();

//      تغير الوضع (Dark Mode)
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeIcon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  themeText.textContent = theme === "dark" ? "وضع فاتح" : "وضع داكن";
}

const savedTheme = localStorage.getItem("theme") || 
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("theme", next);
});
