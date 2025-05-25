document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const icon = toggleBtn.querySelector("i");
  
  // Verifica se há um tema salvo
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.classList.add(savedTheme);
    updateIcon(savedTheme === 'dark-theme');
  }

  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark-theme' : '');
    updateIcon(isDark);
  });

  function updateIcon(isDark) {
    // Remove todas as classes de ícone
    icon.classList.remove('fa-sun', 'fa-moon', 'fa-regular', 'fa-solid');
    
    // Adiciona as classes corretas
    icon.classList.add('fa-regular');
    icon.classList.add(isDark ? 'fa-moon' : 'fa-sun');
  }

  // Efeito hover
  toggleBtn.addEventListener("mouseenter", () => {
    const isDark = document.body.classList.contains('dark-theme');
    icon.classList.remove(isDark ? 'fa-moon' : 'fa-sun');
    icon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
  });

  toggleBtn.addEventListener("mouseleave", () => {
    const isDark = document.body.classList.contains('dark-theme');
    icon.classList.remove(isDark ? 'fa-sun' : 'fa-moon');
    icon.classList.add(isDark ? 'fa-moon' : 'fa-sun');
  });
});

