# JERRY · Maputo

O restaurante do Chef Jerry Matsinhe, em Maputo — a partir do desenho do site
enviado (Fine Dine Club, página “The Concept”). O desenho, a estrutura e as
animações mantêm-se; só mudaram a marca, o herói e os textos.

## O que mudou

- **Nome:** Fine Dine Club → **JERRY** (logótipo em texto no cabeçalho e no rodapé).
- **Chefe:** Chef Jeremias “Jerry” Matsinhe, de Maputo. Todas as fotografias de
  pessoas são do **mesmo homem** — uma sessão Pexels do fotógrafo Tochukwu Ekeh
  (fotos 32224388–32224392, licença livre Pexels). O uniforme diz “Chef Jerry”,
  por isso o nome do chefe é Jerry.
- **Herói:** a imagem de abertura é agora o Chef Jerry (antes era um prato).
  O vídeo de abertura (`videos/portal.mp4`) é um movimento lento sobre essa
  fotografia — o vídeo original tinha o logótipo “Fine Dine Club” e foi retirado.
- **Textos:** tudo em português. Menu: O Conceito, O Chefe, Como Funciona,
  Reservar. As descrições dos cartões foram reescritas para um só chefe, em
  Maputo, com produto da costa moçambicana. Não se promete estrela Michelin
  nem clube em Paris/Londres — isso era do site original e não é deste restaurante.
- **Fotografias retiradas:** todas as fotografias do site original que mostravam
  outro chefe, outra mesa com guardanapos “Fine Dine Club” ou o palácio europeu
  do vídeo. As fotografias de comida sem pessoas nem marca (prato com fumo,
  ostras, sobremesa) mantêm-se, porque são a comida do chefe.
- **Sem dependências externas:** 0 referências a finedineclub.com, 0 WordPress,
  0 rastreadores. As fontes Graphik/Canela do CSS original não vinham no ficheiro
  enviado, por isso o navegador usa a fonte de reserva do sistema.

## Ficheiros

- `index.html` — a página (textos, logótipo, cartões, rodapé).
- `images/` — fotografias. `chefe-jerry-*.jpg` são o chefe; `slideshow-1.jpg`,
  `slideshow-3.jpg`, `3.jpg`, `6-Three-Collections.jpg` e `banner-2.jpg` são
  comida do site original.
- `css/app.css` — o desenho original, intocado. `css/style.css` — só esta nota.
- `js/app.js` — as animações originais, intocadas.
- `videos/portal.mp4` — vídeo de abertura, gerado a partir da foto do herói.

## Como editar (sem Lovable)

- **Textos:** edite `index.html` — o título, a descrição do conceito e os
  `data-desc` dos cartões são os textos que aparecem no site.
- **Fotografias:** substitua o ficheiro em `images/` por outro com o mesmo nome,
  ou mude o `src` em `index.html`.
- **Nome/logótipo:** mude o texto `JERRY` nos dois SVG de `index.html`
  (cabeçalho e rodapé) e o título.
- **Contacto/reserva:** o site original só tinha esta página — não tinha
  formulário, telefone nem morada. O comprador deve acrescentar os seus
  contactos antes de publicar como site de um restaurante real. Nada aqui é
  um contacto real.

## Como pôr no Lovable (editar com IA)

O Lovable **não importa um repositório GitHub já existente** — a sincronização
Git do Lovable só exporta de um projeto Lovable para o GitHub. Para editar
este site no Lovable, use a importação:

1. No Lovable, crie um projeto novo por **importação de ZIP** (ou por URL,
   depois de o site estar publicado em GitHub Pages).
2. Envie o ZIP deste repositório.
3. Cole este pedido, sem mudar o desenho:

> “Recria exatamente este site, com o mesmo desenho, animações e estrutura.
> Mantém o nome JERRY, o Chef Jerry Matsinhe de Maputo, as fotografias do
> chefe e todos os textos em português. Não mudes o desenho, só torna o site
> editável: textos, fotografias, nome e contactos editáveis no editor.”

4. Reveja o resultado no Lovable antes de publicar: a importação reconstrói o
   site e pode alterar animações. A versão exata, tal como está aqui, é a
   publicada em GitHub Pages a partir deste repositório.

## Publicação

Site estático, sem servidor nem base de dados. Basta servir a pasta
(`index.html` na raiz) — GitHub Pages, Netlify, ou qualquer alojamento
estático.
