class BookLoader {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // Responsivo
        this.resizeCanvas();

        // Livro
        this.bookWidth = 80;
        this.bookHeight = 110;
        this.pageCount = 6;
        this.progress = 0;
        this.animationSpeed = 0.005;

        this.colors = {
            cover: '#8B4513',
            pages: '#FFF8E7',
            text: '#5D4037',
            shadow: 'rgba(0, 0, 0, 0.2)',
            spine: '#6D4C41'
        };

        window.addEventListener('resize', () => this.resizeCanvas());
        this.init();
    }

    resizeCanvas() {
        this.canvas.width = 160;
        this.canvas.height = 180;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    drawPageTurn(centerX, centerY, i, pageProgress) {
        const ctx = this.ctx;

        const width = this.bookWidth / 2;
        const height = this.bookHeight;
        const angle = Math.PI * pageProgress;

        const pageFold = Math.sin(angle) * width;
        const pageDepth = Math.cos(angle) * 8;

        ctx.save();
        ctx.translate(centerX, centerY - height / 2);

        // Simula dobra da página
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(pageFold, 0);
        ctx.lineTo(pageFold, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        ctx.fillStyle = this.colors.pages;
        ctx.fill();

        // Sombra na borda
        const gradient = ctx.createLinearGradient(0, 0, pageFold, 0);
        gradient.addColorStop(0, 'rgba(0,0,0,0.05)');
        gradient.addColorStop(1, 'rgba(0,0,0,0.15)');
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.restore();
    }

    drawBook() {
        const ctx = this.ctx;
        const centerX = this.width / 2;
        const centerY = this.height / 2;

        ctx.clearRect(0, 0, this.width, this.height);

        // Sombra do livro
        ctx.shadowColor = this.colors.shadow;
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;

        // Capa
        ctx.fillStyle = this.colors.cover;
        ctx.beginPath();
        ctx.roundRect(centerX - this.bookWidth / 2, centerY - this.bookHeight / 2, this.bookWidth, this.bookHeight, 12);
        ctx.fill();

        // Coluna
        ctx.fillStyle = this.colors.spine;
        ctx.beginPath();
        ctx.roundRect(centerX - this.bookWidth / 2, centerY - this.bookHeight / 2, 10, this.bookHeight, 8);
        ctx.fill();

        // Reset de sombra para páginas
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Páginas com efeito de virada
        for (let i = 0; i < this.pageCount; i++) {
            const pageProgress = (this.progress - i * 0.12) * 5;
            if (pageProgress > 0 && pageProgress <= 1) {
                this.drawPageTurn(centerX, centerY, i, pageProgress);
            }
        }

        // Texto
        ctx.fillStyle = this.colors.text;
        ctx.font = '14px Georgia';
        ctx.textAlign = 'center';
        ctx.fillText('Carregando...', centerX, centerY + this.bookHeight / 2 + 25);
    }

    animate() {
        this.drawBook();
        this.progress += this.animationSpeed;
        if (this.progress >= 1 + (this.pageCount * 0.15)) {
            this.progress = 0;
        }
        requestAnimationFrame(() => this.animate());
    }

    init() {
        this.animate();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BookLoader('bookCanvas');
});