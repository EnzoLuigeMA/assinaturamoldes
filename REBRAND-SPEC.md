# Spec — Rebranding da Assinatura de Moldes: nova landing única "Do molde à peça"

> Coordenação: Claude escreve o QUÊ/POR QUÊ + critério de aceite. Codex executa (lê o código
> atual, escreve, roda, verifica). Grok valida esta spec antes da execução.

## 1. Objetivo de negócio
Aumentar a conversão do funil de venda da **Assinatura de Moldes** (Thaíza Gonçalves),
consolidando as 4 landings concorrentes (`/` index, `/v5`, `/v6`, `/v7`) numa **única landing
canônica** com uma espinha visual nova que **demonstra** a promessa central em vez de só afirmá-la.

- Mesma oferta e mesmos preços (Anual R$289,90 / Trimestral R$109,90 / Mensal R$49,90).
- Ganho de conversão vem de: estrutura, ancoragem, hierarquia, prova e CTA — **não** de preço.
- Público: mulheres que costuram, no **celular**, à noite, vindas de anúncio Meta (frio).
  Mobile-first é obrigatório.

## 2. Escopo de rotas
- Nova landing = arquivo `index.html` (rota `/`). É a fonte de verdade.
- `/v5`, `/v6`, `/v7` → **redirect 308** para `/` (ajustar `vercel.json`; manter `/v2`,`/v3`,`/v4`
  apontando pra `/` também). Não apagar os arquivos antigos ainda; só redirecionar.
- `/quiz` → CTA de resultado passa a entregar em `/?plano=anual|trimestral|mensal#planos`.
  ⚠️ **Não confiar no hash nativo** (iOS/WebView ignora e o highlight roda antes de fonte/SVG/
  layout): ler `?plano=` em JS **após `load` + fontes prontas**, então `scrollIntoView` suave no
  card + aplicar `highlight`. `#planos` precisa de `scroll-margin-top` pra não ficar sob a
  buy-bar/pin. O redirect 308 de `/v5..v7` **preserva a query**, mas o scroll/highlight é
  responsabilidade do JS na `/`.
- Manter `/obrigado`, `/comunidade`, `/comunidade/obrigado` como estão.

## 3. Espinha estrutural — scrollytelling "Do molde à peça"
Um **visual fixo (sticky)** que percorre 4 keyframes conforme o scroll, sincronizado com os
beats de copy AIDA ao lado/abaixo. É a assinatura da página e a prova viva da promessa
(molde profissional → caimento).

**Keyframes do visual (em ordem):**
1. **Molde + recorte de peça** — peça de molde em papel JÁ com um recorte de peça real ao lado
   (não começar 100% abstrato — a costureira precisa reconhecer o produto no 1º frame).
2. **Linhas de corte** — as linhas de corte/graduação (PP→GG), piques e cotas se **desenham**
   (stroke-dashoffset).
3. **Costurado** — as partes se unem / o tecido preenche (máscara/opacity revela o tecido).
4. **Peça pronta (vestida)** — crossfade para **foto real de peça vestida/finalizada da
   comunidade** (`comunidade-*.jpeg` — que mostram peça no corpo/uso real). ⚠️ NÃO usar
   `Vestidos.png`/`Blusas.png` no payoff "peça pronta no corpo": no repo esses são **packshot**
   (peça plana/manequim), não corpo — usá-los seria promessa visual falsa. Packshots servem só
   pro catálogo (beat 6).

**Comportamento por breakpoint (⚠️ ajustado pós-validação):**
- **Mobile (padrão):** visual fixado no topo com **altura ≤28vh** usando **`svh`/`dvh`** (nunca
  `vh` puro — a barra do Safari/Instagram muda o `vh`). O pin existe **apenas nos beats 1–4** e
  é **solto antes da prova/planos** (a partir do beat 5 a página é rolagem normal, tela cheia pra
  copy/oferta). Sem scroll horizontal.
- **Desktop (≥900px):** visual sticky à esquerda (coluna ~48%) só na zona dos beats 1–4; copy
  rola à direita; solta ao chegar na prova.
- **⚠️ `position: sticky` quebra se QUALQUER ancestral tiver `transform`/`filter`/`perspective`.**
  Não aplicar essas propriedades em ancestrais do elemento pinado. Testar o pin de fato.
- **Barra de compra fixa (sticky buy-bar):** após passar do hero, mostrar uma barra fixa no rodapé
  (mobile) / topo com "Plano Anual R$289,90 · 51% OFF" + CTA "Quero meus moldes". Coordenar com o
  pin do visual pra os dois stickies **não brigarem** (a buy-bar entra depois que o visual solta,
  ou ocupam áreas que não se sobrepõem).
- **`prefers-reduced-motion`:** trocar animação por 4 imagens estáticas legendadas (molde →
  corte → costura → peça vestida), sem movimento sincronizado. Nada de parallax/travar scroll.

**Implementação técnica (⚠️ requisitos, não sugestão):** SVG line-art do molde com
`stroke-dashoffset` para desenhar as linhas + máscara/opacity pro preenchimento + crossfade pra
foto real no keyframe final. Progresso de scroll via `IntersectionObserver` + handler em
`requestAnimationFrame` (só `transform`/`opacity`; **evitar `clip-path` animado** — não é puro
compositing e custa no mid-range Android; preferir máscara estática + opacity/transform).
**Fallback obrigatório:** se `IntersectionObserver` não existir ou falhar (WebView in-app do
Instagram/Facebook), renderizar direto o **estado final estático** (4 frames legendados) — a
página nunca pode ficar presa no keyframe 1. **Não sequestrar o scroll**; a página rola normal.
**Zero CLS:** reservar a altura do sticky.

## 4. Beats de copy (ordem AIDA) e casamento com o visual
Reaproveitar/afinar a copy que já existe no `index.html` atual (ela é boa). Cada beat abaixo é
uma seção de texto casada a um keyframe:

1. **Hero / Atenção** (keyframe 1 – molde plano)
   - H1: *"Pare de brigar com a modelagem. Costure peças com caimento de ateliê a partir de hoje."*
   - Sub: *"4 moldes profissionais novos todo mês — testados do PP ao GG, com vídeo-aula e ficha
     técnica. Você imprime em casa, costura e vê o caimento que valoriza a peça — pra vestir,
     presentear ou vender."*
   - Barra de prova: `+200 alunas` · `+100 moldes entregues` · `PP ao GG` · `4 novos/mês`.
   - CTA primário: **"Quero meus moldes agora"** (rola até `#planos`).
2. **Problema / Interesse** (keyframe 2 – linhas de corte surgindo)
   - "Você sabe costurar. Então por que a peça ainda sai 'feita em casa'?" + os 3 pontos de dor
     do index atual (horas/tecido refazendo molde; linda no cabide, no corpo entrega; outras já
     entregam com acabamento de ateliê).
3. **A virada / Desejo** (keyframe 3 – costurando)
   - "E se a modelagem já chegasse pronta e testada todo mês?" + os 4 passos (biblioteca → aula
     → vestir/vender → evoluir).
4. **Stack de valor** (ainda keyframe 3)
   - "Você não está comprando moldes. Está comprando um ateliê completo." + os 6 itens com
     ancoragem de valor (R$120 + R$80 + R$40 …). Manter, mas com hierarquia mais forte.
5. **Prova viva — mosaico das alunas** (keyframe 4 – peça vestida). **AQUI o pin do visual é
   solto.** Mosaico/masonry das fotos reais (`comunidade-1..13`, depoimentos do index) — social
   proof como bloco forte, não rodapé.

> ⚠️ **A oferta não pode ser enterrada** (Grok): além da barra de compra fixa desde o hero, o
> bloco de planos completo entra **logo após a prova (beat 6)** — não no fim da página.

6. **Oferta / Ação — `#planos`** — 3 planos. **Anual ancorado** (Melhor valor, 51% OFF, "menos
   de R$1/dia"), Trimestral e Mensal secundários. **Selo de garantia de 7 dias DENTRO do card**
   (reduz risco no ponto da decisão). Ler `?plano=` pra destacar o card recomendado.
7. **Catálogo** — "Modelos disponíveis na assinatura": mostrar **6–8 peças em destaque** (não um
   browser pesado/infinito); com o filtro atual (Todos/Blusas/…) opcional; reforçar "+60 moldes,
   e todo mês entram 4 novos". (Aqui sim usar os packshots `Vestidos.png`/`Blusas.png` etc.)
8. **É pra você?** — checklist qualificador **como confirmação pós-oferta** (reaproveitar).
9. **FAQ** (5 perguntas atuais) — quebra objeções finais.
10. **CTA final** ("Agora é a sua vez") + **Rodapé** (Hotmart / direitos).

## 5. Direção visual (skin serve a estrutura — NÃO é cream+Playfair)
O antigo index usa cream (#FDF8F0) + **Playfair Display** + DM Sans — que a própria doc da marca
lista como **anti-referência** ("tasteful AI default"). Proibido repetir isso.

- **Sistema base:** herdar o sistema premium já definido pra marca no quiz (ver `DESIGN.md`):
  tipografia **Young Serif** (display) + **Hanken Grotesk** (corpo); acento de ação **coral
  `#f0714f`**; acento de recompensa **brass `#e3ad57`**.
- **Ground da landing:** superfície tátil de **"mesa de corte"** — papel quente/greige claro
  (ex.: `#ece4d6` / `#f4efe6`) com tinta profunda pro texto (contraste AA), para o visual
  molde→peça ficar legível e premium. Distinto tanto do quiz (dark) quanto do cream velho.
- **Motivo de marca:** linha de costura tracejada (running-seam) e marcações de molde (piques,
  cotas, graduação) como sistema decorativo com significado — nunca chrome genérico.
- Sem gradiente roxo, sem glass card SaaS, sem emoji como marcador de seção grande.
- Fontes: **auto-hospedar** (woff2) ou `@font-face`; não depender de CDN que possa falhar.
  `font-display: swap`. Máx. 2 famílias.

## 6. Preservar (não quebrar)
- **Tracking:** eventos Pixel + CAPI já existentes (`PageView`, `ViewContent`, `Lead`,
  `InitiateCheckout` deduplicado) e `api/capi.js`. Manter disparos equivalentes na nova página.
- **Links de checkout Hotmart** reais dos 3 planos (extrair do index atual, não inventar).
- **Assets** do repo (catálogo, comunidade, avatares, vídeo). Reutilizar; não baixar novos.
- Headers de segurança do `vercel.json`.

## 7. Critérios de aceite (Definition of Done)
- [ ] `/` é a nova landing scrollytelling; `/v2..v7` redirecionam pra `/`.
- [ ] Visual molde→peça funciona **no celular** (sticky ≤28vh em `svh/dvh`, só nos beats 1–4,
      solto antes da prova) e no desktop; **zero scroll-jacking**; **zero CLS** causado pelo sticky.
- [ ] Nenhum ancestral do elemento pinado tem `transform/filter/perspective` (o sticky funciona
      de verdade — testar no DevTools mobile e, se possível, num WebView in-app).
- [ ] **Barra de compra fixa** (preço Anual + CTA) presente após o hero, sem brigar com o pin.
- [ ] Bloco de **planos aparece logo após a prova (beat 6)**, não no fim; **garantia no card**.
- [ ] `?plano=` destaca e rola até o card certo **via JS pós-load** (não depende do hash nativo);
      `#planos` com `scroll-margin-top`.
- [ ] Payoff "peça pronta/vestida" usa foto real da comunidade — **nunca** packshot como se fosse
      corpo. Catálogo mostra 6–8 peças, não um browser infinito.
- [ ] **Fallback estático** se `IntersectionObserver` falhar/ausente (WebView): página renderiza o
      estado final, nunca trava no keyframe 1.
- [ ] `prefers-reduced-motion` → versão estática legendada, tudo acessível.
- [ ] Mesma oferta/preços; Anual ancorado; `?plano=` destaca o card certo; garantia + FAQ presentes.
- [ ] Contraste WCAG AA (≥4.5:1 corpo, ≥3:1 grande); navegação por teclado com foco visível coral;
      alvos de toque ≥44px.
- [ ] Eventos de tracking e links Hotmart preservados e disparando.
- [ ] Performance: LCP < 2.5s, imagens abaixo da dobra em `loading="lazy"`, hero com
      `fetchpriority="high"`; sem recurso render-blocking desnecessário; JS enxuto (sem framework).
- [ ] Fontes auto-hospedadas, sem Playfair/DM Sans/Inter/Cormorant.
- [ ] Nada além do escopo alterado; funil (quiz/obrigado/comunidade) intacto salvo o link de
      entrega do quiz para `/#planos`.

## 8. Fora de escopo
- Não mexer em preços/planos/oferta além da apresentação.
- Não reescrever o quiz (só o link de saída).
- Não apagar os arquivos v2–v7 (só redirecionar as rotas).
