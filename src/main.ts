// WASM loader and shared utilities

declare class Go {
  importObject: WebAssembly.Imports;
  run(instance: WebAssembly.Instance): Promise<void>;
}

declare global {
  interface Window {
    wasmReady: boolean;
  }
}

export async function loadWasm(): Promise<void> {
  const go = new Go();
  const result = await WebAssembly.instantiateStreaming(
    fetch(new URL("../utils.wasm", import.meta.url)),
    go.importObject
  );
  go.run(result.instance);
}

// ── Card toggle with smooth animation ──

export function toggleCard(id: string): void {
  const card = document.getElementById(id);
  if (!card) return;

  const body = card.querySelector(".util-card-body") as HTMLElement;
  if (!body) return;

  if (card.classList.contains("active")) {
    // Collapse
    body.style.height = body.scrollHeight + "px";
    body.offsetHeight; // force reflow
    body.style.height = "0";
    body.style.opacity = "0";
    body.addEventListener(
      "transitionend",
      () => {
        card.classList.remove("active");
        body.style.height = "";
        body.style.opacity = "";
      },
      { once: true }
    );
  } else {
    // Expand
    card.classList.add("active");
    const height = body.scrollHeight;
    body.style.height = "0";
    body.style.opacity = "0";
    body.offsetHeight; // force reflow
    body.style.height = height + "px";
    body.style.opacity = "1";
    body.addEventListener(
      "transitionend",
      () => {
        body.style.height = "";
        body.style.opacity = "";
      },
      { once: true }
    );
  }
}

// ── Scroll-triggered stagger animations ──

function initAnimations(): void {
  // Signal that JS is loaded — CSS hides elements only when this class is present
  document.documentElement.classList.add("animate-ready");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll(".fade-in, .fade-in-up, .stagger")
    .forEach((el, i) => {
      if (el.classList.contains("stagger")) {
        (el as HTMLElement).style.animationDelay = `${i * 0.06}s`;
      }
      observer.observe(el);
    });

  // Bar chart fill animation
  const barChart = document.getElementById("bar-chart");
  if (barChart) {
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            barChart.querySelectorAll(".bar-fill").forEach((bar) => {
              bar.classList.add("animate");
            });
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    barObserver.observe(barChart);
  }
}

// Init on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAnimations);
} else {
  initAnimations();
}

// Expose toggleCard globally for onclick handlers
(window as any).toggleCard = toggleCard;
