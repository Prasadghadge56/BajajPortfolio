"use strict";
const SITE = "https://www.bajajfinserv.in/";
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const DATA = {
  biz: [
    ["🛍️", "Consumer Finance", "EMI financing for consumer durables, digital products and lifestyle purchases."],
    ["💳", "Personal & Business Loans", "Unsecured loans for individuals and business owners."],
    ["🏭", "SME & Commercial Lending", "Credit solutions for small and medium enterprises and commercial customers."],
    ["🌾", "Rural Lending", "Financing for customers in smaller towns and villages."],
    ["🏠", "Mortgage Loans", "Home loans and loans against property."],
    ["📈", "Deposits & Investments", "Fixed deposits for customers seeking stable returns."],
    ["🤝", "Partnerships & Digital Services", "Partner-led and app-based financial services."]
  ],
  prod: [
    ["Personal Loan", "Unsecured", "Funds for planned and unplanned expenses.", "Tenure, rate and eligibility are set by the lender."],
    ["Home Loan", "Mortgage", "Financing to buy or build a home.", "Home loans are offered by Bajaj Housing Finance Limited, a subsidiary."],
    ["Business Loan", "Business", "Working capital and growth funding.", "Check the official site for current eligibility."],
    ["Two-Wheeler Finance", "Consumer", "Finance for buying a two-wheeler.", "Offered through partner dealers."],
    ["Consumer Durable Loan", "EMI", "Buy appliances and electronics on easy EMIs.", "Available at partner retail stores."],
    ["Gold Loan", "Secured", "Loans against gold, where offered.", "Availability varies by location."],
    ["Fixed Deposit", "Deposits", "Fixed-tenure deposits with the company.", "Review the current rates on the official site."],
    ["Loan Against Property", "Secured", "Raise funds against owned property.", "Terms depend on the property and applicant."],
    ["EMI Financing", "EMI", "Spread a purchase into monthly instalments.", "Terms vary by product and partner."]
  ],
  why: [
    ["🧭", "Broad portfolio", "Lending and deposit products across many customer needs."],
    ["⚙️", "Technology-driven", "Digital journeys and analytics at the core of operations."],
    ["🙋", "Customer focus", "Support channels and self-service for existing customers."],
    ["📱", "Digital access", "Services reachable through app and web."],
    ["🗺️", "Wide reach", "A large distribution network with partners and branches."],
    ["🏛️", "Established presence", "In business since 1987 and listed on Indian exchanges."]
  ],
  ir: ["Annual Reports", "Financial Results", "Corporate Governance", "Stock Information", "Shareholder Information", "Investor Presentations"],
  faq: [
    ["Can I apply for a loan on this website?", "No. This is an informational showcase. Apply only through Bajaj Finance's official channels."],
    ["Is Bajaj Finance the same as Bajaj Finserv?", "No. Bajaj Finance Limited is a subsidiary of Bajaj Finserv Limited, which is a separate listed company."],
    ["Where do I find official customer support?", "Use the contact details on the official Bajaj Finserv website."],
    ["How do I raise a grievance?", "Follow the grievance redressal process published on the official website. Escalation details are provided there."],
    ["Where do the figures come from?", "Figures are from the company's Q2 FY27 results announced on 19 October 2026 and are labelled with their period."]
  ]
};

const card = (ico, t, p, extra = "") => `<article class="card tilt reveal"><div class="ico" aria-hidden="true">${ico}</div><h3>${t}</h3><p>${p}</p>${extra}</article>`;

function render() {
  $("#bizGrid").innerHTML = DATA.biz.map(([i, t, p]) => card(i, t, p, `<a class="more" href="${SITE}" target="_blank" rel="noopener">Explore more</a>`)).join("");
  $("#prodGrid").innerHTML = DATA.prod.map(([t, tag, p, more], n) =>
    `<article class="card tilt reveal"><span class="tag">${tag}</span><h3>${t}</h3><p>${p}</p>
     <div class="extra" id="ex${n}"><p>${more}</p></div>
     <button class="more" aria-expanded="false" aria-controls="ex${n}" data-toggle>Show details</button></article>`).join("");
  $("#whyGrid").innerHTML = DATA.why.map(([i, t, p]) => card(i, t, p)).join("");
  $("#irGrid").innerHTML = DATA.ir.map(t => card("📄", t, "Find this on the official website.", `<a class="more" href="${SITE}" target="_blank" rel="noopener">Open official site</a>`)).join("");
  $("#faq").innerHTML = DATA.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("");
  $$(".grid").forEach(g => $$(".reveal", g).forEach((el, i) => el.style.setProperty("--d", `${(i % 3) * 0.1}s`)));
}

function initNav() {
  const nav = $("#nav"), burger = $("#burger"), menu = $("#menu");
  const toggle = open => { menu.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); };
  burger.addEventListener("click", () => toggle(!menu.classList.contains("open")));
  menu.addEventListener("click", e => { if (e.target.closest("a")) toggle(false); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") toggle(false); });
  $(".dd-btn").addEventListener("click", e => {
    const dd = e.target.closest(".dd"); const o = dd.classList.toggle("open");
    e.target.setAttribute("aria-expanded", o);
  });
  const links = $$(".nl[href^='#']");
  const spy = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach(s => spy.observe(s));
  return nav;
}

function initScroll(nav) {
  const hero = $(".hero"), orbs = $$("[data-speed]"), top = $("#totop"), bar = $("#progress");
  let tick = false;
  const update = () => {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle("solid", y > 60);
    top.classList.toggle("show", y > 600);
    bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    if (!reduce && y < hero.offsetHeight) orbs.forEach(o => o.style.translate = `0 ${y * o.dataset.speed}px`);
    tick = false;
  };
  addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
  top.addEventListener("click", () => scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));
  update();
}

function animateCount(el) {
  const end = parseFloat(el.dataset.count), dec = +el.dataset.dec || 0;
  const fmt = v => v.toLocaleString("en-IN", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  if (reduce) { el.textContent = fmt(end); return; }
  const t0 = performance.now(), dur = 1800;
  const step = now => {
    const p = Math.min((now - t0) / dur, 1);
    el.textContent = fmt(end * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initObservers() {
  const io = new IntersectionObserver((es, o) => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    $$("[data-count]", e.target).forEach(animateCount);
    o.unobserve(e.target);
  }), { threshold: 0.15 });
  $$(".reveal").forEach(el => io.observe(el));
  $$(".hero-card").forEach(el => { $$("[data-count]", el).forEach(animateCount); });
}

function initInteractions() {
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-toggle]"); if (!b) return;
    const ex = document.getElementById(b.getAttribute("aria-controls"));
    const open = ex.classList.toggle("open");
    b.setAttribute("aria-expanded", open); b.textContent = open ? "Hide details" : "Show details";
  });
  if (reduce || matchMedia("(hover: none)").matches) return;
  document.addEventListener("pointermove", e => {
    const c = e.target.closest(".tilt");
    if (c) {
      const r = c.getBoundingClientRect();
      c.style.setProperty("--ry", ((e.clientX - r.left) / r.width - 0.5) * 8 + "deg");
      c.style.setProperty("--rx", (0.5 - (e.clientY - r.top) / r.height) * 8 + "deg");
    }
    const m = e.target.closest(".magnetic");
    if (m) {
      const r = m.getBoundingClientRect();
      m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
    }
  });
  document.addEventListener("pointerout", e => {
    const c = e.target.closest(".tilt"); if (c && !c.contains(e.relatedTarget)) { c.style.removeProperty("--rx"); c.style.removeProperty("--ry"); }
    const m = e.target.closest(".magnetic"); if (m && !m.contains(e.relatedTarget)) m.style.transform = "";
  });
}

function initTheme() {
  const btn = $("#theme"), root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  const apply = dark => {
    root.dataset.theme = dark ? "dark" : "light";
    btn.setAttribute("aria-pressed", dark);
    btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    btn.firstElementChild.textContent = dark ? "☀️" : "🌙";
  };
  apply(saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches);
  btn.addEventListener("click", () => {
    const dark = root.dataset.theme !== "dark";
    apply(dark);
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
  });
}

document.addEventListener("DOMContentLoaded", () => {
  render();
  initTheme();
  const nav = initNav();
  initScroll(nav);
  initObservers();
  initInteractions();
  $("#yr").textContent = new Date().getFullYear();
});
addEventListener("load", () => setTimeout(() => $("#loader").classList.add("done"), 400));
