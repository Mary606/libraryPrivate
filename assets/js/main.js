// Função para inicializar a página
function initPage() {
    // Aqui você pode adicionar outras inicializações necessárias
    console.log('Página inicializada');
}

// Inicializa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initPage);


const scrollBtn = document.getElementById("scrollTopBtn");
window.onscroll = () => {
  scrollBtn.style.display = (window.scrollY > 300) ? "block" : "none";
};
scrollBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  