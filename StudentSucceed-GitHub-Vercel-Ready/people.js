// Illustrative directory. Replace this data adapter when a live people source is connected.
let peoplePage=0;
const peoplePageSize=3;
const emptyPeopleFilters=()=>({companies:[],location:'',role:'',level:'',school:'',query:''});
function peopleFilters(){
  if(!state.peopleFilters||state.peopleFilters.field!==state.field)state.peopleFilters={...emptyPeopleFilters(),field:state.field};
  const f=state.peopleFilters;
  if(!Array.isArray(f.companies))f.companies=[];
  for(const k of ['location','role','level','school','query'])if(typeof f[k]!=='string')f[k]='';
  return f;
}
function peopleDirectory(){
  const names=['Alex Lee','Jordan Rivera','Morgan Kim','Sam Patel','Riley Chen','Taylor Brooks','Avery Wilson','Jamie Park','Casey Nguyen','Robin Davis','Drew Shah','Quinn Garcia','Cameron Bell','Skyler Reed','Emerson Cruz','Reese Walker','Sasha Lin','Charlie Hayes'];
  const teams=[...companies().map(c=>c[1]),'Northstar','Common Thread','Studio Meridian'];
  const roles=rolesByField[state.field]||rolesByField.Other;
  const cities=['New York, NY','San Francisco, CA','Austin, TX','Remote'];
  const schools=['The New School','New York University','Pratt Institute','University of California, Los Angeles'];
  return names.map((name,i)=>({id:String(i),name,company:teams[Math.floor(i/3)],role:roles[i%roles.length],location:cities[i%4],level:['Early career','Experienced','Team lead'][i%3],school:schools[i%4],field:state.field||'Design & research',focus:['Building thoughtful experiences and sharing lessons from early career projects.','Connecting research, collaboration, and practical decisions in everyday work.','Helping teams grow through clear feedback and considered creative direction.'][i%3]}));
}
function filterPeople(people,f){
  const terms=(f.query||'').trim().toLowerCase().split(/\s+/).filter(Boolean);
  return people.filter(p=>(!f.companies.length||f.companies.includes(p.company))&&(!f.location||p.location===f.location)&&(!f.role||p.role===f.role)&&(!f.level||p.level===f.level)&&(!f.school||p.school===f.school)&&terms.every(t=>[p.name,p.company,p.role,p.location,p.school,p.level,p.field].join(' ').toLowerCase().includes(t)));
}
function peopleSelect(label,key,values){const f=peopleFilters();return `<label class="people-field">${label}<select data-people-filter="${key}"><option value="">Any ${label.toLowerCase()}</option>${[...new Set(values)].sort().map(v=>`<option value="${esc(v)}" ${f[key]===v?'selected':''}>${esc(v)}</option>`).join('')}</select></label>`}
function peopleFinder(){const f=peopleFilters(),all=peopleDirectory(),extra=!!(f.role||f.level||f.school);return `<section class="people-finder" aria-label="Find people"><div class="people-toolbar"><label class="people-field people-query">Find people<input id="people-search" type="search" placeholder="Name, role or keyword" value="${esc(f.query)}"></label><details class="company-filter"><summary id="company-filter-label">Companies${f.companies.length?` (${f.companies.length})`:''}</summary><div class="company-menu"><label class="people-field">Find a company<input type="search" id="company-search" placeholder="Search companies"></label><fieldset><legend>Select one or more companies</legend>${[...new Set(all.map(p=>p.company))].map(c=>`<label class="company-choice"><input type="checkbox" data-people-company="${esc(c)}" ${f.companies.includes(c)?'checked':''}><span>${esc(c)}</span></label>`).join('')}</fieldset><p id="company-no-match" hidden>No matching companies.</p><button type="button" class="text-btn" id="company-done">Done</button></div></details>${peopleSelect('Location','location',all.map(p=>p.location))}<button type="button" class="secondary more-people" id="more-people" aria-expanded="${extra}" aria-controls="people-extra">More filters</button></div><div class="people-extra" id="people-extra" ${extra?'':'hidden'}>${peopleSelect('Role','role',all.map(p=>p.role))}${peopleSelect('Career level','level',all.map(p=>p.level))}${peopleSelect('University','school',all.map(p=>p.school))}</div><div class="people-selections" id="people-selections"></div><div id="people-results"></div></section>`}
function renderPeopleResults(){
  const f=peopleFilters(),results=filterPeople(peopleDirectory(),f);
  peoplePage=Math.min(peoplePage,Math.max(0,Math.ceil(results.length/peoplePageSize)-1));
  const start=peoplePage*peoplePageSize,shown=results.slice(start,start+peoplePageSize);
  const labels=[...f.companies.map(v=>['companies',v]),...['location','role','level','school'].filter(k=>f[k]).map(k=>[k,f[k]])];
  $('#people-selections').innerHTML=labels.map(([k,v])=>`<button class="filter-chip" type="button" data-remove-filter="${k}" data-filter-value="${esc(v)}" aria-label="Remove ${esc(v)} filter">${esc(v)} <span aria-hidden="true">×</span></button>`).join('')+((labels.length||f.query)?'<button type="button" class="text-btn" id="clear-people">Clear all</button>':'');
  $('#people-results').innerHTML=`<div class="people-result-meta"><span role="status" aria-live="polite">${results.length} sample ${results.length===1?'person':'people'}${results.length?` · Showing ${start+1}–${start+shown.length}`:''}</span><span>Illustrative profiles</span></div><div class="people-grid">${shown.length?shown.map(p=>`<article class="person-card"><div class="person-head"><span class="person-avatar" aria-hidden="true">${p.name.split(' ').map(n=>n[0]).join('')}</span><div><h3>${esc(p.name)}</h3><p>${esc(p.role)}</p></div></div><p class="person-company">${esc(p.company)}</p><p class="person-location">${esc(p.location)}</p><div class="person-tags"><span>${esc(p.level)}</span><span>${esc(p.school)}</span></div><button type="button" class="text-btn" data-person="${p.id}">View profile →</button></article>`).join(''):'<div class="people-empty"><h3>No people match these filters.</h3><p>Try another company or location, or clear the filters to start again.</p><button class="secondary" id="reset-people" type="button">Clear filters</button></div>'}</div>${results.length>peoplePageSize?`<nav class="people-pagination" aria-label="People results pages"><button class="text-btn" id="people-prev" ${peoplePage===0?'disabled':''}>← Previous</button><span>Page ${peoplePage+1} of ${Math.ceil(results.length/peoplePageSize)}</span><button class="text-btn" id="people-next" ${start+peoplePageSize>=results.length?'disabled':''}>Next →</button></nav>`:''}`;
  $('#company-filter-label').textContent=`Companies${f.companies.length?` (${f.companies.length})`:''}`;
  document.querySelectorAll('[data-remove-filter]').forEach(b=>b.onclick=()=>{const k=b.dataset.removeFilter;if(k==='companies')f.companies=f.companies.filter(c=>c!==b.dataset.filterValue);else f[k]='';syncPeopleControls();updatePeople()});
  const clear=()=>{Object.assign(f,emptyPeopleFilters());syncPeopleControls();updatePeople()};
  if($('#clear-people'))$('#clear-people').onclick=clear;
  if($('#reset-people'))$('#reset-people').onclick=clear;
  if($('#people-prev'))$('#people-prev').onclick=()=>{peoplePage--;renderPeopleResults()};
  if($('#people-next'))$('#people-next').onclick=()=>{peoplePage++;renderPeopleResults()};
  document.querySelectorAll('[data-person]').forEach(b=>b.onclick=()=>showPerson(b.dataset.person));
}
function syncPeopleControls(){const f=peopleFilters();$('#people-search').value=f.query;document.querySelectorAll('[data-people-company]').forEach(el=>el.checked=f.companies.includes(el.dataset.peopleCompany));document.querySelectorAll('[data-people-filter]').forEach(el=>el.value=f[el.dataset.peopleFilter]);}
function updatePeople(){peoplePage=0;save();renderPeopleResults()}
function bindPeopleFinder(){
  const f=peopleFilters();
  $('#people-search').oninput=e=>{f.query=e.target.value;updatePeople()};
  document.querySelectorAll('[data-people-company]').forEach(el=>el.onchange=()=>{f.companies=el.checked?[...new Set([...f.companies,el.dataset.peopleCompany])]:f.companies.filter(c=>c!==el.dataset.peopleCompany);updatePeople()});
  document.querySelectorAll('[data-people-filter]').forEach(el=>el.onchange=()=>{f[el.dataset.peopleFilter]=el.value;updatePeople()});
  $('#company-search').oninput=e=>{let count=0;document.querySelectorAll('.company-choice').forEach(el=>{el.hidden=!el.textContent.toLowerCase().includes(e.target.value.toLowerCase());if(!el.hidden)count++});$('#company-no-match').hidden=count>0};
  $('#company-done').onclick=()=>{$('.company-filter').open=false;$('#company-filter-label').focus()};
  $('.company-filter').onkeydown=e=>{if(e.key==='Escape'){$('.company-filter').open=false;$('#company-filter-label').focus()}};
  $('#more-people').onclick=()=>{const extra=$('#people-extra');extra.hidden=!extra.hidden;$('#more-people').setAttribute('aria-expanded',String(!extra.hidden))};
  renderPeopleResults();
}
function showPerson(id){const person=peopleDirectory().find(p=>p.id===id);if(!person)return;
  modal(`<span class="pill">Sample profile</span><h2>${esc(person.name)}</h2><p><b>${esc(person.role)} · ${esc(person.company)}</b><br>${esc(person.location)} · ${esc(person.level)}</p><p>${esc(person.focus)}</p><p>Education: ${esc(person.school)}</p><div class="reassurance"><p>Conversation starter: ask about a recent project at ${esc(person.company)} and share a related piece of your work.</p></div><div class="modal-actions"><button type="button" class="primary" id="person-intro">Draft an introduction →</button></div><p class="hint">This is a fictional profile for exploring the experience. No message will be sent.</p>`);
  $('#person-intro').onclick=()=>{$('#detail').close();showIntro(person.company);$('.outreach').textContent=outreach(person.company).replace('Hi [name],',`Hi ${person.name.split(' ')[0]},`)};
}
