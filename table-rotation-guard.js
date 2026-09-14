(() => {
  const POSITIONS=['UTG1','UTG2','MP1','MP2','LJ','HJ','CO','BTN','SB','BB'];
  const HERO_ANCHOR='HJ';
  const POSXY={UTG1:[50,10],UTG2:[70.5,17.6],MP1:[83.3,37.6],MP2:[83.3,62.4],LJ:[70.5,82.4],HJ:[50,90],CO:[29.5,82.4],BTN:[16.7,62.4],SB:[16.7,37.6],BB:[29.5,17.6]};
  const seatClass=/^s-(utg1|utg2|mp1|mp2|lj|hj|co|btn|sb|bb)$/;
  const mod=(n,m)=>((n%m)+m)%m;
  const visualSlot=(position,hero)=>{
    const p=POSITIONS.indexOf(position),h=POSITIONS.indexOf(hero),a=POSITIONS.indexOf(HERO_ANCHOR);
    if(p<0||h<0)return position;
    return POSITIONS[mod(a+(p-h),POSITIONS.length)];
  };
  const seatMap=hero=>Object.fromEntries(POSITIONS.map(p=>[p,visualSlot(p,hero)]));

  if(typeof window!=='undefined')window.StackupTableRotation={POSITIONS,HERO_ANCHOR,visualSlot,seatMap};
  if(typeof document==='undefined')return;

  const STYLE_ID='stackup-table-rotation-guard-v3';
  if(!document.getElementById(STYLE_ID)){
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      html,body,.app,#root,.screen{max-width:100%!important;overflow-x:hidden!important}
      #root .card,#root .block,#root .p3x-shell,#root .p3x-panel,#root .p3x-live,#root .p3x-info,#root .p3x-hands,#root .fi-training,#root .mg-training{min-width:0!important;max-width:100%!important;box-sizing:border-box!important}
      #root img,#root svg,#root canvas,#root video{max-width:100%;height:auto}
      #root .p3x-counter{position:static!important;top:auto!important;z-index:auto!important}
      #root .p3x-live{position:relative!important;isolation:isolate}
      #root .p3x-live .positions-board{position:relative!important;width:100%!important;max-width:100%!important;box-sizing:border-box!important;overflow:hidden!important;isolation:isolate;contain:layout paint}
      #root .p3x-live .seat{max-width:31%!important}
      #root .p3x-live .seat-label,#root .p3x-live .p3x-seat-stack{max-width:100%!important;box-sizing:border-box!important;overflow:hidden;text-overflow:ellipsis}

      #root .p3x-table-center{
        top:50%!important;
        width:62%!important;
        max-width:62%!important;
        height:150px!important;
        display:block!important;
        box-sizing:border-box!important;
        pointer-events:none!important;
      }
      #root .p3x-table-center .p3x-phase{
        position:absolute!important;
        left:50%!important;
        top:0!important;
        transform:translate(-50%,-50%)!important;
        max-width:100%!important;
        box-sizing:border-box!important;
        white-space:nowrap!important;
      }
      #root .p3x-table-center .p3x-pot{
        position:absolute!important;
        left:50%!important;
        top:27%!important;
        transform:translate(-50%,-50%)!important;
        max-width:100%!important;
        box-sizing:border-box!important;
        white-space:nowrap!important;
      }
      #root .p3x-table-center .p3x-board{
        position:absolute!important;
        left:50%!important;
        top:50%!important;
        transform:translate(-50%,-50%)!important;
        width:100%!important;
        max-width:100%!important;
        min-height:44px!important;
        margin:0!important;
        display:flex!important;
        justify-content:center!important;
        align-items:center!important;
        gap:3px!important;
        flex-wrap:nowrap!important;
        box-sizing:border-box!important;
      }

      #root .p3x-action-bubble.p3x-table-message{
        position:relative!important;
        left:auto!important;
        top:auto!important;
        transform:none!important;
        width:100%!important;
        max-width:500px!important;
        min-height:46px!important;
        margin:10px auto 8px!important;
        padding:10px 12px!important;
        display:flex!important;
        align-items:center!important;
        justify-content:center!important;
        box-sizing:border-box!important;
        border-radius:12px!important;
        background:#211008!important;
        border:1px solid #d4aa58!important;
        color:#f8f0df!important;
        font-size:13px!important;
        line-height:1.3!important;
        text-align:center!important;
        opacity:0!important;
        visibility:hidden!important;
        pointer-events:none!important;
        transition:opacity .2s ease!important;
      }
      #root .p3x-action-bubble.p3x-table-message.show{
        opacity:1!important;
        visibility:visible!important;
      }

      #root .p3x-dealer{z-index:10!important;pointer-events:none!important}
      #root .p3x-info,#root .p3x-hands{position:relative!important;z-index:0!important}
      #root .p3x-info>div,#root .p3x-hand{min-width:0!important;overflow:hidden!important}
      #root .p3x-info small,#root .p3x-info b,#root .p3x-hand strong{white-space:normal!important;overflow-wrap:anywhere}
      @media(max-width:390px){
        #root .p3x-table-center{width:58%!important;max-width:58%!important;height:136px!important}
        #root .p3x-table-center .p3x-pot{top:25%!important}
        #root .p3x-live .seat{max-width:30%!important}
        #root .p3x-live .seat-label{min-width:50px!important;padding:5px 6px!important}
        #root .p3x-seat-stack{font-size:8px!important}
        #root .p3x-action-bubble.p3x-table-message{font-size:12px!important;min-height:44px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function rotateBoard(board){
    const hero=board.querySelector('.seat.hero[data-seat]');
    if(!hero)return;
    const heroPos=hero.dataset.seat;
    if(!POSITIONS.includes(heroPos))return;
    const seats=[...board.querySelectorAll('.seat[data-seat]')];
    const mapping=seatMap(heroPos);

    for(const seat of seats){
      const actual=seat.dataset.seat;
      const slot=mapping[actual];
      if(!slot)continue;
      for(const cls of [...seat.classList])if(seatClass.test(cls))seat.classList.remove(cls);
      seat.classList.add(`s-${slot.toLowerCase()}`);
      seat.dataset.visualSeat=slot;
    }

    const live=board.closest('.p3x-live');
    const bubble=live?.querySelector('.p3x-action-bubble');
    const info=live?.querySelector('.p3x-info');
    if(live&&bubble&&info){
      bubble.classList.add('p3x-table-message');
      if(bubble.parentElement!==live||bubble.nextElementSibling!==info)live.insertBefore(bubble,info);
    }

    const dealer=board.querySelector('.p3x-dealer');
    const btn=board.querySelector('.seat[data-seat="BTN"]');
    const btnSlot=btn?.dataset.visualSeat;
    if(dealer&&btnSlot&&POSXY[btnSlot]){
      const [x,y]=POSXY[btnSlot];
      const dx=x-50,dy=y-50;
      const len=Math.hypot(dx,dy)||1;
      const ux=dx/len,uy=dy/len;
      const tx=-uy,ty=ux;
      const radial=.82;
      const tangent=6;
      dealer.style.left=`${50+dx*radial+tx*tangent}%`;
      dealer.style.top=`${50+dy*radial+ty*tangent}%`;
      dealer.dataset.visualSeat=btnSlot;
      dealer.dataset.follows='BTN';
    }

    board.dataset.heroAnchor=HERO_ANCHOR;
    board.dataset.heroPosition=heroPos;
  }

  function scan(){
    document.querySelectorAll('#root .p3x-live [data-board]').forEach(rotateBoard);
  }

  const root=document.getElementById('root');
  if(!root)return;
  let scheduled=false;
  const schedule=()=>{
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(()=>{scheduled=false;scan();});
  };
  new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
  schedule();
})();