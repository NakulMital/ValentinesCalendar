document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initLockingSystem();
    initCountdown();
});

function initLockingSystem() {
    const dayCards = document.querySelectorAll('.day-card');
    const today = new Date();

    // For debugging/testing, you can manually set a date here like:
    // const today = new Date('2026-02-12T00:00:00');

    dayCards.forEach(card => {
        if (config.devMode) {
            unlockCard(card);
            return;
        }

        const dateStr = card.getAttribute('data-date');
        const targetDate = new Date(dateStr + 'T00:00:00'); // Midnight on that day

        // Check if today is on or after the target date
        if (today >= targetDate) {
            unlockCard(card);
        } else {
            lockCard(card);
        }
    });
}

function unlockCard(card) {
    card.classList.remove('locked');
    card.style.pointerEvents = 'auto';
    const lockOverlay = card.querySelector('.lock-overlay');
    if (lockOverlay) lockOverlay.style.display = 'none';
}

function lockCard(card) {
    card.classList.add('locked');
    card.style.pointerEvents = 'none';
    card.addEventListener('click', (e) => e.preventDefault());
}

function initCountdown() {
    const countdownEl = document.getElementById('countdown');
    const valentineDate = new Date(`${config.year}-02-14T00:00:00`);

    function updateCountdown() {
        const now = new Date();
        const diff = valentineDate - now;

        if (diff <= 0) {
            countdownEl.innerText = "Happy Valentine's Day! ❤️";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        countdownEl.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}
