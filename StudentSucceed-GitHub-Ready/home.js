// Native controller for the supplied desk illustration. Update bindings in place to retain its transitions.
const deskState={done:[false,false,false],all:false};
let deskPositionsData;
async function initializeDesk(){
  const script=document.createElement('script');script.src='desk-positions.js';await new Promise((resolve,reject)=>{script.onload=resolve;script.onerror=reject;document.head.append(script)});deskPositionsData=deskPositions;
  const bindings=[],textBindings=[];
  document.querySelectorAll('*').forEach(el=>{for(const attr of [...el.attributes]){if(!attr.value.includes('{{'))continue;if(attr.name.startsWith('sc-camel-on-')){const type={'sc-camel-on-click':'click','sc-camel-on-focus':'focus','sc-camel-on-mouse-enter':'mouseenter'}[attr.name];const key=attr.value.replace(/[{} ]/g,'');el.removeAttribute(attr.name);if(type)el.addEventListener(type,()=>{if(key==='toggle'){if(deskState.all||deskState.done.every(Boolean)){deskState.all=false;deskState.done=[false,false,false]}else deskState.all=true;}else deskState.done[Number(key.slice(1))]=true;update()});}else bindings.push({el,name:attr.name,template:attr.value});}});
  const walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);while(walk.nextNode()){if(walk.currentNode.textContent.includes('{{'))textBindings.push({el:walk.currentNode,template:walk.currentNode.textContent})}
  function values(){const p={},order=[0,0,0];const open=z=>deskState.all||deskState.done[z];Object.entries(deskPositionsData).forEach(([key,[z,m,n]],idx)=>{const isOpen=open(z),j=order[z]++,a=isOpen&&n?n:m,gone=isOpen&&!n;p[key]={x:a[0],y:a[1],r:gone?a[2]+180:a[2],o:gone?0:1,s:gone?.2:1,k:isOpen?'':'j'+idx%3,d:isOpen?j*.05:0}});p.stain={x:46,y:72,o:open(1)?0:1};const count=[0,1,2].filter(open).length;return {p,accent:'#FE7F2D',z0:open(0)?'open':'',z1:open(1)?'open':'',z2:open(2)?'open':'',c0:open(0)?'#FE7F2D':'#FFFFFF',c1:open(1)?'#FE7F2D':'#FFFFFF',c2:open(2)?'#FE7F2D':'#FFFFFF',hintO:count?0:1,statusLine:['Hover over the desk. Let’s sort it out together.','1 of 3 sorted. Nice start!','2 of 3 sorted. Almost there!','All sorted. Where do you want to start?'][count],pressed:count===3?'true':'false',toggleLabel:count===3?'Start over':'Sort everything'}}
  function update(){const v=values(),fill=t=>t.replace(/{{(.*?)}}/g,(_,key)=>key.trim().split('.').reduce((o,k)=>o?.[k],v)??'');for(const b of bindings)b.el.setAttribute(b.name,fill(b.template));for(const b of textBindings)b.el.textContent=fill(b.template);document.body.classList.add('desk-ready')}
  update();
  // A first tap reveals each desk card; a second tap follows the destination on touch screens.
  document.querySelectorAll('.zone').forEach((zone,i)=>zone.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'&&!zone.classList.contains('open')){e.preventDefault();deskState.done[i]=true;update()}}));
}
initializeDesk().catch(()=>{document.querySelectorAll('.zone').forEach(el=>el.classList.add('open'));document.body.classList.add('desk-ready')});
try{const profile=JSON.parse(localStorage.getItem('studentsucceed-onboarding-v1'));if(profile?.step>0){document.querySelector('#resume-nav').textContent=profile.step===9?'My space':'Continue setup';document.querySelector('#hero-start').innerHTML=(profile.step===9?'Return to my space':'Continue my starting point')+' <span>→</span>'}}catch{}
const stories=document.querySelector('#stories');
document.querySelectorAll('a[href="#stories"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();stories.showModal()}));
document.querySelector('.stories-close').onclick=()=>stories.close();
stories.addEventListener('click',e=>{if(e.target===stories){const r=stories.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)stories.close()}});

if(StudentSession.current())document.querySelectorAll('a[href^="login.html"]').forEach(a=>{a.setAttribute('href',a.getAttribute('href').replace('login.html','onboarding.html'))});
