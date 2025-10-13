const links = document.querySelectorAll('.menu-link');
const sections = [...document.querySelectorAll('section')];
const toggle = document.getElementById('navToggle');
const sidebar = document.getElementById('sidebar');

// active link on scroll
const setActive = () => {
  const y = window.scrollY + 120;
  let current = 'home';
  for (const s of sections) {
    if (y >= s.offsetTop) current = s.id;
  }
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
};
window.addEventListener('scroll', setActive);
setActive();

// smooth scroll (native behavior with CSS; fallback here)
links.forEach(a => a.addEventListener('click', e => {
  const target = document.querySelector(a.getAttribute('href'));
  if (target) {
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 20, behavior: 'smooth' });
  }
}));

// collapse/expand sidebar on small screens
toggle.addEventListener('click', () => {
  const collapsed = sidebar.classList.toggle('collapsed');
  if (collapsed) {
    sidebar.style.width = '78px';
    document.querySelector('.content').style.marginLeft = '78px';
  } else {
    sidebar.style.width = '260px';
    document.querySelector('.content').style.marginLeft = '260px';
  }
});


