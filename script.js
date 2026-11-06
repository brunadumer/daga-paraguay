/**
 * =====================================================
 * DAGA BEBIDAS - VERSÃO PARAGUAI (ESPANHOL)
 * Script Principal
 * =====================================================
 *
 * ÍNDICE:
 * 1. Aviso de Idade
 * 2. Lista de Produtos (EDITÁVEL)
 * 3. Montagem das Vitrines
 * 4. Filtro de Categorias
 * 5. Setas dos Carrosséis
 * 6. Menu Mobile
 * 7. Header Scroll Effect
 * 8. Links do WhatsApp com mensagem em espanhol
 *
 * Esta versão não mostra preços (o preço no Paraguai depende
 * da importação e da distribuição). Cada card abre o WhatsApp
 * já com o nome do produto na mensagem.
 * =====================================================
 */

/* =====================================================
   2. LISTA DE PRODUTOS
   =====================================================
   EDITÁVEL: nome e descrição em espanhol, categoria
   (cachaca, licor ou kit), selo opcional e foto.
   "listas" diz em quais vitrines ele aparece:
   - premium: "Cachaças nobles y premium"
   - maisvendidos: "Los más vendidos en Brasil"
   Todos aparecem em "Nuestros productos".
*/

const IMG = 'https://assets.sistemawbuy.com.br/arquivos/829e6bff907fc6de7a54a7629c9eeafe/produtos/';

// EDITÁVEL: Número do WhatsApp comercial (com código do país, só números)
const WHATSAPP = '5541992003693';

const produtos = [
    { nome: 'Jambeijo - Licor del Beso 500 ml', tipo: 'Licor fino con jambú · 22% vol', categoria: 'licor', selo: 'Producto estrella', foto: '68dff2cdbae5f/jambeijo-500-site-sem-fundo-6ad65d2819f9d_mini.jpeg', listas: ['maisvendidos'] },
    { nome: 'Cachaça Jequitibá 750 ml', tipo: 'Añejada en jequitibá · 40% vol', categoria: 'cachaca', selo: 'Premiada', foto: '68feb06fc4356/14-2-68febe8052cea_mini.jpg', listas: ['premium'] },
    { nome: 'Cachaça Single Barrel Roble Americano 750 ml', tipo: 'Barril único · 40% vol', categoria: 'cachaca', selo: 'Premium', foto: '690f56d878019/single-barrel-site-69176ee9752cc_mini.jpg', listas: ['premium'] },
    { nome: 'Licor de Leche Condensada 500 ml', tipo: 'Línea Castro-PR · 20% vol', categoria: 'licor', foto: '68fd50a02eabe/sem-nome-1600-x-1200-px-1600-x-1200-px-5-68fd6f0438fd9_mini.jpg', listas: ['maisvendidos'] },
    { nome: 'Cachaça Blend Reserva Porto 750 ml', tipo: 'Blend reserva · 40% vol', categoria: 'cachaca', selo: 'Reserva', foto: '690f56d219a4a/18-69177a706367a_mini.jpg', listas: ['premium'] },
    { nome: 'Licor Fire 750 ml', tipo: 'Licor fino de canela · 27,2% vol', categoria: 'licor', selo: 'Novedad', foto: '68dd68ef79e3c/20260313_094433-1-jpg-69bdc538f370a_mini.jpg', listas: ['maisvendidos'] },
    { nome: 'Cachaça Laurel Canela 750 ml', tipo: 'Añejada en laurel canela · 40% vol', categoria: 'cachaca', foto: '690f56d654517/louro-canela-6917721d75844_mini.jpg', listas: ['premium'] },
    { nome: 'Kit MDF con 5 cachaças de 60 ml', tipo: 'Maderas brasileñas', categoria: 'kit', selo: 'Regalo', foto: '68fd7a19efd13/12-2-photoroom-jegj33wn8i-68fff3267ba6a_mini.jpg', listas: ['maisvendidos'] },
    { nome: 'Licor de Jabuticaba 750 ml', tipo: 'Fruta típica brasileña · 16% vol', categoria: 'licor', foto: '68dd68f242490/sem-nome-1600-x-1200-px-1600-x-1200-px-18-68fdad8b1ae50_mini.jpg', listas: ['maisvendidos'] },
    { nome: 'Cachaça Amburana 750 ml', tipo: 'Añejada en amburana · 40% vol', categoria: 'cachaca', foto: '68dd494753ba4/sem-ti-tulo-14-68feaebfb34c4_mini.jpg', listas: ['premium'] },
    { nome: 'Cachaça Roble 750 ml', tipo: 'Añejada en roble · 40% vol', categoria: 'cachaca', foto: '690f56e16dd2b/carvalho-site-69176d48c0ec3_mini.jpg', listas: ['premium'] },
    { nome: 'Cachaça Clásica 750 ml', tipo: 'Ideal para caipiriña y coctelería · 40% vol', categoria: 'cachaca', selo: 'Coctelería', foto: '690f56ebf2946/cla-ssica-6966a0e7764fe_mini.jpg', listas: [] },
    { nome: 'Licor de Limón y Miel 750 ml', tipo: 'Licor fino · 16% vol', categoria: 'licor', foto: '68dd68d9e25ba/08-photoroom-fjgfr7zo56-68fea700599c5_mini.jpg', listas: [] },
    { nome: 'Licor de Mburucuyá 750 ml', tipo: 'Maracuyá · licor fino · 16% vol', categoria: 'licor', foto: '68dd68d762344/maracuja-750-68fea8a7b5bee_mini.jpg', listas: [] },
    { nome: 'Licor de Banana 750 ml', tipo: 'Licor fino · 25,2% vol', categoria: 'licor', foto: '68dd68ca7a22d/banana-68fea9693e181_mini.jpg', listas: [] },
    { nome: 'Kit MDF con 5 licores de 60 ml', tipo: 'Sabores surtidos', categoria: 'kit', selo: 'Regalo', foto: '690f542cd5605/prancheta-690f7408463fc_mini.jpg', listas: [] },
    { nome: 'Kit MDF con 5 licores de 160 ml', tipo: 'Sabores surtidos', categoria: 'kit', foto: '68f58d5db2615/kit-site-6920942d5bb25_mini.jpg', listas: [] },
    { nome: 'Maleta degustación kraft con 5 licores de 60 ml', tipo: 'Sabores surtidos', categoria: 'kit', foto: '68fd79a2b8ce2/39fa5699fbef97ccc34e61af5e01b9ce-q80spkqw2a-68fec0cb74219_mini.jpg', listas: [] },
    { nome: 'Cachaça Jequitibá 375 ml', tipo: 'Añejada en jequitibá · 40% vol', categoria: 'cachaca', selo: 'Premiada', foto: '68feb06dccae4/17-68febf4c16b01_mini.jpg', listas: [] },
    { nome: 'Cachaça Roble 375 ml', tipo: 'Añejada en roble · 40% vol', categoria: 'cachaca', foto: '690f56da7b78a/carvalho-375-69176e140503c_mini.jpg', listas: [] },
    { nome: 'Cachaça Laurel Canela 160 ml', tipo: 'Añejada en laurel canela · 40% vol', categoria: 'cachaca', foto: '68f58ce724009/louro-canela-68f8f5ea25b80_mini.jpg', listas: [] }
];

/* =====================================================
   8. MENSAGENS DO WHATSAPP (EDITÁVEL)
   ===================================================== */

const mensagens = {
    comercial: '¡Hola! Vi el sitio de Daga Bebidas y me gustaría recibir información comercial para Paraguay.',
    distribuidor: '¡Hola! Me interesa ser distribuidor de Daga Bebidas en Paraguay. ¿Podemos conversar?',
    catalogo: '¡Hola! Me gustaría recibir el catálogo completo y las condiciones comerciales de Daga Bebidas para Paraguay.',
    jambeijo: '¡Hola! Me gustaría solicitar muestras e información del Jambeijo (Licor del Beso).',
    produto: '¡Hola! Me gustaría recibir información comercial sobre: '
};

function linkWhatsapp(texto) {
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
}

document.addEventListener('DOMContentLoaded', function() {

    /* =====================================================
       1. AVISO DE IDADE
       =====================================================
       Pergunta se a pessoa tem a idade legal na primeira
       visita e lembra a resposta no navegador.
    */

    const idadeAviso = document.getElementById('idadeAviso');
    let maiorDeIdade = false;

    try {
        maiorDeIdade = localStorage.getItem('daga-py-edad') === 'si';
    } catch (e) {}

    if (!maiorDeIdade) {
        idadeAviso.hidden = false;
        document.body.classList.add('travado');
    }

    document.getElementById('idadeSim').addEventListener('click', function() {
        try {
            localStorage.setItem('daga-py-edad', 'si');
        } catch (e) {}
        idadeAviso.hidden = true;
        document.body.classList.remove('travado');
    });

    document.getElementById('idadeNao').addEventListener('click', function() {
        document.getElementById('idadeRecusa').hidden = false;
    });

    /* =====================================================
       3. MONTAGEM DAS VITRINES
       =====================================================
       Cada card abre o WhatsApp com o nome do produto.
    */

    function criarCard(produto) {
        const card = document.createElement('a');
        card.className = 'produto-card';
        card.href = linkWhatsapp(mensagens.produto + produto.nome);
        card.target = '_blank';
        card.rel = 'noopener';
        card.dataset.categoria = produto.categoria;

        card.innerHTML = `
            <div class="produto-imagem">
                ${produto.selo ? `<span class="produto-tag">${produto.selo}</span>` : ''}
                <img src="${IMG + produto.foto}" alt="${produto.nome}" loading="lazy">
            </div>
            <h3>${produto.nome}</h3>
            <p class="produto-tipo">${produto.tipo}</p>
            <span class="produto-consultar">Consultar</span>
        `;
        return card;
    }

    document.querySelectorAll('[data-lista]').forEach(trilho => {
        const lista = trilho.dataset.lista;
        produtos
            .filter(p => lista === 'todas' || p.listas.includes(lista))
            .forEach(p => trilho.appendChild(criarCard(p)));
    });

    /* =====================================================
       5. SETAS DOS CARROSSÉIS
       ===================================================== */

    const carrosseis = document.querySelectorAll('[data-carrossel]');

    function atualizarSetas(carrossel) {
        const trilho = carrossel.querySelector('.carrossel-trilho');
        const fim = trilho.scrollWidth - trilho.clientWidth - 4;
        carrossel.querySelector('.anterior').disabled = trilho.scrollLeft <= 4;
        carrossel.querySelector('.proxima').disabled = trilho.scrollLeft >= fim;
    }

    // Distância de uma "página": quantos cards inteiros cabem na tela
    function passo(trilho) {
        const card = trilho.querySelector('.produto-card:not([hidden])');
        if (!card) return trilho.clientWidth;
        const largura = card.getBoundingClientRect().width + parseFloat(getComputedStyle(trilho).columnGap);
        return Math.max(1, Math.floor((trilho.clientWidth + 1) / largura)) * largura;
    }

    carrosseis.forEach(carrossel => {
        const trilho = carrossel.querySelector('.carrossel-trilho');

        carrossel.querySelector('.anterior').addEventListener('click', () => {
            trilho.scrollBy({ left: -passo(trilho), behavior: 'smooth' });
        });

        carrossel.querySelector('.proxima').addEventListener('click', () => {
            trilho.scrollBy({ left: passo(trilho), behavior: 'smooth' });
        });

        trilho.addEventListener('scroll', () => atualizarSetas(carrossel), { passive: true });
        atualizarSetas(carrossel);
    });

    window.addEventListener('resize', () => carrosseis.forEach(atualizarSetas));

    /* =====================================================
       4. FILTRO DE CATEGORIAS
       ===================================================== */

    const filtros = document.querySelectorAll('.filtro');
    const vitrineProdutos = document.querySelector('#productos');

    filtros.forEach(botao => {
        botao.addEventListener('click', function() {
            filtros.forEach(b => {
                b.classList.toggle('ativo', b === botao);
                b.setAttribute('aria-selected', b === botao);
            });

            const filtro = botao.dataset.filtro;
            const trilho = vitrineProdutos.querySelector('.carrossel-trilho');

            trilho.querySelectorAll('.produto-card').forEach(card => {
                card.hidden = filtro !== 'todas' && card.dataset.categoria !== filtro;
            });

            trilho.scrollLeft = 0;
            atualizarSetas(vitrineProdutos.querySelector('[data-carrossel]'));
        });
    });

    /* =====================================================
       6. MENU MOBILE (HAMBÚRGUER)
       ===================================================== */

    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    /* =====================================================
       7. HEADER SCROLL EFFECT
       ===================================================== */

    const header = document.getElementById('header');

    function atualizarHeader() {
        header.classList.toggle('scrolled', window.scrollY > 40);
    }

    window.addEventListener('scroll', atualizarHeader, { passive: true });
    atualizarHeader();

    /* =====================================================
       8. LINKS DO WHATSAPP
       =====================================================
       Coloca a mensagem em espanhol em todos os links
       do WhatsApp (escolhida pelo data-msg de cada link).
    */

    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        if (link.getAttribute('href').includes('text=')) return;
        const texto = mensagens[link.dataset.msg] || mensagens.comercial;
        link.setAttribute('href', linkWhatsapp(texto));
    });

});
