const links = document.querySelectorAll('.menu-link');
const sections = [...document.querySelectorAll('section')];
const toggle = document.getElementById('navToggle');
const sidebar = document.getElementById('sidebar');
const backdrop = document.getElementById('backdrop');

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
  const content = document.querySelector('.content');
  
  if (collapsed) {
    sidebar.style.width = '78px';
    content.style.marginLeft = '78px';
    // Hide text labels
    sidebar.querySelectorAll('.menu-link span, .brand span').forEach(span => {
      span.style.display = 'none';
    });
    // Center icons
    sidebar.querySelectorAll('.menu-link').forEach(link => {
      link.style.justifyContent = 'center';
      link.style.padding = '10px';
    });
    sidebar.querySelector('.brand').style.justifyContent = 'center';
    // Hide backdrop
    backdrop.classList.remove('active');
  } else {
    sidebar.style.width = '260px';
    content.style.marginLeft = '260px';
    // Show text labels
    sidebar.querySelectorAll('.menu-link span, .brand span').forEach(span => {
      span.style.display = 'block';
    });
    // Reset menu link styles
    sidebar.querySelectorAll('.menu-link').forEach(link => {
      link.style.justifyContent = 'flex-start';
      link.style.padding = '10px 12px';
    });
    sidebar.querySelector('.brand').style.justifyContent = 'flex-start';
    // Show backdrop on small screens
    if (window.innerWidth <= 860) {
      backdrop.classList.add('active');
    }
  }
});

// Close sidebar when clicking on backdrop
backdrop.addEventListener('click', () => {
  if (!sidebar.classList.contains('collapsed')) {
    toggle.click();
  }
});

// Handle window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 860) {
    backdrop.classList.remove('active');
  } else if (!sidebar.classList.contains('collapsed')) {
    backdrop.classList.add('active');
  }
});


