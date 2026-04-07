import { loadWasm, toggleCard } from "./main.js";
// ── Helpers ──
function $(id) {
    return document.getElementById(id);
}
function setOutput(id, value) {
    const el = $(id);
    el.textContent = value;
    // Flash animation on new output
    el.classList.remove("output-flash");
    el.offsetHeight; // force reflow
    el.classList.add("output-flash");
}
let ready = false;
function checkWasm() {
    if (!ready) {
        alert("WASM is still loading, please wait...");
        return false;
    }
    return true;
}
// ── Handlers ──
function runReverse() {
    if (!checkWasm())
        return;
    setOutput("reverse-output", goReverse($("reverse-input").value));
}
function runTitle() {
    if (!checkWasm())
        return;
    setOutput("title-output", goTitle($("title-input").value));
}
function runRot13() {
    if (!checkWasm())
        return;
    setOutput("rot13-output", goRot13Encode($("rot13-input").value));
}
function runCaesarEncrypt() {
    if (!checkWasm())
        return;
    const shift = parseInt($("caesar-shift").value, 10) || 3;
    setOutput("caesar-output", goCaesarEncrypt($("caesar-input").value, shift));
}
function runCaesarDecrypt() {
    if (!checkWasm())
        return;
    const shift = parseInt($("caesar-shift").value, 10) || 3;
    setOutput("caesar-output", goCaesarDecrypt($("caesar-input").value, shift));
}
function runTruncate() {
    if (!checkWasm())
        return;
    const length = parseInt($("truncate-length").value, 10) || 12;
    const omission = $("truncate-omission").value || "...";
    setOutput("truncate-output", goTruncate($("truncate-input").value, length, omission));
}
function runIsValidEmail() {
    if (!checkWasm())
        return;
    setOutput("email-output", goIsValidEmail($("email-input").value) ? "true" : "false");
}
function runRLEEncode() {
    if (!checkWasm())
        return;
    setOutput("rle-output", goRunLengthEncode($("rle-input").value));
}
function runRLEDecode() {
    if (!checkWasm())
        return;
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
