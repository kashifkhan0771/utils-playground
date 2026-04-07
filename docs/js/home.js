import "./main.js";
// ── CLI typing animation ──
const COMMANDS = [
    {
        cmd: "go get github.com/kashifkhan0771/utils",
        output: 'go: added github.com/kashifkhan0771/utils v1.30.0',
    },
    {
        cmd: 'echo $(go list ./... | wc -l) " packages ready"',
        output: "12 packages ready",
    },
    {
        cmd: "go test ./... -count=1",
        output: "ok  \tgithub.com/kashifkhan0771/utils/strings\t0.003s\nok  \tgithub.com/kashifkhan0771/utils/math\t0.002s\nPASS",
    },
];
let currentCmd = 0;
async function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}
async function typeText(el, text, speed) {
    el.textContent = "";
    for (const char of text) {
        el.textContent += char;
        await sleep(speed);
    }
}
async function runAnimation() {
    const cmdEl = document.getElementById("typed-cmd");
    const outputEl = document.getElementById("terminal-output");
    const cursor = document.querySelector(".terminal-cursor");
    while (true) {
        const { cmd, output } = COMMANDS[currentCmd % COMMANDS.length];
        // Clear previous
        cmdEl.textContent = "";
        outputEl.textContent = "";
        outputEl.style.opacity = "0";
        cursor.style.opacity = "1";
        // Type the command
        await sleep(600);
        await typeText(cmdEl, cmd, 35);
        // Pause, then show output
        await sleep(400);
        cursor.style.opacity = "0";
        outputEl.textContent = output;
        outputEl.style.opacity = "1";
        // Wait before next command
        await sleep(3000);
        currentCmd++;
    }
}
// Start when visible
const terminal = document.querySelector(".terminal-section");
if (terminal) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            observer.disconnect();
            runAnimation();
        }
    }, { threshold: 0.3 });
    observer.observe(terminal);
}
