(() => {
  const STYLE_ID='stackup-misdeal-exposed-style';
  function addStyle(){
    if(document.getElementById(STYLE_ID))return;
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
      .mx-seq{display:grid;gap:8px;margin-top:10px}
      .mx-step{display:flex;gap:10px;align-items:flex-start;padding:10px 11px;border-radius:12px;background:#f4ecd9;border:1px solid #a87c3255;color:#725f4d;font-size:15px;line-height:1.42}
      .mx-n{width:28px;height:28px;flex:none;border-radius:9px;background:#211008;color:#d4aa58;display:grid;place-items:center;font-size:13px}
      .mx-key{margin-top:10px;padding:10px 12px;border-radius:12px;background:#211008;color:#d8c6ad;font-size:14px;line-height:1.45}
      .mx-key strong{color:#d4aa58}
    `;
    document.head.appendChild(s);
  }

  const initialDeal=`
    <div class="rule-card rule-note" data-mx-card="initial-exposed">
      <h3>CARTA DO JOGADOR EXPOSTA NO DEAL — COMO CORRIGIR</h3>
      <p>No Hold'em, primeiro é preciso separar <strong>misdeal</strong> de <strong>uma única carta exposta mais tarde na distribuição</strong>. No padrão TDA, se uma das duas primeiras cartas retiradas do baralho for exposta por erro do dealer, ou se duas cartas fechadas forem expostas durante o deal, há condição de misdeal antes da ação substancial.</p>
      <p>Se for <strong>uma única carta exposta depois dessas situações</strong>, um procedimento tradicional de Hold'em é continuar o deal e substituir apenas a carta daquele jogador. A carta exposta não pode ser escolhida nem mantida pelo jogador.</p>
      <div class="mx-seq">
        <div class="mx-step"><span class="mx-n">01</span><span>O dealer deixa a carta exposta claramente separada e identificada. Ela não volta imediatamente para dentro do stub.</span></div>
        <div class="mx-step"><span class="mx-n">02</span><span>A distribuição continua normalmente para os demais jogadores que ainda precisam receber carta, preservando a ordem do deal.</span></div>
        <div class="mx-step"><span class="mx-n">03</span><span>Quando a distribuição inicial termina, o jogador afetado recebe <strong>a carta do topo do stub</strong> como substituta.</span></div>
        <div class="mx-step"><span class="mx-n">04</span><span>A carta que havia sido exposta passa a cumprir a função da <strong>primeira burn card</strong>.</span></div>
        <div class="mx-step"><span class="mx-n">05</span><span>Por isso, antes do flop <strong>não se queima outra carta</strong>: a carta exposta já é a burn do flop.</span></div>
      </div>
      <div class="mx-key"><strong>IMPORTANTE:</strong> nesse procedimento não se reembaralha todo o baralho só porque houve uma única carta exposta mais tarde no deal. Reembaralhamento/redeal ocorre quando a situação realmente caracteriza misdeal ou quando a regra específica da casa determina outro procedimento.</div>
    </div>`;

  const endSeat=`
    <div class="rule-card" data-mx-card="end-seat">
      <h3>E SE A CARTA VIRAR JUSTAMENTE PARA O ÚLTIMO JOGADOR?</h3>
      <p>Se a carta exposta for para o jogador no <strong>fim da ordem de distribuição</strong> e a mão não se enquadrar nas condições de misdeal, a lógica é a mesma. Como não há mais cartas a entregar aos outros jogadores naquela rodada, a distribuição já está praticamente concluída.</p>
      <div class="mx-seq">
        <div class="mx-step"><span class="mx-n">01</span><span>A carta virada fica separada e visível como carta exposta.</span></div>
        <div class="mx-step"><span class="mx-n">02</span><span>Confirma-se que todos os demais jogadores receberam corretamente suas duas cartas.</span></div>
        <div class="mx-step"><span class="mx-n">03</span><span>O jogador afetado recebe imediatamente a <strong>próxima carta do topo do stub</strong> como substituta.</span></div>
        <div class="mx-step"><span class="mx-n">04</span><span>A carta originalmente exposta torna-se a burn do flop; portanto, o flop é aberto depois sem uma segunda burn.</span></div>
      </div>
      <p>Se houver dúvida sobre ser a primeira/segunda carta do baralho, duas exposições, ordem incorreta ou qualquer outra condição de misdeal, o dealer deve <strong>parar e chamar o Floor</strong> antes de continuar.</p>
    </div>`;

  const prematureBoard=`
    <div class="rule-card rule-alert" data-mx-card="premature-board">
      <h3>CARTA DE STREET EXPOSTA ANTES DA HORA</h3>
      <p>Quando flop, turn ou river é aberto <strong>antes de terminar a rodada de apostas anterior</strong>, a carta não é simplesmente aceita porque já apareceu. Ela é uma <strong>carta prematura</strong> e o procedimento procura retirar a informação indevida da decisão pendente e restaurar a aleatoriedade do restante da mão.</p>
      <div class="mx-seq">
        <div class="mx-step"><span class="mx-n">F</span><span><strong>FLOP PREMATURO:</strong> a burn do flop permanece como burn. As 3 cartas do flop prematuro voltam para o stub, o stub é reembaralhado e um novo flop de 3 cartas é aberto <strong>sem outra burn</strong>.</span></div>
        <div class="mx-step"><span class="mx-n">T</span><span><strong>TURN PREMATURO — PADRÃO TDA:</strong> a carta de turn mostrada antes da hora é <strong>colocada de lado</strong>; ela não volta imediatamente ao stub. A ação pendente do flop é concluída. Depois o dealer <strong>queima uma nova carta</strong> e usa a carta que normalmente seria o river como o <strong>novo turn</strong>. A rodada de apostas do turn é então concluída. Só depois disso a carta do turn prematuro é devolvida ao stub, o stub é reembaralhado e o <strong>river é dado sem nova burn</strong>.</span></div>
        <div class="mx-step"><span class="mx-n">R</span><span><strong>RIVER PREMATURO:</strong> a carta de river prematura volta ao stub e a burn já feita para o river permanece. Depois que a ação do turn termina, o stub é reembaralhado e um novo river é aberto <strong>sem outra burn</strong>.</span></div>
      </div>
      <div class="mx-key"><strong>ATENÇÃO NO TURN:</strong> ele é a exceção importante. Não se pega simplesmente o turn exposto, mistura de volta e abre outro turn. Primeiro ele fica separado; conclui-se a ação do flop; queima-se outra carta; a carta que seria o river vira o novo turn; e somente antes do river a carta prematura volta ao stub para o reembaralhamento.</div>
    </div>`;

  const turnExample=`
    <div class="rule-card rule-note" data-mx-card="premature-turn-example">
      <h3>EXEMPLO — TURN VIRADO COM AÇÃO AINDA NO FLOP</h3>
      <div class="mx-seq">
        <div class="mx-step"><span class="mx-n">01</span><span>O flop está na mesa e ainda há um jogador para agir, mas o dealer queima e abre o <strong>turn por engano</strong>.</span></div>
        <div class="mx-step"><span class="mx-n">02</span><span>A carta revelada não pode permanecer como turn. Ela é retirada do board e fica <strong>separada, identificada e fora do stub</strong>.</span></div>
        <div class="mx-step"><span class="mx-n">03</span><span>A ação do flop volta ao ponto correto e todos os jogadores pendentes terminam suas decisões.</span></div>
        <div class="mx-step"><span class="mx-n">04</span><span>Para formar o novo turn, o dealer <strong>queima uma carta</strong> e abre a próxima carta do stub — a carta que, sem o erro, ocuparia a sequência destinada ao river.</span></div>
        <div class="mx-step"><span class="mx-n">05</span><span>Com o novo turn na mesa, ocorre normalmente toda a rodada de apostas do turn.</span></div>
        <div class="mx-step"><span class="mx-n">06</span><span>Terminada a ação do turn, a carta prematura que estava separada volta para o stub. O stub é <strong>reembaralhado</strong>.</span></div>
        <div class="mx-step"><span class="mx-n">07</span><span>O dealer abre o river a partir do stub reembaralhado <strong>sem queimar outra carta</strong>.</span></div>
      </div>
      <div class="mx-key"><strong>POR QUÊ?</strong> Assim a carta vista antes da hora não influencia a decisão pendente no flop e ainda conserva a possibilidade de aparecer mais tarde no river após o reembaralhamento.</div>
    </div>`;

  const why=`
    <div class="rule-card" data-mx-card="why-no-extra-burn">
      <h3>BURN E REEMBARALHAMENTO — NÃO USE UMA REGRA ÚNICA PARA TODAS AS STREETS</h3>
      <p><strong>Flop e river prematuros</strong> seguem a lógica de manter a burn já válida e redistribuir a street sem outra burn após o reembaralhamento.</p>
      <p><strong>Turn prematuro</strong> tem procedimento próprio no padrão TDA: a carta prematura fica de lado, depois há <strong>uma nova burn</strong> e a carta que seria o river vira o novo turn. Após a ação do turn, a carta prematura retorna ao stub; reembaralha-se e dá-se o river sem burn adicional.</p>
    </div>`;

  const normalExposure=`
    <div class="rule-card" data-mx-card="normal-board-exposure">
      <h3>EXPOSIÇÃO ACIDENTAL × CARTA PREMATURA</h3>
      <p>Uma carta comunitária do board é naturalmente aberta quando chega sua street. O problema ocorre quando ela é mostrada <strong>antes da hora</strong>, com ação ainda pendente na street anterior, ou quando o dealer expõe uma carta que deveria permanecer fechada no stub.</p>
      <p>O jogador não deve tentar resolver a situação escolhendo aceitar a carta. O dealer preserva as cartas e o Floor aplica o procedimento. Regras locais podem diferir em detalhes, então a decisão oficial da casa prevalece.</p>
    </div>`;

  function apply(){
    const lesson=document.querySelector('.card.lesson');
    const title=lesson?.querySelector('h2');
    const grid=lesson?.querySelector('.blocks .rule-grid');
    if(!lesson||!title||!grid||title.textContent.trim().toUpperCase()!=='MISDEAL')return;
    if(grid.querySelector('[data-mx-card]'))return;
    addStyle();
    const exposed=[...grid.querySelectorAll('.rule-card')].find(el=>el.querySelector('h3')?.textContent.includes('CARTA EXPOSTA PELO DEALER'));
    if(exposed){exposed.insertAdjacentHTML('afterend',initialDeal+endSeat);}else{grid.insertAdjacentHTML('beforeend',initialDeal+endSeat);}
    const premature=[...grid.querySelectorAll('.rule-card')].find(el=>el.querySelector('h3')?.textContent.includes('TURN OU RIVER ABERTO ANTES DA HORA'));
    if(premature){premature.insertAdjacentHTML('afterend',prematureBoard+turnExample+why+normalExposure);}else{grid.insertAdjacentHTML('beforeend',prematureBoard+turnExample+why+normalExposure);}
  }

  let queued=false;
  const obs=new MutationObserver(()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;apply();});});
  obs.observe(document.documentElement,{childList:true,subtree:true});
  apply();
})();
