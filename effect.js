document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.Loader');
  const textSpans = document.querySelectorAll('.text span');

  const config = {
    letterSpeed: 60, // milliseconds per letter
    blurDuration: 800, // duration of blur animation in ms
    blurStartDelay: 0, // will be calculated
    loaderSpinDelay: 0, // will be calculated
    loaderSpeed: 1000,
    hoverSpeed: 10,
    colorChangeSpeed: 800
  };

  // Apply typewriter delays
  textSpans.forEach((span, index) => {
    const delay = index * config.letterSpeed;
    span.style.animationDelay = `${delay}ms`;
  });

  // Calculate total typewriter time
  const totalTypingTime = textSpans.length * config.letterSpeed;

// 👇 Wait 2s after typing before loader starts
  const waitAfterTyping = 2000;

  config.loaderSpinDelay = totalTypingTime + waitAfterTyping;

// 👇 Start blur 1.5s after loader starts
  config.blurStartDelay = config.loaderSpinDelay -700;


  // Set blur delay dynamically
  document.documentElement.style.setProperty('--blur-delay', `${config.blurStartDelay}ms`);


  // Activate loader
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, config.loaderSpinDelay);

  // Color cycling
  const hslToHex = (h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const getThreeDistinctColors = () => {
    const goldenRatio = 0.618033988749895;
    let hue = Math.random();
    const colors = [];

    for (let i = 0; i < 3; i++) {
      hue = (hue + goldenRatio) % 1;
      const hueInDegrees = Math.floor(hue * 360);
      const saturation = 70 + Math.random() * 30;
      const lightness = 45 + Math.random() * 10;
      colors.push(hslToHex(hueInDegrees, saturation, lightness));
    }

    return colors;
  };

  const setLoaderColors = () => {
    const [color1, color2, color3] = getThreeDistinctColors();
    document.documentElement.style.setProperty('--loader-color-1', color1);
    document.documentElement.style.setProperty('--loader-color-2', color2);
    document.documentElement.style.setProperty('--loader-color-3', color3);
  };

  setTimeout(() => {
    document.body.classList.add('loaded');
    loader.classList.add('animate'); // <- START loader animation
  }, config.loaderSpinDelay);

  document.documentElement.style.setProperty('--animation-speed', `${config.loaderSpeed}ms`);

  loader.addEventListener('mouseenter', () => {
    if (document.body.classList.contains('loaded')) {
      document.documentElement.style.setProperty('--animation-speed', `${config.hoverSpeed}ms`);
    }
  });

  loader.addEventListener('mouseleave', () => {
    if (document.body.classList.contains('loaded')) {
      document.documentElement.style.setProperty('--animation-speed', `${config.loaderSpeed}ms`);
    }
  });
});
