// Conservative text extraction. Missing or uncertain information stays editable/blank.
export function cleanText(text) {
  return String(text || '').replace(/\r/g, '\n').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}
const heading = /^(education|academic background|experience|work experience|professional experience|employment|skills|technical skills|selected projects|projects|languages|summary|profile|about me|certifications|awards|interests)\s*:?.*$/i;
function section(lines, names) {
  const index = lines.findIndex(l => names.test(l));
  if (index < 0) return '';
  const result = [];
  for (let i=index+1;i<lines.length && result.length<24;i++) {
    if (heading.test(lines[i])) break;
    result.push(lines[i]);
  }
  return result.join('\n').slice(0, 5000);
}
export function safeWebUrl(value) {
  try { const u=new URL(/^https?:\/\//i.test(value)?value:'https://'+value); return ['https:','http:'].includes(u.protocol)&&!u.username&&!u.password?u.href:''; } catch { return ''; }
}
export function parseProfile(text, source='Resume') {
  text=cleanText(text).slice(0,150000);
  const lines=text.split('\n').map(l=>l.trim()).filter(Boolean);
  const fields={}, sources={};
  const set=(k,v)=>{if(v){fields[k]=v;sources[k]=source;}};
  const email=text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  if(email)set('email',email[0]);
  const urls=[...text.matchAll(/(?:https?:\/\/|www\.)[^\s<>"\])]+/gi)].map(m=>safeWebUrl(m[0].replace(/[.,;]+$/,''))).filter(Boolean);
  const linkedin=urls.find(u=>/linkedin\.com\/in\//i.test(u));
  if(linkedin)set('linkedin',linkedin);
  const portfolio=urls.find(u=>!/(linkedin\.com|mailto:|github\.com\/[^/]+\/[^/]+)/i.test(u));
  if(portfolio)set('portfolio',portfolio);
  const name=lines.slice(0,6).find(l=>l.length<65 && /^[\p{L}][\p{L}\p{M}.'’ -]+$/u.test(l) && l.split(/\s+/).length>=2 && l.split(/\s+/).length<=5 && !/resume|curriculum|portfolio|designer|researcher|engineer|university|college|marketing|experience|education|contact|developer|new york|san francisco/i.test(l));
  if(name)set('name',name);
  const education=section(lines,/^(education|academic background)\s*:?$/i);
  set('educationDetails',education);
  const institution=(education?education.split('\n'):lines).find(l=>/\b(university|college|institute of|school of|the new school|parsons|risd|pratt institute)\b/i.test(l));
  if(institution)set('university',institution.replace(/^[•\-\s]+/,'').split(/\s[|•]\s/)[0].slice(0,160));
  const degree=(education||text).match(/(?:Master(?:’s|'s)?(?: of)?|Bachelor(?:’s|'s)?(?: of)?|M\.?F\.?A\.?|B\.?F\.?A\.?|M\.?S\.?|B\.?S\.?|M\.?A\.?|B\.?A\.?|MBA|Ph\.?D\.?)[^\n|]{0,110}/i);
  if(degree)set('degree',degree[0].trim());
  set('workHistory',section(lines,/^(work experience|professional experience|experience|employment)\s*:?$/i));
  set('skills',section(lines,/^(technical skills|skills)\s*:?$/i));
  set('projects',section(lines,/^(selected projects|projects)\s*:?$/i));
  set('languages',section(lines,/^languages\s*:?$/i));
  const summary=section(lines,/^(summary|profile|about me)\s*:?$/i);
  set('bio',summary);
  const roles=[['Design & research',/\b(product design(?:er)?|ux|user experience|user research|visual design(?:er)?|brand design(?:er)?|service design)\b/gi],['Arts & creative',/\b(illustrator|illustration|fashion|animation|animator|photographer|art director)\b/gi],['Marketing & communications',/\b(marketing|communications|copywriter|content strategist|social media|brand strategist)\b/gi],['Business & operations',/\b(business analyst|operations|project coordinator|people operations|business administration)\b/gi],['Policy & social impact',/\b(policy|public affairs|social impact|community organizer|public administration)\b/gi]];
  const ranked=roles.map(([field,re])=>[field,[...text.matchAll(re)].length]).sort((a,b)=>b[1]-a[1]);
  if(ranked[0][1]>0)set('field',ranked[0][0]);
  const title=lines.slice(0,12).find(l=>l!==name && l.length<100 && /designer|researcher|illustrator|strategist|analyst|writer|artist|producer|coordinator|photographer|marketer|engineer/i.test(l) && !/university|college|@|https?:/i.test(l));
  set('headline',title);
  return {fields,sources,textLength:text.length};
}
