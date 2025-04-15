document.addEventListener('DOMContentLoaded', function () {
    const landingSection = document.getElementById('landing');
    const aboutSection = document.getElementById('about');
    const introText = document.querySelector('.intro-text h1');
    const learnMoreBtn = document.querySelector('.intro-text .btn');
    const innerPages = ["journey.html", "birthplace.html", "hobbies.html", "achievements.html", "skills.html"];
    const currentPath = location.pathname.split("/").pop();
    const hash = window.location.hash;
  
    if (landingSection) {
      // Landing page code
      if ((currentPath === "index.html" || currentPath === "") && hash === "#about") {
        landingSection.style.display = 'none';
        document.body.classList.remove('lock-scroll');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
        return;
      }
  
      document.body.classList.add('lock-scroll');
  
      setTimeout(function () {
        introText.classList.add('show');
        setTimeout(function () {
          learnMoreBtn.classList.add('show');
        }, 500);
      }, 300);
  
      learnMoreBtn.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.classList.remove('lock-scroll');
        landingSection.classList.add('fade-out');
  
        setTimeout(function () {
          window.location.href = "main.html";
        }, 500);
      });
  
      const blockScroll = (e) => {
        if (document.body.classList.contains('lock-scroll')) {
          e.preventDefault();
        }
      };
      window.addEventListener('wheel', blockScroll, { passive: false });
      window.addEventListener('keydown', function (e) {
        const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', ' '];
        if (keys.includes(e.key) && document.body.classList.contains('lock-scroll')) {
          e.preventDefault();
        }
      }, { passive: false });
    }
  
    // ✅ Back button behavior for inner pages
    if (innerPages.includes(currentPath)) {
      history.pushState(null, null, location.href);
      window.onpopstate = function () {
        window.location.href = "main.html";
      };
    }
  
    // ✅ Back button behavior for main.html
    if (currentPath === "main.html") {
      history.pushState(null, null, location.href);
      window.onpopstate = function () {
        window.location.href = "index.html";
      };
    }
  });
  
  // 🔹 Font cycling animation
  const fonts = [
    "'Poppins', sans-serif",
    "'Playfair Display', serif",
    "'Pacifico', cursive",
    "'Cinzel', serif",
    "'Indie Flower', cursive",
    "'Raleway', sans-serif",
    "'Lobster', cursive"
  ];
  
  let fontIndex = 0;
  const heading = document.querySelector('.intro-text h1');
  
  function animateFontChange() {
    if (!heading) return;
    heading.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    heading.style.opacity = 0;
    heading.style.transform = "translateX(50px)";
    setTimeout(() => {
      fontIndex = (fontIndex + 1) % fonts.length;
      heading.style.fontFamily = fonts[fontIndex];
      heading.style.opacity = 1;
      heading.style.transform = "translateX(0)";
    }, 500);
  }
  
  setInterval(animateFontChange, 3000);
  
  // 🔹 Helper to identify the element type semantically
  function getElementType(el) {
    if (el.tagName === 'IMG') return 'Image';
    if (el.tagName === 'A') return 'Link';
    if (el.tagName === 'BUTTON') return 'Button';
    if (el.tagName === 'INPUT') return 'Input Field';
    if (el.tagName === 'TEXTAREA') return 'Text Area';
    if (el.tagName === 'SELECT') return 'Dropdown';
    if (el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3') return 'Heading';
    if (el.tagName === 'P') return 'Paragraph/Text';
    return el.tagName;
  }
  
  // 🔹 Log page view
  window.addEventListener('load', () => {
    const timestamp = new Date().toLocaleString();
    console.log(`Timestamp: ${timestamp} | Event: PAGE_VIEW | Element: Entire Page`);
  });
  
  // 🔹 Log clicks
  document.addEventListener('click', (event) => {
    const target = event.target;
    const elementType = getElementType(target);
    const timestamp = new Date().toLocaleString();
    console.log(`Timestamp: ${timestamp} | Event: CLICK | Element: ${elementType}`);
  });
  