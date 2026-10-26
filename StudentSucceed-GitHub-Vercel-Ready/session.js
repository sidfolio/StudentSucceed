// Browser-only prototype session. Real authentication must be enforced on a server.
window.StudentSession={
  key:'studentsucceed-demo-session-v1',
  current(){try{const s=JSON.parse(sessionStorage.getItem(this.key));return s?.demo===true&&s.expiresAt>Date.now()?s:null}catch{return null}},
  start(method){sessionStorage.setItem(this.key,JSON.stringify({demo:true,method,expiresAt:Date.now()+8*60*60*1000}))},
  end(){sessionStorage.removeItem(this.key)},
  destination(page){const url=new URL(page,location.href);const focus=new URLSearchParams(location.search).get('focus');if(focus&&['apply','interview','portfolio','connections'].includes(focus))url.searchParams.set('focus',focus);return url.pathname+url.search}
};
if(/\/onboarding(?:\.html)?\/?$/.test(location.pathname)&&!StudentSession.current())location.replace(StudentSession.destination('login.html'));
