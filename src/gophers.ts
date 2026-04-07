import "./main.js";

interface Contributor {
  login: string;
  contributions: number;
  avatar_url: string;
  html_url: string;
}

const REPO = "kashifkhan0771/utils";
const API_URL = `https://api.github.com/repos/${REPO}/contributors?per_page=100`;

async function fetchContributors(): Promise<Contributor[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data: Contributor[] = await res.json();
  // Filter out bots
  return data.filter((c) => !c.login.includes("[bot]"));
}

function renderBarChart(contributors: Contributor[]): void {
  const container = document.getElementById("bar-chart")!;
  const top5 = contributors.slice(0, 5);
  const max = top5[0]?.contributions || 1;

  container.innerHTML = top5
    .map((c, i) => {
      const pct = Math.round((c.contributions / max) * 100);
      return `
      <div class="bar-row stagger visible" style="animation-delay: ${i * 0.06}s">
        <a href="${c.html_url}" target="_blank" class="bar-label">
          <img src="${c.avatar_url}&s=40" alt="" class="bar-avatar">
          <span>${c.login}</span>
        </a>
        <div class="bar-track">
          <div class="bar-fill" style="--bar-width: ${pct}%; --bar-delay: ${(i + 1) * 0.1}s;">
            <span class="bar-count">${c.contributions}</span>
          </div>
        </div>
      </div>`;
    })
    .join("");

  // Trigger bar animation after render
  requestAnimationFrame(() => {
    container.querySelectorAll(".bar-fill").forEach((bar) => {
      bar.classList.add("animate");
    });
  });
}

function renderGrid(contributors: Contributor[]): void {
  const container = document.getElementById("gopher-grid")!;
  const countEl = document.getElementById("gopher-count");
  if (countEl) countEl.textContent = String(contributors.length);

  container.innerHTML = contributors
    .map(
      (c, i) => `
      <a href="${c.html_url}" target="_blank" class="gopher-card stagger visible" style="animation-delay: ${i * 0.04}s">
        <img src="${c.avatar_url}&s=80" alt="">
        <div class="gopher-info">
          <strong>${c.login}</strong>
          <span>${c.contributions} contribution${c.contributions === 1 ? "" : "s"}</span>
        </div>
      </a>`
    )
    .join("");
}

function renderError(msg: string): void {
  const chart = document.getElementById("bar-chart");
  const grid = document.getElementById("gopher-grid");
  const errorHtml = `<p class="fetch-error">Could not load contributors: ${msg}. <a href="https://github.com/${REPO}/graphs/contributors" target="_blank">View on GitHub</a></p>`;
  if (chart) chart.innerHTML = errorHtml;
  if (grid) grid.innerHTML = errorHtml;
}

// ── Init ──

async function init(): Promise<void> {
  try {
    const contributors = await fetchContributors();
    renderBarChart(contributors);
    renderGrid(contributors);
  } catch (err) {
    renderError((err as Error).message);
  }
}

init();
