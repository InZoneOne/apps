const instruction = document.querySelector('.instruction');
const mandala = document.querySelector('.mandala');
const progressRing = document.querySelector('.progress-ring');
const TOTAL_DURATION = 120000; // 2 minutes in milliseconds
let startTime;
let progressAnimation;

const phases = [
    { text: 'Inhale', duration: 4000, state: 'expanding' },
    { text: 'Hold', duration: 4000, state: 'expanded' },
    { text: 'Exhale', duration: 4000, state: 'contracting' },
    { text: 'Hold', duration: 4000, state: 'contracted' }
];

let currentPhase = 3;
let isRunning = false;

function updateProgress() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / TOTAL_DURATION, 1);
    const progressBar = document.querySelector('.progress-bar-fill');
    const width = (1 - progress) * 100;  // Start from 100% and decrease
    const leftPosition = progress * 50;   // Move in from both sides
    
    progressBar.style.width = `${width}%`;
    progressBar.style.left = `${leftPosition}%`;

    if (elapsed < TOTAL_DURATION) {
        progressAnimation = requestAnimationFrame(updateProgress);
    } else {
        stopBreathing();
    }
}

function stopBreathing() {
    isRunning = false;
    cancelAnimationFrame(progressAnimation);
    document.getElementById('startButton').style.display = 'block';
    mandala.className = 'mandala contracted';
    instruction.textContent = 'Press Start';
    
    // Reset progress bar
    const progressBar = document.querySelector('.progress-bar-fill');
    progressBar.style.width = '100%';
    progressBar.style.left = '0';
}

function startBreathing() {
    if (isRunning) return;
    isRunning = true;
    startTime = Date.now();
    document.getElementById('startButton').style.display = 'none';
    currentPhase = 0;
    updateInstruction();
    updateProgress();
}

function updateInstruction() {
    if (!isRunning) return;
    
    instruction.textContent = phases[currentPhase].text;
    mandala.className = `mandala ${phases[currentPhase].state}`;
    
    setTimeout(() => {
        if (isRunning) {
            currentPhase = (currentPhase + 1) % phases.length;
            updateInstruction();
        }
    }, phases[currentPhase].duration);
}

// Initial state
mandala.className = 'mandala contracted';
instruction.textContent = 'Press Start';