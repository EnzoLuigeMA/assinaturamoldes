// Vercel Function — interpreta as respostas do quiz com o Claude Haiku e
// devolve um resultado personalizado (arquétipo + plano recomendado).
// A chave da Anthropic e o token da Meta ficam em variáveis de ambiente
// (server-side) — NUNCA no HTML.
//
// Env vars (configurar no painel da Vercel):
//   ANTHROPIC_API_KEY  -> chave da Anthropic (sem ela, cai no fallback)
//   META_CAPI_TOKEN    -> token da Conversions API da Meta (opcional)

const Anthropic = require('@anthropic-ai/sdk');

const MODEL = 'claude-haiku-4-5';
const PIXEL_ID = '246033433475773';

// ── Conjunto de respostas permitidas (validação + fallback) ──
const QUESTIONS = {
  nivel:       ['iniciante', 'intermediaria', 'avancada'],
  foco:        ['blusas_vestidos', 'calcas_alfaiataria', 'infantil', 'linha_completa'],
  frustracao:  ['modelagem', 'caimento', 'tempo', 'acabamento'],
  objetivo:    ['hobby', 'renda_extra', 'marca_propria'],
  tempo:       ['pouco', 'medio', 'bastante'],
  compromisso: ['testar', 'conhecer', 'mergulhar'],
};

function sanitizeAnswers(raw) {
  const out = {};
  if (!raw || typeof raw !== 'object') return out;
  for (const key of Object.keys(QUESTIONS)) {
    const v = raw[key];
    if (typeof v === 'string' && QUESTIONS[key].includes(v)) out[key] = v;
  }
  return out;
}

const RESULT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    arquetipo:              { type: 'string' },
    arquetipo_descricao:    { type: 'string' },
    mensagem_personalizada: { type: 'string' },
    plano_recomendado:      { type: 'string', enum: ['mensal', 'trimestral', 'anual'] },
    motivo_plano:           { type: 'string' },
    compatibilidade:        { type: 'integer' },
    pontos_fortes:          { type: 'array', items: { type: 'string' } },
  },
  required: [
    'arquetipo', 'arquetipo_descricao', 'mensagem_personalizada',
    'plano_recomendado', 'motivo_plano', 'compatibilidade', 'pontos_fortes',
  ],
};

const SYSTEM_PROMPT = [
  'Você é a especialista de perfis da "Assinatura de Moldes da Thaíza Gonçalves", uma assinatura',
  'brasileira que entrega 4 moldes profissionais por mês (do PP ao GG, com correções do corpo',
  'feminino), vídeo-aulas de montagem, ficha técnica, biblioteca acumulativa e comunidade.',
  '',
  'Você recebe, em JSON, as respostas de um quiz de uma costureira e gera um RESULTADO gamificado e',
  'personalizado, em português do Brasil, com tom acolhedor, feminino e profissional (nunca robótico).',
  '',
  'Planos disponíveis (não invente preços nem benefícios):',
  '- mensal: R$ 49,90/mês — pra começar leve, mês a mês.',
  '- trimestral: R$ 109,90/3 meses (~R$ 36,63/mês) — pra conhecer e pegar ritmo.',
  '- anual: R$ 289,90/ano (~R$ 24,16/mês) — melhor custo-benefício, pra quem quer mergulhar.',
  '',
  'Lógica de recomendação de plano:',
  '- objetivo "marca_propria" OU compromisso "mergulhar" => anual.',
  '- compromisso "testar" => mensal.',
  '- nos demais casos => trimestral.',
  '',
  'Regras de saída:',
  '- "arquetipo": um nome de perfil curto e cativante, começando com "A " (ex.: "A Estilista Visionária").',
  '- "arquetipo_descricao": 1 frase descrevendo o perfil.',
  '- "mensagem_personalizada": 2 a 3 frases conectando as RESPOSTAS dela aos benefícios da assinatura,',
  '  despertando desejo (modelo AIDA), sem prometer o que a oferta não entrega.',
  '- "motivo_plano": 1 frase explicando, no tom da marca, por que esse plano combina com ela.',
  '- "compatibilidade": número inteiro entre 80 e 99 (a maioria entre 88 e 97).',
  '- "pontos_fortes": 2 a 3 itens curtos, em segunda pessoa ("Você...").',
  'Responda SOMENTE com o objeto JSON do schema, nada além disso.',
].join('\n');

// ── Fallback determinístico (funil nunca quebra) ──
function fallbackResult(a) {
  let plano = 'trimestral';
  if (a.objetivo === 'marca_propria' || a.compromisso === 'mergulhar') plano = 'anual';
  else if (a.compromisso === 'testar') plano = 'mensal';

  let arquetipo = 'A Costureira Visionária';
  let arquetipo_descricao = 'Você costura com vontade de evoluir e entregar peças com cara de profissional.';
  if (a.objetivo === 'marca_propria') {
    arquetipo = 'A Empreendedora da Costura';
    arquetipo_descricao = 'Você não costura só por costurar — está construindo algo seu.';
  } else if (a.objetivo === 'renda_extra') {
    arquetipo = 'A Artesã Estratégica';
    arquetipo_descricao = 'Você quer transformar a sua habilidade em renda de verdade.';
  } else if (a.nivel === 'iniciante') {
    arquetipo = 'A Iniciante Apaixonada';
    arquetipo_descricao = 'Você está começando, mas já costura com o coração — e quer acertar o caimento.';
  } else if (a.nivel === 'avancada') {
    arquetipo = 'A Modelista de Mão Cheia';
    arquetipo_descricao = 'Você domina a máquina e agora quer moldes à altura do seu acabamento.';
  }

  const planoTxt = {
    mensal: 'o plano mensal pra você começar leve e sentir o ritmo dos moldes novos',
    trimestral: 'o plano trimestral pra você pegar ritmo e ver a evolução em 3 meses',
    anual: 'o plano anual, o favorito de quem quer mergulhar de vez (menos de R$ 1 por dia)',
  }[plano];

  return {
    arquetipo,
    arquetipo_descricao,
    mensagem_personalizada:
      'Pelo seu perfil, dá pra ver que o que te trava não é talento — é ter um molde profissional, ' +
      'testado e pronto chegando todo mês. Com a assinatura você recebe os moldes, a vídeo-aula de ' +
      'montagem e a ficha técnica pra finalmente ver o caimento que você sempre quis.',
    plano_recomendado: plano,
    motivo_plano: 'Recomendamos ' + planoTxt + '.',
    compatibilidade: 93,
    pontos_fortes: [
      'Você valoriza acabamento e caimento de verdade',
      'Você prefere agir a ficar só planejando',
      'Você quer evoluir com método, não no improviso',
    ],
  };
}

// ── CAPI Lead server-side (dedup com o Pixel do browser via event_id) ──
async function sendCapiLead(req, body, result) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token || !body || !body.eventId) return;
  try {
    const ipHeader = (req.headers['x-forwarded-for'] || '').split(',')[0].trim();
    const userData = { country: 'br', client_user_agent: req.headers['user-agent'] || '' };
    if (ipHeader) userData.client_ip_address = ipHeader;
    if (body.fbp) userData.fbp = body.fbp;
    if (body.fbc) userData.fbc = body.fbc;
    if (body.externalId) userData.external_id = body.externalId;

    const payload = {
      data: [{
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.eventId,
        event_source_url: req.headers.referer || 'https://moldes.thaizagoncalves.com.br/quiz',
        action_source: 'website',
        user_data: userData,
        custom_data: {
          content_name: 'Quiz Perfil de Costureira',
          content_category: 'Quiz',
          arquetipo: result.arquetipo,
          plano_recomendado: result.plano_recomendado,
        },
      }],
    };
    await fetch('https://graph.facebook.com/v21.0/' + PIXEL_ID + '/events?access_token=' + token, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (e) { /* tracking nunca derruba a resposta */ }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const answers = sanitizeAnswers(body && body.answers);

  let result;
  let source = 'ai';
  try {
    if (!process.env.ANTHROPIC_API_KEY) throw new Error('no_api_key');
    const client = new Anthropic(); // lê ANTHROPIC_API_KEY do ambiente
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: 'Respostas do quiz:\n' + JSON.stringify(answers) }],
      output_config: { format: { type: 'json_schema', schema: RESULT_SCHEMA } },
    });
    const textBlock = (message.content || []).find((b) => b.type === 'text');
    result = JSON.parse(textBlock.text);
    // guarda-chuva: garante o range da compatibilidade e um plano válido
    if (!['mensal', 'trimestral', 'anual'].includes(result.plano_recomendado)) {
      result.plano_recomendado = fallbackResult(answers).plano_recomendado;
    }
    let c = parseInt(result.compatibilidade, 10);
    if (isNaN(c)) c = 92;
    result.compatibilidade = Math.max(80, Math.min(99, c));
  } catch (e) {
    source = 'fallback';
    result = fallbackResult(answers);
  }

  await sendCapiLead(req, body, result);
  res.status(200).json({ ...result, _source: source });
};
