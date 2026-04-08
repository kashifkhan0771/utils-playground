import { loadWasm, toggleCard } from "./main.js";

// Declare Go WASM functions
declare function goRemoveDuplicateStr(input: string): string;
declare function goRemoveDuplicateInt(input: string): string;

// ── Helpers ──

function $(id: string): HTMLInputElement {
  return document.getElementById(id) as HTMLInputElement;
}

function setOutput(id: string, value: string): void {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = value;
    // Flash animation on new output
    el.classList.remove("output-flash");
    el.offsetHeight; // force reflow
    el.classList.add("output-flash");
  }
}

let ready = false;

function checkWasm(): boolean {
  if (!ready) {
    alert("WASM is still loading, please wait...");
    return false;
  }
  return true;
}

// ── Handlers ──

function runRemoveDuplicateStr(): void {
  if (!checkWasm()) return;
  setOutput("dup-str-output", goRemoveDuplicateStr($("dup-str-input").value));
}

function runRemoveDuplicateInt(): void {
  if (!checkWasm()) return;
  setOutput("dup-int-output", goRemoveDuplicateInt($("dup-int-input").value));
}

// ── Expose to HTML ──

Object.assign(window, {
  toggleCard,
  runRemoveDuplicateStr,
  runRemoveDuplicateInt,
});

// ── Init ──

loadWasm()
  .then(() => {
    ready = true;
    console.log("WASM loaded");
  })
  .catch((err) => console.error("Failed to load WASM:", err));
