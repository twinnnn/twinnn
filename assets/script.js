const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

function observeReveals(container = document) {
  const revealElements = container.querySelectorAll('.reveal');

  revealElements.forEach((element) => {
    element.classList.remove('in-view');
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -70px 0px'
    });

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('in-view'));
  }
}

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  mainNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-label', 'Open menu');
    }
  });
}

document.addEventListener('click', (event) => {
  const faqButton = event.target.closest('.faq-q');
  if (!faqButton) return;

  const answer = faqButton.nextElementSibling;
  if (!answer) return;

  answer.classList.toggle('open');
  const symbol = faqButton.querySelector('span');
  if (symbol) symbol.textContent = answer.classList.contains('open') ? '−' : '+';
});

observeReveals();
