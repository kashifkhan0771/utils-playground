import { loadWasm, toggleCard } from "./main.js";

// Declare Go WASM functions
declare function goReverse(input: string): string;
declare function goTitle(input: string): string;
declare function goRot13Encode(input: string): string;
declare function goCaesarEncrypt(input: string, shift: number): string;
declare function goCaesarDecrypt(input: string, shift: number): string;
declare function goTruncate(input: string, length: number, omission: string): string;
declare function goIsValidEmail(email: string): boolean;
declare function goRunLengthEncode(input: string): string;
declare function goRunLengthDecode(input: string): string;

// ── Helpers ──

function $(id: string): HTMLInputElement {
  return document.getElementById(id) as HTMLInputElement;
}

function setOutput(id: string, value: string): void {
  const el = $(id);
  el.textContent = value;
  // Flash animation on new output
  el.classList.remove("output-flash");
  el.offsetHeight; // force reflow
  el.classList.add("output-flash");
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

function runReverse(): void {
  if (!checkWasm()) return;
  setOutput("reverse-output", goReverse($("reverse-input").value));
}

function runTitle(): void {
  if (!checkWasm()) return;
  setOutput("title-output", goTitle($("title-input").value));
}

function runRot13(): void {
  if (!checkWasm()) return;
  setOutput("rot13-output", goRot13Encode($("rot13-input").value));
}

function runCaesarEncrypt(): void {
  if (!checkWasm()) return;
  const shift = parseInt($("caesar-shift").value, 10) || 3;
  setOutput("caesar-output", goCaesarEncrypt($("caesar-input").value, shift));
}

function runCaesarDecrypt(): void {
  if (!checkWasm()) return;
  const shift = parseInt($("caesar-shift").value, 10) || 3;
  setOutput("caesar-output", goCaesarDecrypt($("caesar-input").value, shift));
}

function runTruncate(): void {
  if (!checkWasm()) return;
  const length = parseInt($("truncate-length").value, 10) || 12;
  const omission = $("truncate-omission").value || "...";
  setOutput("truncate-output", goTruncate($("truncate-input").value, length, omission));
}

function runIsValidEmail(): void {
  if (!checkWasm()) return;
  setOutput("email-output", goIsValidEmail($("email-input").value) ? "true" : "false");
}

function runRLEEncode(): void {
  if (!checkWasm()) return;
  setOutput("rle-output", goRunLengthEncode($("rle-input").value));
}

function runRLEDecode(): void {
  if (!checkWasm()) return;
  setOutput("rle-output", goRunLengthDecode($("rle-input").value));
}

// ── Expose to HTML ──

Object.assign(window, {
  toggleCard,
  runReverse,
  runTitle,
  runRot13,
  runCaesarEncrypt,
  runCaesarDecrypt,
  runTruncate,
  runIsValidEmail,
  runRLEEncode,
  runRLEDecode,
});

// ── Init ──

loadWasm()
  .then(() => {
    ready = true;
    console.log("WASM loaded");
  })
  .catch((err) => console.error("Failed to load WASM:", err));
