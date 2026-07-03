# Criativos para o QUIZ — biblioteca de prompts (pra usar no Claude)

Material de referência pra gerar **criativos de anúncio** (Meta/Instagram/Facebook) que levam
tráfego frio pro **/quiz**. Cada criativo é um prompt que você cola no **Claude** → ele devolve um
**mockup HTML** nas dimensões exatas, na identidade da marca, pronto pra dar print/exportar.

> **Por que esses ângulos:** o maior público que chega ao quiz é **iniciante (55%)**, **quer fazer
> vestidos (88%)**, é **hobby (70%)** e **trava na modelagem (65%)**. Os criativos falam com esse
> núcleo e dão continuidade visual+verbal à tela do quiz. (Não mexe no site nem no tracking.)

---

## Como usar (passo a passo)

1. Abra o Claude e cole **o BLOCO "SISTEMA DE MARCA"** (logo abaixo) **+ o bloco do criativo** que
   você quer (ex.: Criativo #1). É só juntar os dois, nessa ordem.
2. O Claude devolve **1 arquivo HTML**. Abra no navegador e **dê print** (ou exporte) na resolução
   indicada → essa é a imagem do anúncio.
3. **Foto real:** o mockup deixa a área da foto como **placeholder rotulado** com o nome do arquivo.
   Troque pela foto: ou substituindo o `<div>` placeholder por `<img src="arquivo.jpg">` no HTML, ou
   montando por cima no Canva.
4. **Imagem IA:** o prompt traz um **"PROMPT DE IMAGEM IA"** separado. Gere a imagem no seu gerador
   (Midjourney/DALL·E/etc.), depois componha com o texto do mockup.
5. **Sistema visual padrão = atelier-at-night** (o tema escuro do quiz) — dá continuidade ("scent")
   e fura o feed claro. Para o A/B, há a variante "wine on cream" no fim do arquivo.

---

## BLOCO "SISTEMA DE MARCA" — cole no topo de TODO prompt

```
Você é designer de criativos para anúncios do Meta. Gere um mockup de anúncio como UM ÚNICO arquivo
HTML autocontido (HTML + CSS no <style>, sem JS, só Google Fonts via <link>), pronto pra eu dar
print/exportar como imagem.

=== SAÍDA (HTML) ===
- O criativo é uma <div> "palco" com width/height EXATOS em px (ver no bloco do criativo);
  box-sizing:border-box; overflow:hidden; position:relative. Centralize numa página fundo #888.
- Nada vaza do palco. Texto dentro de margem de segurança (>=64px nas bordas no 1:1 e 4:5; >=80px
  topo/base no 9:16 pra não bater na UI do Stories).
- Fontes: <link href="https://fonts.googleapis.com/css2?family=Young+Serif&family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet">
- ÁREA DE IMAGEM obrigatória, em 2 modos (o bloco do criativo diz qual): (a) PLACEHOLDER: área com
  borda tracejada coral, fundo --surface e rótulo central em Hanken com o nome EXATO do arquivo
  (ex.: "📷 FOTO: saia-lapis-preta.jpg"); (b) IMAGEM IA: mesma área placeholder, e abaixo do HTML
  você escreve um "PROMPT DE IMAGEM IA" (cena descritiva pronta pra colar num gerador de imagem).
- No fim, escreva: dimensões, fontes usadas e (se houver) o PROMPT DE IMAGEM IA.

=== PALETA (atelier-at-night) ===
--bg #2e1218 (bordeaux quase preto)  --bg-2 #37161d  --surface #43202a  --surface-2 #512734
--line rgba(246,234,224,.14) (giz)   --ink #f6eae0 (parchment, NÃO branco)  --ink-soft #ecd7cc
--muted #d3aaa4   --coral #f0714f (AÇÃO)  --coral-deep #d65a39  --brass #e3ad57 (RECOMPENSA)
--on-coral #38131a (texto sobre coral)
Fundo do palco (luz de luminária):
  background:
    radial-gradient(1100px 620px at 50% -12%, rgba(240,113,79,.16) 0%, rgba(240,113,79,0) 56%),
    radial-gradient(760px 520px at 50% 116%, rgba(227,173,87,.08) 0%, rgba(227,173,87,0) 60%),
    #2e1218;

=== TIPOGRAFIA ===
- Display (headline/número): 'Young Serif' 400, letter-spacing -0.01em, line-height 1.05–1.15,
  text-wrap:balance, cor --ink. SEM itálico, SEM gradiente no texto.
- Texto/UI: 'Hanken Grotesk' 400–800. Destaque na headline = trocar a palavra-chave pra --coral
  (nunca sublinhado).

=== MOTIVO ===
- "Running seam": traço curto tracejado coral (border-top:2px dashed --coral; width ~46px) acima/
  abaixo de blocos. Versão brass pra recompensa. É o eyebrow da marca.

=== CTA (sempre leva ao quiz) ===
- Botão sólido --coral, texto --on-coral, peso 700, radius 14px, padding >=16px 28px, min-height 54px.
  Texto "Fazer o quiz →" / "Descobrir meu perfil →". Microcopy abaixo: "leva 2 min · resultado na hora".

=== VOZ (PT-BR, NÃO corporativo, NÃO hype) ===
- Mentora generosa na mesa de costura. Acolhedora, direta. Fala "você", "a gente".
- FAÇA: validar o medo do iniciante; caimento/modelagem/do PP ao GG; palavras físicas (giz, linha,
  molde de papel, luminária); fazer ela se sentir VISTA.
- NÃO: superlativo vazio, urgência falsa, emoji em excesso, jargão, prometer fora do brief, liderar
  com preço. 1 ideia por criativo. Headline curta. Legível no celular. Pouco texto sobre a foto.
```

---

## Mapa dos 8 criativos

| # | Ângulo | Público | Formato | Imagem |
|---|---|---|---|---|
| 1 | "Sai feita em casa" → caimento | iniciante + vestido + modelagem | 4:5 · 1080×1350 | foto real `saia-lapis-preta.jpg` |
| 2 | "Mesmo começando agora" | iniciante + hobby | 9:16 · 1080×1920 | IA (mãos sobre molde) |
| 3 | "O vestido que você sonha" | quer vestido (88%) | 1:1 · 1080×1080 | IA (vestido no cabide) |
| 4 | "Que costureira é você?" (gancho do quiz) | tráfego frio | 9:16 · 1080×1920 | leve `hero-1.webp` |
| 5 | "A primeira peça da Amanda" | iniciante (medo) | 4:5 · 1080×1350 | foto real `amanda-saiacamadas.jpg` |
| 6 | "Do molde ao caimento" (antes/depois) | iniciante (modelagem) | 1:1 · 1080×1080 | foto real `molde-1.jpg` + `rose-macacaovermelho.jpg` |
| 7 | "Cada molde testado, do PP ao GG" | intermediária + qualidade | 4:5 · 1080×1350 | foto real `thaiza.jpg` |
| 8 | "Risco zero, 7 dias" (garantia) | iniciante hesitante | 9:16 · 1080×1920 | IA (selo de garantia) |

---

## CRIATIVO #1 — "Sai feita em casa" (dor da modelagem) · 4:5 · foto real

```
[colar o BLOCO SISTEMA DE MARCA primeiro, depois isto:]

Gere o mockup HTML do anúncio nas dimensões EXATAS 1080x1350px (4:5).

COPY:
- Headline (Young Serif; "caimento de ateliê" em --coral): "Feito em casa. Com caimento de ateliê."
- Subhead (Hanken): "O segredo não é a máquina — é a modelagem certa, do PP ao GG. A gente te entrega
  o molde já corrigido pro corpo feminino."
- Selo (brass): "⭐ molde profissional, testado peça por peça"
- CTA coral: "Descobrir meu perfil →"   ·   microcopy abaixo: "leva 2 min · resultado na hora"

LAYOUT:
- Área de imagem = PLACEHOLDER full-bleed ocupando ~62% do topo do palco, rótulo central
  "📷 FOTO: saia-lapis-preta.jpg".
- Faixa --surface na parte de baixo com running-seam coral no topo da faixa; hierarquia
  headline > subhead > selo brass > CTA. Exportável por print.
```

---

## CRIATIVO #2 — "Mesmo começando agora" (iniciante sem medo) · 9:16 · IA

```
[colar o BLOCO SISTEMA DE MARCA primeiro, depois isto:]

Gere o mockup HTML nas dimensões EXATAS 1080x1920px (9:16), zona segura 80px topo/base.

COPY:
- Linha-gancho (topo, Hanken 600): "Será que isso é pra mim, que tô começando agora?"
- Headline (Young Serif; "A gente começa pela modelagem" em --coral): "É sim. A gente começa pela
  modelagem — não pela perfeição."
- Apoio (Hanken): "Molde já pronto, vídeo-aula de montagem e ficha técnica. Você só corta e costura."
- CTA coral: "Fazer o quiz →"   ·   microcopy: "descubra seu perfil em 2 min"

LAYOUT:
- Topo (zona segura): linha-gancho sobre --bg, com running-seam coral logo abaixo dela.
- Terço central: área de imagem = PLACEHOLDER, rótulo "🖼️ IMAGEM IA (ver prompt abaixo)".
- Base: headline + apoio + CTA coral. Exportável por print.

Depois do HTML, escreva exatamente este PROMPT DE IMAGEM IA:
"Close-up cinematográfico, luz quente de luminária de mesa num ambiente escuro bordeaux. Mãos
femininas de costureira posicionando um molde de papel com linhas de corte tracejadas sobre tecido
escuro; giz de alfaiate branco marcando uma linha; carretéis de linha desfocados ao fundo. Atmosfera
íntima, noturna, acolhedora — ateliê à noite. Sem rostos. Paleta bordeaux profundo + parchment +
toque coral. Foto realista, profundidade de campo rasa. Proporção 9:16 vertical."
```

---

## CRIATIVO #3 — "O vestido que você sonha" · 1:1 · IA

```
[colar o BLOCO SISTEMA DE MARCA primeiro, depois isto:]

Gere o mockup HTML nas dimensões EXATAS 1080x1080px (1:1).

COPY:
- Headline (Young Serif; "vestido" em --coral): "Aquele vestido que só existe na sua cabeça?"
- Subhead (Hanken): "Dá pra tirar do sonho e botar no corpo — do corte ao caimento, sem travar na
  modelagem."
- CTA coral: "Descobrir meu perfil de costureira →"   ·   microcopy: "leva 2 min · resultado na hora"

LAYOUT:
- Área de imagem = PLACEHOLDER ocupando a METADE DIREITA do palco, rótulo "🖼️ IMAGEM IA (ver prompt
  abaixo)".
- Texto na metade esquerda sobre --bg, com running-seam coral acima da headline; CTA coral embaixo.
  Exportável por print.

Depois do HTML, escreva exatamente este PROMPT DE IMAGEM IA:
"Um vestido feminino elegante pendurado num cabide de madeira, iluminado por luz quente de luminária
num ateliê escuro de fundo bordeaux profundo. Linhas de molde de papel e carretéis de linha
sutilmente desfocados ao redor. Clima noturno, artesanal, premium mas acolhedor. Paleta bordeaux +
parchment + coral. Foto realista, profundidade rasa, proporção 1:1."
```

---

## CRIATIVO #4 — "Que costureira é você?" (gancho do quiz) · 9:16 · réplica da tela

```
[colar o BLOCO SISTEMA DE MARCA primeiro, depois isto:]

Gere o mockup HTML nas dimensões EXATAS 1080x1920px (9:16), zona segura 80px topo/base.
Este criativo REPLICA fielmente a tela de abertura do quiz (continuidade total).

COPY:
- Running-seam coral no topo.
- Headline (Young Serif; "perfil de costureira" em --coral): "Descubra o seu perfil de costureira"
- Lead (--muted, Hanken): "Responde umas perguntas rápidas e a gente revela o seu perfil — e o
  caminho pra fazer as peças que você sonha, mesmo começando agora."
- 3 badges em pílula (fundo translúcido, borda --line, Hanken 500): "🧵 Moldes profissionais" ·
  "🌱 Pra iniciante também" · "💛 +200 alunas"
- CTA coral: "Começar o quiz →"   ·   microcopy: "⚡ 2 minutinhos · resultado na hora"

LAYOUT:
- Composição vertical centrada, igual à #screen-start do quiz. Área de imagem opcional pequena no
  rodapé = PLACEHOLDER "📷 FOTO: hero-1.webp" (pode omitir se ficar cheio). Exportável por print.
```

---

## CRIATIVO #5 — "A primeira peça da Amanda" (prova social iniciante) · 4:5 · foto real

```
[colar o BLOCO SISTEMA DE MARCA primeiro, depois isto:]

Gere o mockup HTML nas dimensões EXATAS 1080x1350px (4:5).

COPY (depoimento real de aluna — não alterar o texto entre aspas):
- Depoimento (Young Serif, médio, entre aspas grandes coral): "Fiz a minha primeira peça da
  assinatura, a saia lápis. É bem fácil de fazer, eu amei."
- Atribuição (Hanken): "— Amanda, aluna · primeira peça"
- Apoio (Hanken, voz da marca): "Iniciante também faz. E faz bonito."
- CTA coral: "Quero descobrir meu perfil →"   ·   microcopy: "leva 2 min · resultado na hora"

LAYOUT:
- Área de imagem da peça = PLACEHOLDER full-bleed no topo (~55%), rótulo "📷 FOTO:
  amanda-saiacamadas.jpg".
- Faixa --surface embaixo com running-seam brass; avatar circular pequeno (PLACEHOLDER
  "📷 av-amanda.webp") + nome, aspas grandes coral, depoimento, apoio e CTA coral.
- Texto sobre a foto <= ~20% da área. Exportável por print.
```

---

## CRIATIVO #6 — "Do molde ao caimento" (antes/depois) · 1:1 · foto real

```
[colar o BLOCO SISTEMA DE MARCA primeiro, depois isto:]

Gere o mockup HTML nas dimensões EXATAS 1080x1080px (1:1).

COPY:
- Headline (Young Serif; "molde de papel" em --coral): "Do molde de papel ao caimento no corpo."
- Apoio (Hanken): "4 moldes profissionais por mês, vídeo-aula de montagem e ficha técnica. O caminho
  inteiro, sem buraco."
- Legenda (depoimento real, pequena): "\"Amei costurar! Deu vontade de fazer um de cada cor.\" — Rose"
- CTA coral: "Descobrir meu perfil →"   ·   microcopy: "leva 2 min · resultado na hora"

LAYOUT:
- Duas áreas de imagem lado a lado (50/50), separadas por um divisor VERTICAL tracejado coral
  (running-seam = "a costura que une"). Esquerda = PLACEHOLDER "📷 FOTO: molde-1.jpg" com micro-rótulo
  "molde" (--muted); direita = PLACEHOLDER "📷 FOTO: rose-macacaovermelho.jpg" com micro-rótulo
  "peça pronta" (--brass).
- Faixa de copy embaixo sobre --bg: headline + apoio + legenda da Rose + CTA coral. Exportável.
```

---

## CRIATIVO #7 — "Cada molde testado, do PP ao GG" (autoridade Thaíza) · 4:5 · foto real

```
[colar o BLOCO SISTEMA DE MARCA primeiro, depois isto:]

Gere o mockup HTML nas dimensões EXATAS 1080x1350px (4:5).

COPY:
- Headline (Young Serif; "testado" em --coral): "Cada molde testado, do PP ao GG."
- Subhead (Hanken): "A Thaíza corrige a modelagem pro corpo feminino real antes de chegar até você.
  Sem ajuste no escuro."
- Selo (brass): "⭐ +60 moldes na biblioteca · +200 alunas"
- CTA coral: "Descobrir meu perfil de costureira →"   ·   microcopy: "leva 2 min · resultado na hora"

LAYOUT:
- Área de imagem = PLACEHOLDER full-bleed no topo (~60%), rótulo "📷 FOTO: thaiza.jpg".
- Faixa --surface embaixo com running-seam coral; headline > subhead > selo brass > CTA. Exportável.
```

---

## CRIATIVO #8 — "Risco zero, 7 dias" (garantia) · 9:16 · IA

```
[colar o BLOCO SISTEMA DE MARCA primeiro, depois isto:]

Gere o mockup HTML nas dimensões EXATAS 1080x1920px (9:16), zona segura 80px topo/base.

COPY:
- Gancho (topo, Hanken 600): "E se não for pra você? Você sai sem perder nada."
- Headline (Young Serif; "garantia incondicional" em --coral): "7 dias de garantia incondicional."
- Apoio (Hanken): "Entra, faz sua primeira peça, sente o caimento. Se não te servir, a gente devolve.
  Simples assim."
- CTA coral: "Fazer o quiz →"   ·   microcopy: "descubra seu perfil em 2 min"

LAYOUT:
- Gancho no topo (zona segura) com running-seam brass abaixo.
- Centro: área de imagem = PLACEHOLDER, rótulo "🖼️ IMAGEM IA (ver prompt abaixo)".
- Base: headline + apoio + CTA coral. Exportável por print.

Depois do HTML, escreva exatamente este PROMPT DE IMAGEM IA:
"Um selo/carimbo circular de garantia em estilo artesanal, cor brass/dourado fosco sobre fundo
bordeaux profundo, com textura de giz e uma borda de pontos tracejados (como costura). Luz quente de
luminária. Clima de ateliê à noite, premium e acolhedor. Sem texto legível dentro do selo. Foto/
render realista, proporção 9:16 vertical."
```

---

## Boas práticas (anúncio de quiz)

- **Gancho na 1ª linha / nos 3 primeiros segundos.** A primeira coisa que ela lê tem que ser a
  dúvida dela. Pergunta > afirmação pra tráfego frio.
- **1 ideia por criativo.** Não empilhar modelagem + garantia + autoridade no mesmo anúncio.
- **Pouco texto sobre a imagem** (< ~20% da área). Prefira faixa sólida pro texto e foto limpa.
- **Legível no mobile primeiro.** Headline grande (Young Serif ~48–72px num palco de 1080px de
  largura). Contraste garantido pelos tokens (parchment sobre bordeaux ≥ 4,5:1).
- **Continuidade de "scent".** O criativo tem que parecer "a porta" da landing do quiz — mesmas
  cores, mesma running-seam coral, mesma fonte. Reduz bounce no clique.
- **CTA sempre pro quiz, sempre com tempo.** "Fazer o quiz →" + "leva 2 min · resultado na hora".
- **Zona segura no Stories** (80px topo/base) pra não bater na UI nativa do Meta.
- **Não liderar com preço.** Anúncio de quiz vende o diagnóstico e a transformação. Preço fica na /v5.
- **Foto real > IA quando há ativo.** Peças das alunas e a Thaíza geram mais confiança que IA.

---

## Quais testar primeiro

1. **#1 — "Sai feita em casa / caimento de ateliê"** (4:5, foto real): ataca de frente o ângulo
   central (modelagem → caimento) com prova de peça real de aluna. Começo óbvio.
2. **#4 — "Descubra seu perfil de costureira"** (9:16, réplica da tela): máxima continuidade com a
   landing; testa o mecanismo do quiz (curiosidade + 2 min) puro. Bom baseline.
3. **#5 — "A primeira peça da Amanda"** (4:5, depoimento real): prova social de iniciante quebra o
   medo exatamente no ponto de objeção dos 55% iniciantes.

**A/B de sistema visual:** rode o **#1 também na versão "wine on cream"** (abaixo) pra testar
*continuidade (dark)* vs. *destaque/conforto (light)*, com copy e foto controladas.

---

## Variante para A/B — sistema "wine on cream" (light, da landing /v5)

Pra gerar uma versão clara de qualquer criativo, **troque, no BLOCO SISTEMA DE MARCA**, a seção de
PALETA e TIPOGRAFIA por esta (o resto do prompt continua igual):

```
=== PALETA (wine on cream) ===
--wine #7d2e46 (AÇÃO/destaque)  --wine-dark #5c1f32  --cream #faf7f4 (fundo)  --blush #f5e8ec
--stone #e8e0d8 (bordas)  --ink #1e1714 (texto escuro)  --muted #6b5c55  --white #ffffff
Fundo do palco: --cream liso (sem gradiente de luminária).

=== TIPOGRAFIA ===
- Display (headline): 'Playfair Display' 600 (pode itálico em 1 palavra). Cor --ink. Sem gradiente.
- Texto/UI: 'Inter' 300–600. Destaque na headline = palavra-chave em --wine.
- Fontes: <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
- CTA: botão sólido --wine, texto branco. Running-seam vira um traço fino --wine (sem ser tracejado).
```

> Não misture os dois sistemas no mesmo criativo. O A/B é: criativo idêntico, só muda o sistema.

---

## Fatos do produto (pra não inventar)

- **Entrega:** 4 moldes profissionais/mês (do PP ao GG, com correções do corpo feminino) + vídeo-aula
  de montagem + ficha técnica; biblioteca acumulativa (+60 moldes); comunidade +200 alunas; imprime
  em casa (A4) ou plotter.
- **Garantia:** 7 dias incondicional (devolve 100%).
- **Depoimentos reais:** Amanda — "Fiz a minha primeira peça da assinatura, a saia lápis. É bem fácil
  de fazer, eu amei."; Rose — "Fiz o macacão assimétrico, amei costurar! Deu vontade de fazer um de cada
  cores."
- **Preço NÃO é foco** nos anúncios de quiz (fica na /v5).
