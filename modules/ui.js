/* export function loadWand() {
  document.addEventListener('click', function (e) {
    const star = document.createElement('div');
    star.className = 'star';
    star.textContent = '✨';
    star.style.left = `${e.clientX}px`;
    star.style.top = `${e.clientY}px`;

    document.body.appendChild(star);

    setTimeout(() => {
      star.remove();
    }, 600);
  });
} */

export function loadWand() {
  document.addEventListener('click', function (e) {
    const colors = [
      '#ff4d4d',
      '#ffd11a',
      '#4dff4d',
      '#4dd2ff',
      '#bf80ff',
      '#ff66cc',
    ];
    const emojis = ['✨', '★', '✦', '✧', '✪', '✩']; // fun mix, or just stick to ✨

    for (let i = 0; i < 8; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      star.style.color = colors[Math.floor(Math.random() * colors.length)];
      star.style.left = `${e.clientX}px`;
      star.style.top = `${e.clientY}px`;

      // Random offset to make it feel more "confetti-like"
      const xOffset = (Math.random() - 0.5) * 200 + 'px';
      const yOffset = (Math.random() - 0.5) * 300 + 'px';
      star.style.setProperty('--x', xOffset);
      star.style.setProperty('--y', yOffset);

      document.body.appendChild(star);

      setTimeout(() => star.remove(), 1000);
    }
  });
}
