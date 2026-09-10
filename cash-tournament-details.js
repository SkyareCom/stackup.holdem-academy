(() => {
  const STYLE_ID='stackup-cash-tournament-style';

  function addStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
      .ct-grid{display:grid;gap:12px}
      .ct-card{padding:15px 16px;border-radius:17px;background:var(--c2,#e7dcc2);border:1px solid #a87c324d}
      .ct-card h3{margin:0 0 8px;font-size:21px;color:var(--gd,#08372d);text-transform:uppercase}
      .ct-card p{margin:0;color:var(--m,#725f4d);font-size:16px;line-height:1.5}
      .ct-card p+p{margin-top:8px}.ct-card strong{color:var(--ink,#25170f)}
      .ct-note{background:#e6d8b9;border-color:#c99539}
      .ct-alert{background:#ead8c5;border-color:#a86b3c}
      .ct-mini-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:9px}
      .ct-mini{padding:11px 12px;border-radius:14px;background:#f4ecd9;border:1px solid #a87c3255}
      .ct-mini strong{display:block;color:#08372d;font-size:16px;text-transform:uppercase;margin-bottom:4px}
      .ct-mini span{display:block;color:#725f4d;font-size:14px;line-height:1.4}
      .ct-tag{display:inline-block;margin-top:7px;padding:4px 8px;border-radius:999px;background:#211008;color:#d4aa58;font-size:12px;letter-spacing:.04em;text-transform:uppercase}
      @media(max-width:390px){.ct-mini-grid{grid-template-columns:1fr}.ct-card h3{font-size:19px}.ct-card p{font-size:15px}}
    `;
    document.head.appendChild(s);
  }

  const cash=`
    <div class="ct-grid">
      <div class="ct-card"><h3>O QUE É CASH GAME?</h3><p>No <strong>cash game</strong>, as fichas representam dinheiro real na proporção definida pela mesa. Você compra fichas, joga enquanto quiser dentro das regras da casa e, ao sair, troca o saldo por dinheiro.</p><p>Diferentemente de um torneio, <strong>não existe eliminação definitiva</strong>: se perder o stack, normalmente pode fazer novo buy-in enquanto a mesa estiver aberta e houver assento.</p></div>

      <div class="ct-card"><h3>BLINDS E STAKES</h3><p>Os valores da mesa são normalmente identificados pelos blinds. Exemplo: <strong>R$ 5 / R$ 10</strong> significa Small Blind de R$ 5 e Big Blind de R$ 10.</p><p>Esses valores definem o <strong>stake</strong> da mesa e servem como referência para comparar stack, potes e tamanhos de aposta. Um stack de R$ 1.000 em 5/10 corresponde a <strong>100 BB</strong>.</p></div>

      <div class="ct-card"><h3>BUY-IN, REBUY E TOP-UP</h3><p><strong>Buy-in</strong> é o valor usado para entrar na mesa. A casa pode estabelecer mínimo e máximo, muitas vezes expressos em Big Blinds.</p><p><strong>Rebuy</strong> é comprar um novo stack depois de perder fichas ou ficar sem elas. <strong>Top-up</strong> é completar o stack sem necessariamente ter quebrado, respeitando o limite máximo da mesa.</p></div>

      <div class="ct-card"><h3>TABLE STAKES</h3><p>Na regra tradicional de <strong>table stakes</strong>, somente as fichas que estavam legitimamente na mesa no início da mão podem ser usadas naquela mão. Não se coloca dinheiro extra no meio da ação para cobrir uma aposta.</p><p>Também não se deve retirar parte do stack e continuar jogando com menos fichas apenas para proteger lucro, prática conhecida como <strong>going south</strong>, salvo regra específica da casa.</p></div>

      <div class="ct-card"><h3>RAKE</h3><p><strong>Rake</strong> é a taxa cobrada pela casa para operar o jogo. Pode ser uma porcentagem do pote com limite máximo (<strong>cap</strong>), uma cobrança por tempo ou outro modelo.</p><p>O rake afeta principalmente potes pequenos e marginais: quanto maior o custo relativo da taxa, mais seletivo o jogador precisa ser em situações de pequeno valor esperado.</p></div>

      <div class="ct-card"><h3>CASH-OUT</h3><p><strong>Cash-out</strong> é encerrar a sessão e trocar as fichas pelo valor correspondente. Ganhar ou perder é medido pela diferença entre tudo o que entrou na mesa e tudo o que saiu dela.</p><p>Em cash game, uma ficha de determinado valor mantém esse valor monetário; ela não sofre a mudança de valor estratégico típica das fichas de torneio.</p></div>

      <div class="ct-card"><h3>TAMANHO DA MESA</h3><div class="ct-mini-grid">
        <div class="ct-mini"><strong>FULL RING</strong><span>Mesa cheia, normalmente com 8, 9 ou 10 jogadores. Há mais posições iniciais e, em geral, ranges de abertura mais seletivos nessas posições.</span></div>
        <div class="ct-mini"><strong>6-MAX</strong><span>Até 6 jogadores. A ação chega mais vezes às posições finais e aos blinds, aumentando a frequência de disputas.</span></div>
        <div class="ct-mini"><strong>HEADS-UP</strong><span>Apenas 2 jogadores. Os ranges ficam muito mais amplos e os blinds são disputados a cada mão.</span></div>
        <div class="ct-mini"><strong>SHORT-HANDED</strong><span>Qualquer mesa com menos jogadores do que sua capacidade normal. Exige adaptação rápida de ranges e frequências.</span></div>
      </div></div>

      <div class="ct-card"><h3>PROFUNDIDADE DE STACK</h3><p>O mesmo stake pode produzir jogos muito diferentes conforme a quantidade de Big Blinds em jogo.</p><div class="ct-mini-grid">
        <div class="ct-mini"><strong>SHORT STACK</strong><span>Stacks menores. Decisões pré-flop e de compromisso com o pote aparecem com maior frequência.</span></div>
        <div class="ct-mini"><strong>100 BB</strong><span>Profundidade de referência muito comum em cash games, especialmente online.</span></div>
        <div class="ct-mini"><strong>DEEP STACK</strong><span>Stacks significativamente acima de 100 BB. Turn e River ganham mais peso e erros pós-flop podem custar muito mais.</span></div>
        <div class="ct-mini"><strong>STACK EFETIVO</strong><span>Entre dois jogadores, o valor estratégico real é limitado pelo menor stack envolvido na mão.</span></div>
      </div></div>

      <div class="ct-card"><h3>ESTRUTURA DE APOSTAS</h3><div class="ct-mini-grid">
        <div class="ct-mini"><strong>NO-LIMIT — NL</strong><span>O jogador pode apostar qualquer valor permitido até todas as fichas do stack. É a estrutura clássica do No-Limit Hold'em.</span></div>
        <div class="ct-mini"><strong>POT-LIMIT — PL</strong><span>O máximo de uma aposta ou raise é limitado pelo tamanho regulamentar do pote. É comum em Pot-Limit Omaha.</span></div>
        <div class="ct-mini"><strong>FIXED-LIMIT — FL</strong><span>Apostas e raises seguem valores fixos determinados pela estrutura da mesa.</span></div>
        <div class="ct-mini"><strong>CAP / SPREAD LIMIT</strong><span>Algumas casas usam limites máximos de aposta ou faixas permitidas. A regra específica deve ser consultada antes de jogar.</span></div>
      </div></div>

      <div class="ct-card"><h3>LIVE × ONLINE</h3><p><strong>Live</strong> é o jogo presencial, com dealer, fichas físicas e ritmo mais lento. Leitura de comportamento, procedimentos de mesa e controle físico das fichas ganham importância.</p><p><strong>Online</strong> permite mais mãos por hora, múltiplas mesas e uso de históricos/estatísticas quando permitido pela plataforma. O ritmo mais rápido exige decisões consistentes e controle de volume.</p></div>

      <div class="ct-card"><h3>FAST-FOLD / ZOOM</h3><p>Em formatos de <strong>fast-fold</strong>, ao desistir você é imediatamente movido para outra mão com novos adversários. Isso aumenta muito o número de mãos por hora.</p><p>Serve para alto volume de treino ou jogo, mas reduz a continuidade contra os mesmos jogadores e exige atenção maior a tendências do pool.</p></div>

      <div class="ct-card"><h3>STRADDLE</h3><p><strong>Straddle</strong> é uma aposta voluntária adicional feita antes das cartas, normalmente maior que o Big Blind. Ela aumenta o pote inicial e, dependendo da regra da casa, pode alterar a ordem da ação pré-flop.</p><p><strong>Não é ante.</strong> Antes de entrar numa mesa com straddle, confirme posição, valor, opção de re-raise e regras locais.</p></div>

      <div class="ct-card"><h3>BOMB POT</h3><p>No <strong>bomb pot</strong>, todos os jogadores colocam uma quantia predeterminada no pote e a mão geralmente começa diretamente no Flop, sem rodada pré-flop tradicional. Algumas versões usam dois boards.</p><p>É uma variação especial e deve ser tratada separadamente do fluxo normal do cash game.</p></div>

      <div class="ct-card ct-note"><h3>O QUE MAIS MUDA SUA ESTRATÉGIA NO CASH?</h3><p>Observe sempre <strong>stake, rake, posição, número de jogadores, stack efetivo, straddle, perfil dos adversários e modalidade</strong>. Dois jogos chamados “5/10” podem exigir estratégias muito diferentes se um for 6-max online com 100 BB e o outro for live deep stack com straddle.</p></div>
    </div>`;

  const tournament=`
    <div class="ct-grid">
      <div class="ct-card"><h3>O QUE É UM TORNEIO?</h3><p>Num torneio, todos começam com uma quantidade definida de fichas e disputam posições na classificação. As fichas são <strong>unidades de competição</strong>: normalmente não podem ser trocadas diretamente por dinheiro durante o evento.</p><p>Os blinds e antes aumentam ao longo do tempo. Quem perde todas as fichas é eliminado, salvo quando o formato permite re-entry ou rebuy.</p></div>

      <div class="ct-card"><h3>BUY-IN, FEE E PRIZE POOL</h3><p><strong>Buy-in</strong> é o valor pago para participar. Em muitos eventos, parte vai para a premiação e parte é a <strong>fee</strong> da organização.</p><p>Exemplo: “R$ 500 + R$ 50” pode representar R$ 500 destinados ao prize pool e R$ 50 de taxa, dependendo da divulgação do evento.</p></div>

      <div class="ct-card"><h3>STACK INICIAL E STACK EM BB</h3><p>Em torneios, dizer apenas “tenho 120.000 fichas” diz pouco. É essencial converter para <strong>Big Blinds</strong>. Com blinds 2.000/4.000, 120.000 fichas representam <strong>30 BB</strong>.</p><p>Como os blinds aumentam, o mesmo número de fichas pode passar de stack confortável para stack curto sem você perder uma única ficha.</p></div>

      <div class="ct-card"><h3>NÍVEIS, BLINDS E ANTES</h3><p>O torneio é dividido em <strong>níveis</strong>. A cada intervalo previsto, blinds e frequentemente antes aumentam, elevando o custo de permanecer passivo.</p><p>Estruturas com níveis longos dão mais tempo para decisões pós-flop. Níveis curtos aceleram o torneio e aumentam a pressão do stack.</p></div>

      <div class="ct-card"><h3>FASES DO TORNEIO</h3><div class="ct-mini-grid">
        <div class="ct-mini"><strong>EARLY</strong><span>Fase inicial. Stacks tendem a estar mais profundos e ainda há grande parte do field.</span></div>
        <div class="ct-mini"><strong>MIDDLE</strong><span>Blinds maiores, stacks médios menores e pressão crescente por acumular fichas.</span></div>
        <div class="ct-mini"><strong>BOLHA / BUBBLE</strong><span>Momento próximo da entrada na faixa de premiação. O risco de eliminação passa a ter impacto econômico maior.</span></div>
        <div class="ct-mini"><strong>ITM</strong><span>In the Money: jogadores restantes já garantiram alguma premiação.</span></div>
        <div class="ct-mini"><strong>FINAL TABLE — FT</strong><span>Mesa final. Saltos de premiação e diferenças de stack tornam decisões ainda mais sensíveis.</span></div>
        <div class="ct-mini"><strong>HEADS-UP FINAL</strong><span>Últimos dois jogadores disputam o título; ranges e dinâmica mudam drasticamente.</span></div>
      </div></div>

      <div class="ct-card"><h3>ICM — POR QUE FICHAS NÃO VALEM DINHEIRO LINEARMENTE?</h3><p>O <strong>Independent Chip Model</strong> estima como stacks de torneio se relacionam com o valor esperado das premiações. Ganhar 10.000 fichas não aumenta seu valor monetário exatamente na mesma proporção em que perder 10.000 o reduz.</p><p>O ICM é especialmente importante perto da <strong>bolha, mesa final, satélites e grandes saltos de premiação</strong>. Por isso uma jogada correta em cash pode ser ruim num torneio.</p></div>

      <div class="ct-card"><h3>MTT — MULTI-TABLE TOURNAMENT</h3><p>Torneio com várias mesas e muitos participantes. Conforme jogadores são eliminados, mesas são balanceadas e quebradas até restar a mesa final.</p><span class="ct-tag">Formato mais comum de grandes fields</span></div>

      <div class="ct-card"><h3>SIT & GO — SNG</h3><p>Começa quando o número predeterminado de participantes é atingido, em vez de depender de um horário fixo. Pode ser de uma mesa ou múltiplas mesas.</p><p>É útil para estudar fases bem definidas, especialmente jogo short-handed, bolha e heads-up.</p></div>

      <div class="ct-card"><h3>FREEZEOUT</h3><p>No <strong>Freezeout</strong>, cada jogador tem uma única entrada. Perdeu todas as fichas, está eliminado definitivamente.</p><p>Isso aumenta o peso da sobrevivência em comparação com formatos que permitem novas entradas.</p></div>

      <div class="ct-card"><h3>RE-ENTRY</h3><p>Depois de eliminado, o jogador pode pagar uma <strong>nova entrada</strong> durante o período permitido e recebe um novo stack inicial conforme as regras do evento.</p><p>Cada re-entry é uma nova participação. Quando o período de registro fecha, novas entradas deixam de ser permitidas.</p></div>

      <div class="ct-card"><h3>REBUY E ADD-ON</h3><p>Em torneios de <strong>rebuy</strong>, as regras podem permitir comprar fichas adicionais durante uma fase específica, normalmente quando o stack está abaixo de determinado limite ou após eliminação.</p><p><strong>Add-on</strong> é uma compra adicional de fichas oferecida em momento definido, muitas vezes ao fim do período de rebuy, e pode ser permitida independentemente do stack. Os detalhes variam por evento.</p></div>

      <div class="ct-card"><h3>BOUNTY / KNOCKOUT — KO</h3><p>Parte da premiação está vinculada à eliminação de jogadores. Quem elimina um adversário recebe uma recompensa, o <strong>bounty</strong>.</p><p>Isso altera o valor dos calls e all-ins porque, além das fichas do pote, existe um prêmio associado à eliminação.</p></div>

      <div class="ct-card"><h3>PKO — PROGRESSIVE KNOCKOUT</h3><p>No <strong>PKO</strong>, ao eliminar alguém você recebe uma parte do bounty e outra parte é adicionada ao bounty colocado sobre sua própria cabeça.</p><p>Conforme o torneio avança, alguns jogadores passam a carregar recompensas muito maiores, modificando fortemente ranges de call e shove.</p></div>

      <div class="ct-card"><h3>MYSTERY BOUNTY</h3><p>Em <strong>Mystery Bounty</strong>, as recompensas por eliminação têm valores ocultos ou variáveis e normalmente passam a valer a partir de uma fase determinada.</p><p>Uma eliminação pode render prêmio pequeno ou um dos grandes bounties do evento, tornando a estrutura de valor diferente de um knockout comum.</p></div>

      <div class="ct-card"><h3>TURBO E HYPER-TURBO</h3><p><strong>Turbo</strong> usa níveis de blinds mais curtos que uma estrutura regular. <strong>Hyper-Turbo</strong> acelera ainda mais.</p><p>Stacks perdem profundidade rapidamente, aumentando a importância de jogo pré-flop, push/fold, defesa de blinds e decisões com stacks curtos.</p></div>

      <div class="ct-card"><h3>DEEPSTACK / SLOW STRUCTURE</h3><p>Estruturas <strong>Deepstack</strong> oferecem stack inicial maior em BB e/ou progressão mais lenta dos blinds. Isso cria mais espaço para decisões pós-flop e reduz a urgência inicial.</p><p>“Deepstack” não deve ser avaliado apenas pelo número absoluto de fichas: compare sempre com blinds e duração dos níveis.</p></div>

      <div class="ct-card"><h3>SATELLITE</h3><p>O prêmio principal de um <strong>satélite</strong> é uma vaga, ticket ou pacote para outro torneio. Vários jogadores podem receber exatamente o mesmo prêmio.</p><p>Isso cria situações extremas de ICM: quando já há fichas suficientes para garantir a vaga, acumular mais pode ter pouco valor enquanto ser eliminado custa tudo.</p></div>

      <div class="ct-card"><h3>SHOOTOUT</h3><p>Em um <strong>Shootout</strong>, as mesas não são balanceadas da forma tradicional. O jogador precisa vencer ou terminar entre os classificados de sua própria mesa para avançar à próxima rodada.</p><p>Cada nova rodada funciona como uma nova mesa fechada até chegar aos vencedores finais.</p></div>

      <div class="ct-card"><h3>MULTI-DAY E FLIGHTS</h3><p>Torneios grandes podem ser divididos em <strong>Dia 1, Dia 2, Dia 3...</strong>. Também podem ter vários <strong>flights</strong> iniciais, como Dia 1A, 1B e 1C, que depois reúnem os classificados.</p><p>Alguns eventos permitem disputar mais de um flight; a regra sobre qual stack avança deve ser verificada no regulamento.</p></div>

      <div class="ct-card"><h3>HIGH ROLLER</h3><p><strong>High Roller</strong> é um torneio de buy-in elevado em relação ao calendário normal. Pode ter field menor, jogadores mais experientes e grande concentração de prêmio por participante.</p><p>O nome descreve principalmente o nível de entrada, não uma estrutura única de blinds ou modalidade.</p></div>

      <div class="ct-card"><h3>REGULAR × TURBO × HYPER</h3><p>Esses termos descrevem principalmente a <strong>velocidade da estrutura</strong>. Um torneio regular oferece mais tempo médio em cada faixa de stack; turbo e hyper comprimem esse tempo.</p><p>Quanto mais rápida a estrutura, menor é a margem para esperar indefinidamente por mãos premium.</p></div>

      <div class="ct-card ct-alert"><h3>REGISTRO TARDIO</h3><p><strong>Late registration</strong> é o período em que novos jogadores ainda podem entrar depois do início do torneio. Entrar mais tarde significa começar com menos BB se os blinds já aumentaram.</p><p>A duração e as condições do registro tardio variam por evento.</p></div>

      <div class="ct-card ct-note"><h3>O QUE MAIS MUDA SUA ESTRATÉGIA NO TORNEIO?</h3><p>Antes de decidir, observe <strong>stack em BB, stack dos adversários, posição, nível dos blinds, antes, fase do torneio, quantidade de jogadores restantes, premiação, bounties e ICM</strong>. Em torneios, sobreviver e acumular fichas não têm sempre o mesmo valor em todas as fases.</p></div>
    </div>`;

  function enhance(){
    const lesson=document.querySelector('.card.lesson');
    const title=lesson?.querySelector('h2');
    const blocks=lesson?.querySelector('.blocks');
    if(!lesson || !title || !blocks) return;
    const t=title.textContent.trim().toUpperCase();
    if(t==='CASH GAME E TIPOS' && !blocks.querySelector('[data-ct="cash"]')){
      addStyles();
      blocks.innerHTML=`<div data-ct="cash">${cash}</div>`;
    }
    if(t==='TORNEIO E TIPOS' && !blocks.querySelector('[data-ct="tournament"]')){
      addStyles();
      blocks.innerHTML=`<div data-ct="tournament">${tournament}</div>`;
    }
  }

  const observer=new MutationObserver(enhance);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  enhance();
})();
