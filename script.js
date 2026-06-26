const LOGO_URL = "assets/images/logo.png";

function applyCustomLogo() {
  if (!LOGO_URL) return;
  document.querySelectorAll(".logo-icon").forEach((el) => {
    el.innerHTML = `<img src="${LOGO_URL}" alt="Logo">`;
    el.style.background = "transparent";
  });
}

let cvData = {};
let selectedTemplate = "modern";
let selectedColor = "#2563EB";
let selectedColorDark = "#1D4ED8";
let skills = [];
let photoDataUrl = "";

window.addEventListener("scroll", () => {
  const nb = document.getElementById("navbar");
  if (!nb) return;
  if (window.scrollY > 30) nb.classList.add("scrolled");
  else nb.classList.remove("scrolled");
});
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("open");
}

function showPage(id) {
  ["page-landing", "page-form", "page-loading", "page-preview"].forEach((p) => {
    document.getElementById(p).style.display = "none";
  });
  document.getElementById(id).style.display = "block";
  window.scrollTo(0, 0);
}
function showLanding() {
  showPage("page-landing");
}
function showForm() {
  // Kalau user kembali untuk mengedit CV yang sudah pernah dibayar/didownload,
  // status bayarnya direset — harus bayar lagi setelah CV diubah.
  hasPaidForDownload = false;
  showPage("page-form");
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

function toggleFaq(btn) {
  const item = btn.parentElement;
  item.classList.toggle("open");
}

function handlePhoto(input) {
  if (!input.files[0]) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    photoDataUrl = e.target.result;
    const preview = document.getElementById("photoPreview");
    const icon = document.getElementById("photoIcon");
    const text = document.getElementById("photoText");
    preview.src = photoDataUrl;
    preview.style.display = "block";
    icon.style.display = "none";
    text.style.display = "none";
  };
  reader.readAsDataURL(input.files[0]);
}

const eduTemplate = `
  <div class="entry-block">
    <button class="remove-btn" onclick="removeEntry(this)"><i class="fa-solid fa-xmark"></i></button>
    <div class="form-row">
      <div class="form-group"><label>Institusi</label><input type="text" placeholder="Universitas Indonesia" /></div>
      <div class="form-group"><label>Jurusan</label><input type="text" placeholder="Ilmu Komputer" /></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Jenjang</label><select><option>S1 / Sarjana</option><option>S2 / Magister</option><option>D3 / Diploma</option><option>SMA/SMK</option></select></div>
      <div class="form-group"><label>IPK</label><input type="text" placeholder="3.75" /></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Tahun Masuk</label><input type="text" placeholder="2020" /></div>
      <div class="form-group"><label>Tahun Lulus</label><input type="text" placeholder="2024" /></div>
    </div>
  </div>`;

const expTemplate = `
  <div class="entry-block">
    <button class="remove-btn" onclick="removeEntry(this)"><i class="fa-solid fa-xmark"></i></button>
    <div class="form-row">
      <div class="form-group"><label>Nama Perusahaan</label><input type="text" placeholder="PT. Teknologi Nusantara" /></div>
      <div class="form-group"><label>Posisi</label><input type="text" placeholder="Frontend Developer" /></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Mulai</label><input type="text" placeholder="Jan 2023" /></div>
      <div class="form-group"><label>Selesai</label><input type="text" placeholder="Des 2023 / Sekarang" /></div>
    </div>
    <div class="form-row single">
      <div class="form-group"><label>Deskripsi Pekerjaan</label><textarea placeholder="Kembangkan fitur UI dengan React.js, berkolaborasi dengan tim backend..." /></div>
    </div>
  </div>`;

const orgTemplate = `
  <div class="entry-block">
    <button class="remove-btn" onclick="removeEntry(this)"><i class="fa-solid fa-xmark"></i></button>
    <div class="form-row">
      <div class="form-group"><label>Nama Organisasi</label><input type="text" placeholder="BEM Fakultas Ilmu Komputer" /></div>
      <div class="form-group"><label>Jabatan</label><input type="text" placeholder="Ketua Divisi Teknologi" /></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Periode</label><input type="text" placeholder="2022 – 2023" /></div>
    </div>
    <div class="form-row single">
      <div class="form-group"><label>Deskripsi</label><textarea placeholder="Memimpin tim 5 orang dalam pengembangan website organisasi..." /></div>
    </div>
  </div>`;

const projTemplate = `
  <div class="entry-block">
    <button class="remove-btn" onclick="removeEntry(this)"><i class="fa-solid fa-xmark"></i></button>
    <div class="form-row">
      <div class="form-group"><label>Nama Project</label><input type="text" placeholder="Aplikasi E-Commerce dengan React & Node.js" /></div>
      <div class="form-group"><label>Teknologi</label><input type="text" placeholder="React, Node.js, MongoDB" /></div>
    </div>
    <div class="form-row single">
      <div class="form-group"><label>Deskripsi</label><textarea placeholder="Membangun platform e-commerce full-stack dengan fitur autentikasi, keranjang belanja, dan pembayaran..." /></div>
    </div>
    <div class="form-row single">
      <div class="form-group"><label>Link (Opsional)</label><input type="url" placeholder="github.com/username/project" /></div>
    </div>
  </div>`;

const certTemplate = `
  <div class="entry-block">
    <button class="remove-btn" onclick="removeEntry(this)"><i class="fa-solid fa-xmark"></i></button>
    <div class="form-row">
      <div class="form-group"><label>Nama Sertifikat</label><input type="text" placeholder="AWS Certified Solutions Architect" /></div>
      <div class="form-group"><label>Penerbit</label><input type="text" placeholder="Amazon Web Services" /></div>
    </div>
    <div class="form-row single">
      <div class="form-group"><label>Tahun</label><input type="text" placeholder="2024" /></div>
    </div>
  </div>`;

function addEntry(listId, template) {
  document.getElementById(listId).insertAdjacentHTML("beforeend", template);
}
function removeEntry(btn) {
  btn.closest(".entry-block").remove();
}

function addSkill() {
  const input = document.getElementById("skillInput");
  const val = input.value.trim();
  if (!val) return;
  val.split(",").forEach((s) => {
    const sk = s.trim();
    if (sk && !skills.includes(sk)) {
      skills.push(sk);
    }
  });
  input.value = "";
  renderSkills();
}
function removeSkill(sk) {
  skills = skills.filter((s) => s !== sk);
  renderSkills();
}
function renderSkills() {
  const container = document.getElementById("skillTags");
  container.innerHTML = skills
    .map(
      (s) => `
    <div class="skill-tag-item">${s}<button onclick="removeSkill('${s}')">×</button></div>
  `,
    )
    .join("");
}

function selectTemplate(el, name) {
  document
    .querySelectorAll(".template-opt")
    .forEach((o) => o.classList.remove("selected"));
  el.classList.add("selected");
  selectedTemplate = name;
}

function gatherFormData() {
  const v = (id) => (document.getElementById(id) || {}).value || "";
  // Education
  const eduBlocks = document.querySelectorAll("#edu-list .entry-block");
  const education = Array.from(eduBlocks).map((b) => {
    const inputs = b.querySelectorAll("input, select");
    return {
      inst: inputs[0]?.value,
      jurusan: inputs[1]?.value,
      jenjang: inputs[2]?.value,
      ipk: inputs[3]?.value,
      masuk: inputs[4]?.value,
      lulus: inputs[5]?.value,
    };
  });
  // Experience
  const expBlocks = document.querySelectorAll("#exp-list .entry-block");
  const experience = Array.from(expBlocks).map((b) => {
    const inputs = b.querySelectorAll("input");
    const textarea = b.querySelector("textarea");
    return {
      perusahaan: inputs[0]?.value,
      posisi: inputs[1]?.value,
      mulai: inputs[2]?.value,
      selesai: inputs[3]?.value,
      desc: textarea?.value,
    };
  });
  // Organizations
  const orgBlocks = document.querySelectorAll("#org-list .entry-block");
  const orgs = Array.from(orgBlocks).map((b) => {
    const inputs = b.querySelectorAll("input");
    const textarea = b.querySelector("textarea");
    return {
      org: inputs[0]?.value,
      jabatan: inputs[1]?.value,
      periode: inputs[2]?.value,
      desc: textarea?.value,
    };
  });
  // Projects
  const projBlocks = document.querySelectorAll("#proj-list .entry-block");
  const projects = Array.from(projBlocks).map((b) => {
    const inputs = b.querySelectorAll("input");
    const textarea = b.querySelector("textarea");
    return {
      nama: inputs[0]?.value,
      tech: inputs[1]?.value,
      desc: textarea?.value,
      link: inputs[2]?.value,
    };
  });
  // Certs
  const certBlocks = document.querySelectorAll("#cert-list .entry-block");
  const certs = Array.from(certBlocks).map((b) => {
    const inputs = b.querySelectorAll("input");
    return {
      nama: inputs[0]?.value,
      penerbit: inputs[1]?.value,
      tahun: inputs[2]?.value,
    };
  });

  return {
    nama: v("f-nama") || "Nama Anda",
    email: v("f-email") || "email@example.com",
    hp: v("f-hp"),
    alamat: v("f-alamat"),
    linkedin: v("f-linkedin"),
    github: v("f-github"),
    about: v("f-about"),
    posisi: v("f-posisi") || "Professional",
    education,
    experience,
    orgs,
    projects,
    skills,
    lang1: v("lang1") || "Bahasa Indonesia",
    lang1lvl: (document.getElementById("lang1-level") || {}).value || "Native",
    lang2: v("lang2") || "Bahasa Inggris",
    lang2lvl:
      (document.getElementById("lang2-level") || {}).value || "Profesional",
    certs,
    photo: photoDataUrl,
    template: selectedTemplate,
  };
}

// ─── AI GENERATE (SIMULATED) ───────────────────────────
function aiSummary(data) {
  const posisi = data.posisi;
  const eduFirst = data.education[0];
  const expFirst = data.experience[0];
  const skillStr =
    data.skills.slice(0, 4).join(", ") || "berbagai teknologi modern";

  if (expFirst && expFirst.perusahaan) {
    return `Profesional berpengalaman sebagai ${posisi} dengan rekam jejak yang kuat dalam mengembangkan solusi berbasis teknologi. Pernah berkontribusi di ${expFirst.perusahaan} sebagai ${expFirst.posisi}, dengan keahlian utama mencakup ${skillStr}. Berorientasi pada hasil, cepat beradaptasi dengan lingkungan baru, dan memiliki kemampuan kolaborasi tim yang tinggi.`;
  }
  const edu = eduFirst
    ? `lulusan ${eduFirst.jenjang || "S1"} ${eduFirst.jurusan || "Ilmu Komputer"} dari ${eduFirst.inst || "Universitas terkemuka"}`
    : "fresh graduate yang antusias";
  return `Fresh graduate ${edu} yang bersemangat dan berorientasi pada pertumbuhan karier di bidang ${posisi}. Memiliki keahlian dalam ${skillStr} yang dikembangkan melalui proyek akademik, magang, dan pengembangan diri secara mandiri. Mampu bekerja dalam tim maupun secara mandiri, dengan kemampuan problem-solving yang baik dan motivasi tinggi untuk terus belajar.`;
}

function aiEnhanceExp(desc, posisi) {
  if (!desc || desc.length < 10) {
    return [
      `Mengembangkan dan memelihara fitur utama aplikasi sesuai spesifikasi teknis`,
      `Berkolaborasi dengan tim lintas fungsi untuk memenuhi target sprint mingguan`,
      `Mengoptimalkan performa sistem hingga meningkatkan efisiensi sebesar 30%`,
    ];
  }
  return [desc];
}

// ─── GENERATE CV ───────────────────────────────────────
function generateCV() {
  const data = gatherFormData();
  if (!data.nama || data.nama === "Nama Anda") {
    alert("Mohon isi nama lengkap terlebih dahulu.");
    return;
  }
  cvData = data;
  showPage("page-loading");
  runLoadingAnimation(data);
}

function runLoadingAnimation(data) {
  const steps = [
    { id: "ls1", lid: "ll1", msg: "Menganalisis data kamu..." },
    { id: "ls2", lid: "ll2", msg: "Membuat Professional Summary..." },
    { id: "ls3", lid: "ll3", msg: "Mengoptimalkan untuk ATS..." },
    { id: "ls4", lid: "ll4", msg: "Menyusun layout & format CV..." },
    { id: "ls5", lid: "ll5", msg: "Finalisasi & quality check..." },
  ];
  // Reset
  steps.forEach((s) => {
    const dot = document.getElementById(s.id);
    const lbl = document.getElementById(s.lid);
    dot.className = "ls-dot";
    dot.innerHTML = '<i class="fa-solid fa-check" style="font-size:11px"></i>';
    lbl.className = "ls-label";
  });
  document.getElementById("progressFill").style.width = "0%";

  let current = 0;
  const totalDuration = 3200;
  const interval = totalDuration / steps.length;

  function tick() {
    if (current >= steps.length) {
      document.getElementById("progressFill").style.width = "100%";
      setTimeout(() => {
        renderCV(data);
        showPage("page-preview");
      }, 400);
      return;
    }
    if (current > 0) {
      const prev = steps[current - 1];
      document.getElementById(prev.id).className = "ls-dot done";
      document.getElementById(prev.lid).className = "ls-label done";
    }
    const s = steps[current];
    document.getElementById(s.id).className = "ls-dot active";
    document.getElementById(s.lid).className = "ls-label active";
    document.getElementById("loadingSubtext").textContent = s.msg;
    document.getElementById("progressFill").style.width =
      ((current + 1) / steps.length) * 100 + "%";
    current++;
    setTimeout(tick, interval);
  }
  setTimeout(tick, 200);
}

// ─── RENDER CV ─────────────────────────────────────────
function renderCV(data) {
  const summary = aiSummary(data);
  const color = selectedColor;
  const dark = selectedColorDark;

  // ATS keywords from skills
  const kwTags = document.getElementById("kwTags");
  const kwList = data.skills.length
    ? data.skills
    : ["Problem Solving", "Teamwork", "Communication"];
  kwTags.innerHTML = kwList
    .slice(0, 8)
    .map((k) => `<span class="keyword-tag">${k}</span>`)
    .join("");

  // ATS score based on completeness
  let score = 60;
  if (data.experience.length) score += 10;
  if (data.skills.length >= 3) score += 8;
  if (data.education.length) score += 6;
  if (data.certs.length) score += 4;
  if (data.projects.length) score += 6;
  if (data.orgs.length) score += 3;
  if (data.photo) score += 3;
  score = Math.min(score, 100);
  document.getElementById("atsNum").textContent = score;
  document.getElementById("atsDesc").textContent =
    score >= 90 ? "Sangat Baik" : score >= 75 ? "Baik" : "Cukup";

  const paperEl = document.getElementById("cvPaper");

  // Build HTML based on template
  const photoHtml = data.photo
    ? `<img src="${data.photo}" class="cv-photo-circle" alt="foto" />`
    : "";
  const contactsHtml = `
    ${data.email ? `<div class="cv-contact-item"><i class="fa-solid fa-envelope"></i> ${data.email}</div>` : ""}
    ${data.hp ? `<div class="cv-contact-item"><i class="fa-solid fa-phone"></i> ${data.hp}</div>` : ""}
    ${data.alamat ? `<div class="cv-contact-item"><i class="fa-solid fa-location-dot"></i> ${data.alamat}</div>` : ""}
    ${data.linkedin ? `<div class="cv-contact-item"><i class="fa-brands fa-linkedin"></i> ${data.linkedin}</div>` : ""}
    ${data.github ? `<div class="cv-contact-item"><i class="fa-brands fa-github"></i> ${data.github}</div>` : ""}
  `;

  const educationHtml =
    data.education
      .filter((e) => e.inst)
      .map(
        (e) => `
    <div class="cv-entry">
      <div class="cv-entry-title">${e.inst}</div>
      <div class="cv-entry-sub">${e.jenjang || "S1"} ${e.jurusan ? "- " + e.jurusan : ""}</div>
      <div class="cv-entry-date">${e.masuk || ""} – ${e.lulus || "Sekarang"} ${e.ipk ? "• IPK: " + e.ipk : ""}</div>
    </div>
  `,
      )
      .join("") ||
    `<div class="cv-entry"><div class="cv-entry-title">Universitas Indonesia</div><div class="cv-entry-sub">S1 - Ilmu Komputer</div><div class="cv-entry-date">2020 – 2024 • IPK: 3.70</div></div>`;

  const experienceHtml = data.experience
    .filter((e) => e.perusahaan)
    .map((e) => {
      const bullets = aiEnhanceExp(e.desc, data.posisi);
      return `
    <div class="cv-entry">
      <div class="cv-entry-title">${e.posisi || "Staff"}</div>
      <div class="cv-entry-sub">${e.perusahaan}</div>
      <div class="cv-entry-date">${e.mulai || ""} – ${e.selesai || "Sekarang"}</div>
      <div class="cv-entry-desc"><ul>${bullets.map((b) => `<li>${b}</li>`).join("")}</ul></div>
    </div>`;
    })
    .join("");

  const orgHtml = data.orgs
    .filter((o) => o.org)
    .map(
      (o) => `
    <div class="cv-entry">
      <div class="cv-entry-title">${o.jabatan || "Anggota"}</div>
      <div class="cv-entry-sub">${o.org}</div>
      <div class="cv-entry-date">${o.periode || ""}</div>
      ${o.desc ? `<div class="cv-entry-desc">${o.desc}</div>` : ""}
    </div>
  `,
    )
    .join("");

  const projectHtml = data.projects
    .filter((p) => p.nama)
    .map(
      (p) => `
    <div class="cv-entry">
      <div class="cv-entry-title">${p.nama}</div>
      ${p.tech ? `<div class="cv-entry-sub">${p.tech}</div>` : ""}
      ${p.desc ? `<div class="cv-entry-desc">${p.desc}</div>` : ""}
      ${p.link ? `<div style="font-size:11px;color:var(--blue);margin-top:4px"><i class="fa-solid fa-link"></i> ${p.link}</div>` : ""}
    </div>
  `,
    )
    .join("");

  const certHtml = data.certs
    .filter((c) => c.nama)
    .map(
      (c) => `
    <div class="cv-cert-item">${c.nama}${c.penerbit ? " — " + c.penerbit : ""}${c.tahun ? " (" + c.tahun + ")" : ""}</div>
  `,
    )
    .join("");

  const skillBarHtml = (
    data.skills.length
      ? data.skills
      : ["JavaScript", "HTML/CSS", "Problem Solving"]
  )
    .map((s, i) => {
      const pct = [90, 85, 80, 75, 70, 65, 60][i % 7];
      return `<div class="cv-skill-item"><div class="cv-skill-name"><span>${s}</span><span style="color:var(--gray-400)">${pct}%</span></div><div class="cv-skill-bar"><div class="cv-skill-fill" style="width:${pct}%;background:${color}"></div></div></div>`;
    })
    .join("");

  const langHtml = `
    <div class="cv-lang-item"><span>${data.lang1}</span><span style="font-weight:600;color:${color}">${data.lang1lvl}</span></div>
    ${data.lang2 ? `<div class="cv-lang-item"><span>${data.lang2}</span><span style="font-weight:600;color:${color}">${data.lang2lvl}</span></div>` : ""}
  `;

  paperEl.innerHTML = `
    <div class="cv-render modern-tpl" style="--cv-color:${color};--cv-dark:${dark}">
      <div class="cv-top" style="background:${color}">
        <div class="cv-top-photo">
          ${photoHtml ? `<div style="flex-shrink:0">${photoHtml}</div>` : ""}
          <div>
            <div class="cv-top-name">${data.nama}</div>
            <div class="cv-top-role">${data.posisi}</div>
            <div class="cv-top-contacts">${contactsHtml}</div>
          </div>
        </div>
      </div>
      <div class="cv-body">
        <div class="cv-main">
          <div class="cv-section">
            <div class="cv-section-head" style="color:${color};border-color:${color}30">Profil Profesional</div>
            <div style="font-size:13px;color:var(--gray-600);line-height:1.75">${summary}</div>
          </div>
          ${
            experienceHtml || data.orgs.filter((o) => o.org).length === 0
              ? `
          <div class="cv-section">
            <div class="cv-section-head" style="color:${color};border-color:${color}30">Pengalaman Kerja</div>
            ${experienceHtml || `<div style="font-size:13px;color:var(--gray-400);font-style:italic">Belum ada pengalaman kerja.</div>`}
          </div>`
              : ""
          }
          ${
            orgHtml
              ? `
          <div class="cv-section">
            <div class="cv-section-head" style="color:${color};border-color:${color}30">Pengalaman Organisasi</div>
            ${orgHtml}
          </div>`
              : ""
          }
          ${
            projectHtml
              ? `
          <div class="cv-section">
            <div class="cv-section-head" style="color:${color};border-color:${color}30">Project</div>
            ${projectHtml}
          </div>`
              : ""
          }
        </div>
        <div class="cv-sidebar-col">
          <div class="cv-section">
            <div class="cv-section-head" style="color:${color};border-color:${color}30">Pendidikan</div>
            ${educationHtml}
          </div>
          <div class="cv-section">
            <div class="cv-section-head" style="color:${color};border-color:${color}30">Skill</div>
            <div class="cv-skill-row">${skillBarHtml}</div>
          </div>
          <div class="cv-section">
            <div class="cv-section-head" style="color:${color};border-color:${color}30">Bahasa</div>
            ${langHtml}
          </div>
          ${
            certHtml
              ? `
          <div class="cv-section">
            <div class="cv-section-head" style="color:${color};border-color:${color}30">Sertifikat</div>
            ${certHtml}
          </div>`
              : ""
          }
        </div>
      </div>
    </div>
  `;
}

// ─── COLOR CHANGER ─────────────────────────────────────
function changeColor(color, dark, el) {
  document
    .querySelectorAll(".color-opt")
    .forEach((o) => o.classList.remove("active"));
  el.classList.add("active");
  selectedColor = color;
  selectedColorDark = dark;
  if (cvData.nama) renderCV(cvData);
}

// ─── PAYWALL (gate sebelum Print / Download PDF) ──────
// Dua produk terpisah: 'cv' (Print/PDF CV) dan 'coverletter' (Download Cover Letter).
// Tiap produk punya status bayar masing-masing untuk sesi ini.
const PAYWALL_CONFIG = {
  cv: {
    title: "Buka Akses Download CV",
    desc: "CV kamu sudah jadi! Untuk menyimpan atau mencetak sebagai PDF, selesaikan pembayaran satu kali di bawah ini.",
    price: "Rp 15.000",
  },
  coverletter: {
    title: "Buka Akses Download Cover Letter",
    desc: "Cover letter kamu sudah jadi! Ini pembayaran tambahan yang terpisah dari pembayaran CV.",
    price: "Rp 5.000",
  },
};

let hasPaidForDownload = false; // status bayar untuk Print/PDF CV
let hasPaidForCoverLetter = false; // status bayar untuk Download Cover Letter (terpisah)
let pendingPaywallAction = null; // 'print' | 'pdf' | 'coverletter'
let pendingPaywallProduct = null; // 'cv' | 'coverletter'

function requirePayment(action) {
  pendingPaywallAction = action;
  pendingPaywallProduct = "cv";
  if (hasPaidForDownload) {
    runPaywallAction();
    return;
  }
  openPaywallModal("cv");
}

function requireCoverLetterPayment() {
  pendingPaywallAction = "coverletter";
  pendingPaywallProduct = "coverletter";
  if (hasPaidForCoverLetter) {
    runPaywallAction();
    return;
  }
  openPaywallModal("coverletter");
}

function openPaywallModal(product) {
  const cfg = PAYWALL_CONFIG[product];
  document.getElementById("paywallTitle").textContent = cfg.title;
  document.getElementById("paywallDesc").textContent = cfg.desc;
  document.getElementById("paywallPrice").innerHTML =
    `${cfg.price} <span>/ sekali bayar</span>`;
  document.getElementById("paywallStateChoose").classList.add("show");
  document.getElementById("paywallStateProcessing").classList.remove("show");
  document.getElementById("paywallStateSuccess").classList.remove("show");
  document.getElementById("paywallOverlay").classList.add("show");
}

function closePaywall() {
  document.getElementById("paywallOverlay").classList.remove("show");
  pendingPaywallAction = null;
  pendingPaywallProduct = null;
}

function processPayment(method) {
  document.getElementById("paywallStateChoose").classList.remove("show");
  document.getElementById("paywallStateProcessing").classList.add("show");
  document.getElementById("paywallProcessingMethod").textContent =
    `Memverifikasi pembayaran via ${method}…`;

  // Simulasi proses pembayaran (di produksi, ganti dengan panggilan ke payment gateway sungguhan)
  setTimeout(() => {
    document.getElementById("paywallStateProcessing").classList.remove("show");
    document.getElementById("paywallStateSuccess").classList.add("show");

    if (pendingPaywallProduct === "cv") hasPaidForDownload = true;
    else if (pendingPaywallProduct === "coverletter")
      hasPaidForCoverLetter = true;

    setTimeout(() => {
      document.getElementById("paywallOverlay").classList.remove("show");
      runPaywallAction();
    }, 1100);
  }, 1400);
}

function runPaywallAction() {
  if (pendingPaywallAction === "print") {
    window.print();
  } else if (pendingPaywallAction === "pdf") {
    downloadPDF();
  } else if (pendingPaywallAction === "coverletter") {
    downloadCoverLetter();
  }
  pendingPaywallAction = null;
  pendingPaywallProduct = null;
}

// ─── DOWNLOAD PDF ──────────────────────────────────────
function downloadPDF() {
  alert(
    '🎉 Fitur Download PDF aktif!\n\nUntuk mengunduh CV (beserta Cover Letter jika sudah dibuat), gunakan tombol Print (Ctrl+P) dan pilih "Save as PDF" di dialog cetak.\n\nTips: Pilih paper size A4 dan centang "Background graphics" untuk hasil terbaik.',
  );
}

// ─── COVER LETTER GENERATOR ────────────────────────────
function generateCoverLetter() {
  const company = (
    document.getElementById("coverCompany").value || "Perusahaan"
  ).trim();
  const role = (
    document.getElementById("coverRole").value ||
    cvData.posisi ||
    "Posisi yang dilamar"
  ).trim();
  const nama = cvData.nama || "Saya";
  const posisi = cvData.posisi || role;
  const eduFirst = (cvData.education || [])[0];
  const skillStr =
    (cvData.skills || []).slice(0, 3).join(", ") || "berbagai teknologi";
  const edu = eduFirst
    ? `${eduFirst.jenjang || "S1"} ${eduFirst.jurusan || "di universitas terkemuka"}`
    : "jenjang pendidikan yang relevan";

  const letter = `${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}

Yth. Tim Rekrutmen
${company}

Dengan hormat,

Saya yang bertanda tangan di bawah ini, ${nama}, bermaksud mengajukan lamaran pekerjaan untuk posisi <strong>${role}</strong> di ${company} yang saya ketahui melalui informasi lowongan terbaru.

Saya merupakan lulusan ${edu} yang memiliki keahlian di bidang ${skillStr}. Saya percaya bahwa latar belakang pendidikan dan pengalaman yang saya miliki relevan dan sejalan dengan kebutuhan posisi tersebut di ${company}.

Selama perjalanan akademik dan profesional saya, saya telah mengembangkan kemampuan teknis maupun interpersonal yang kuat, termasuk kemampuan problem-solving, kerja dalam tim, dan adaptasi cepat terhadap lingkungan baru. Saya yakin dapat memberikan kontribusi nyata bagi perkembangan ${company}.

Saya sangat antusias untuk berkontribusi di ${company} yang saya kenal sebagai perusahaan dengan reputasi dan inovasi yang luar biasa. Besar harapan saya untuk dapat berdiskusi lebih lanjut mengenai kesempatan bergabung ini.

Atas perhatian dan kesempatan yang diberikan, saya mengucapkan terima kasih.

Hormat saya,

${nama}
${cvData.email || ""}
${cvData.hp || ""}`;

  const result = document.getElementById("coverResult");
  result.innerHTML = letter;
  result.classList.add("show");
  document.getElementById("coverActions").style.display = "flex";

  // Tambahkan cover letter sebagai halaman ke-2 di dokumen CV
  document.getElementById("coverLetterPageContent").innerHTML = letter;
  document.getElementById("coverLetterPage").style.display = "block";

  // Cover letter baru dibuat/diubah → kalau sebelumnya sudah pernah dibayar &
  // didownload terpisah, minta bayar lagi untuk versi yang baru ini
  hasPaidForCoverLetter = false;
}

function downloadCoverLetter() {
  // Sembunyikan sementara halaman CV utama supaya yang ke-print/PDF
  // hanya halaman Cover Letter saja
  const cvPaperEl = document.getElementById("cvPaper");
  cvPaperEl.style.display = "none";

  const restore = () => {
    cvPaperEl.style.display = "";
    window.removeEventListener("afterprint", restore);
  };
  window.addEventListener("afterprint", restore);

  setTimeout(() => window.print(), 50);
}

// ─── INIT ──────────────────────────────────────────────
// Show only landing on load
applyCustomLogo();
document.getElementById("page-landing").style.display = "block";
document.getElementById("page-form").style.display = "none";
document.getElementById("page-loading").style.display = "none";
document.getElementById("page-preview").style.display = "none";

// Activate scroll observer after slight delay
setTimeout(() => {
  document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
}, 100);
