/* DAGA BEBIDAS - PAGINA PARAGUAY NA WBUY (script)
   A lista de produtos vem do script.js do site (o gerar-wbuy.py copia). */
(function() {
    'use strict';

    const IMG = 'https://assets.sistemawbuy.com.br/arquivos/829e6bff907fc6de7a54a7629c9eeafe/produtos/';
    const WHATSAPP = '5541992003693';

    /*PRODUTOS*/

    const mensagens = {
        comercial: '¡Hola! Vi el sitio de Daga Bebidas y me gustaría recibir información comercial para Paraguay.',
        socio: '¡Hola! Me interesa ser socio comercial de Daga Bebidas en Paraguay. ¿Podemos conversar?',
        produto: '¡Hola! Me gustaría recibir información comercial sobre: '
    };

    function linkWhatsapp(texto) {
        return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto);
    }

    function iniciar() {
        const pagina = document.getElementById('daga-py');
        if (!pagina || pagina.dataset.pronto) return;
        pagina.dataset.pronto = 'sim';

        // 1. Largura total da tela (a loja coloca o conteúdo numa coluna)
        function esticar() {
            pagina.style.marginLeft = '0px';
            pagina.style.width = document.documentElement.clientWidth + 'px';
            pagina.style.marginLeft = (-pagina.getBoundingClientRect().left) + 'px';
        }
        esticar();
        window.addEventListener('resize', esticar);

        // 2. Cards do portafolio
        const trilho = pagina.querySelector('[data-lista="todas"]');
        produtos.forEach(produto => {
            const card = document.createElement('a');
            card.className = 'py-produto-card';
            card.href = linkWhatsapp(mensagens.produto + produto.nome);
            card.target = '_blank';
            card.rel = 'noopener';
            card.dataset.categoria = produto.categoria;
            card.innerHTML =
                '<div class="py-produto-imagem">' +
                (produto.selo ? '<span class="py-produto-tag">' + produto.selo + '</span>' : '') +
                '<img src="' + IMG + produto.foto + '" alt="' + produto.nome + '" loading="lazy"></div>' +
                '<h3>' + produto.nome + '</h3>' +
                '<p class="py-produto-tipo">' + produto.tipo + '</p>' +
                '<span class="py-produto-consultar">Consultar</span>';
            trilho.appendChild(card);
        });

        // 3. Setas do carrossel
        const carrossel = pagina.querySelector('[data-carrossel]');
        const anterior = carrossel.querySelector('.py-anterior');
        const proxima = carrossel.querySelector('.py-proxima');

        function atualizarSetas() {
            const fim = trilho.scrollWidth - trilho.clientWidth - 4;
            anterior.disabled = trilho.scrollLeft <= 4;
            proxima.disabled = trilho.scrollLeft >= fim;
        }

        function passo() {
            const card = trilho.querySelector('.py-produto-card:not([hidden])');
            if (!card) return trilho.clientWidth;
            const largura = card.getBoundingClientRect().width + parseFloat(getComputedStyle(trilho).columnGap);
            return Math.max(1, Math.floor((trilho.clientWidth + 1) / largura)) * largura;
        }

        anterior.addEventListener('click', () => trilho.scrollBy({ left: -passo(), behavior: 'smooth' }));
        proxima.addEventListener('click', () => trilho.scrollBy({ left: passo(), behavior: 'smooth' }));
        trilho.addEventListener('scroll', atualizarSetas, { passive: true });
        window.addEventListener('resize', atualizarSetas);
        atualizarSetas();

        // 4. Filtro de categorias
        const botoesFiltro = pagina.querySelectorAll('.py-filtro');
        botoesFiltro.forEach(botao => {
            botao.addEventListener('click', () => {
                botoesFiltro.forEach(b => {
                    b.classList.toggle('py-ativo', b === botao);
                    b.setAttribute('aria-selected', b === botao);
                });
                const filtro = botao.dataset.filtro;
                trilho.querySelectorAll('.py-produto-card').forEach(card => {
                    card.hidden = filtro !== 'todas' && card.dataset.categoria !== filtro;
                });
                trilho.scrollLeft = 0;
                atualizarSetas();
            });
        });

        // 5. Botões "Descubrí..." levam ao portafolio já filtrado
        pagina.querySelectorAll('[data-ir-filtro]').forEach(link => {
            link.addEventListener('click', () => {
                const botao = pagina.querySelector('.py-filtro[data-filtro="' + link.dataset.irFiltro + '"]');
                if (botao) botao.click();
            });
        });

        // 6. Rolagem suave nos links internos (desconta o topo fixo da loja)
        pagina.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', e => {
                const alvo = document.getElementById(link.getAttribute('href').slice(1));
                if (!alvo) return;
                e.preventDefault();
                window.scrollTo({ top: alvo.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
            });
        });

        // 7. Links do WhatsApp com mensagem em espanhol
        pagina.querySelectorAll('a[href*="wa.me"]').forEach(link => {
            if (link.getAttribute('href').includes('text=')) return;
            link.href = linkWhatsapp(mensagens[link.dataset.msg] || mensagens.comercial);
        });

        // 8. Formulário: abre o WhatsApp com os dados preenchidos
        const form = pagina.querySelector('#formContacto');
        const erro = pagina.querySelector('#formErro');
        form.addEventListener('submit', e => {
            e.preventDefault();
            const d = Object.fromEntries(new FormData(form));
            const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim());
            if (!d.nombre.trim() || !emailValido) {
                erro.hidden = false;
                return;
            }
            erro.hidden = true;
            const linhas = [
                '¡Hola! Quiero hacer una consulta comercial.',
                '',
                'Nombre: ' + d.nombre.trim(),
                d.empresa.trim() ? 'Empresa: ' + d.empresa.trim() : null,
                d.ciudad.trim() ? 'País / Ciudad: ' + d.ciudad.trim() : null,
                'Correo: ' + d.email.trim(),
                d.whatsapp.trim() ? 'WhatsApp: ' + d.whatsapp.trim() : null,
                'Área de interés: ' + d.interes,
                d.mensaje.trim() ? 'Mensaje: ' + d.mensaje.trim() : null
            ].filter(l => l !== null);
            window.open(linkWhatsapp(linhas.join('\n')), '_blank', 'noopener');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciar);
    } else {
        iniciar();
    }
})();
