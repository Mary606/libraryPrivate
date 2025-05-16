document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const icon = toggleBtn.querySelector("i");

  toggleBtn.addEventListener("mouseenter", () => {
    icon.classList.replace("fa-sun", "fa-moon");
  });

  toggleBtn.addEventListener("mouseleave", () => {
    icon.classList.replace("fa-moon", "fa-sun");
  });
});
