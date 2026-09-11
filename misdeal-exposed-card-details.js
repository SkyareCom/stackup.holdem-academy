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
      <h3>TURN OU RIVER REVELADO ANTES DA HORA — PADRÃO TDA</h3>
      <p>Se o dealer revela o <strong>turn</strong> ou o <strong>river</strong> antes de toda a ação da street anterior terminar, a carta é <strong>prematura</strong>. O jogador não pode escolher mantê-la e ela não permanece no board.</p>
      <div class="mx-seq">
        <div class="mx-step"><span class="mx-n">01</span><span><strong>PARE A AÇÃO.</strong> O dealer preserva a situação e chama o Floor quando necessário. A ação que ainda faltava na street anterior deve ser concluída.</span></div>
        <div class="mx-step"><span class="mx-n">02</span><span><strong>A BURN JÁ FEITA PERMANECE.</strong> Se a carta prematura foi aberta depois de uma burn correta, essa burn continua fora do stub como a burn daquela street.</span></div>
        <div class="mx-step"><span class="mx-n">03</span><span><strong>A CARTA PREMATURA VOLTA AO STUB.</strong> Seja turn ou river, a carta revelada antes da hora é devolvida ao restante do baralho.</span></div>
        <div class="mx-step"><span class="mx-n">04</span><span><strong>REEMBARALHE O STUB.</strong> O stub inteiro restante, agora incluindo a carta prematura, é reembaralhado fechado. Não entram as cartas dos jogadores, o muck nem as burns anteriores.</span></div>
        <div class="mx-step"><span class="mx-n">05</span><span><strong>REDISTRIBUA A MESMA STREET SEM NOVA BURN.</strong> Para turn prematuro, abre-se um novo turn. Para river prematuro, abre-se um novo river. Não se queima outra carta.</span></div>
      </div>
      <div class="mx-key"><strong>MEMORIZE:</strong> burn permanece → carta prematura volta ao stub → ação anterior termina → stub é reembaralhado → mesma street é aberta novamente sem nova burn.</div>
    </div>`;

  const turnExample=`
    <div class="rule-card rule-note" data-mx-card="premature-turn-example">
      <h3>EXEMPLO — TURN VIRADO COM AÇÃO AINDA NO FLOP</h3>
      <div class="mx-seq">
        <div class="mx-step"><span class="mx-n">01</span><span>O flop está na mesa e ainda há jogador para agir, mas o dealer queima uma carta e abre o <strong>turn cedo demais</strong>.</span></div>
        <div class="mx-step"><span class="mx-n">02</span><span>A burn do turn fica onde está; ela continua sendo a burn válida daquela street.</span></div>
        <div class="mx-step"><span class="mx-n">03</span><span>O turn prematuro é retirado do board e devolvido ao stub.</span></div>
        <div class="mx-step"><span class="mx-n">04</span><span>A ação pendente do flop é concluída.</span></div>
        <div class="mx-step"><span class="mx-n">05</span><span>O stub, incluindo a carta de turn prematura, é reembaralhado fechado.</span></div>
        <div class="mx-step"><span class="mx-n">06</span><span>Abre-se um <strong>novo turn diretamente do stub reembaralhado, sem outra burn</strong>.</span></div>
      </div>
    </div>`;

  const riverExample=`
    <div class="rule-card" data-mx-card="premature-river-example">
      <h3>EXEMPLO — RIVER VIRADO COM AÇÃO AINDA NO TURN</h3>
      <div class="mx-seq">
        <div class="mx-step"><span class="mx-n">01</span><span>Há ação pendente no turn, mas o dealer queima e abre o <strong>river cedo demais</strong>.</span></div>
        <div class="mx-step"><span class="mx-n">02</span><span>A burn do river permanece como a burn válida.</span></div>
        <div class="mx-step"><span class="mx-n">03</span><span>O river prematuro volta para o stub.</span></div>
        <div class="mx-step"><span class="mx-n">04</span><span>A ação pendente do turn é concluída.</span></div>
        <div class="mx-step"><span class="mx-n">05</span><span>O stub é reembaralhado fechado, incluindo a carta de river prematura.</span></div>
        <div class="mx-step"><span class="mx-n">06</span><span>Abre-se o <strong>novo river sem queimar outra carta</strong>.</span></div>
      </div>
    </div>`;

  const why=`
    <div class="rule-card" data-mx-card="why-no-extra-burn">
      <h3>POR QUE NÃO HÁ OUTRA BURN?</h3>
      <p>A burn daquela street já foi feita corretamente. Ela protegeu o topo do stub naquele momento e continua válida. O objetivo do reembaralhamento é devolver aleatoriedade depois da exposição prematura; fazer uma segunda burn acrescentaria uma alteração desnecessária.</p>
      <p>No padrão TDA atual, <strong>turn e river prematuros usam a mesma lógica</strong>: manter a burn, devolver a carta prematura, reembaralhar o stub e redistribuir a street sem outra burn.</p>
    </div>`;

  const normalExposure=`
    <div class="rule-card" data-mx-card="normal-board-exposure">
      <h3>EXPOSIÇÃO ACIDENTAL × CARTA PREMATURA</h3>
      <p>Uma carta comunitária é naturalmente aberta quando chega sua street. O erro é mostrá-la <strong>antes de terminar a ação da street anterior</strong>. Nesse caso, ela é prematura e segue o procedimento acima.</p>
      <p>Regras de uma casa específica ou órgão regulador podem estabelecer procedimento diferente. Em jogo organizado, o jogador não deve corrigir o baralho por conta própria: pare e deixe Dealer/Floor aplicar a regra vigente.</p>
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
    if(premature){premature.insertAdjacentHTML('afterend',prematureBoard+turnExample+riverExample+why+normalExposure);}else{grid.insertAdjacentHTML('beforeend',prematureBoard+turnExample+riverExample+why+normalExposure);}
  }

  const root=document.getElementById('root');
  let raf=0;
  if(root){
    new MutationObserver(()=>{
      cancelAnimationFrame(raf);
      raf=requestAnimationFrame(apply);
    }).observe(root,{childList:true});
  }
  apply();
})();
