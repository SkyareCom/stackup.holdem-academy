const fs=require('fs');
const path=require('path');
const vm=require('vm');

const ROOT=__dirname;
const context={window:{}};
vm.createContext(context);
for(const file of [
  'i18n-en-us-phrases-1.js','i18n-en-us-phrases-2.js','i18n-en-us-phrases-3.js',
  'i18n-en-us-words.js','i18n-en-us-words-extra-1.js','i18n-en-us-words-extra-2.js','i18n-en-us-words-extra-3.js','i18n-en-us-words-extra-4.js'
]) vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),context,{filename:file});

const phrasePairs=(context.window.StackupI18nPhrases||[]).slice().sort((a,b)=>b[0].length-a[0].length);
const words=context.window.StackupI18nWords||{};
const failures=[];
let checks=0;
const check=(name,ok,detail='')=>{checks++;if(!ok)failures.push(`${name}${detail?`: ${detail}`:''}`);};

function escapeRegExp(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
function matchCase(source,target){
  if(source===source.toUpperCase())return target.toUpperCase();
  if(source===source.toLowerCase())return target.toLowerCase();
  if(source[0]&&source[0]===source[0].toUpperCase())return target.charAt(0).toUpperCase()+target.slice(1);
  return target;
}
function phraseRegex(pt){
  const body=escapeRegExp(pt);
  const startsWord=/^[\p{L}\p{M}\p{N}]/u.test(pt);
  const endsWord=/[\p{L}\p{M}\p{N}]$/u.test(pt);
  return new RegExp(`${startsWord?'(?<![\\p{L}\\p{M}\\p{N}])':''}${body}${endsWord?'(?![\\p{L}\\p{M}\\p{N}])':''}`,'giu');
}
function protectPokerNotation(input){
  const slots=[];
  const hold=value=>{const i=slots.push(value)-1;return `\uE100${i}\uE101`;};
  let out=String(input);
  out=out.replace(/(?:10|[2-9AKQJ])[♠♥♦♣]/g,hold);
  out=out.replace(/\b(?:10|[2-9AKQJ])(?:-(?:10|[2-9AKQJ])){1,8}\b/g,hold);
  out=out.replace(/\b(?:[AKQJT2-9]{2})(?:s|o)?\b/g,hold);
  return {out,restore:value=>value.replace(/\uE100(\d+)\uE101/g,(_,i)=>slots[Number(i)]||'')};
}
function translate(input){
  if(!input||!/[A-Za-zÀ-ÿ]/.test(input))return input;
  if(/^(?:10|[2-9AKQJ])$/.test(String(input).trim()))return input;
  const protectedText=protectPokerNotation(input);
  let out=protectedText.out;
  const slots=[];
  for(const [pt,en] of phrasePairs){
    out=out.replace(phraseRegex(pt),match=>{const i=slots.push(matchCase(match,en))-1;return `\uE000${i}\uE001`;});
  }
  out=out.replace(/[\p{L}\p{M}]+(?:[-’'][\p{L}\p{M}]+)*/gu,token=>{
    const translated=words[token.toLocaleLowerCase('pt-BR')];
    return translated?matchCase(token,translated):token;
  });
  out=out.replace(/\uE000(\d+)\uE001/g,(_,i)=>slots[Number(i)]||'');
  return protectedText.restore(out);
}

check('large phrase catalog',phrasePairs.length>=400,`found ${phrasePairs.length}`);
check('large word catalog',Object.keys(words).length>=3000,`found ${Object.keys(words).length}`);
check('Ace card with suit preserved',translate('A♠ K♠')==='A♠ K♠',translate('A♠ K♠'));
check('Ace-high chain preserved',translate('A-K-Q-J-10')==='A-K-Q-J-10',translate('A-K-Q-J-10'));
check('standalone Ace rank preserved',translate('A')==='A',translate('A'));
check('phrase boundary protects INFORMATION',translate('INFORMAÇÃO')==='INFORMATION',translate('INFORMAÇÃO'));
check('no informaction regression',!translate('INFORMAÇÃO').toLowerCase().includes('informaction'),translate('INFORMAÇÃO'));
check('known sentence 1',translate('Compare as cinco melhores cartas.')==='Compare the best five cards.',translate('Compare as cinco melhores cartas.'));
check('known sentence 2',translate('Procedimentos irregulares devem seguir regra da casa.')==='Irregular procedures must follow house rules.',translate('Procedimentos irregulares devem seguir regra da casa.'));
check('known sentence 3',translate('Como as cartas são fechadas e não existe board, a informação vem principalmente do padrão de apostas e da quantidade de cartas trocadas.').startsWith('Because the cards are face down'),translate('Como as cartas são fechadas e não existe board, a informação vem principalmente do padrão de apostas e da quantidade de cartas trocadas.'));

const sourceFiles=fs.readdirSync(ROOT).filter(file=>/\.(?:js|html)$/.test(file)&&!file.startsWith('i18n-en-us')&&!file.startsWith('test-')&&!file.startsWith('audit-'));
const unmappedAccented=new Map();
for(const file of sourceFiles){
  const source=fs.readFileSync(path.join(ROOT,file),'utf8');
  const tokens=source.match(/[\p{L}\p{M}]+(?:[-’'][\p{L}\p{M}]+)*/gu)||[];
  for(const token of tokens){
    const key=token.toLocaleLowerCase('pt-BR');
    if(/[áàâãéêíóôõúç]/i.test(token)&&!Object.prototype.hasOwnProperty.call(words,key)&&key!=='aã'){
      if(!unmappedAccented.has(key))unmappedAccented.set(key,new Set());
      unmappedAccented.get(key).add(file);
    }
  }
}
check('all accented Portuguese source words mapped',unmappedAccented.size===0,[...unmappedAccented].map(([w,f])=>`${w} (${[...f].join(',')})`).join('; '));

// Strict PT-BR residue dictionary. Terms here are deliberately words that should never
// remain visible in an EN-US interface. Ambiguous English words (a, as, do, no, etc.) are excluded.
const ptResidue=new Set(`
aba abaixo aberta abertas aberto abertos acao acoes acima acerto acertos acompanha acompanham acompanhar acontece acontecendo acontece acontecem acordo ativa ativas ativo ativos adversario adversarios ajuda ajustar ainda aleatorio aleatoria aleatorios aleatorias alguem alguma algumas algum alguns analisar antes aposta apostas apostar apostado apostada apostando aprenda aprender aprendizado apresenta apresentado apresentada aqui area areas assim aumenta aumentam aumentar baixo baixa baixos baixas baralho base basta bem blinds botao botoes busca cada caixa caminho campo campos carta cartas caso casos cassino categoria categorias centro certo certa certos certas chave clique cobrar combina combinacao combinacoes combinar comeca comecar comecando comum comuns conceito conceitos confira confirmar continua continuar correto correta corretos corretas criterio criterios cuidado dados dealer decisao decisoes definir definicao definicoes depende depois descricao detalhes diferente diferentes dinheiro direto direita disponivel disponiveis distribuicao distribui distribuida distribuidas distribuido distribuidos dividir dupla duplas durante exemplo exemplos escolha escolher escolhido escolhida etapa etapas evita evitar exibida exibidas exibido exibidos explicacao explicacoes familia fase fases fecha fechar fechamento finaliza finalizar fichas fixa fixas fixo fixos fluxo forma formas forte fortes fraca fracas fraco fracos ganhar ganha ganham ganhou geral gira giram grande grandes hand historia ideal identifica identificar importante importantes inicio inicial inicia iniciar inteira inteiras inteiro inteiros intervencao invalida invalidas invalido invalidos jogador jogadores jogada jogadas jogar jogo jogos leitura limite limites logica logicas maior maiores menor menores mesa mesas mesma mesmas mesmo mesmos melhor melhores menu modalidade modalidades modo modos moeda moedas mostra mostrar mostrado mostrada necessidade necessario necessaria nenhuma nenhum nivel niveis nova novas novo novos objetivo objetivos observe observar ocorre ordem outras outros padrao padroes pagamento pagamentos palavra palavras parte partes passo passos pequena pequenas pequeno pequenos perfil perfis pergunta perguntas primeiro primeira primeiros primeiras pratica praticas precisa precisam premio premios preparacao principal principais procedimento procedimentos proxima proximas proximo proximos propria proprias proprio proprios protege proteger quando quantidade quantidades quem ranking regra regras regular resultado resultados rodada rodadas saber selecao selecionar sempre sequencia sequencias simulador simuladores situacao situacoes sobre somente sua suas seu seus tabela tabelas tamanho tamanhos todas todos torneio torneios treino treinos troca trocas trocar ultima ultimas ultimo ultimos usar uso valor valores vence vencem vencedor vencedores verdade verdadeira verdadeiras verdadeiro verdadeiros vez vezes visivel visiveis voltar voce voces
acao ações ação acerto acertos adversário adversários alguém área áreas botão botões combinação combinações começar conteúdo conteúdos capítulo capítulos definição definições decisão decisões descrição distribuição explicação explicações família função funções início inválida inválidas inválido inválidos lógica lógicas matemática modalidade modalidades necessário necessária ninguém nível níveis opção opções padrão padrões posição posições prática práticas prêmio prêmios próxima próximas próximo próximos própria próprias próprio próprios questão questões sequência sequências situação situações só também título títulos última últimas último últimos você vocês
`.trim().split(/\s+/).map(x=>x.toLocaleLowerCase('pt-BR')));

const literal=/('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`)/gs;
const residue=[];
const unchanged=[];
for(const file of sourceFiles){
  const source=fs.readFileSync(path.join(ROOT,file),'utf8');
  for(const match of source.matchAll(literal)){
    let raw=match[0].slice(1,-1);
    if(raw.length>5000)continue;
    raw=raw.replace(/\\n|\\t/g,' ').replace(/\$\{[^}]*\}/g,' ');
    raw=raw.replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&(?:#\d+|\w+);/g,' ');
    if(!/[A-Za-zÀ-ÿ]/.test(raw))continue;
    const sourceTokens=raw.match(/[\p{L}\p{M}]+/gu)||[];
    const likelyPortuguese=sourceTokens.some(token=>/[áàâãéêíóôõúç]/i.test(token)||ptResidue.has(token.toLocaleLowerCase('pt-BR')));
    if(!likelyPortuguese)continue;
    const output=translate(raw);
    const outputTokens=output.match(/[\p{L}\p{M}]+/gu)||[];
    const bad=outputTokens.filter(token=>{
      const k=token.toLocaleLowerCase('pt-BR');
      return k!=='aã'&&(/[áàâãéêíóôõúç]/i.test(token)||ptResidue.has(k));
    });
    if(bad.length)residue.push(`${file}: ${[...new Set(bad)].join(', ')} :: ${output.replace(/\s+/g,' ').slice(0,240)}`);

    const srcLower=new Set(sourceTokens.map(t=>t.toLocaleLowerCase('pt-BR')));
    const outLower=new Set(outputTokens.map(t=>t.toLocaleLowerCase('pt-BR')));
    for(const token of srcLower){
      if(token.length<4||!outLower.has(token)||!ptResidue.has(token))continue;
      unchanged.push(`${token} (${file})`);
    }
  }
}
check('no Portuguese residue in translated human-facing literals',residue.length===0,residue.slice(0,80).join(' | '));
check('no known Portuguese token survives translation unchanged',unchanged.length===0,[...new Set(unchanged)].slice(0,120).join('; '));

const index=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
check('header logo is direct PNG',index.includes('src="./header-logo-transparent.png?v=1"'));
check('old inline SVG logo removed',!index.includes('<svg class="logo"'));
check('Love Ya Like A Sister preserved',index.includes("family=Love+Ya+Like+A+Sister")&&index.includes("font-family:'Love Ya Like A Sister',cursive"));
check('English runtime loaded directly',index.includes('i18n-en-us-words-extra-1.js?v=1')&&index.includes('i18n-en-us.js?v=3'));
const logoPath=path.join(ROOT,'header-logo-transparent.png');
check('header logo file exists',fs.existsSync(logoPath));
if(fs.existsSync(logoPath)){
  const bytes=fs.readFileSync(logoPath);
  check('header logo is PNG',bytes.subarray(0,8).equals(Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a])));
  check('header logo is non-empty',bytes.length>1000,`${bytes.length} bytes`);
}
const cover=fs.readFileSync(path.join(ROOT,'cover-layout.js'),'utf8');
check('cover uses ASCII logo path',cover.includes("./header-logo-transparent.png?v=1"));
check('cover is language aware',cover.includes("stackup-language-v1")&&cover.includes('LEARN POKER'));
const sw=fs.readFileSync(path.join(ROOT,'sw.js'),'utf8');
check('service worker v68',sw.includes("stackup-academy-v68")&&sw.includes('SW_VERSION=68'));
check('service worker caches English extras',sw.includes('i18n-en-us-phrases-3.js')&&[1,2,3,4].every(i=>sw.includes(`i18n-en-us-words-extra-${i}.js`)));
check('service worker caches restored logo',sw.includes('header-logo-transparent.png'));

if(failures.length){
  console.error(`i18n audit: ${checks-failures.length}/${checks} passed, ${failures.length} failed`);
  for(const failure of failures)console.error(`FAIL: ${failure}`);
  process.exit(1);
}
console.log(`i18n audit: ${checks}/${checks} passed`);
console.log(`phrases: ${phrasePairs.length}; word mappings: ${Object.keys(words).length}; source files audited: ${sourceFiles.length}`);
