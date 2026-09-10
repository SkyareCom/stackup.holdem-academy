(() => {
  const STYLE_ID='stackup-terminology-profiles-style';
  function addStyles(){
    if(document.getElementById(STYLE_ID))return;
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
      .tp-grid{display:grid;gap:12px}
      .tp-card{padding:15px 16px;border-radius:17px;background:var(--c2,#e7dcc2);border:1px solid #a87c324d}
      .tp-card h3{margin:0 0 8px;font-size:21px;color:var(--gd,#08372d);text-transform:uppercase}
      .tp-card p{margin:0;color:var(--m,#725f4d);font-size:16px;line-height:1.5}
      .tp-card p+p{margin-top:8px}.tp-card strong{color:var(--ink,#25170f)}
      .tp-note{background:#e6d8b9;border-color:#c99539}
      .term-grid,.profile-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:7px}
      .term,.profile{padding:11px 12px;border-radius:14px;background:#f4ecd9;border:1px solid #a87c3255}
      .term strong,.profile strong{display:block;color:#08372d;font-size:16px;text-transform:uppercase;margin-bottom:3px}
      .term span,.profile span{display:block;color:#725f4d;font-size:14px;line-height:1.38}
      .profile-tag{display:inline-block;margin-top:6px;padding:4px 8px;border-radius:999px;background:#211008;color:#d4aa58;font-size:12px;letter-spacing:.04em;text-transform:uppercase}
      .axis{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}
      .axis div{padding:10px;border-radius:12px;background:#f4ecd9;border:1px solid #a87c3255;color:#725f4d;font-size:14px;line-height:1.4}
      .axis b{display:block;color:#08372d;font-size:16px;text-transform:uppercase;margin-bottom:3px}
      @media(max-width:390px){.term-grid,.profile-grid,.axis{grid-template-columns:1fr}.tp-card h3{font-size:19px}.tp-card p{font-size:15px}}
    `;
    document.head.appendChild(s);
  }

  const terminology=`
    <div class="tp-grid">
      <div class="tp-card"><h3>COMO USAR ESTE GLOSSÁRIO</h3><p>O poker usa muitas palavras em inglês mesmo em mesas brasileiras. O objetivo aqui é reconhecer rapidamente <strong>o que cada termo significa na mesa</strong>. Alguns conceitos matemáticos e estratégicos serão aprofundados em módulos próprios.</p></div>

      <div class="tp-card"><h3>MESA E FICHAS</h3><div class="term-grid">
        <div class="term"><strong>POT / POTE</strong><span>Total de fichas ou dinheiro que está sendo disputado na mão.</span></div>
        <div class="term"><strong>STACK</strong><span>Quantidade de fichas que um jogador possui à sua frente.</span></div>
        <div class="term"><strong>STACK EFETIVO</strong><span>Maior quantidade que pode ser colocada em jogo entre dois jogadores; é limitada pelo menor stack entre eles.</span></div>
        <div class="term"><strong>CHIP</strong><span>Ficha usada para representar valor em cash games ou unidades de torneio.</span></div>
        <div class="term"><strong>BLINDS</strong><span>Small Blind e Big Blind: apostas obrigatórias antes das cartas.</span></div>
        <div class="term"><strong>ANTE</strong><span>Contribuição obrigatória adicional colocada no pote antes da mão.</span></div>
        <div class="term"><strong>BUTTON / BTN</strong><span>Marcador que identifica a posição nominal do dealer e organiza a ordem das posições.</span></div>
        <div class="term"><strong>RAKE</strong><span>Taxa retirada pela casa em muitos cash games, conforme as regras do estabelecimento.</span></div>
      </div></div>

      <div class="tp-card"><h3>CARTAS E MESA</h3><div class="term-grid">
        <div class="term"><strong>HOLE CARDS</strong><span>Cartas fechadas particulares de cada jogador. No Hold'em são duas.</span></div>
        <div class="term"><strong>BOARD</strong><span>Cartas comunitárias abertas no centro da mesa.</span></div>
        <div class="term"><strong>FLOP</strong><span>As três primeiras cartas comunitárias.</span></div>
        <div class="term"><strong>TURN</strong><span>Quarta carta comunitária.</span></div>
        <div class="term"><strong>RIVER</strong><span>Quinta e última carta comunitária.</span></div>
        <div class="term"><strong>BURN CARD</strong><span>Carta queimada pelo dealer antes de abrir uma nova street comunitária.</span></div>
        <div class="term"><strong>MUCK</strong><span>Área/cartas descartadas; também significa entregar a mão sem mostrá-la quando permitido.</span></div>
        <div class="term"><strong>SHOWDOWN</strong><span>Momento em que as mãos restantes são comparadas para determinar o vencedor.</span></div>
      </div></div>

      <div class="tp-card"><h3>AÇÕES DE APOSTA</h3><div class="term-grid">
        <div class="term"><strong>CHECK</strong><span>Passar a ação sem apostar quando não existe valor pendente para pagar.</span></div>
        <div class="term"><strong>BET</strong><span>Primeira aposta voluntária de uma rodada.</span></div>
        <div class="term"><strong>CALL</strong><span>Igualar a maior aposta atual para continuar na mão.</span></div>
        <div class="term"><strong>FOLD</strong><span>Desistir da mão e abrir mão de disputar o pote.</span></div>
        <div class="term"><strong>RAISE</strong><span>Aumentar uma aposta que já existe.</span></div>
        <div class="term"><strong>ALL-IN</strong><span>Colocar todas as fichas restantes em jogo.</span></div>
        <div class="term"><strong>LIMP</strong><span>Entrar no pote pré-flop apenas pagando o Big Blind quando ninguém abriu raise antes.</span></div>
        <div class="term"><strong>OPEN RAISE</strong><span>Primeiro raise voluntário do pré-flop.</span></div>
        <div class="term"><strong>3-BET</strong><span>Re-raise sobre o primeiro raise.</span></div>
        <div class="term"><strong>4-BET</strong><span>Novo re-raise sobre uma 3-bet.</span></div>
        <div class="term"><strong>SQUEEZE</strong><span>3-bet após um raise e um ou mais calls.</span></div>
        <div class="term"><strong>CHECK-RAISE</strong><span>Dar check e, depois que alguém aposta, aumentar quando a ação retorna.</span></div>
      </div></div>

      <div class="tp-card"><h3>AGRESSÃO E LINHAS PÓS-FLOP</h3><div class="term-grid">
        <div class="term"><strong>C-BET</strong><span>Continuation bet: aposta feita na street seguinte pelo jogador que foi o agressor na street anterior, frequentemente o raiser pré-flop.</span></div>
        <div class="term"><strong>DONK BET</strong><span>Aposta de um jogador fora de posição antes que o agressor da street anterior tenha oportunidade de agir.</span></div>
        <div class="term"><strong>BARREL</strong><span>Continuar apostando em streets sucessivas. Ex.: second barrel no Turn e third barrel no River.</span></div>
        <div class="term"><strong>VALUE BET</strong><span>Aposta feita esperando ser paga por mãos piores.</span></div>
        <div class="term"><strong>BLUFF / BLEFE</strong><span>Aposta ou raise com mão que normalmente não quer ser paga, tentando fazer mãos melhores desistirem.</span></div>
        <div class="term"><strong>SEMI-BLUFF</strong><span>Blefe com uma mão que ainda possui chance relevante de melhorar, como um draw.</span></div>
        <div class="term"><strong>OVERBET</strong><span>Aposta maior que o tamanho atual do pote.</span></div>
        <div class="term"><strong>BLOCK BET</strong><span>Aposta pequena usada em certos contextos para extrair valor, controlar preço ou dificultar uma aposta maior do adversário.</span></div>
      </div></div>

      <div class="tp-card"><h3>FORÇA DE MÃO E DRAWS</h3><div class="term-grid">
        <div class="term"><strong>NUTS</strong><span>Melhor mão possível naquele board e naquele momento.</span></div>
        <div class="term"><strong>KICKER</strong><span>Carta de desempate que não faz parte da combinação principal, como o Ás em A-K contra A-Q num par de Ases.</span></div>
        <div class="term"><strong>DRAW</strong><span>Mão incompleta com possibilidade de melhorar para sequência, flush ou outra combinação.</span></div>
        <div class="term"><strong>FLUSH DRAW</strong><span>Normalmente quatro cartas do mesmo naipe com chance de completar um flush.</span></div>
        <div class="term"><strong>OESD</strong><span>Open-ended straight draw: sequência aberta nas duas pontas, como 6-7-8-9.</span></div>
        <div class="term"><strong>GUTSHOT</strong><span>Draw de sequência que precisa de um valor interno específico, como 5-6-8-9 precisando de 7.</span></div>
        <div class="term"><strong>OUT</strong><span>Carta ainda não vista que, se vier, pode melhorar sua mão para uma combinação desejada.</span></div>
        <div class="term"><strong>BACKDOOR</strong><span>Draw que precisa acertar cartas favoráveis em duas streets consecutivas para completar.</span></div>
      </div></div>

      <div class="tp-card"><h3>POSIÇÃO E QUANTIDADE DE JOGADORES</h3><div class="term-grid">
        <div class="term"><strong>IP — IN POSITION</strong><span>Jogar em posição, normalmente agindo depois do adversário no pós-flop.</span></div>
        <div class="term"><strong>OOP — OUT OF POSITION</strong><span>Jogar fora de posição, normalmente agindo antes do adversário no pós-flop.</span></div>
        <div class="term"><strong>HEADS-UP / HU</strong><span>Pote ou mesa envolvendo apenas dois jogadores.</span></div>
        <div class="term"><strong>MULTIWAY</strong><span>Pote disputado por três ou mais jogadores.</span></div>
        <div class="term"><strong>POSITION</strong><span>Lugar relativo do jogador na ordem de ação: blinds, early, middle ou late position.</span></div>
        <div class="term"><strong>BLIND WAR</strong><span>Confronto envolvendo principalmente Small Blind e Big Blind quando a ação chega limpa até eles.</span></div>
      </div></div>

      <div class="tp-card"><h3>CONCEITOS ESTRATÉGICOS ESSENCIAIS</h3><div class="term-grid">
        <div class="term"><strong>RANGE</strong><span>Conjunto de mãos possíveis que um jogador pode ter em determinada situação.</span></div>
        <div class="term"><strong>EQUITY</strong><span>Parcela estimada do pote que uma mão ou range tende a ganhar considerando os resultados possíveis.</span></div>
        <div class="term"><strong>POT ODDS</strong><span>Relação entre o custo do call e o pote que pode ser ganho.</span></div>
        <div class="term"><strong>SPR</strong><span>Stack-to-Pot Ratio: relação entre stack efetivo e tamanho do pote no início de uma street.</span></div>
        <div class="term"><strong>BLOCKER</strong><span>Carta na sua mão que reduz combinações possíveis na mão do adversário.</span></div>
        <div class="term"><strong>POLARIZADO</strong><span>Range composto principalmente por mãos muito fortes e blefes, com menos mãos médias.</span></div>
        <div class="term"><strong>MERGED / LINEAR</strong><span>Range de aposta ou raise formado de maneira mais contínua, incluindo várias mãos fortes e médias fortes.</span></div>
        <div class="term"><strong>EXPLOIT</strong><span>Ajuste estratégico feito para explorar uma tendência específica do adversário.</span></div>
      </div></div>

      <div class="tp-card tp-note"><h3>IMPORTANTE</h3><p>Conhecer a palavra não basta: o mesmo termo pode ter implicações diferentes conforme <strong>posição, stack, street, tamanho da aposta e quantidade de jogadores</strong>. O curso retomará esses conceitos em situações práticas.</p></div>
    </div>`;

  const profiles=`
    <div class="tp-grid">
      <div class="tp-card"><h3>O QUE É UM PERFIL DE JOGADOR?</h3><p>Perfil é uma forma de resumir <strong>tendências observadas ao longo de várias mãos</strong>. Não é um rótulo permanente. Um mesmo jogador pode mudar de comportamento conforme posição, stack, fase do torneio, adversários e momento da sessão.</p></div>

      <div class="tp-card"><h3>OS DOIS EIXOS PRINCIPAIS</h3><div class="axis">
        <div><b>TIGHT</b>Joga uma seleção menor e mais criteriosa de mãos.</div>
        <div><b>LOOSE</b>Entra em mais potes e joga uma faixa mais ampla de mãos.</div>
        <div><b>AGRESSIVO</b>Usa bet e raise com maior frequência em vez de apenas pagar.</div>
        <div><b>PASSIVO</b>Prefere check e call e aumenta com menos frequência.</div>
      </div><p style="margin-top:9px">Esses eixos se combinam. Por isso surgem perfis como <strong>tight-aggressive</strong> e <strong>loose-passive</strong>.</p></div>

      <div class="tp-card"><h3>TAG — TIGHT AGGRESSIVE</h3><p>Seleciona relativamente poucas mãos, mas quando entra costuma jogar de forma ativa e agressiva. É um perfil comum entre jogadores disciplinados.</p><p><strong>Sinais:</strong> poucos limps, ranges pré-flop mais seletivos, raises frequentes quando decide entrar e pressão consistente pós-flop.</p><span class="profile-tag">Tight + Agressivo</span></div>

      <div class="tp-card"><h3>LAG — LOOSE AGGRESSIVE</h3><p>Participa de muitos potes e usa bastante agressão. Um bom LAG pressiona ranges fracos e coloca adversários em decisões frequentes; um LAG descontrolado pode simplesmente estar jogando mãos demais.</p><p><strong>Sinais:</strong> muitos opens, 3-bets, steals e pressão em várias streets.</p><span class="profile-tag">Loose + Agressivo</span></div>

      <div class="tp-card"><h3>NIT</h3><p>Versão muito conservadora do estilo tight. Entra em poucos potes e tende a demonstrar força quando coloca muitas fichas no centro.</p><p><strong>Atenção:</strong> chamar alguém de Nit exige amostra. Um jogador pode simplesmente ter recebido poucas mãos jogáveis durante um período curto.</p><span class="profile-tag">Muito Tight</span></div>

      <div class="tp-card"><h3>CALLING STATION</h3><p>Jogador que paga com frequência excessiva e desiste pouco, especialmente pós-flop. Costuma ser mais passivo e menos propenso a blefar com raises.</p><p><strong>Ajuste típico:</strong> valorizar boas mãos com apostas por valor e reduzir blefes sem evidência de que ele consiga foldar.</p><span class="profile-tag">Loose + Passivo</span></div>

      <div class="tp-card"><h3>MANIAC</h3><p>Apresenta agressão extremamente alta, com muitos raises, re-raises e apostas grandes em ranges muito amplos.</p><p>Nem toda agressividade é “mania”: um jogador competente pode estar explorando uma mesa passiva. O perfil exige repetição consistente do comportamento.</p><span class="profile-tag">Muito Agressivo</span></div>

      <div class="tp-card"><h3>LOOSE-PASSIVE</h3><p>Entra em muitas mãos, mas tende a apenas pagar em vez de aumentar. É comum ver muitos limps e calls pré-flop e linhas passivas pós-flop.</p><p><strong>Sinais:</strong> VPIP visualmente alto, poucos raises e dificuldade de abandonar pares ou draws.</p><span class="profile-tag">Loose + Passivo</span></div>

      <div class="tp-card"><h3>WEAK-TIGHT</h3><p>Joga poucas mãos e também evita confrontos grandes sem mãos muito fortes. Pode abandonar com frequência diante de pressão.</p><p>É diferente de um TAG sólido: ambos selecionam mãos, mas o weak-tight tende a <strong>ceder agressão demais</strong> depois de entrar no pote.</p><span class="profile-tag">Tight + Passivo</span></div>

      <div class="tp-card"><h3>REG / REGULAR</h3><p>Jogador frequente da modalidade ou limite. “Reg” não define automaticamente se ele é bom ou ruim; apenas indica habitualidade e familiaridade com aquele ambiente.</p><p>Regs fortes costumam adaptar ranges, sizings e frequências. Regs fracos também podem repetir padrões exploráveis.</p></div>

      <div class="tp-card"><h3>RECREATIVO</h3><p>Jogador que participa principalmente por lazer. Pode ter qualquer estilo — tight, loose, agressivo ou passivo — e não deve ser confundido automaticamente com jogador fraco.</p><p>Para fins estratégicos, observe o comportamento real em vez de presumir habilidade apenas pelo contexto.</p></div>

      <div class="tp-card"><h3>COMO IDENTIFICAR UM PERFIL</h3><div class="profile-grid">
        <div class="profile"><strong>PRÉ-FLOP</strong><span>Quantas mãos entra? Limpa, dá call, abre raise ou 3-beta?</span></div>
        <div class="profile"><strong>PÓS-FLOP</strong><span>Prefere check/call ou bet/raise? Continua em várias streets?</span></div>
        <div class="profile"><strong>SIZING</strong><span>Usa tamanhos coerentes ou muda drasticamente conforme a força?</span></div>
        <div class="profile"><strong>FOLD</strong><span>Desiste facilmente ou paga pressão em excesso?</span></div>
        <div class="profile"><strong>SHOWDOWN</strong><span>As mãos mostradas confirmam ranges largos, estreitos, blefes ou calls leves?</span></div>
        <div class="profile"><strong>CONTEXTO</strong><span>O comportamento muda por posição, stack, bolha, mesa ou adversário?</span></div>
      </div></div>

      <div class="tp-card"><h3>VPIP, PFR E 3-BET — INTRODUÇÃO</h3><p>Em poker online, estatísticas ajudam a quantificar tendências. <strong>VPIP</strong> mede com que frequência o jogador coloca fichas voluntariamente no pote pré-flop; <strong>PFR</strong> mede raises pré-flop; e <strong>3-Bet%</strong> mede a frequência de 3-bets nas oportunidades disponíveis.</p><p>O valor dessas estatísticas depende do <strong>tamanho da amostra</strong>. Poucas mãos podem produzir conclusões enganosas.</p></div>

      <div class="tp-card"><h3>PERFIL NÃO É DESTINO</h3><p>Um bom jogador adapta o próprio comportamento. Pode ser mais tight em posições iniciais, mais loose no Button, mais agressivo contra adversários que foldam demais e mais seletivo contra jogadores que pagam muito.</p><p>Por isso, o objetivo não é encaixar todos em uma caixa, mas reconhecer <strong>tendências que melhoram suas decisões</strong>.</p></div>

      <div class="tp-card tp-note"><h3>REGRA PRÁTICA</h3><p>Não classifique alguém por uma mão. Procure padrões repetidos de <strong>seleção de mãos, agressão, calls, folds, sizings e showdown</strong>. Quanto maior e mais variada a amostra, mais confiável será o perfil.</p></div>
    </div>`;

  function render(){
    const lesson=document.querySelector('.card.lesson');
    const title=lesson?.querySelector('h2');
    if(!lesson||!title)return;
    const key=title.textContent.trim().toUpperCase();
    let html=null;
    if(key==='TERMINOLOGIAS BÁSICAS')html=terminology;
    if(key==='PERFIS DE JOGADORES')html=profiles;
    if(!html)return;
    addStyles();
    const blocks=lesson.querySelector('.blocks');
    if(!blocks||blocks.dataset.tpExpanded==='1')return;
    blocks.innerHTML=html;
    blocks.dataset.tpExpanded='1';
  }
  const observer=new MutationObserver(render);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  render();
})();