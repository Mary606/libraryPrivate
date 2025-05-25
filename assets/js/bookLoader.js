class BookLoader {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        // Responsivo
        this.resizeCanvas();

        // Livro
        this.bookWidth = 120;
        this.bookHeight = 160;
        this.pageCount = 6;
        this.progress = 0;
        this.animationSpeed = 0.01;

        this.colors = {
            cover: '#7a5c2e',
            pages: '#fffdf6',
            text: '#4e2e0f',
            shadow: 'rgba(0, 0, 0, 0.15)',
            spine: '#5c3f1b'
        };

        window.addEventListener('resize', () => this.resizeCanvas());
        this.init();
    }

    resizeCanvas() {
        this.canvas.width = 220;
        this.canvas.height = 240;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    drawBook() {
        const ctx = this.ctx;
        const centerX = this.width / 2;
        const centerY = this.height / 2;

        ctx.clearRect(0, 0, this.width, this.height);

        // Sombra geral
        ctx.shadowColor = this.colors.shadow;
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;

        // Capa
        ctx.fillStyle = this.colors.cover;
        ctx.beginPath();
        ctx.roundRect(centerX - this.bookWidth / 2, centerY - this.bookHeight / 2, this.bookWidth, this.bookHeight, 12);
        ctx.fill();

        // Coluna do livro (efeito de profundidade)
        ctx.fillStyle = this.colors.spine;
        ctx.beginPath();
        ctx.roundRect(centerX - this.bookWidth / 2, centerY - this.bookHeight / 2, 10, this.bookHeight, 8);
        ctx.fill();

        // Reset sombras para páginas
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Páginas animadas
        for (let i = 0; i < this.pageCount; i++) {
            const pageProgress = Math.min(1, (this.progress - i * 0.15) * 6);
            if (pageProgress > 0) {
                ctx.fillStyle = this.colors.pages;
                ctx.beginPath();
                const offset = (this.bookWidth / 2) * pageProgress;
                const curve = 10 * Math.sin(Math.PI * pageProgress); // curva suave
                ctx.moveTo(centerX, centerY - this.bookHeight / 2);
                ctx.bezierCurveTo(centerX + offset / 2, centerY - this.bookHeight / 2 - curve, centerX + offset, centerY - this.bookHeight / 2, centerX + offset, centerY);
                ctx.bezierCurveTo(centerX + offset, centerY + this.bookHeight / 2, centerX + offset / 2, centerY + this.bookHeight / 2 + curve, centerX, centerY + this.bookHeight / 2);
                ctx.closePath();
                ctx.fill();
            }
        }

        // Texto "Carregando..."
        ctx.fillStyle = this.colors.text;
        ctx.font = '16px Georgia';
        ctx.textAlign = 'center';
        ctx.fillText('Carregando...', centerX, centerY + this.bookHeight / 2 + 30);
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
