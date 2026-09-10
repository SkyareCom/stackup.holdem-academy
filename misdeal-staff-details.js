(() => {
  const STYLE_ID='stackup-misdeal-staff-style';
  function addStyles(){
    if(document.getElementById(STYLE_ID))return;
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
      .rule-grid{display:grid;gap:12px}
      .rule-card{padding:15px 16px;border-radius:17px;background:var(--c2,#e7dcc2);border:1px solid #a87c324d}
      .rule-card h3{margin:0 0 7px;font-size:21px;color:var(--gd,#08372d);text-transform:uppercase}
      .rule-card p{margin:0;color:var(--m,#725f4d);font-size:16px;line-height:1.5}
      .rule-card p+p{margin-top:8px}.rule-card strong{color:var(--ink,#25170f)}
      .rule-note{background:#e6d8b9;border-color:#c99539}
      .rule-alert{background:#ead8c5;border-color:#a86b3c}
      .rule-seq{display:grid;gap:8px;margin-top:9px}
      .rule-step{display:flex;gap:10px;align-items:flex-start;padding:10px 11px;border-radius:13px;background:#f4ecd9;border:1px solid #a87c3255;color:#725f4d;font-size:15px;line-height:1.4}
      .rule-n{width:28px;height:28px;flex:none;border-radius:9px;background:#211008;color:#d4aa58;display:grid;place-items:center;font-size:14px}
      .staff-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
      .staff-card{padding:13px;border-radius:15px;background:#f4ecd9;border:1px solid #a87c3255}
      .staff-card strong{display:block;color:#08372d;font-size:17px;text-transform:uppercase;margin-bottom:4px}
      .staff-card span{display:block;color:#725f4d;font-size:14px;line-height:1.4}
      @media(max-width:390px){.staff-grid{grid-template-columns:1fr}.rule-card h3{font-size:19px}.rule-card p{font-size:15px}}
    `;
    document.head.appendChild(s);
  }

  const misdeal=`
    <div class="rule-grid">
      <div class="rule-card"><h3>O QUE É MISDEAL?</h3><p><strong>Misdeal</strong> é uma distribuição inicial inválida. Quando o erro é detectado a tempo, a mão é anulada antes de prosseguir e as cartas são distribuídas novamente.</p><p>Nem todo erro do dealer cancela a mão. Depois que ocorre <strong>ação substancial</strong>, vários erros deixam de permitir misdeal e passam a ser corrigidos com a mão em andamento.</p></div>

      <div class="rule-card"><h3>EXEMPLOS DE MISDEAL</h3><p>Em regras de torneio como as da Poker TDA, exemplos incluem: primeiro cartão distribuído ao assento errado; cartas para jogador sem direito à mão; jogador com direito à mão não receber cartas; quantidade errada de cartas; duas ou mais cartas viradas/boxed no deal inicial; carta que não pertence ao baralho da modalidade; e certas exposições causadas pelo dealer.</p></div>

      <div class="rule-card"><h3>CARTA EXPOSTA PELO DEALER</h3><p>No Hold'em, se <strong>uma das duas primeiras cartas retiradas do baralho</strong> for exposta por erro do dealer, isso caracteriza misdeal quando ainda é possível declará-lo. Também é misdeal se <strong>duas cartas fechadas</strong> forem expostas durante a distribuição inicial.</p><p>Uma única carta exposta mais tarde na distribuição <strong>não significa automaticamente que toda a mão será anulada</strong>. O procedimento exato pode variar conforme a casa; normalmente o dealer interrompe a correção improvisada e chama o Floor quando houver dúvida.</p></div>

      <div class="rule-card"><h3>O QUE É A CARTA QUEIMADA?</h3><p>A <strong>burn card</strong>, ou carta queimada, é uma carta retirada do topo do baralho e colocada fechada no muck antes de abrir cada nova street comunitária. No Hold'em há normalmente uma burn antes do Flop, uma antes do Turn e uma antes do River.</p><p>Ela existe para <strong>proteger o topo do baralho</strong>, e não para tentar manter uma sequência “predestinada” de cartas.</p></div>

      <div class="rule-card"><h3>CARTA “QUEIMADA” OU EXPOSTA SEM QUERER</h3><p>Se o dealer expõe ou retira uma carta por engano, a mão <strong>não deve ser automaticamente cancelada</strong>. O tratamento depende de quando ocorreu o erro, se houve ação e se a identidade/ordem das cartas foi comprometida.</p><p>Em procedimentos comuns de Hold'em, uma única carta fechada exposta durante o deal, fora das situações que exigem misdeal, pode ser substituída ao final da distribuição e a carta exposta passa a cumprir função de burn. Como regras locais podem variar, o <strong>Floor deve decidir</strong> em caso de irregularidade real.</p></div>

      <div class="rule-card"><h3>AÇÃO SUBSTANCIAL — O PONTO DE CORTE</h3><p>Segundo o padrão Poker TDA, há <strong>ação substancial</strong> quando ocorre: <strong>(A)</strong> qualquer sequência de 2 ações em ordem, sendo que pelo menos uma coloca fichas no pote; ou <strong>(B)</strong> qualquer combinação de 3 ações em ordem, como check, bet, raise, call ou fold. Os blinds postados não contam para essa definição.</p><p>Depois desse ponto, um misdeal normalmente <strong>não pode mais ser declarado</strong>.</p></div>

      <div class="rule-card rule-note"><h3>ANTES DA AÇÃO SUBSTANCIAL</h3><p>Se existe uma condição válida de misdeal e ela é identificada <strong>antes</strong> da ação substancial, o deal é cancelado e ocorre uma nova distribuição.</p><p>O re-deal é uma repetição da mesma mão: <strong>o Button não avança, os limites/blinds permanecem e não entram novos jogadores</strong> apenas por causa do misdeal.</p></div>

      <div class="rule-card rule-alert"><h3>DEPOIS DA AÇÃO SUBSTANCIAL</h3><p>Depois da ação substancial, a regra geral é: <strong>a mão continua</strong>. Um jogador que descubra ter quantidade inválida de cartas pode ter sua própria mão morta, mas isso não cancela automaticamente a mão dos demais.</p><p>O dealer não deve queimar cartas extras para tentar “voltar à ordem original”. Nas streets seguintes, mantém-se o procedimento normal de <strong>uma burn por street</strong>.</p></div>

      <div class="rule-card"><h3>EXEMPLO PRÁTICO</h3><div class="rule-seq"><div class="rule-step"><span class="rule-n">01</span><span>As cartas são distribuídas.</span></div><div class="rule-step"><span class="rule-n">02</span><span>UTG dá fold.</span></div><div class="rule-step"><span class="rule-n">03</span><span>O próximo jogador dá call, colocando fichas no pote.</span></div><div class="rule-step"><span class="rule-n">04</span><span>Já ocorreram 2 ações em ordem, uma delas com fichas: há <strong>ação substancial</strong>.</span></div><div class="rule-step"><span class="rule-n">05</span><span>Outro jogador percebe que recebeu 3 cartas. A mão geral não volta ao início; o Floor trata a mão irregular daquele jogador e o jogo prossegue.</span></div></div></div>

      <div class="rule-card"><h3>FLOP COM 4 CARTAS</h3><p>Um flop com quatro cartas é uma irregularidade, mas <strong>não significa refazer toda a mão</strong>. O Floor deve ser chamado. No padrão TDA, as quatro cartas são embaralhadas fechadas; uma é escolhida aleatoriamente para ser a próxima burn e as outras três formam o flop.</p></div>

      <div class="rule-card"><h3>FLOP SEM BURN</h3><p>Se o dealer abriu três cartas de flop sem queimar antes e <strong>ainda não houve ação</strong>, o erro pode ser corrigido pelo procedimento do Floor. Se <strong>qualquer ação já ocorreu, até mesmo um check</strong>, o flop original permanece e o jogo continua; depois, usa-se apenas uma burn normal para o Turn.</p></div>

      <div class="rule-card"><h3>TURN OU RIVER ABERTO ANTES DA HORA</h3><p>Uma carta comunitária aberta prematuramente também não é automaticamente um misdeal. É uma <strong>carta prematura</strong> e deve ser tratada pelo Floor com o procedimento aplicável, preservando a aleatoriedade do restante do baralho.</p></div>

      <div class="rule-card"><h3>MÃO RECOLHIDA POR ENGANO</h3><p>Se o dealer recolhe uma mão viva por engano e ela <strong>não pode mais ser identificada com 100% de certeza</strong>, ela pode ser declarada morta. Isso é diferente de misdeal: não significa anular todas as outras mãos.</p><p>Por isso o jogador também tem responsabilidade de <strong>proteger suas cartas</strong> até o fim da mão.</p></div>

      <div class="rule-card"><h3>BARALHO VICIADO / FOULED DECK</h3><p>Se o baralho estiver realmente inválido — por exemplo, com duas cartas exatamente do mesmo valor e naipe — a situação é mais grave. No padrão TDA, um <strong>fouled deck</strong> pode interromper a mão mesmo depois de ação substancial, e as apostas são devolvidas conforme a decisão oficial.</p></div>

      <div class="rule-card rule-note"><h3>REGRA DE OURO</h3><p><strong>Dealer não deve improvisar uma correção importante.</strong> Em misdeal, carta exposta, burn incorreta, flop irregular, carta prematura ou dúvida sobre mão morta, pare a ação e chame o <strong>Floor</strong>. A regra da casa e a decisão do responsável prevalecem.</p></div>
    </div>`;

  const staff=`
    <div class="rule-grid">
      <div class="rule-card"><h3>COMO O STAFF SE ORGANIZA?</h3><p>O staff existe para manter o jogo <strong>correto, rápido, seguro e imparcial</strong>. Nem todo funcionário tem a mesma autoridade: o Dealer conduz a mão; o Floor resolve irregularidades; e a direção define e supervisiona as regras do evento.</p></div>

      <div class="rule-card"><h3>DEALER / CRUPIÊ</h3><p>É quem conduz cada mão na mesa. Prepara e controla o baralho, confirma blinds e antes, distribui as cartas, controla a ordem de ação, anuncia apostas quando necessário, organiza o pote, queima e abre as cartas comunitárias e conduz o showdown.</p><p>Também deve manter cartas e fichas visíveis, evitar ação fora de ordem e chamar o Floor sempre que houver uma situação que exija interpretação de regra.</p></div>

      <div class="rule-card"><h3>O QUE O DEALER NÃO DEVE FAZER</h3><p>O Dealer não deve dar conselho estratégico, sugerir se um jogador deve pagar ou desistir, revelar informação de uma mão viva, favorecer jogadores ou inventar uma regra para encerrar rapidamente uma discussão.</p><p>Em decisão controversa, sua função é <strong>parar a ação, preservar a situação da mesa e chamar o Floor</strong>.</p></div>

      <div class="rule-card"><h3>FLOOR / FLOORPERSON</h3><p>É a autoridade operacional chamada para resolver problemas de regra na área de jogo. Ele ouve o Dealer e os jogadores envolvidos, reconstrói a sequência dos fatos e decide como a mão deve prosseguir.</p><p>Exemplos: misdeal, aposta ambígua, ação fora de vez, carta exposta, pote incorreto, mão morta, jogador com número errado de cartas, disputa sobre showdown e aplicação de penalidades.</p></div>

      <div class="rule-card"><h3>DIRETOR DO TORNEIO — TD</h3><p>O <strong>Tournament Director</strong> é responsável pela condução geral do torneio. Define ou aplica a política do evento, supervisiona Floors e Dealers e decide questões de maior impacto.</p><p>Também acompanha estrutura de blinds, níveis, intervalos, balanceamento e quebra de mesas, seating, penalidades, registros operacionais e integridade competitiva.</p></div>

      <div class="rule-card"><h3>QUEM TEM A PALAVRA FINAL?</h3><p>Durante uma irregularidade, a decisão do <strong>Floor ou da direção competente</strong> prevalece sobre opiniões de jogadores e sobre uma interpretação inicial do Dealer. Em casos incomuns, o responsável pode considerar a equidade e o melhor interesse do jogo além da aplicação mecânica de uma regra.</p></div>

      <div class="rule-card"><h3>BRUSH / SEATING</h3><p>Em muitas casas, o <strong>Brush</strong> ou responsável de seating administra lista de espera, abertura de mesas, assentos disponíveis e movimentação de jogadores. Em cash game, costuma coordenar mudanças e preenchimento das mesas.</p></div>

      <div class="rule-card"><h3>CHIP RUNNER / APOIO DE FICHAS</h3><p>Auxilia na movimentação controlada de fichas, compras autorizadas, trocas de denominação e abastecimento operacional. Em torneios, procedimentos de color-up e inventário seguem controle da organização, não decisões individuais dos jogadores.</p></div>

      <div class="rule-card"><h3>CAIXA / REGISTRO</h3><p>Cuida de entradas, reentradas quando permitidas, pagamentos e controles financeiros do evento ou cash game. Não decide a ação de uma mão; questões de regra da mesa pertencem ao Dealer, Floor ou direção.</p></div>

      <div class="rule-card"><h3>SEGURANÇA E SUPERVISÃO</h3><p>Dependendo da casa, equipes de segurança e supervisão dão suporte em conflitos, proteção de valores, comportamento inadequado e cumprimento das políticas do estabelecimento. A integridade da mesa é responsabilidade compartilhada entre operação e jogadores.</p></div>

      <div class="rule-card"><h3>QUANDO CHAMAR O FLOOR?</h3><div class="staff-grid"><div class="staff-card"><strong>MISDEAL</strong><span>Erro relevante na distribuição.</span></div><div class="staff-card"><strong>APOSTA CONFUSA</strong><span>Valor ou declaração ambígua.</span></div><div class="staff-card"><strong>AÇÃO FORA DE VEZ</strong><span>Jogador age antes da sua vez.</span></div><div class="staff-card"><strong>CARTA EXPOSTA</strong><span>Dealer ou jogador revela carta irregularmente.</span></div><div class="staff-card"><strong>POTE / SIDE POT</strong><span>Dúvida sobre valores ou elegibilidade.</span></div><div class="staff-card"><strong>SHOWDOWN</strong><span>Disputa sobre leitura, muck ou mão vencedora.</span></div></div></div>

      <div class="rule-card"><h3>COMO O JOGADOR DEVE AGIR</h3><p>Ao perceber um problema, diga claramente <strong>“Floor”</strong> e evite alterar a situação. Não misture suas cartas com o muck, não recolha apostas de volta e não mova fichas para “corrigir” o pote por conta própria.</p><p>Explique apenas o que aconteceu, na ordem dos fatos. Isso facilita uma decisão justa.</p></div>

      <div class="rule-card rule-note"><h3>DEALER × BUTTON</h3><p><strong>Dealer/Crupiê</strong> é a pessoa que conduz fisicamente a mesa. <strong>Dealer Button (BTN)</strong> é o marcador que representa a posição nominal do dealer entre os jogadores e determina referências de blinds e ordem de ação. São conceitos diferentes.</p></div>
    </div>`;

  function render(){
    const lesson=document.querySelector('.card.lesson');
    const title=lesson?.querySelector('h2');
    const blocks=lesson?.querySelector('.blocks');
    if(!lesson||!title||!blocks)return;
    const k=title.textContent.trim().toUpperCase();
    if(k==='MISDEAL'){
      if(blocks.dataset.misdealExpanded==='1')return;
      addStyles();blocks.innerHTML=misdeal;blocks.dataset.misdealExpanded='1';
    }else if(k==='FUNÇÕES DO STAFF'){
      if(blocks.dataset.staffExpanded==='1')return;
      addStyles();blocks.innerHTML=staff;blocks.dataset.staffExpanded='1';
    }
  }
  new MutationObserver(render).observe(document.documentElement,{childList:true,subtree:true});
  render();
})();