"""
Gera a versão da página do Paraguay para colar na wBuy (Páginas > Conteúdo).

Uso:  python wbuy/gerar-wbuy.py      (rodar dentro da pasta daga-paraguay)
Saída: wbuy/daga-paraguay-wbuy.html

O que faz:
- Pega as seções do index.html (da portada até "Conectemos").
- Coloca "py-" na frente de todas as classes e deixa o CSS valendo só dentro
  de #daga-py, para não brigar com o tema da loja.
- As fotos apontam para o site publicado no GitHub Pages.
- Troca acentos e símbolos por códigos (&#...;) porque o campo da wBuy grava
  em Latin-1.
"""
import re, os

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(AQUI)
BASE = 'https://brunadumer.github.io/daga-paraguay/'

html = open(os.path.join(RAIZ, 'index.html'), encoding='utf-8').read()
css = open(os.path.join(RAIZ, 'style.css'), encoding='utf-8').read()
js = open(os.path.join(AQUI, 'script-wbuy.js'), encoding='utf-8').read()
script_site = open(os.path.join(RAIZ, 'script.js'), encoding='utf-8').read()
lista = re.search(r'^const produtos = \[.*?^\];', script_site, flags=re.S | re.M).group(0)
js = js.replace('/*PRODUTOS*/', lista)

# ---------- HTML: da portada até o fim de "Conectemos" ----------
ini = html.index('<!-- ========== PORTADA ========== -->')
fim = html.index('<!-- ========== PIE DE PÁGINA ========== -->')
corpo = html[ini:fim].rstrip()


def prefixar_classes(m):
    nomes = m.group(1).split()
    return 'class="' + ' '.join('py-' + n for n in nomes) + '"'


corpo = re.sub(r'class="([^"]*)"', prefixar_classes, corpo)
corpo = corpo.replace('src="images/', f'src="{BASE}images/')
usadas = set()
for m in re.finditer(r'class="([^"]*)"', corpo):
    usadas.update(m.group(1).split())
# classes criadas pelo script (cards dos produtos e filtro ativo)
usadas.update('py-' + n for n in [
    'produto-card', 'produto-imagem', 'produto-tag', 'produto-tipo', 'produto-consultar', 'ativo'])

# ---------- CSS: escopo #daga-py e prefixo py- ----------
css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
css = css.replace("url('images/", f"url('{BASE}images/")


def blocos(texto):
    """Divide o CSS em (cabecalho, conteudo) respeitando chaves aninhadas."""
    i, n = 0, len(texto)
    while i < n:
        a = texto.find('{', i)
        if a < 0:
            break
        cab = texto[i:a].strip()
        nivel, j = 1, a + 1
        while nivel:
            if texto[j] == '{':
                nivel += 1
            elif texto[j] == '}':
                nivel -= 1
            j += 1
        yield cab, texto[a + 1:j - 1]
        i = j


def seletor(sel):
    sel = sel.strip()
    if sel in (':root', 'html', 'body'):
        return '#daga-py'
    if sel.startswith('body.') or sel.startswith('html '):
        return None
    sel = re.sub(r'^body\s+', '', sel)
    sel = re.sub(r'\.([a-zA-Z][\w-]*)', r'.py-\1', sel)
    for c in re.findall(r'\.(py-[\w-]+)', sel):
        if c not in usadas:
            return None
    return '#daga-py ' + sel


def processar(texto, indent=''):
    saida = []
    for cab, cont in blocos(texto):
        if cab.startswith('@media'):
            dentro = processar(cont, indent + '    ')
            if dentro.strip():
                saida.append(f'{indent}{cab} {{\n{dentro}{indent}}}\n')
        elif cab.startswith('@keyframes'):
            saida.append(f'{indent}{cab.replace("flutuar", "py-flutuar")} {{{cont}}}\n')
        else:
            sels = [s for s in (seletor(x) for x in cab.split(',')) if s]
            if sels:
                props = ' '.join(l.strip() for l in cont.strip().splitlines() if l.strip())
                props = props.replace('animation: flutuar', 'animation: py-flutuar')
                saida.append(f'{indent}{", ".join(sels)} {{ {props} }}\n')
    return ''.join(saida)


css_final = processar(css)

BASE_CSS = """@import url('https://fonts.googleapis.com/css2?family=Antonio:wght@500;600;700&family=Outfit:wght@300;400;500;600;700&family=Saira+Condensed:wght@500;600;700&display=swap');
#daga-py { position: relative; overflow: hidden; text-align: left; font-size: 16px; }
#daga-py *, #daga-py *::before, #daga-py *::after { box-sizing: border-box; }
#daga-py h1, #daga-py h2, #daga-py h3, #daga-py h4, #daga-py p, #daga-py ul, #daga-py li, #daga-py form { margin: 0; padding: 0; border: 0; background: none; text-shadow: none; }
#daga-py ul, #daga-py li { list-style: none; }
#daga-py a { text-decoration: none; }
#daga-py img { display: block; max-width: 100%; border: 0; }
#daga-py section { margin: 0; float: none; width: auto; }
#daga-py button, #daga-py input, #daga-py select, #daga-py textarea { font-family: inherit; }
#informacoes > .central > .titulo { display: none; }
"""

# ---------- Montagem e codificação ----------
def entidades(t):
    return ''.join(c if ord(c) < 128 else f'&#{ord(c)};' for c in t)


def js_ascii(t):
    return ''.join(c if ord(c) < 128 else f'\\u{ord(c):04x}' if ord(c) < 0x10000 else c for c in t)


saida = (
    '<!-- DAGA BEBIDAS - PAGINA PARAGUAY (ESPANHOL) PARA A WBUY. Gerado por wbuy/gerar-wbuy.py: edite o site e gere de novo. -->\n'
    '<style>\n' + BASE_CSS + css_final + '</style>\n'
    '<div id="daga-py">\n' + entidades(corpo) + '\n</div>\n'
    '<script>\n' + js_ascii(js) + '\n</script>\n'
)
fora = sorted(set(c for c in saida if ord(c) > 127))
assert not fora, fora
destino = os.path.join(AQUI, 'daga-paraguay-wbuy.html')
open(destino, 'w', encoding='ascii').write(saida)
print('ok', len(saida) // 1024, 'KB', '| regras CSS:', css_final.count('{'), '| classes:', len(usadas))
