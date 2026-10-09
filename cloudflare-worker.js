// Home Sweet Home: Cloudflare Worker for one NLT verse each day.
// Add API_BIBLE_KEY as an encrypted Worker secret; never paste it here.
// API.Bible access and publisher permissions remain subject to your account's terms.
const API='https://rest.api.bible/v1';
const headers={ 'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET, OPTIONS','Access-Control-Allow-Headers':'Content-Type'};
function reply(body,status=200){return new Response(JSON.stringify(body),{status,headers});}
function todayIndex(){
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
  const get=k=>Number(parts.find(x=>x.type===k).value);
  const y=get('year'),m=get('month'),d=get('day');
  const n=Math.floor((Date.UTC(y,m-1,d)-Date.UTC(y,0,1))/86400000);
  const leap=new Date(Date.UTC(y,1,29)).getUTCMonth()===1;
  return leap&&n>59?n-1:Math.min(n,364);
}
export default {
 async fetch(request,env){
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
  if(request.method!=='GET')return reply({status:'error',message:'Method not allowed'},405);
  if(!env.API_BIBLE_KEY)return reply({status:'error',message:'Missing API_BIBLE_KEY secret'},500);
  try{
   // One of 365 approved daily references, not a general-purpose Bible API proxy.
   const index=todayIndex(),chapter=Math.floor(index/5)+1,verse=index%5+1;
   const id=`PSA.${chapter}.${verse}`;
   const auth={'api-key':env.API_BIBLE_KEY};
   const list=await fetch(`${API}/bibles?language=eng`,{headers:auth});
   if(!list.ok)throw new Error(`Bible lookup failed (${list.status})`);
   const available=await list.json();
   const nlt=(available.data||[]).find(x=>x.abbreviation?.toUpperCase()==='NLT'||/new living translation/i.test(x.name||''));
   if(!nlt)throw new Error('NLT is not accessible with this API key');
   const params=new URLSearchParams({'content-type':'text','include-titles':'false','include-verse-numbers':'false','include-notes':'false'});
   const result=await fetch(`${API}/bibles/${encodeURIComponent(nlt.id)}/verses/${id}?${params}`,{headers:auth});
   if(!result.ok)throw new Error(`Verse request failed (${result.status})`);
   const payload=await result.json();
   const verse=payload.data?.content;
   if(typeof verse!=='string'||!verse.trim()||verse.length>1200||/<[^>]*>/.test(verse))throw new Error('Verse content was incomplete or improperly formatted');
   return reply({status:'connected',translation:'New Living Translation',reference:payload.data.reference,verse:verse.trim(),copyright:payload.data.copyright||'',date:new Intl.DateTimeFormat('en-CA',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())});
  }catch(err){return reply({status:'error',message:String(err.message||'Unknown error')},502)}
 }
};
