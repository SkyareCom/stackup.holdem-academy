(() => {
  const STYLE_ID='stackup-practice-math-odds-style';
  const DATA=[
    {
      title:'MÃOS INICIAIS — COM QUE FREQUÊNCIA VOCÊ RECEBE?',
      note:'Probabilidades de receber estas cartas em Texas Hold’em antes do flop.',
      rows:[
        ['AA','0,45%','aprox. 1 vez a cada 221 mãos','Ajuda a entender por que ases são raros e não devem ser “esperados” toda sessão.'],
        ['QUALQUER PAR DE MÃO — POCKET PAIR','5,88%','aprox. 1 vez a cada 17 mãos','Útil para entender a frequência de pares de mão e decisões com set mining.'],
        ['AK — SUITED OU OFFSUIT','1,21%','aprox. 1 vez a cada 83 mãos','Mostra como mãos premium não aparecem com tanta frequência quanto parecem.'],
        ['AK SUITED','0,30%','aprox. 1 vez a cada 332 mãos','É uma mão específica e bastante rara.'],
        ['DUAS CARTAS DO MESMO NAIPE','23,53%','aprox. 1 vez a cada 4,25 mãos','Ser suited é relativamente comum; por isso “ser do mesmo naipe” sozinho não torna uma mão forte.']
      ]
    },
    {
      title:'ALL-IN PRÉ-FLOP — EQUITY DE CONFRONTOS COMUNS',
      note:'Valores aproximados heads-up, antes do flop. Os naipes exatos podem alterar alguns pontos percentuais.',
      rows:[
        ['AA × MÃO ALEATÓRIA','AA ≈ 85%','adversário ≈ 15%','Mesmo a melhor mão inicial perde algumas vezes; 85% não significa vitória garantida.'],
        ['AA × KK','AA ≈ 81–82%','KK ≈ 18–19%','Referência clássica de overpair contra pocket pair inferior.'],
        ['AA × AK OFFSUIT','AA ≈ 92,5%','AKo ≈ 7,5%','AK está muito dominado porque um Ás já está bloqueado pelos ases.'],
        ['AA × AK SUITED','AA ≈ 88%','AKs ≈ 12%','O flush potencial aumenta a equity do AK suited.'],
        ['88 × AQ OFFSUIT','88 ≈ 56%','AQo ≈ 44%','Exemplo de pocket pair contra duas overcards: o par começa favorito.'],
        ['88 × AQ SUITED','88 ≈ 53%','AQs ≈ 47%','O naipe extra aproxima bastante o confronto.'],
        ['QQ × AK OFFSUIT','QQ ≈ 57%','AKo ≈ 43%','Outro exemplo de par contra duas cartas altas.'],
        ['AK SUITED × QQ','AKs ≈ 46%','QQ ≈ 54%','O suited ganha equity, mas QQ continua ligeiramente favorito.'],
        ['AK OFFSUIT × AQ OFFSUIT','AK ≈ 74–75%','AQ ≈ 25–26%','Dominação de kicker: ambos compartilham o Ás, mas o Rei é decisivo em muitos boards.']
      ]
    },
    {
      title:'O QUE PODE ACONTECER NO FLOP?',
      note:'Frequências úteis para reconhecer o quão raro ou comum é cada resultado.',
      rows:[
        ['COM DUAS CARTAS SUITED → FLOPAR FLUSH','0,84%','aprox. 1 em 119 flops','Você precisa que as três cartas do flop sejam do mesmo naipe das suas duas cartas.'],
        ['COM DUAS CARTAS SUITED → FLOPAR FLUSH DRAW','10,94%','aprox. 1 em 9,1 flops','Exatamente duas cartas do seu naipe no flop deixam 9 outs típicos para o flush.'],
        ['CONECTORES → FLOPAR STRAIGHT PRONTO','≈ 1,31%','aprox. 1 em 77 flops','Referência para conectores comuns como 7-6 ou 10-9. A posição dos ranks nas extremidades pode mudar a frequência.'],
        ['POCKET PAIR → FLOPAR TRINCA OU MELHOR','11,76%','aprox. 1 em 8,5 flops','É a referência prática por trás do conceito de set mining.'],
        ['MÃO NÃO PAREADA → ACERTAR PELO MENOS UM DOS SEUS RANKS','32,43%','aprox. 1 em 3,1 flops','Mostra que, mesmo com duas cartas diferentes, você erra os dois ranks na maioria dos flops.'],
        ['MÃO NÃO PAREADA → FLOPAR DOIS PARES COM AS DUAS HOLE CARDS','2,02%','aprox. 1 em 49,5 flops','Dois pares feitos diretamente com os dois ranks da mão são relativamente raros.']
      ]
    },
    {
      title:'DRAWS — CHANCE EXATA DE COMPLETAR',
      note:'Assumindo outs limpos e 47 cartas desconhecidas no flop.',
      rows:[
        ['FLUSH DRAW — 9 OUTS','Turn: 19,15%','até o River: 34,97%','Atalho mental: 9 × 2 ≈ 18% para uma carta; 9 × 4 ≈ 36% até o river.'],
        ['OPEN-ENDED STRAIGHT DRAW — 8 OUTS','Turn: 17,02%','até o River: 31,45%','Atalho mental: 8 × 2 ≈ 16%; 8 × 4 ≈ 32%.'],
        ['GUTSHOT — 4 OUTS','Turn: 8,51%','até o River: 16,47%','Atalho mental: 4 × 2 ≈ 8%; 4 × 4 ≈ 16%.'],
        ['POCKET PAIR SEM SET — 2 OUTS','Turn: 4,26%','até o River: 8,42%','Serve para perceber como é difícil melhorar um par de mão para trinca depois do flop.'],
        ['DUAS OVERCARDS — ATÉ 6 OUTS','próxima carta: até 12,77%','até o River: até 24,14%','Só trate como 6 outs quando todos forem realmente limpos; muitas vezes um Ás ou Rei ainda perde.'],
        ['COMBO DRAW — 15 OUTS LIMPOS','próxima carta: 31,91%','até o River: 54,12%','Draws combinados podem ter mais de 50% de chance de completar algum out até o river.']
      ]
    },
    {
      title:'POT ODDS — EQUITY MÍNIMA PRONTA',
      note:'Quando o adversário aposta uma fração do pote e você considera apenas call ou fold.',
      rows:[
        ['APOSTA 1/4 DO POTE','16,7%','equity mínima para pagar','Se sua chance real de ganhar for maior que isso, o call pode ser lucrativo antes de outros fatores.'],
        ['APOSTA 1/3 DO POTE','20,0%','equity mínima para pagar','Uma aposta pequena exige pouca equity para o call direto.'],
        ['APOSTA 1/2 POTE','25,0%','equity mínima para pagar','Referência muito usada em decisões rápidas.'],
        ['APOSTA 2/3 DO POTE','28,6%','equity mínima para pagar','Compare com sua equity estimada ou com seus outs.'],
        ['APOSTA 3/4 DO POTE','30,0%','equity mínima para pagar','Quanto maior a aposta, maior a equity exigida.'],
        ['APOSTA DO TAMANHO DO POTE','33,3%','equity mínima para pagar','Você precisa ganhar aproximadamente 1 vez em cada 3 para o call empatar em EV, sem considerar rake ou implied odds.'],
        ['APOSTA 1,5× O POTE','37,5%','equity mínima para pagar','Overbets aumentam bastante a exigência de equity.'],
        ['APOSTA 2× O POTE','40,0%','equity mínima para pagar','Mesmo uma aposta de duas vezes o pote não exige 50% de equity porque seu call também entra no pote final.']
      ]
    }
  ];

  function addStyle(){
    if(document.getElementById(STYLE_ID))return;
    const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
      .p3m-odds{margin:12px 0 0;display:grid;gap:11px}
      .p3m-title{margin:0;padding:11px 12px;border-radius:13px;background:#08372d;color:#d4aa58;border:1px solid #d4aa58;font-size:18px;text-transform:uppercase}
      .p3m-group{border:1px solid #a87c3260;border-radius:15px;background:#efe4cd;overflow:hidden}
      .p3m-group-head{padding:11px 12px;background:#2a160d;color:#f8f0df}.p3m-group-head strong{display:block;color:#d4aa58;font-size:16px}.p3m-group-head span{display:block;margin-top:4px;color:#d8c6ad;font-size:12px;line-height:1.35}
      .p3m-row{padding:10px 12px;border-top:1px solid #a87c3233}.p3m-row:first-of-type{border-top:0}.p3m-row h4{margin:0 0 6px;color:#08372d;font-size:15px;text-transform:uppercase}.p3m-values{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:6px}.p3m-values b{padding:7px 8px;border-radius:9px;background:#e7dcc2;border:1px solid #a87c3238;color:#25170f;font-family:inherit!important;font-size:14px!important;font-weight:700!important;line-height:1.25!important;text-align:center}.p3m-row p{margin:0;color:#725f4d;font-size:13px;line-height:1.4}
      .p3m-warning{padding:11px 12px;border-radius:13px;background:#e7dcc2;border:1px solid #a87c3260;color:#5f4b39;font-size:13px;line-height:1.45}
      @media(max-width:390px){.p3m-values{grid-template-columns:1fr}.p3m-title{font-size:16px}}
    `;document.head.appendChild(s);
  }
  function render(){
    const lesson=document.querySelector('#root .card.lesson');
    const title=lesson?.querySelector('h2')?.textContent?.normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toUpperCase();
    if(title!=='MATEMATICA DO POKER SIMPLIFICADA')return;
    const shell=lesson.querySelector('.p3x-shell[data-p3x="math"]');if(!shell||shell.querySelector('.p3m-odds'))return;
    addStyle();
    const box=document.createElement('section');box.className='p3m-odds';
    box.innerHTML=`<h3 class="p3m-title">PROBABILIDADES PRONTAS — REFERÊNCIA DE MESA</h3>${DATA.map(g=>`<div class="p3m-group"><div class="p3m-group-head"><strong>${g.title}</strong><span>${g.note}</span></div>${g.rows.map(r=>`<div class="p3m-row"><h4>${r[0]}</h4><div class="p3m-values"><b>${r[1]}</b><b>${r[2]}</b></div><p>${r[3]}</p></div>`).join('')}</div>`).join('')}<div class="p3m-warning"><strong>IMPORTANTE:</strong> equity de mão contra mão depende das cartas exatas, especialmente dos naipes. Os confrontos acima são referências aproximadas para estudo. Em decisões reais, posição, ranges, stacks, rake, número de jogadores e possibilidade de novos investimentos também importam.</div>`;
    const panel=shell.querySelector('.p3x-panel');if(panel)shell.insertBefore(box,panel);else shell.appendChild(box);
  }
  const root=document.getElementById('root');if(root)new MutationObserver(()=>requestAnimationFrame(render)).observe(root,{childList:true,subtree:true});render();
})();