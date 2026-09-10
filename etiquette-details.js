(() => {
  const STYLE_ID='stackup-etiquette-style';

  function addStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
      .etq-grid{display:grid;gap:12px}
      .etq-card{padding:15px 16px;border-radius:17px;background:var(--c2,#e7dcc2);border:1px solid #a87c324d}
      .etq-card h3{margin:0 0 8px;font-size:21px;color:var(--gd,#08372d);text-transform:uppercase}
      .etq-card p{margin:0;color:var(--m,#725f4d);font-size:16px;line-height:1.5}
      .etq-card p+p{margin-top:8px}.etq-card strong{color:var(--ink,#25170f)}
      .etq-note{background:#e6d8b9;border-color:#c99539}
      .etq-alert{background:#ead8c5;border-color:#a86b3c}
      .etq-highlight{margin-top:9px;padding:10px 12px;border-radius:12px;background:#211008;color:#d8c6ad;font-size:15px;line-height:1.45;border:1px solid #d4aa58}
      .etq-highlight strong{color:#d4aa58}
      .etq-mini-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:9px}
      .etq-mini{padding:11px 12px;border-radius:14px;background:#f4ecd9;border:1px solid #a87c3255}
      .etq-mini strong{display:block;color:#08372d;font-size:16px;text-transform:uppercase;margin-bottom:4px}
      .etq-mini span{display:block;color:#725f4d;font-size:14px;line-height:1.4}
      .penalty-list{display:grid;gap:8px;margin-top:9px}
      .penalty{display:flex;gap:10px;align-items:flex-start;padding:11px 12px;border-radius:13px;background:#f4ecd9;border:1px solid #a87c3255;color:#725f4d;font-size:15px;line-height:1.4}
      .penalty-n{width:31px;height:31px;flex:none;border-radius:9px;background:#211008;color:#d4aa58;display:grid;place-items:center;font-size:14px}
      @media(max-width:390px){.etq-mini-grid{grid-template-columns:1fr}.etq-card h3{font-size:19px}.etq-card p{font-size:15px}}
    `;
    document.head.appendChild(s);
  }

  const content=`
    <div class="etq-grid">
      <div class="etq-card"><h3>O QUE SÃO BONS MODOS NO POKER?</h3><p>Etiqueta no poker não é apenas ser educado. Ela protege <strong>a ordem da ação, a informação disponível, a integridade do pote e a velocidade do jogo</strong>. Algumas condutas são só inconvenientes; outras podem alterar uma decisão, comprometer uma mão ou gerar penalidade.</p><p>A regra da casa, do cassino ou do torneio sempre prevalece. Em ambiente organizado, quando houver dúvida, o correto é <strong>parar e chamar o Dealer ou o Floor</strong>.</p></div>

      <div class="etq-card"><h3>FICHAS SEMPRE VISÍVEIS</h3><p>Seu stack deve ficar à frente do seu assento e permitir que Dealer e adversários façam uma estimativa razoável do valor. <strong>Fichas de maior denominação devem permanecer claramente visíveis e identificáveis</strong>; escondê-las atrás de fichas menores pode induzir adversários ao erro.</p><p>Evite cobrir fichas com mãos, celular, copos, roupas ou objetos pessoais. Não coloque fichas no bolso durante o jogo e não retire parte do stack da mesa para aparentar ter menos fichas.</p><div class="etq-highlight"><strong>BOA PRÁTICA:</strong> mantenha pilhas limpas e organizadas, preferencialmente por denominação, sem esconder as fichas mais valiosas.</div></div>

      <div class="etq-card"><h3>EMPILHAMENTO DAS FICHAS</h3><p>Pilhas devem ser <strong>contáveis e manejáveis</strong>. Um padrão muito usado em torneios é manter pilhas verticais de aproximadamente 20 fichas da mesma denominação, embora a casa possa adotar outro procedimento.</p><p>Misturar muitas denominações na mesma pilha, construir torres enormes ou espalhar fichas dificulta contagens, side pots e decisões de aposta.</p></div>

      <div class="etq-card"><h3>NÃO TOQUE NAS FICHAS OU CARTAS DOS OUTROS</h3><p>Não organize, conte, empurre ou mova fichas de outro jogador, mesmo tentando ajudar. Também não toque nas cartas alheias. Se algo estiver atrapalhando a mesa, <strong>avise o Dealer</strong>.</p><p>Tocar repetidamente objetos de outro participante pode ser tratado como violação de etiqueta e, em situações graves, como interferência no jogo.</p></div>

      <div class="etq-card"><h3>PROTEJA SUAS CARTAS</h3><p>O jogador é responsável por proteger a própria mão. Mantenha as cartas <strong>visíveis sobre a mesa e claramente separadas do muck</strong>. Um protetor de cartas pode ser usado se a casa permitir.</p><p>Não deixe a mão avançar para a área de descarte e não abandone cartas vivas sem proteção. Se uma mão for recolhida e não puder ser identificada com certeza, ela pode ser declarada morta.</p></div>

      <div class="etq-card"><h3>COMO DESCARTAR / JOGAR AS CARTAS</h3><p>Ao dar fold, empurre suas cartas <strong>fechadas, baixas e controladas</strong> na direção do Dealer. Não arremesse cartas pelo ar, não jogue cartas contra o Dealer e não faça o chamado “helicopter fold”.</p><p>Jogar cartas de forma agressiva pode expô-las, atingir alguém, interferir em outra mão ou gerar penalidade.</p></div>

      <div class="etq-card"><h3>FALAS CLARAS E OBJETIVAS</h3><p>Use termos inequívocos como <strong>check, bet, call, raise, fold e all-in</strong>. Declarações verbais feitas na sua vez podem ser vinculantes. Evite frases ambíguas como “acho que pago”, “talvez aumente” ou brincadeiras que possam ser interpretadas como ação.</p><p>Fale o valor completo quando quiser evitar dúvida: por exemplo, <strong>“raise para 8.000”</strong>.</p></div>

      <div class="etq-card"><h3>MOVIMENTO DE APOSTA</h3><p>Coloque fichas de forma clara, ao alcance visual e físico do Dealer, sem espalhá-las dentro do pote. Faça a intenção de call ou raise de maneira inequívoca.</p><div class="etq-mini-grid"><div class="etq-mini"><strong>STRING BET</strong><span>Colocar fichas em várias idas sem anunciar previamente o raise pode fazer apenas a primeira parte valer, conforme a regra da casa.</span></div><div class="etq-mini"><strong>SPLASH POT</strong><span>Atirar fichas diretamente no meio do pote dificulta conferir o valor. Coloque a aposta à sua frente para o Dealer validar antes de puxá-la.</span></div><div class="etq-mini"><strong>ONE-CHIP RULE</strong><span>Sem anúncio verbal, colocar uma única ficha grande diante de uma aposta costuma significar call, não raise, conforme as regras utilizadas.</span></div><div class="etq-mini"><strong>MOVIMENTO CLARO</strong><span>Não faça gestos falsos, avanços e recuos de fichas ou movimentos destinados a provocar reação do adversário.</span></div></div></div>

      <div class="etq-card"><h3>AÇÃO FORA DE VEZ</h3><p>Espere a ação chegar até você. Apostar, pagar, aumentar ou desistir <strong>fora de hora</strong> pode transmitir informação e influenciar jogadores que ainda deveriam agir.</p><p>Dependendo da sequência e da regra aplicada, uma ação fora de vez pode ser considerada vinculante ou ser corrigida pelo Floor. Reincidência pode gerar penalidade.</p><div class="etq-highlight"><strong>REGRA SIMPLES:</strong> acompanhe a ação e, se não souber se é sua vez, pergunte ao Dealer antes de mover fichas ou cartas.</div></div>

      <div class="etq-card"><h3>ATRASAR O JOGO DE PROPÓSITO</h3><p>Pensar em uma decisão difícil é legítimo. <strong>Stalling</strong> é diferente: é atrasar repetidamente ou deliberadamente sem necessidade estratégica real, muitas vezes para consumir tempo de nível, aproximar-se da bolha ou prejudicar o ritmo da mesa.</p><p>O Floor pode aplicar clock, advertência ou penalidades progressivas quando identificar atraso persistente ou deliberado.</p></div>

      <div class="etq-card"><h3>CELULAR, RELÓGIO E OUTROS DISPOSITIVOS</h3><p>Não converse ao telefone durante uma mão e não deixe o dispositivo atrapalhar o Dealer ou ocupar a área de jogo. Em padrões de torneio, telefones e outros dispositivos não devem ficar sobre a mesa.</p><p>Não use calculadoras, solvers, assistência em tempo real ou comunicação externa para receber conselho sobre uma mão em andamento. Regras de fotos, vídeos, fones e mensagens variam conforme a casa.</p></div>

      <div class="etq-card"><h3>COMENTAR UMA MÃO EM ANDAMENTO</h3><p>Não diga quais cartas você tinha, quais cartas acha que alguém possui, quais outs restam ou qual ação seria melhor enquanto a mão ainda está viva. Isso vale <strong>mesmo depois de você ter foldado</strong>.</p><p>O princípio é “<strong>one player to a hand</strong>”: cada jogador deve tomar suas decisões sem assistência externa.</p></div>

      <div class="etq-card"><h3>NÃO CRITIQUE A AÇÃO DOS OUTROS</h3><p>Evite frases como “como você pagou isso?”, “era fold óbvio” ou “jogou muito mal”. Além de criar conflito, comentários podem revelar informação estratégica e constranger jogadores recreativos.</p><p>Também não dê aulas no meio de uma mão, não leia em voz alta uma mão que ainda não foi tabled e não diga a outro jogador o que ele deveria fazer.</p></div>

      <div class="etq-card"><h3>MOSTRAR SUAS CARTAS</h3><p>Com ação pendente, <strong>não exponha voluntariamente sua mão</strong>. Em torneios, expor cartas com ação ainda em andamento pode gerar penalidade e não significa necessariamente que a mão esteja morta: o Floor decide o efeito correto.</p><p>Depois da mão, mostrar cartas depende das regras da casa. Nunca mostre seletivamente uma carta a alguém durante ação para influenciar a decisão.</p></div>

      <div class="etq-card"><h3>FALAR SOBRE CARTAS QUE VOCÊ FOLDOU</h3><p>Mesmo fora da mão, não diga “eu tinha um Ás”, “foldei dois copas” ou “o 7 já saiu” enquanto outros ainda disputam o pote. Essa informação pode alterar cálculos de outs, ranges e decisões.</p><p>Espere a mão terminar antes de comentar qualquer conteúdo que possa ter valor estratégico.</p></div>

      <div class="etq-card"><h3>LEVANTAR DA MESA</h3><p>Com uma mão viva, permaneça na área da mesa e acompanhe a ação. Levantar-se, caminhar para longe ou conversar com terceiros pode atrasar o jogo e criar dúvidas sobre se você ainda está participando.</p><p>Em torneios, estar ausente pode fazer sua mão ser morta conforme o momento e a regra aplicada, enquanto blinds e antes continuam sendo cobrados. Em cash game, informe o Dealer quando precisar se ausentar por mais tempo.</p></div>

      <div class="etq-card"><h3>COMER E BEBER</h3><p>Respeite a política da casa. Mantenha bebidas em local seguro e alimentos longe de cartas e fichas sempre que possível. Derramar líquido pode interromper uma mesa inteira.</p><p>Álcool não é desculpa para comportamento agressivo, atraso, decisões confusas ou desrespeito. A casa pode limitar ou encerrar o serviço e retirar um jogador que esteja causando problemas.</p></div>

      <div class="etq-card"><h3>HIGIENE E ESPAÇO PESSOAL</h3><p>Uma mesa de poker é compartilhada por horas. Higiene ofensiva, fumaça ou odores excessivos, ocupar espaço alheio e contato físico desnecessário podem prejudicar os demais e, em ambientes organizados, gerar intervenção do staff.</p></div>

      <div class="etq-card"><h3>RESPEITE DEALER E STAFF</h3><p>Discordar de uma decisão é permitido; ofender não. Explique o que aconteceu e peça o Floor de forma objetiva. Gritos, ameaças, insultos, linguagem discriminatória ou comportamento intimidatório podem resultar em penalidade imediata.</p><p>O Dealer não deve ser responsabilizado pessoalmente por uma decisão tomada pelo Floor.</p></div>

      <div class="etq-card"><h3>NÃO FAÇA ANGLE SHOOTING</h3><p><strong>Angle shooting</strong> é tentar obter vantagem por comportamento enganoso que explora ambiguidades sem necessariamente ser uma fraude clássica: fingir fold, esconder fichas grandes, fazer movimento ambíguo para observar reação ou induzir erro sobre sua ação.</p><p>Mesmo quando uma situação não está literalmente descrita numa regra, o Floor pode agir para proteger a integridade e a equidade do jogo.</p></div>

      <div class="etq-card etq-alert"><h3>COLLUSION, SOFT PLAY E CHIP DUMPING</h3><p><strong>Collusion</strong> é cooperação indevida entre jogadores. <strong>Soft play</strong> é jogar artificialmente de forma mais branda contra alguém. <strong>Chip dumping</strong> é transferir fichas intencionalmente para outro jogador.</p><p>São infrações graves de integridade e podem resultar em <strong>remoção de fichas e desclassificação</strong>, além de outras medidas da casa.</p></div>

      <div class="etq-card"><h3>OUTRAS BOAS PRÁTICAS</h3><div class="etq-mini-grid"><div class="etq-mini"><strong>NÃO DÊ CONSELHOS</strong><span>Nem para amigos, nem para desconhecidos, nem para alguém que pediu ajuda durante uma mão.</span></div><div class="etq-mini"><strong>NÃO PEÇA PARA VER FOLD</strong><span>Não transforme pedidos para ver cartas descartadas em ferramenta de provocação ou obtenção de informação.</span></div><div class="etq-mini"><strong>ANUNCIE ERROS</strong><span>Se notar pote incorreto, carta irregular ou erro evidente, avise o Dealer sem tentar resolver sozinho.</span></div><div class="etq-mini"><strong>MUDE DE MESA RÁPIDO</strong><span>Em torneios, ao receber nova mesa/assento, faça a transferência sem atrasos desnecessários.</span></div><div class="etq-mini"><strong>EVITE CHATTER EXCESSIVO</strong><span>Conversar é parte do poker, mas não a ponto de atrasar decisões ou incomodar continuamente a mesa.</span></div><div class="etq-mini"><strong>PROTEJA O RITMO</strong><span>Prepare fichas, acompanhe blinds, saiba quando é sua vez e não obrigue o Dealer a chamar sua atenção a cada mão.</span></div></div></div>

      <div class="etq-card etq-note"><h3>PUNIÇÕES POSSÍVEIS</h3><p>Penalidades variam conforme a casa e a gravidade. Em padrões de torneio, elas podem ser <strong>progressivas</strong>: reincidência tende a gerar punição maior.</p><div class="penalty-list"><div class="penalty"><span class="penalty-n">01</span><span><strong>Advertência verbal:</strong> orientação formal para interromper a conduta.</span></div><div class="penalty"><span class="penalty-n">02</span><span><strong>Mão(s) perdida(s):</strong> o jogador fica fora por uma ou mais mãos determinadas pelo Floor.</span></div><div class="penalty"><span class="penalty-n">03</span><span><strong>Rodada(s) perdida(s):</strong> afastamento por uma ou mais voltas completas da mesa. Blinds e antes continuam podendo ser cobrados.</span></div><div class="penalty"><span class="penalty-n">04</span><span><strong>Desclassificação:</strong> usada em situações graves ou repetidas; em torneios, as fichas do jogador desclassificado podem ser retiradas de jogo.</span></div><div class="penalty"><span class="penalty-n">05</span><span><strong>Perda de fichas:</strong> pode aparecer em infrações específicas e graves, especialmente ligadas à integridade, transporte indevido ou soft play/collusion, conforme a regra aplicável.</span></div></div></div>

      <div class="etq-card etq-alert"><h3>NÃO CONFUNDA PUNIÇÃO COM DECISÃO DA MÃO</h3><p>Uma <strong>ação ser considerada vinculante</strong>, uma aposta ser reduzida ao valor de call, uma mão ser declarada morta ou cartas expostas permanecerem vivas são <strong>rulings</strong> sobre aquela mão — não necessariamente penalidades disciplinares.</p><p>O mesmo incidente pode gerar os dois: primeiro o Floor corrige a mão; depois, se houver infração de conduta, aplica a penalidade correspondente.</p></div>

      <div class="etq-card etq-note"><h3>REGRA DE OURO DA ETIQUETA</h3><p><strong>Não esconda informação que deve ser visível, não revele informação que deve permanecer privada, não aja antes da sua vez e não interfira na decisão de outro jogador.</strong> Se todos seguirem esses quatro princípios, grande parte dos problemas de mesa desaparece.</p></div>
    </div>`;

  function apply(){
    const lesson=document.querySelector('.card.lesson');
    const title=lesson?.querySelector('h2');
    if(!lesson || !title || title.textContent.trim().toUpperCase()!=='BONS MODOS') return;
    const blocks=lesson.querySelector('.blocks');
    if(!blocks || blocks.dataset.etiquetteExpanded==='1') return;
    addStyles();
    blocks.innerHTML=content;
    blocks.dataset.etiquetteExpanded='1';
  }

  const observer=new MutationObserver(apply);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  apply();
})();
