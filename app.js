'use strict';
const KEY='home-sweet-home-v1';
const APP_VERSION='3.2.4';
const BIBLE_WORKER='https://home-sweet-home-bible.tw84ry99kh.workers.dev/';
const DAYS=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const ROUTINE={"0":["Check family schedule.","Plan dinners for the week.","Make grocery list.","Prepare daycare clothing and supplies.","Restock diapers and wipes.","Clear kitchen and dining counters.","Declutter one small area for 10 minutes."],"1":["Clean primary bathroom toilet.","Clean upstairs hallway bathroom toilet.","Wipe both upstairs bathroom sinks and counters.","Clean downstairs half-bath toilet and sink.","Wipe bathroom mirrors.","Replace dirty hand towels.","Empty bathroom trash cans."],"2":["Dust living room furniture.","Dust TV stand and bookshelf.","Wipe coffee table and side tables.","Straighten couch cushions and blankets.","Dust entryway furniture.","Dust loft surfaces.","Wipe fingerprints from frequently touched surfaces."],"3":["Change primary bedroom sheets.","Change Bailey's bedding.","Dust bedroom nightstands.","Dust dresser tops.","Put away loose clothing.","Tidy Bailey's bedroom.","Quickly tidy third bedroom."],"4":["Clean microwave interior.","Wipe refrigerator exterior and handles.","Wipe cabinet fronts with fingerprints.","Clean stovetop thoroughly.","Check refrigerator for expired leftovers.","Wipe backsplash.","Clean kitchen sink and faucet."],"5":["Vacuum corners and edges the robot misses.","Clean stairs if needed.","Spot-clean sticky floors.","Empty household trash cans.","Wipe entryway floor.","Complete one missed task if time allows.","Clear clutter hotspots before the weekend."],"6":["Wash and fold remaining laundry.","Wash towels.","Put away clean clothes.","Restock bathroom supplies.","Tidy garage hangout area.","Check grocery and household supplies."]};
const PROJECTS=[['Kitchen & bathrooms','Clear kitchen counters','Deep clean main bathroom','Deep clean second full bathroom','Deep clean downstairs half bath'],['Bedrooms','Reset your bedroom floor','Fold and put away clean clothes','Sort Bailey’s outgrown clothes','Organize Bailey’s dresser'],['Loft & guest room','Sort seasonal blankets and quilts','Store seasonal bedding','Sort guest room storage','Clear space for guest bed'],['Garage','Sort first batch of moving boxes','Set aside donations and trash','Sort remaining boxes','Create labeled storage zones']];
const MAINT=[['Check HVAC filter','Monthly; replace according to filter and lease guidance'],['Test smoke and CO alarms','Monthly; follow manufacturer instructions'],['Clean dishwasher filter','Monthly or as manufacturer recommends'],['Clean washing machine gasket/dispenser','Monthly'],['Check under sinks for leaks','Monthly'],['Clean dryer lint screen','After every load; check vent regularly'],['Check seasonal home upkeep','Spring and fall; ask landlord about responsibilities']];
const FLY_DAILY={"Morning Routine": ["Make my bed.", "Wipe primary bathroom sink and counter.", "Quickly swish toilet if needed.", "Unload dishwasher.", "Put breakfast dishes in dishwasher.", "Put dirty clothes in hamper.", "Quickly wipe kitchen counters."], "After-Work / Evening Routine": ["Put away bags, shoes, and jackets.", "Pick up toys with Bailey.", "Load dinner dishes into dishwasher.", "Wipe kitchen counters and stovetop.", "Wipe dining table and Bailey's high chair.", "Put away dinner leftovers.", "Complete one laundry step if needed."], "Before-Bed Reset": ["Make sure kitchen sink is empty and clean.", "Start dishwasher if needed.", "Pick up toys and cords from robot vacuum's path.", "Put away five things that are out of place.", "Set out tomorrow's clothes.", "Prepare daycare bag and essentials."]};
const FLY_ZONES=[{"title": "Zone 1 — Entryway, Dining Room & Downstairs Half Bath", "tasks": ["Wipe front door and handles.", "Clean entryway baseboards.", "Organize shoes and jackets.", "Dust entryway furniture.", "Wipe dining chairs and legs.", "Clean dining room light fixture.", "Clean dining room window sills.", "Thoroughly scrub downstairs half-bath.", "Wipe half-bath cabinet fronts.", "Clean corners the robot misses."]}, {"title": "Zone 2 — Kitchen", "tasks": ["Clean refrigerator shelves and drawers.", "Organize pantry.", "Wipe inside cabinet shelves.", "Deep-clean microwave.", "Clean oven as needed.", "Clean dishwasher filter.", "Clean under small appliances.", "Wipe backsplash and cabinet fronts.", "Clean trash can.", "Dust vents and light fixtures."]}, {"title": "Zone 3 — Bathrooms, Loft & Third Bedroom", "tasks": ["Scrub showers and bathtubs.", "Clean shower doors or curtains.", "Organize bathroom drawers.", "Discard expired bathroom products.", "Wash bath mats.", "Wipe bathroom baseboards.", "Dust loft furniture.", "Organize loft clutter.", "Dust third bedroom furniture.", "Declutter third bedroom closet."]}, {"title": "Zone 4 — Primary Bedroom & Bailey's Bedroom", "tasks": ["Clean under primary bed.", "Dust headboard and lamps.", "Organize nightstand drawers.", "Declutter dresser.", "Organize primary closet.", "Wipe bedroom baseboards.", "Clean bedroom window sills.", "Clean under Bailey's bed or crib.", "Sort outgrown toddler clothes.", "Rotate and declutter toys.", "Wipe bedroom doors and light switches."]}, {"title": "Zone 5 — Living Room & Garage", "tasks": ["Vacuum under sofa cushions.", "Clean under living room furniture.", "Dust TV and electronics.", "Dust bookshelf thoroughly.", "Clean window sills and glass.", "Dust ceiling fans.", "Wipe living room baseboards.", "Organize garage hangout area.", "Dust garage TV and furniture.", "Sweep garage floor.", "Organize garage storage."]}];
const FLY_MONTHLY=["Wash throw blankets and removable covers.", "Clean washing machine.", "Clean dryer lint area.", "Dust air vents.", "Check HVAC filter.", "Clean trash cans.", "Wipe door frames and handles.", "Clean marks on walls.", "Declutter one storage area.", "Check smoke and carbon monoxide alarms."];
const FLY_QUARTER=["Wash windows.", "Clean blinds and window treatments.", "Deep-clean refrigerator.", "Organize pantry and check expiration dates.", "Declutter clothing closets.", "Sort Bailey's clothing by size.", "Rotate seasonal decorations.", "Clean behind movable furniture.", "Deep-clean upholstered furniture as appropriate.", "Declutter garage storage.", "Check cleaning supplies and replace essentials."];
const FLY_HALF=["Deep-clean oven.", "Clean under and behind large appliances when safely accessible.", "Wash pillows according to care instructions.", "Clean or wash curtains.", "Declutter kitchen cabinets.", "Organize important household paperwork.", "Donate unused clothing, toys, and household items.", "Check dryer exhaust vent for lint buildup."];
const FLY_LAUNDRY=["Bailey’s clothes", "My clothes", "Bedding", "Towels", "Catch-up load if needed", "Remaining laundry", "Put away anything remaining"];
const DEFAULT_MEALS=['Leftovers or easy dinner','Chicken tacos','Leftovers','Pasta and vegetables','Homemade pizza','Sheet-pan chicken and potatoes','Slow-cooker dinner'];
const blank=()=>({checks:{},projects:{},laundry:{},maintenance:{},meals:[...DEFAULT_MEALS],extra:[],notes:'',groceries:[],events:[],kids:[],prayers:[],gratitudes:[],savedVerses:[],mode:'normal',capture:[],sickUntil:'',routineChecks:{},nltTexts:{},nltVerified:{},household:[],favorites:[],baileyBag:{},brain:[],energy:'tired',recipeFilter:'all',recipeWeeks:{},recipeServings:{}});
let state=load(),tab='today',selectedDay=new Date().getDay();
function addDays(n){const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+n);return isoDate(d)}
function normalizeMode(){if(state.mode!=='normal'&&state.sickUntil&&isoDate(new Date())>state.sickUntil){state.mode='normal';state.sickUntil='';save()}}
normalizeMode();
function load(){try{let raw=JSON.parse(localStorage.getItem(KEY));if(raw&&typeof raw==='object')return {...blank(),...raw,checks:raw.checks||{},projects:raw.projects||{},laundry:raw.laundry||{},maintenance:raw.maintenance||{},meals:Array.isArray(raw.meals)?raw.meals:[...DEFAULT_MEALS],extra:Array.isArray(raw.extra)?raw.extra:[],groceries:Array.isArray(raw.groceries)?raw.groceries:[],events:Array.isArray(raw.events)?raw.events:[],kids:Array.isArray(raw.kids)?raw.kids:[],prayers:Array.isArray(raw.prayers)?raw.prayers:[],gratitudes:Array.isArray(raw.gratitudes)?raw.gratitudes:[],savedVerses:Array.isArray(raw.savedVerses)?raw.savedVerses:[],capture:Array.isArray(raw.capture)?raw.capture:[],mode:['normal','minimum','sick'].includes(raw.mode)?raw.mode:'normal',routineChecks:raw.routineChecks||{},sickUntil:typeof raw.sickUntil==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(raw.sickUntil)?raw.sickUntil:(raw.mode&&raw.mode!=='normal'?isoDate(new Date()):''),nltTexts:raw.nltTexts||{},nltVerified:raw.nltVerified||{},household:Array.isArray(raw.household)?raw.household:[],favorites:Array.isArray(raw.favorites)?raw.favorites:[],baileyBag:raw.baileyBag||{},brain:Array.isArray(raw.brain)?raw.brain:[],energy:raw.energy||'tired',recipeFilter:'all',recipeWeeks:raw.recipeWeeks&&typeof raw.recipeWeeks==='object'&&!Array.isArray(raw.recipeWeeks)?raw.recipeWeeks:{},recipeServings:raw.recipeServings&&typeof raw.recipeServings==='object'&&!Array.isArray(raw.recipeServings)?raw.recipeServings:{}}}catch(e){}return blank()}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){alert('Your browser could not save progress. Export a backup from More.')}}
function isoDate(d){return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
function dayDate(day){const now=new Date(),diff=day-now.getDay(),d=new Date(now.getFullYear(),now.getMonth(),now.getDate()+diff);return isoDate(d)}
function weekKey(d=new Date()){const a=new Date(d.getFullYear(),d.getMonth(),d.getDate()-((d.getDay()+6)%7));return isoDate(a)}
function esc(x){return String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function done(k){return !!state.checks[k]}
function task(label,key){return `<label class="task"><input type="checkbox" data-check="${esc(key)}" ${done(key)?'checked':''}><span>${esc(label)}</span></label>`}
function progress(n,total){return `<div class="progress"><div style="width:${total?Math.round(n/total*100):0}%"></div></div><p class="muted">${n} of ${total} complete</p>`}
function dayTasks(day){const date=dayDate(day);return ROUTINE[day].map((s,i)=>[s,'routine:'+date+':'+i]).concat(state.extra.filter(x=>x.day===day).map(x=>[x.label,'extra:'+date+':'+x.id]))}
function originalToday(){const d=new Date().getDay(),t=dayTasks(d),count=t.filter(x=>done(x[1])).length;return `<div class="card hero"><div class="ornament">✿ · ♡ · ✿</div><div class="topline"><span class="eyebrow">TODAY'S LITTLE WINS</span><span class="pill">20 minutes</span></div><h2>${DAYS[d]}'s focus</h2>${t.map(x=>task(...x)).join('')}${progress(count,t.length)}<p class="subtle">Stop when your timer ends. Unfinished tasks do not pile onto tomorrow.</p></div><div class="grid"><div class="mini"><div>☀️</div><b>5:40 AM</b><small>20-minute reset</small></div><div class="mini"><div>♡</div><b>Evenings</b><small>Dinner and Bailey time</small></div><div class="mini"><div>♧</div><b>Laundry</b><small>Wed / Sat / Sun</small></div><div class="mini"><div>✧</div><b>Room reset</b><small>One project at a time</small></div></div><div class="sectionlabel">YOUR DAILY RHYTHM</div><div class="card"><p><b>5:40–6:00</b> · Quick cleaning</p><p><b>6:00–6:45</b> · Get yourself ready</p><p><b>6:45–7:30</b> · Wake and prepare Bailey</p><p><b>6:00–8:45 PM</b> · Dinner, play, bedtime</p><p><b>After 8:45 PM</b> · Your time — no assigned chores</p><div class="note">Aim for enough sleep. On exhausting mornings, a 5-minute reset is enough.</div></div>`}
function flyChecklist(title,arr,prefix,note=''){const total=arr.length,complete=arr.filter((_,i)=>done(prefix+':'+i)).length;return `<section class="card"><h3>${title}</h3>${note?`<p class="subtle">${note}</p>`:''}${arr.map((label,i)=>task(label,prefix+':'+i)).join('')}${progress(complete,total)}</section>`}
function flyZoneIndex(date=new Date()){const day=date.getDate(),month=date.getMonth(),year=date.getFullYear();const first=new Date(year,month,1),firstMonday=1+(8-first.getDay())%7;const secondMonday=firstMonday+7,thirdMonday=secondMonday+7,fourthMonday=thirdMonday+7;return day<firstMonday?0:day<secondMonday?1:day<thirdMonday?2:day<fourthMonday?3:4}
function flyCleaning(){const now=new Date(),date=isoDate(now),day=now.getDay(),month=date.slice(0,7),quarter=now.getFullYear()+'-Q'+(Math.floor(now.getMonth()/3)+1),half=now.getFullYear()+'-H'+(now.getMonth()<6?1:2),zone=flyZoneIndex(now),zoneData=FLY_ZONES[zone],daycareTomorrow=![5,6].includes(day);return `<div class="card sage"><span class="eyebrow">✿ YOUR FLYLADY HOME</span><h2>Clean enough to feel cozy</h2><p class="subtle">A little each day. No marathon cleaning, no catch-up debt. Weekdays aim for 15–25 minutes; zone tasks are optional extras.</p><p class="subtle">♡ Your Shark cleans automatically at night. Just clear its path; you never need to start or dock it.</p></div>${flyChecklist('☀ Morning · 5–10 minutes',FLY_DAILY['Morning Routine'],'fly:morning:'+date)}${flyChecklist('♡ After work · 10–15 minutes',FLY_DAILY['After-Work / Evening Routine'],'fly:after:'+date)}${flyChecklist('☾ Before bed · 5 minutes',FLY_DAILY['Before-Bed Reset'].filter(x=>daycareTomorrow||!x.toLowerCase().includes('daycare')),'fly:bed:'+date,daycareTomorrow?'Prepare for daycare tomorrow.':'No daycare prep needed tonight.')}${flyChecklist('✿ This month’s zone: '+esc(zoneData.title),zoneData.tasks,'fly:zone:'+month+':'+zone,'Optional: pick just one or two 10–15-minute tasks. Move on when the month changes.')}${flyChecklist('🧺 '+DAYS[day]+' laundry: '+FLY_LAUNDRY[day],['Wash','Dry','Fold','Put away'],'fly:laundry:'+date,'One step counts. Skip a load if you do not need it.')}${flyChecklist('Monthly home maintenance',FLY_MONTHLY,'fly:monthly:'+month,'Do these throughout the month when time allows.')}${flyChecklist('Every 3 months',FLY_QUARTER,'fly:quarter:'+quarter)}${flyChecklist('Every 6 months',FLY_HALF,'fly:half:'+half)}<section class="card peach"><h3>Little decluttering helpers</h3><p class="subtle">Choose one: a 2-minute hot spot, a 5-minute room rescue, or a 15-minute drawer or basket. The 27 Fling Boogie is completely optional.</p><div class="row-actions"><button class="button secondary" data-quick="10">10-minute reset idea</button></div></section>`}
function week(){const t=dayTasks(selectedDay),n=t.filter(x=>done(x[1])).length;return `<div class="card"><h2>Weekly FlyLady rhythm</h2><p class="subtle">Pick a day to see its focus. Complete what fits; missed tasks never roll over.</p><div class="days">${DAYS.map((x,i)=>`<button class="day ${selectedDay===i?'selected':''}" data-day="${i}">${x.slice(0,3)}</button>`).join('')}</div><h3>${DAYS[selectedDay]}</h3>${t.map(x=>task(...x)).join('')}${progress(n,t.length)}<div class="row-actions"><button class="button secondary" id="add-task">+ Add a task</button></div></div>`}
function reset(){let completed=0,total=0;PROJECTS.forEach((p,i)=>p.slice(1).forEach((_,j)=>{total++;if(state.projects[i+':'+j])completed++}));return `<div class="card peach"><h2>Room-by-room reset</h2><p class="subtle">One 30–45 minute Saturday session. The four-week plan can take longer if life gets busy.</p>${progress(completed,total)}</div>${PROJECTS.map((p,i)=>`<div class="card"><div class="topline"><h3>Week ${i+1} · ${esc(p[0])}</h3><span class="pill">${p.slice(1).filter((_,j)=>state.projects[i+':'+j]).length}/4</span></div>${p.slice(1).map((s,j)=>`<label class="task"><input type="checkbox" data-project="${i}:${j}" ${state.projects[i+':'+j]?'checked':''}><span>${esc(s)}</span></label>`).join('')}</div>`).join('')}`}
function plan(){return `<div class="card sage"><h2>Dinner for two ♡</h2><p class="subtle">One meal for you and Bailey. Three cooking nights, leftovers and easy dinners. Tap any meal to change it.</p></div><div class="card">${DAYS.map((d,i)=>`<div class="meal"><label class="caption" for="meal-${i}">${d}</label><input id="meal-${i}" class="field" data-meal="${i}" value="${esc(state.meals[i]||'')}"></div>`).join('')}<button class="button" id="save-meals">Save meal plan</button></div><div class="card"><h3>Grocery checklist</h3><p class="subtle">Add items as you think of them. Check them off while shopping.</p><div class="row-actions"><input id="new-grocery" class="field grow" maxlength="120" placeholder="Milk, bananas, chicken…"><button class="button" id="add-grocery">Add</button></div>${state.groceries.map((g,i)=>`<div class="grocery-line"><label class="task"><input type="checkbox" data-grocery="${i}" ${g.done?'checked':''}><span>${esc(g.label)}</span></label><button class="icon-button" aria-label="Remove item" data-remove-grocery="${i}">×</button></div>`).join('')}</div><div class="card"><h3>♡ AnyList grocery handoff</h3><p class="subtle">Copy your unchecked grocery items, then paste them into AnyList. This is a one-way copy, not automatic syncing.</p><button class="button" id="copy-anylist">Copy for AnyList</button><p id="anylist-status" class="subtle"></p></div><div class="card"><h3>Grocery / dinner notes</h3><textarea id="notes" class="field" placeholder="Ingredients, groceries, quick meal ideas…">${esc(state.notes)}</textarea><div class="row-actions"><button class="button secondary" id="save-notes">Save notes</button></div></div>`}

function calendar(){const now=new Date(),start=new Date(now.getFullYear(),now.getMonth(),1),month=new Intl.DateTimeFormat('en-US',{month:'long',year:'numeric'}).format(now),offset=start.getDay(),last=new Date(now.getFullYear(),now.getMonth()+1,0).getDate();let cells='';for(let n=0;n<offset;n++)cells+='<div class="cal-empty"></div>';for(let d=1;d<=last;d++){const dt=new Date(now.getFullYear(),now.getMonth(),d),day=dt.getDay(),date=isoDate(dt),evt=state.events.filter(x=>x.date===date),isToday=date===isoDate(now);cells+=`<div class="cal-day ${isToday?'cal-today':''}"><b>${d}</b><small>${day===5?'Trash':day===4?'Bins':day===3?'Carpet':''}</small>${evt.map(x=>`<small class="cal-event">${esc(x.label)}</small>`).join('')}</div>`}return `<div class="card"><span class="eyebrow">THE LITTLE THINGS, PLANNED</span><h2>${month}</h2><p class="subtle">Weekly routines appear automatically. Add personal reminders below; this calendar does not send notifications.</p><div class="calendar">${['S','M','T','W','T','F','S'].map(x=>`<div class="cal-heading">${x}</div>`).join('')}${cells}</div></div><div class="card"><h3>Add a calendar note</h3><div class="row-actions"><input id="event-date" type="date" class="field grow" value="${isoDate(now)}"><input id="event-label" class="field grow" maxlength="100" placeholder="Filter check, appointment…"><button class="button" id="add-event">Add note</button></div>${state.events.filter(x=>x.date.slice(0,7)===isoDate(now).slice(0,7)).sort((a,b)=>a.date.localeCompare(b.date)).map(x=>`<div class="grocery-line"><span class="subtle">${esc(x.date)} · ${esc(x.label)}</span><button class="icon-button" data-remove-event="${esc(x.id)}" aria-label="Remove note">×</button></div>`).join('')}</div>`}
function more(){const month=new Date().toISOString().slice(0,7);return `<div class="card sage"><h2>Home Sweet Home ${APP_VERSION} ♡</h2><p class="subtle">Your feature guide: Today has Morning Grace, quick capture and mode controls; Kids has memories; Faith has prayers and gratitude; Routines has cleaning, laundry, room projects and Tomorrow Me; Meals has groceries and Copy for AnyList; Calendar has dated notes; More has maintenance, Scripture import and backups.</p><p class="subtle">Morning Grace retrieves one complete NLT verse per day through your Cloudflare Worker. The Bible provider's attribution is displayed with the verse.</p></div><div class="card"><h2>Home maintenance</h2><p class="subtle">Monthly items reset each calendar month. Confirm maintenance responsibilities with your landlord.</p>${MAINT.map((x,i)=>`<label class="task"><input type="checkbox" data-maint="${month}:${i}" ${state.maintenance[month+':'+i]?'checked':''}><span><b>${esc(x[0])}</b><br><small class="muted">${esc(x[1])}</small></span></label>`).join('')}</div><div class="card"><h2>365-Day Scripture Library ✿</h2><p class="subtle">365 daily Scripture selections and original reflections are ready. Live daily NLT is now connected through Cloudflare. Imported authorized verses remain as a fallback if the service is unavailable; bulk NLT text is not bundled.</p><div class="row-actions"><button class="button secondary" id="import-nlt">Import authorized NLT text</button><input type="file" id="nlt-file" accept="application/json,.json" hidden></div><p class="subtle">${Object.keys(state.nltVerified||{}).length} verified passages · 365 daily references</p></div><div class="card"><h2>Your data</h2><p class="subtle">Your progress is stored on this device in this browser. It does not automatically sync across devices. Export a backup before clearing Safari data or changing phones.</p><div class="row-actions"><button class="button" id="export">Export backup</button><button class="button secondary" id="import">Import backup</button><input type="file" id="import-file" accept="application/json,.json" hidden></div></div><div class="card"><h3>Starting schedule</h3><p class="subtle">5:40–6:00 AM cleaning · 6:00–6:45 getting ready · 6:45–7:30 Bailey · Friday trash pickup · Saturdays for one decluttering project.</p><button class="button danger" id="clear">Erase all app data</button></div>`}

// Existing small NLT sample quotations retained from 3.1.5; other passages require user-authorized text.
// Do not present a failed API response as Scripture.
const DAILY_REFERENCES=["Psalms 1:1","Psalms 1:2","Psalms 1:3","Psalms 1:4","Psalms 1:5","Psalms 2:1","Psalms 2:2","Psalms 2:3","Psalms 2:4","Psalms 2:5","Psalms 3:1","Psalms 3:2","Psalms 3:3","Psalms 3:4","Psalms 3:5","Psalms 4:1","Psalms 4:2","Psalms 4:3","Psalms 4:4","Psalms 4:5","Psalms 5:1","Psalms 5:2","Psalms 5:3","Psalms 5:4","Psalms 5:5","Psalms 6:1","Psalms 6:2","Psalms 6:3","Psalms 6:4","Psalms 6:5","Psalms 7:1","Psalms 7:2","Psalms 7:3","Psalms 7:4","Psalms 7:5","Psalms 8:1","Psalms 8:2","Psalms 8:3","Psalms 8:4","Psalms 8:5","Psalms 9:1","Psalms 9:2","Psalms 9:3","Psalms 9:4","Psalms 9:5","Psalms 10:1","Psalms 10:2","Psalms 10:3","Psalms 10:4","Psalms 10:5","Psalms 11:1","Psalms 11:2","Psalms 11:3","Psalms 11:4","Psalms 11:5","Psalms 12:1","Psalms 12:2","Psalms 12:3","Psalms 12:4","Psalms 12:5","Psalms 13:1","Psalms 13:2","Psalms 13:3","Psalms 13:4","Psalms 13:5","Psalms 14:1","Psalms 14:2","Psalms 14:3","Psalms 14:4","Psalms 14:5","Psalms 15:1","Psalms 15:2","Psalms 15:3","Psalms 15:4","Psalms 15:5","Psalms 16:1","Psalms 16:2","Psalms 16:3","Psalms 16:4","Psalms 16:5","Psalms 17:1","Psalms 17:2","Psalms 17:3","Psalms 17:4","Psalms 17:5","Psalms 18:1","Psalms 18:2","Psalms 18:3","Psalms 18:4","Psalms 18:5","Psalms 19:1","Psalms 19:2","Psalms 19:3","Psalms 19:4","Psalms 19:5","Psalms 20:1","Psalms 20:2","Psalms 20:3","Psalms 20:4","Psalms 20:5","Psalms 21:1","Psalms 21:2","Psalms 21:3","Psalms 21:4","Psalms 21:5","Psalms 22:1","Psalms 22:2","Psalms 22:3","Psalms 22:4","Psalms 22:5","Psalms 23:1","Psalms 23:2","Psalms 23:3","Psalms 23:4","Psalms 23:5","Psalms 24:1","Psalms 24:2","Psalms 24:3","Psalms 24:4","Psalms 24:5","Psalms 25:1","Psalms 25:2","Psalms 25:3","Psalms 25:4","Psalms 25:5","Psalms 26:1","Psalms 26:2","Psalms 26:3","Psalms 26:4","Psalms 26:5","Psalms 27:1","Psalms 27:2","Psalms 27:3","Psalms 27:4","Psalms 27:5","Psalms 28:1","Psalms 28:2","Psalms 28:3","Psalms 28:4","Psalms 28:5","Psalms 29:1","Psalms 29:2","Psalms 29:3","Psalms 29:4","Psalms 29:5","Psalms 30:1","Psalms 30:2","Psalms 30:3","Psalms 30:4","Psalms 30:5","Psalms 31:1","Psalms 31:2","Psalms 31:3","Psalms 31:4","Psalms 31:5","Psalms 32:1","Psalms 32:2","Psalms 32:3","Psalms 32:4","Psalms 32:5","Psalms 33:1","Psalms 33:2","Psalms 33:3","Psalms 33:4","Psalms 33:5","Psalms 34:1","Psalms 34:2","Psalms 34:3","Psalms 34:4","Psalms 34:5","Psalms 35:1","Psalms 35:2","Psalms 35:3","Psalms 35:4","Psalms 35:5","Psalms 36:1","Psalms 36:2","Psalms 36:3","Psalms 36:4","Psalms 36:5","Psalms 37:1","Psalms 37:2","Psalms 37:3","Psalms 37:4","Psalms 37:5","Psalms 38:1","Psalms 38:2","Psalms 38:3","Psalms 38:4","Psalms 38:5","Psalms 39:1","Psalms 39:2","Psalms 39:3","Psalms 39:4","Psalms 39:5","Psalms 40:1","Psalms 40:2","Psalms 40:3","Psalms 40:4","Psalms 40:5","Psalms 41:1","Psalms 41:2","Psalms 41:3","Psalms 41:4","Psalms 41:5","Psalms 42:1","Psalms 42:2","Psalms 42:3","Psalms 42:4","Psalms 42:5","Psalms 43:1","Psalms 43:2","Psalms 43:3","Psalms 43:4","Psalms 43:5","Psalms 44:1","Psalms 44:2","Psalms 44:3","Psalms 44:4","Psalms 44:5","Psalms 45:1","Psalms 45:2","Psalms 45:3","Psalms 45:4","Psalms 45:5","Psalms 46:1","Psalms 46:2","Psalms 46:3","Psalms 46:4","Psalms 46:5","Psalms 47:1","Psalms 47:2","Psalms 47:3","Psalms 47:4","Psalms 47:5","Psalms 48:1","Psalms 48:2","Psalms 48:3","Psalms 48:4","Psalms 48:5","Psalms 49:1","Psalms 49:2","Psalms 49:3","Psalms 49:4","Psalms 49:5","Psalms 50:1","Psalms 50:2","Psalms 50:3","Psalms 50:4","Psalms 50:5","Psalms 51:1","Psalms 51:2","Psalms 51:3","Psalms 51:4","Psalms 51:5","Psalms 52:1","Psalms 52:2","Psalms 52:3","Psalms 52:4","Psalms 52:5","Psalms 53:1","Psalms 53:2","Psalms 53:3","Psalms 53:4","Psalms 53:5","Psalms 54:1","Psalms 54:2","Psalms 54:3","Psalms 54:4","Psalms 54:5","Psalms 55:1","Psalms 55:2","Psalms 55:3","Psalms 55:4","Psalms 55:5","Psalms 56:1","Psalms 56:2","Psalms 56:3","Psalms 56:4","Psalms 56:5","Psalms 57:1","Psalms 57:2","Psalms 57:3","Psalms 57:4","Psalms 57:5","Psalms 58:1","Psalms 58:2","Psalms 58:3","Psalms 58:4","Psalms 58:5","Psalms 59:1","Psalms 59:2","Psalms 59:3","Psalms 59:4","Psalms 59:5","Psalms 60:1","Psalms 60:2","Psalms 60:3","Psalms 60:4","Psalms 60:5","Psalms 61:1","Psalms 61:2","Psalms 61:3","Psalms 61:4","Psalms 61:5","Psalms 62:1","Psalms 62:2","Psalms 62:3","Psalms 62:4","Psalms 62:5","Psalms 63:1","Psalms 63:2","Psalms 63:3","Psalms 63:4","Psalms 63:5","Psalms 64:1","Psalms 64:2","Psalms 64:3","Psalms 64:4","Psalms 64:5","Psalms 65:1","Psalms 65:2","Psalms 65:3","Psalms 65:4","Psalms 65:5","Psalms 66:1","Psalms 66:2","Psalms 66:3","Psalms 66:4","Psalms 66:5","Psalms 67:1","Psalms 67:2","Psalms 67:3","Psalms 67:4","Psalms 67:5","Psalms 68:1","Psalms 68:2","Psalms 68:3","Psalms 68:4","Psalms 68:5","Psalms 69:1","Psalms 69:2","Psalms 69:3","Psalms 69:4","Psalms 69:5","Psalms 70:1","Psalms 70:2","Psalms 70:3","Psalms 70:4","Psalms 70:5","Psalms 71:1","Psalms 71:2","Psalms 71:3","Psalms 71:4","Psalms 71:5","Psalms 72:1","Psalms 72:2","Psalms 72:3","Psalms 72:4","Psalms 72:5","Psalms 73:1","Psalms 73:2","Psalms 73:3","Psalms 73:4","Psalms 73:5"];
const DAILY_THEMES=['Peace','Trust','Courage','Patience','Gratitude','Hope','Strength','Rest','Love','Wisdom','Joy','Grace'];
const MAMA_REFLECTIONS=[
'When the day feels uncertain, you can bring each worry to God and take the next loving step with your little one.',
'You are allowed to ask for wisdom, choose what you can, and release what is outside your control.',
'You do not have to be fearless to be brave. Showing up with love is enough for this moment.',
'Even on the loud, messy days, gentleness can begin with one deep breath and one kind word.',
'Notice one small blessing today: a giggle, a hug, a meal together, or a quiet minute.',
'Today does not need to be perfect to hold goodness. Hope can grow in the ordinary hours.',
'Rest is not something you have to earn by finishing every chore. You matter, too.',
'Love is found in tiny acts: listening, feeding, comforting, and trying again tomorrow.'
];
const MAMA_PRAYERS=[
'Lord, give me peace for today and wisdom for the next step. Help me care for my child with love. Amen.',
'Father, guide my choices and soften my heart when I am tired. Amen.',
'God, thank You for the small joys of this day. Help me notice them. Amen.',
'Lord, when plans change, give me patience and courage to begin again. Amen.',
'Jesus, help our home feel safe, loved, and full of grace today. Amen.'
];
// Only existing short quotations are bundled. Add licensed NLT text in the app's private import.
const LICENSED_SAMPLE_TEXT={
'Psalm 56:3':'But when I am afraid,\nI will put my trust in you.',
'Proverbs 3:5':'Trust in the Lord with all your heart;\ndo not depend on your own understanding.',
'Philippians 4:13':'For I can do everything through Christ, who gives me strength.'
};
function dayOfYear(){const d=new Date();return Math.floor((Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())-Date.UTC(d.getFullYear(),0,1))/86400000)}
function dailyVerse(){const now=new Date(),isLeap=new Date(now.getFullYear(),1,29).getMonth()===1,day=dayOfYear(),i=isLeap&&day>59?day-1:Math.min(day,364),ref=DAILY_REFERENCES[i];return [ref,DAILY_THEMES[i%DAILY_THEMES.length],(state.nltVerified?.[ref]?state.nltTexts?.[ref]:'')||LICENSED_SAMPLE_TEXT[ref]||'',MAMA_REFLECTIONS[i%MAMA_REFLECTIONS.length],MAMA_PRAYERS[i%MAMA_PRAYERS.length]]}
function verseLink(ref){return 'https://www.biblegateway.com/passage/?search='+encodeURIComponent(ref)+'&version=NLT'}
// Tyndale's official NLT API is requested directly from the reader's browser.
// Cached responses are limited to the passages the reader actually visits.
let liveNLT={date:'',status:'idle',verse:'',reference:'',copyright:'',error:''};
async function loadDailyNLT(){
  const today=isoDate(new Date());
  if(liveNLT.date===today && (liveNLT.status==='loading'||liveNLT.status==='connected'))return;
  liveNLT={date:today,status:'loading',verse:'',reference:'',copyright:'',error:''};
  updateLiveGrace();
  try{
    const response=await fetch(BIBLE_WORKER,{cache:'no-store',headers:{'Accept':'application/json'}});
    if(!response.ok)throw new Error('Verse service returned '+response.status);
    const data=await response.json();
    if(data.status!=='connected'||data.translation!=='New Living Translation'||typeof data.verse!=='string'||!data.verse.trim()||typeof data.reference!=='string')throw new Error(data.message||'Verse response was incomplete');
    if(!/^Psalms?\s+\d+:\d+$/i.test(data.reference.trim()))throw new Error('Unexpected Scripture reference');
    if(data.verse.length>1200||/<[^>]+>/.test(data.verse))throw new Error('Verse formatting was unexpected');
    if(today!==isoDate(new Date()))return;
    liveNLT={date:today,status:'connected',verse:data.verse.trim(),reference:data.reference.trim(),copyright:String(data.copyright||''),error:''};
  }catch(error){liveNLT={date:today,status:'error',verse:'',reference:'',copyright:'',error:String(error.message||'Could not retrieve verse')}}
  updateLiveGrace();
}
function updateLiveGrace(){
  const slot=document.getElementById('live-verse-slot');
  if(!slot)return;
  const v=dailyVerse();
  if(liveNLT.date===isoDate(new Date())&&liveNLT.status==='connected'){
    slot.innerHTML=`<div class="verse-ref">${esc(liveNLT.reference)} · NLT</div><blockquote class="nlt-verse">“${esc(liveNLT.verse)}”</blockquote><p class="nlt-credit">${esc(liveNLT.copyright)}</p>`;
  }else if(liveNLT.status==='loading'){
    slot.innerHTML='<p class="subtle" role="status">Getting today’s NLT verse…</p>';
  }else{
    const backup=v[2];
    slot.innerHTML=backup?`<div class="verse-ref">${esc(v[0])} · NLT (saved)</div><blockquote class="nlt-verse">“${esc(backup)}”</blockquote>`:`<p class="subtle" role="status">${liveNLT.status==='error'?'Today’s verse could not load. Please check your Worker and try again.':'Today’s verse will appear here once the Bible connection is ready.'}</p><button class="button secondary" id="retry-nlt">Retry verse</button>`;
  }
}
function grace(){const v=dailyVerse(),saved=state.savedVerses.includes(v[0]);return `<section class="card grace"><span class="eyebrow">✿ MORNING GRACE · ${esc(v[1].toUpperCase())}</span><div class="flourish">☼ ♡ ☼</div><h2>A little grace for today</h2><div id="live-verse-slot"><p class="subtle">Getting today’s NLT verse…</p></div><div class="flourish">✿</div><h3>♡ For your mama heart</h3><p>${esc(v[3])}</p><div class="prayer-box"><b>Today's little prayer</b><p>${esc(v[4])}</p></div><button class="button secondary" id="save-verse">${saved?'♥ Saved reference':'♡ Save Scripture reference'}</button><p class="subtle">One verse each day. Verse text is retrieved from your authorized API.Bible connection; an internet connection is needed.</p></section>`}
function routineSection(){const day=new Date().getDay(),tomorrow=(day+1)%7,noDaycareTomorrow=tomorrow===6||tomorrow===0,weekend=day===0||day===6;const normalMorning=['20-minute home reset','Get myself ready',...(weekend?['Enjoy a slower family morning']:['Daycare bag, shoes, and out the door'])],normalEvening=['Dinner and connection time',...(!noDaycareTomorrow?['Set out daycare essentials for tomorrow']:[]),'Put keys and bag where I can find them'];const survival=state.mode==='sick',minimum=state.mode==='minimum';const morning=survival?['Take care of yourself and Bailey — everything else can wait']:minimum?['Get ready for the day — a five-minute reset is optional']:normalMorning;const evening=survival?['Rest, comfort, and whatever your family needs tonight']:minimum?['Dinner and connection time',...(!noDaycareTomorrow?['Set out daycare essentials for tomorrow']:[])]:normalEvening;return `<section class="card"><h2>Morning Basket ☕</h2><p class="subtle">${survival?'Survival Mode is on. Your usual routine is paused.':minimum?'Bare minimum today. Just the essentials.':'A gentle start. Choose only what fits today.'}</p>${morning.map((x,i)=>task(x,'morning:'+isoDate(new Date())+':'+(survival?'survival:':minimum?'minimum:':'')+i)).join('')}</section><section class="card peach"><h2>Tomorrow Me 🌙</h2><p class="subtle">Preparing for ${DAYS[tomorrow]}</p><p class="subtle">${survival?'No preparation expected tonight. Rest is enough.':noDaycareTomorrow?'No daycare tomorrow — enjoy a gentler evening.':'Five minutes tonight can make tomorrow softer.'}</p>${evening.map((x,i)=>task(x,'evening:'+isoDate(new Date())+':'+(survival?'survival:':minimum?'minimum:':'')+i)).join('')}</section>`}

function today(){normalizeMode();const d=new Date().getDay(),all=dayTasks(d),t=state.mode==='sick'?[['Care for yourself and Bailey; skip the nonessential chores','survival:'+isoDate(new Date())]]:state.mode==='minimum'?[['Do one essential thing, or rest','minimum:'+isoDate(new Date())]]:all;return `<div class="welcome"><span class="eyebrow">A LITTLE GRACE, A LOVELY HOME</span><h2>Good ${new Date().getHours()<12?'morning':new Date().getHours()<17?'afternoon':'evening'}, mama ♡</h2><p>You don't have to do it all to make today beautiful.</p><p class="subtle">Version ${APP_VERSION} · Your saved information stays on this device</p></div>${grace()}${helpingHand()}${brain()}<section class="card hero"><div class="topline"><h2>Today's little wins</h2><span class="pill">${state.mode==='normal'?'20-minute rhythm':state.mode==='sick'?'Survival mode':'Grace mode'}</span></div>${t.map(x=>task(...x)).join('')}${progress(t.filter(x=>done(x[1])).length,t.length)}<p class="subtle">${state.mode==='normal'?'Your Shark handles the nightly cleaning automatically.':'The other chores can wait. Nothing gets marked overdue.'}</p><div class="mode-buttons"><button class="button ${state.mode==='normal'?'':'secondary'}" data-mode="normal">Normal day</button><button class="button ${state.mode==='minimum'?'':'secondary'}" data-mode="minimum">Bare minimum</button><button class="button ${state.mode==='sick'?'':'secondary'}" data-mode="sick">Sick / survival</button></div>${state.mode!=='normal'?`<p class="subtle">Gentle mode through ${esc(state.sickUntil||isoDate(new Date()))}. <button class="button secondary" data-extend="1">+ Tomorrow</button> <button class="button secondary" data-extend="3">+ 3 days</button></p>`:''}</section><section class="card"><h3>What do you need right now? ♡</h3><div class="quick-grid"><button class="button secondary" data-quick="10">I have 10 minutes</button><button class="button secondary" data-quick="company">Company's coming!</button><button class="button secondary" data-mode="sick">I'm overwhelmed</button><button class="button secondary" data-quick="dinner">What's for dinner?</button></div><p id="quick-result" class="subtle"></p></section><section class="card"><h3>Quick Capture ✎</h3><div class="row-actions"><input id="capture-input" class="field grow" maxlength="160" placeholder="Something to remember…"><button class="button" id="capture-add">Add</button></div>${state.capture.filter(x=>!x.done).slice(0,5).map((x,i)=>`<p>✿ ${esc(x.label)}</p>`).join('')}</section>${routineSection()}`}
function collectionCard(key,title,description,placeholder){return `<section class="card"><h2>${title}</h2><p class="subtle">${description}</p><div class="row-actions"><input class="field grow" id="new-${key}" maxlength="240" placeholder="${esc(placeholder)}"><button class="button" data-add="${key}">Save</button></div>${state[key].map((x,i)=>`<div class="grocery-line"><span class="grow">${esc(x.text||x.label||'')}</span>${key==='prayers'?`<button class="button secondary" data-answer="${i}">${x.answered?'✓ Answered':'Mark answered'}</button>`:''}<button class="icon-button" data-remove="${key}:${i}" aria-label="Remove entry">×</button></div>`).join('')}</section>`}
function kids(){return `${baileyExtras()}<div class="welcome"><span class="eyebrow">✿ THE LITTLE MOMENTS</span><h2>Kids' Corner 🧸</h2><p>A cozy place for memories, milestones, and everyday needs.</p></div><section class="card sage"><h3>Little ideas for today</h3><p>♡ Read a favorite picture book together<br>♡ Dance to one song<br>♡ Build a blanket fort<br>♡ Take a short nature walk</p></section>${collectionCard('kids','Bailey’s Little Moments ♡','Save daycare reminders, funny sayings, milestones, clothing sizes, and birthday ideas.','First word, daycare bag, favorite song…')}<div class="card"><h3>Keep memories private</h3><p class="subtle">Notes stay in this browser. Avoid entering medical or other sensitive details; export backups to a safe location.</p></div>`}
function faith(){return `${grace()}${garden()}${collectionCard('prayers','My Prayer Journal ♡','Keep requests close and celebrate answered prayers.','Lord, please help me with…')}${collectionCard('gratitudes','Gratitude Garden ✿','A few little things you are thankful for—no streaks, no pressure.','Today I’m grateful for…')}<section class="card"><h3>Saved Scripture references</h3>${state.savedVerses.length?state.savedVerses.map(x=>`<p>♡ <a href="${verseLink(x)}" target="_blank" rel="noopener noreferrer">${esc(x)} · NLT ↗</a></p>`).join(''):'<p class="subtle">Save a Scripture reference from Morning Grace to see it here.</p>'}<p class="subtle">Today’s NLT verse is displayed in Morning Grace. Saved references link to the NLT reading page for further study.</p></section>`}
function routines(){return `<div class="welcome"><span class="eyebrow">✿ ONE LITTLE THING AT A TIME</span><h2>Gentle routines</h2><p>Real life comes first. The chores can wait.</p></div>${routineSection()}<section class="card sage"><h2>Survival Mode ☁</h2><p>Pause the nonessentials on a sick or overwhelming day.</p><div class="mode-buttons"><button class="button" data-mode="sick">Turn on survival mode</button><button class="button secondary" data-mode="normal">Return to normal</button></div><p class="subtle">Current mode: ${state.mode==='sick'?'Survival':state.mode==='minimum'?'Bare minimum':'Normal'}.${state.mode!=='normal'?' Ends after '+esc(state.sickUntil||isoDate(new Date()))+'.':''} This choice is saved on this device.</p></section>${state.mode==='normal'?flyCleaning()+week()+reset():'<section class="card"><h3>Chores are paused ♡</h3><p>Your weekly cleaning and reset lists are hidden while this mode is active. They are not deleted, and will return when you choose Normal day.</p></section>'}`}


const RECIPES=[
 {
  "id": "family1",
  "name": "Ham & Cheese Hawaiian Sliders",
  "time": 20,
  "type": "dinner",
  "ingredients": [
   "Hawaiian rolls",
   "Deli ham",
   "Swiss or cheddar cheese",
   "Butter",
   "Worcestershire sauce",
   "Garlic powder"
  ],
  "steps": [
   "Heat oven to 350°F and slice rolls horizontally.",
   "Layer ham and cheese, then replace tops.",
   "Brush with melted butter, Worcestershire and garlic powder.",
   "Cover and bake 12 minutes, then uncover for about 5 minutes."
  ],
  "side": "Fruit and cucumbers",
  "leftovers": true,
  "tip": "Cut into small pieces; watch the chewy bread and ham texture."
 },
 {
  "id": "family2",
  "name": "Korean-Style Beef & Rice Bowls",
  "time": 15,
  "type": "dinner",
  "ingredients": [
   "Ground beef",
   "White rice",
   "McCormick Beef & Broccoli seasoning packet",
   "Packet-required ingredients"
  ],
  "steps": [
   "Cook instant or precooked rice.",
   "Brown ground beef thoroughly and drain.",
   "Prepare seasoning according to the packet, using ground beef.",
   "Serve beef over rice."
  ],
  "side": "Steamed broccoli or cucumbers",
  "leftovers": true,
  "tip": "Keep the sauce mild and offer tender beef crumbles with soft rice."
 },
 {
  "id": "family3",
  "name": "Roasted Smoked Sausage & Potatoes",
  "time": 30,
  "type": "dinner",
  "ingredients": [
   "Smoked sausage",
   "Baby potatoes",
   "Green beans",
   "Olive oil",
   "Garlic powder",
   "Paprika"
  ],
  "steps": [
   "Heat oven to 425°F and cut potatoes small.",
   "Toss potatoes with oil and seasonings",
   " roast 15 minutes.",
   "Add sliced sausage and green beans and roast 12–15 minutes more, until potatoes are tender and sausage heated through."
  ],
  "side": "Applesauce or fruit",
  "leftovers": true,
  "tip": "Cut sausage lengthwise into thin strips and then small pieces; avoid coin-shaped rounds."
 },
 {
  "id": "family4",
  "name": "Mini Naan Pizza Night",
  "time": 15,
  "type": "dinner",
  "ingredients": [
   "Mini naan bread",
   "Pizza sauce",
   "Mozzarella cheese",
   "Pepperoni or cooked sausage"
  ],
  "steps": [
   "Heat oven to 400°F.",
   "Top naan with sauce, cheese and fully cooked toppings.",
   "Bake 8–10 minutes until hot and bubbly",
   " cool before serving."
  ],
  "side": "Fruit or steamed vegetables",
  "leftovers": false,
  "tip": "Cut pizza into small, manageable pieces; dice chewy toppings finely."
 },
 {
  "id": "family5",
  "name": "Creamy Chicken & Broccoli Pasta",
  "time": 20,
  "type": "dinner",
  "ingredients": [
   "Pasta shells",
   "Rotisserie chicken",
   "Broccoli",
   "Milk",
   "Cheddar cheese",
   "Butter"
  ],
  "steps": [
   "Cook pasta and chopped broccoli until tender.",
   "Drain, then stir in shredded chicken, butter, milk and cheese over low heat.",
   "Heat until chicken is steaming and sauce is creamy."
  ],
  "side": "Soft pear slices",
  "leftovers": true,
  "tip": "Shred chicken finely and cook broccoli very soft."
 },
 {
  "id": "family6",
  "name": "Cheeseburger Rice Bowls",
  "time": 20,
  "type": "dinner",
  "ingredients": [
   "Ground beef",
   "White rice",
   "Cheddar cheese",
   "Pickles",
   "Ketchup",
   "Mustard"
  ],
  "steps": [
   "Cook rice.",
   "Brown beef thoroughly and drain.",
   "Assemble bowls with beef and cheese",
   " add pickles, ketchup and mustard to adult servings as desired."
  ],
  "side": "Sweet potato fries",
  "leftovers": true,
  "tip": "Serve soft rice and small beef crumbles; finely chop or omit pickles."
 },
 {
  "id": "family7",
  "name": "Chicken & Cheese Quesadillas",
  "time": 10,
  "type": "dinner",
  "ingredients": [
   "Flour tortillas",
   "Rotisserie chicken",
   "Shredded Mexican cheese",
   "Sour cream"
  ],
  "steps": [
   "Place shredded chicken and cheese in tortillas.",
   "Fold and toast in a skillet until golden and filling is hot.",
   "Cool and slice into manageable pieces."
  ],
  "side": "Avocado and fruit",
  "leftovers": false,
  "tip": "Cut into small strips and serve avocado mashed or soft."
 },
 {
  "id": "family8",
  "name": "Baked Spaghetti & Mozzarella",
  "time": 30,
  "type": "dinner",
  "ingredients": [
   "Spaghetti",
   "Marinara sauce",
   "Ground beef",
   "Mozzarella",
   "Parmesan"
  ],
  "steps": [
   "Heat oven to 375°F.",
   "Cook spaghetti and brown ground beef thoroughly.",
   "Mix pasta, beef and marinara in a baking dish.",
   "Top with mozzarella and bake until melted and hot."
  ],
  "side": "Garlic bread",
  "leftovers": true,
  "tip": "Cut long noodles shorter and cool before serving."
 },
 {
  "id": "family9",
  "name": "Breakfast-for-Dinner Pancake Plates",
  "time": 15,
  "type": "dinner",
  "ingredients": [
   "Pancake mix",
   "Eggs",
   "Milk",
   "Bananas",
   "Breakfast sausage"
  ],
  "steps": [
   "Prepare small pancakes according to mix instructions.",
   "Scramble eggs until fully cooked.",
   "Cook sausage thoroughly according to package directions."
  ],
  "side": "Berries and bananas",
  "leftovers": true,
  "tip": "Cut sausage lengthwise and into tiny pieces; cut berries appropriately."
 },
 {
  "id": "family10",
  "name": "Cheesy Chicken & Rice Skillet",
  "time": 20,
  "type": "dinner",
  "ingredients": [
   "Cooked chicken",
   "Microwave rice",
   "Frozen peas",
   "Cheddar cheese",
   "Chicken broth"
  ],
  "steps": [
   "Warm broth and peas in a skillet until peas are tender.",
   "Stir in rice and shredded cooked chicken until steaming.",
   "Add cheese and stir until melted."
  ],
  "side": "Soft fruit",
  "leftovers": true,
  "tip": "Mash peas if needed and shred chicken into small pieces."
 },
 {
  "id": "family11",
  "name": "One-Pot Taco Pasta",
  "time": 25,
  "type": "dinner",
  "ingredients": [
   "Ground turkey",
   "Small pasta",
   "Mild taco seasoning",
   "Tomato sauce",
   "Cheddar cheese"
  ],
  "steps": [
   "Brown turkey thoroughly.",
   "Add pasta, tomato sauce, seasoning and enough water to cook pasta.",
   "Simmer until pasta is tender, then stir in cheese."
  ],
  "side": "Avocado",
  "leftovers": true,
  "tip": "Set aside a mild portion before extra seasoning."
 },
 {
  "id": "family12",
  "name": "Turkey & Cheese Roll-Ups",
  "time": 10,
  "type": "dinner",
  "ingredients": [
   "Flour tortillas",
   "Deli turkey",
   "Cream cheese",
   "Cheddar cheese"
  ],
  "steps": [
   "Spread cream cheese thinly on tortillas.",
   "Layer turkey and cheddar, roll tightly and warm gently if desired.",
   "Slice into small pieces."
  ],
  "side": "Cucumber sticks and fruit",
  "leftovers": false,
  "tip": "Use thin, soft pieces; avoid thick rolled rounds."
 },
 {
  "id": "family13",
  "name": "BBQ Chicken Baked Potatoes",
  "time": 25,
  "type": "dinner",
  "ingredients": [
   "Microwave baking potatoes",
   "Cooked chicken",
   "BBQ sauce",
   "Cheddar cheese",
   "Plain yogurt"
  ],
  "steps": [
   "Microwave potatoes until soft.",
   "Heat shredded chicken with a little BBQ sauce.",
   "Split potatoes and top with chicken, cheese and yogurt."
  ],
  "side": "Steamed green beans",
  "leftovers": true,
  "tip": "Serve soft potato with finely shredded chicken; use mild sauce."
 },
 {
  "id": "family14",
  "name": "Easy Beef & Bean Burrito Bowls",
  "time": 20,
  "type": "dinner",
  "ingredients": [
   "Ground beef",
   "Black beans",
   "Microwave rice",
   "Cheddar cheese",
   "Avocado"
  ],
  "steps": [
   "Brown beef thoroughly and drain.",
   "Warm drained beans and rice.",
   "Serve together with cheese and avocado."
  ],
  "side": "Soft corn",
  "leftovers": true,
  "tip": "Mash beans and avocado; keep portions mild."
 },
 {
  "id": "family15",
  "name": "Creamy Tuna Noodle Skillet",
  "time": 20,
  "type": "dinner",
  "ingredients": [
   "Canned light tuna",
   "Egg noodles",
   "Frozen peas",
   "Milk",
   "Cheddar cheese"
  ],
  "steps": [
   "Cook noodles and peas until tender.",
   "Drain tuna and noodles.",
   "Warm with milk and cheese over low heat until creamy."
  ],
  "side": "Soft carrots",
  "leftovers": true,
  "tip": "Use canned light tuna, check for bones and keep pieces small."
 },
 {
  "id": "family16",
  "name": "Chicken Parmesan Pasta",
  "time": 25,
  "type": "dinner",
  "ingredients": [
   "Cooked chicken",
   "Penne pasta",
   "Marinara sauce",
   "Mozzarella",
   "Parmesan"
  ],
  "steps": [
   "Cook penne until tender.",
   "Warm marinara and shredded chicken until hot.",
   "Toss with pasta and top with cheeses until melted."
  ],
  "side": "Steamed zucchini",
  "leftovers": true,
  "tip": "Cut penne and chicken into manageable pieces."
 },
 {
  "id": "family17",
  "name": "Sheet-Pan Chicken & Sweet Potatoes",
  "time": 30,
  "type": "dinner",
  "ingredients": [
   "Boneless chicken",
   "Sweet potatoes",
   "Olive oil",
   "Garlic powder",
   "Frozen peas"
  ],
  "steps": [
   "Heat oven to 425°F and dice sweet potatoes small.",
   "Roast potatoes with oil for 10 minutes.",
   "Add small chicken pieces and roast until chicken reaches 165°F and potatoes are soft.",
   "Cook peas until tender."
  ],
  "side": "Applesauce",
  "leftovers": true,
  "tip": "Shred or finely chop cooked chicken and mash peas if needed."
 },
 {
  "id": "family18",
  "name": "Sloppy Joe Mini Sandwiches",
  "time": 20,
  "type": "dinner",
  "ingredients": [
   "Ground beef",
   "Tomato sauce",
   "Ketchup",
   "Worcestershire sauce",
   "Slider buns"
  ],
  "steps": [
   "Brown beef thoroughly and drain.",
   "Stir in tomato sauce, a little ketchup and Worcestershire.",
   "Simmer 5 minutes and spoon onto buns."
  ],
  "side": "Steamed carrots",
  "leftovers": true,
  "tip": "Serve filling separately if buns are too chewy; keep sauce mild."
 },
 {
  "id": "family19",
  "name": "Cheesy Broccoli Potato Bowls",
  "time": 20,
  "type": "dinner",
  "ingredients": [
   "Microwave potatoes",
   "Broccoli",
   "Cheddar cheese",
   "Milk",
   "Butter"
  ],
  "steps": [
   "Microwave potatoes until very tender.",
   "Steam broccoli until soft and chop finely.",
   "Mash potato with butter and milk",
   " stir in broccoli and cheese."
  ],
  "side": "Fruit",
  "leftovers": true,
  "tip": "Offer a soft, cooled mash with finely chopped broccoli."
 },
 {
  "id": "family20",
  "name": "Chicken Fried Rice Shortcut",
  "time": 20,
  "type": "dinner",
  "ingredients": [
   "Cooked chicken",
   "Microwave rice",
   "Frozen peas and carrots",
   "Eggs",
   "Low-sodium soy sauce"
  ],
  "steps": [
   "Scramble eggs until fully cooked and set aside.",
   "Cook frozen vegetables until tender.",
   "Add rice and shredded chicken and heat thoroughly.",
   "Stir in eggs and a little soy sauce."
  ],
  "side": "Mandarin orange pieces",
  "leftovers": true,
  "tip": "Keep soy sauce light and cut vegetables and chicken small."
 },
 {
  "id": "family21",
  "name": "Cheesy Beef & Potato Skillet",
  "time": 25,
  "type": "dinner",
  "ingredients": [
   "Ground beef",
   "Frozen diced potatoes",
   "Cheddar cheese",
   "Frozen peas",
   "Garlic powder"
  ],
  "steps": [
   "Brown beef thoroughly.",
   "Cook diced potatoes in a covered skillet until tender.",
   "Stir in peas and beef and heat through.",
   "Top with cheese and let melt."
  ],
  "side": "Applesauce",
  "leftovers": true,
  "tip": "Check potato tenderness and serve beef in small crumbles."
 },
 {
  "id": "family22",
  "name": "Easy Chicken Alfredo Tortellini",
  "time": 20,
  "type": "dinner",
  "ingredients": [
   "Refrigerated cheese tortellini",
   "Rotisserie chicken",
   "Alfredo sauce",
   "Broccoli"
  ],
  "steps": [
   "Cook tortellini according to package directions.",
   "Steam broccoli until soft.",
   "Heat shredded chicken with sauce, then toss everything together."
  ],
  "side": "Soft pears",
  "leftovers": true,
  "tip": "Cut tortellini into smaller pieces; shred chicken finely."
 },
 {
  "id": "family23",
  "name": "Turkey Meatball Subs",
  "time": 25,
  "type": "dinner",
  "ingredients": [
   "Frozen fully cooked turkey meatballs",
   "Marinara sauce",
   "Sub rolls",
   "Mozzarella cheese"
  ],
  "steps": [
   "Heat meatballs thoroughly according to package directions.",
   "Simmer in marinara.",
   "Add to rolls, top with cheese and melt briefly."
  ],
  "side": "Steamed green beans",
  "leftovers": true,
  "tip": "Quarter meatballs into small pieces; serve separately from chewy bread."
 },
 {
  "id": "family24",
  "name": "Grilled Cheese & Tomato Soup",
  "time": 15,
  "type": "dinner",
  "ingredients": [
   "Bread",
   "Cheddar cheese",
   "Butter",
   "Low-sodium tomato soup"
  ],
  "steps": [
   "Butter bread and sandwich cheese between slices.",
   "Cook in skillet until golden and cheese is melted.",
   "Heat soup thoroughly according to package directions."
  ],
  "side": "Fruit",
  "leftovers": false,
  "tip": "Cut sandwiches into small strips and cool soup well before serving."
 },
 {
  "id": "family25",
  "name": "Cheesy Bean & Chicken Nacho Bowls",
  "time": 15,
  "type": "dinner",
  "ingredients": [
   "Cooked chicken",
   "Black beans",
   "Cheddar cheese",
   "Avocado",
   "Microwave rice"
  ],
  "steps": [
   "Heat rice, beans and shredded chicken until steaming.",
   "Top with cheese and let melt.",
   "Serve avocado on the side."
  ],
  "side": "Soft fruit",
  "leftovers": true,
  "tip": "Skip hard tortilla chips; mash beans and avocado as needed."
 },
 {
  "id": "family26",
  "name": "Pesto Chicken Pasta",
  "time": 20,
  "type": "dinner",
  "ingredients": [
   "Pasta",
   "Cooked chicken",
   "Basil pesto",
   "Parmesan",
   "Frozen peas"
  ],
  "steps": [
   "Cook pasta and peas until tender.",
   "Warm shredded chicken thoroughly.",
   "Toss pasta, peas and chicken with a little pesto and Parmesan."
  ],
  "side": "Soft fruit",
  "leftovers": true,
  "tip": "Check pesto ingredients for allergens and use a mild amount."
 },
 {
  "id": "family27",
  "name": "Mini Turkey Burgers",
  "time": 25,
  "type": "dinner",
  "ingredients": [
   "Ground turkey",
   "Slider buns",
   "Cheddar cheese",
   "Sweet potatoes",
   "Olive oil"
  ],
  "steps": [
   "Form small turkey patties and cook to 165°F.",
   "Add cheese until melted.",
   "Serve on buns with roasted or microwaved sweet potato."
  ],
  "side": "Fruit",
  "leftovers": true,
  "tip": "Cut patty into tiny pieces; avoid serving thick round chunks."
 },
 {
  "id": "family28",
  "name": "Creamy Sausage & Pea Pasta",
  "time": 20,
  "type": "dinner",
  "ingredients": [
   "Smoked sausage",
   "Small pasta",
   "Frozen peas",
   "Milk",
   "Cheddar cheese"
  ],
  "steps": [
   "Cook pasta and peas until tender.",
   "Heat sausage thoroughly in a skillet.",
   "Stir in pasta, milk and cheddar until creamy."
  ],
  "side": "Soft pears",
  "leftovers": true,
  "tip": "Cut sausage lengthwise into thin strips, then small pieces."
 },
 {
  "id": "family29",
  "name": "Chicken & Veggie Couscous Bowls",
  "time": 15,
  "type": "dinner",
  "ingredients": [
   "Instant couscous",
   "Cooked chicken",
   "Frozen mixed vegetables",
   "Chicken broth",
   "Butter"
  ],
  "steps": [
   "Prepare couscous with hot broth according to package directions.",
   "Cook vegetables until very tender.",
   "Stir in finely shredded chicken and butter and heat through."
  ],
  "side": "Applesauce",
  "leftovers": true,
  "tip": "Use soft vegetables and finely shred chicken."
 },
 {
  "id": "family30",
  "name": "Easy English Muffin Pizzas",
  "time": 15,
  "type": "dinner",
  "ingredients": [
   "English muffins",
   "Pizza sauce",
   "Mozzarella",
   "Cooked chicken or pepperoni"
  ],
  "steps": [
   "Heat oven to 400°F.",
   "Top split muffins with sauce, cheese and cooked toppings.",
   "Bake about 8–10 minutes until cheese melts."
  ],
  "side": "Steamed vegetables",
  "leftovers": false,
  "tip": "Cut into small bites; avoid chewy crust and thick pepperoni pieces."
 }
,
{id:'eggbites',name:'Mini Egg & Cheese Bites',time:20,type:'breakfast',ingredients:['Eggs','Shredded cheese','Spinach','Milk'],steps:['Heat oven to 350°F. Grease a mini muffin tin.','Whisk eggs with a splash of milk; add finely chopped spinach and cheese.','Bake about 12–16 minutes until fully set; cool before serving.'],tip:'Refrigerate promptly and reheat thoroughly.'},
{id:'pancakes',name:'Banana Oat Pancake Bites',time:15,type:'snack',ingredients:['Banana','Egg','Rolled oats','Cinnamon'],steps:['Mash banana and mix with egg, oats and a pinch of cinnamon.','Spoon small portions into a lightly oiled skillet.','Cook on both sides until fully set; cool and cut as needed.'],tip:'Soft, small portions make an easy after-daycare snack.'},
{id:'yogurt',name:'Berry Yogurt Bowl',time:5,type:'snack',ingredients:['Plain yogurt','Strawberries','Banana','Oats'],steps:['Spoon yogurt into a bowl.','Finely chop soft strawberries and banana.','Top with fruit and a sprinkle of softened oats.'],tip:'Cut berries into age-appropriate pieces; supervise eating.'},
{id:'toast',name:'Cheesy Avocado Toast Fingers',time:7,type:'snack',ingredients:['Bread','Avocado','Shredded cheese'],steps:['Toast bread lightly and melt cheese on top.','Spread a thin layer of mashed avocado.','Let cool, then cut into manageable strips.'],tip:'Adjust texture and pieces to Bailey’s chewing skills.'}
];
const ACTIVITIES=[{name:'Dance Party',mins:5,mess:'none',what:'Put on a favorite song and dance together.'},{name:'Book Basket',mins:10,mess:'none',what:'Let Bailey choose three board books and snuggle up.'},{name:'Laundry Helper',mins:10,mess:'low',what:'Invite Bailey to match socks or put washcloths in a basket.'},{name:'Painter’s Tape Roads',mins:15,mess:'low',what:'Make a simple road on the floor with painter’s tape and drive toy cars.'},{name:'Nature Treasure Walk',mins:20,mess:'low',what:'Look for leaves, birds, and different colors outside together.'},{name:'Stack & Knock Down',mins:5,mess:'none',what:'Build a block tower and let Bailey knock it down.'},{name:'Water Painting',mins:15,mess:'low',what:'Use a clean brush and a little water to paint on construction paper; supervise closely.'},{name:'Stuffed Animal Picnic',mins:10,mess:'none',what:'Set out a blanket and invite favorite stuffed animals to a pretend picnic.'}];
// Measured quantities are practical starter estimates for TWO portions (one adult + one toddler).
// Adjust portions for appetite and leftovers. No claims of exact package yields.
const RECIPE_QUANTITIES={"family1":[{"q":12.0,"unit":"count","name":"Hawaiian rolls"},{"q":6.0,"unit":"oz","name":"Deli ham"},{"q":4.0,"unit":"oz","name":"Cheddar cheese"},{"q":2.0,"unit":"tbsp","name":"Butter"},{"q":1.0,"unit":"tsp","name":"Worcestershire sauce"},{"q":0.25,"unit":"tsp","name":"Garlic powder"}],"family2":[{"q":0.5,"unit":"lb","name":"Ground beef"},{"q":0.75,"unit":"cup","name":"White rice (dry)"},{"q":1.0,"unit":"packet","name":"McCormick Beef & Broccoli seasoning"},{"q":0.0,"unit":"note","name":"Other ingredients listed on seasoning packet"}],"family3":[{"q":0.75,"unit":"lb","name":"Smoked sausage"},{"q":0.75,"unit":"lb","name":"Potatoes"},{"q":1.0,"unit":"cup","name":"Green beans"},{"q":1.0,"unit":"tbsp","name":"Olive oil"},{"q":0.5,"unit":"tsp","name":"Garlic powder"},{"q":0.25,"unit":"tsp","name":"Paprika"}],"family4":[{"q":2.0,"unit":"count","name":"Mini naan bread"},{"q":0.5,"unit":"cup","name":"Pizza sauce"},{"q":1.0,"unit":"cup","name":"Mozzarella cheese"},{"q":2.0,"unit":"oz","name":"Pepperoni"}],"family5":[{"q":1.5,"unit":"cup","name":"Pasta shells (dry)"},{"q":1.0,"unit":"cup","name":"Cooked chicken"},{"q":1.0,"unit":"cup","name":"Broccoli"},{"q":0.5,"unit":"cup","name":"Milk"},{"q":0.75,"unit":"cup","name":"Cheddar cheese"},{"q":1.0,"unit":"tbsp","name":"Butter"}],"family6":[{"q":0.5,"unit":"lb","name":"Ground beef"},{"q":0.75,"unit":"cup","name":"White rice (dry)"},{"q":0.5,"unit":"cup","name":"Cheddar cheese"},{"q":0.25,"unit":"cup","name":"Pickles"},{"q":2.0,"unit":"tbsp","name":"Ketchup"},{"q":1.0,"unit":"tbsp","name":"Mustard"}],"family7":[{"q":2.0,"unit":"count","name":"Flour tortillas"},{"q":1.0,"unit":"cup","name":"Cooked chicken"},{"q":0.75,"unit":"cup","name":"Mexican blend cheese"},{"q":0.25,"unit":"cup","name":"Sour cream"}],"family8":[{"q":5.0,"unit":"oz","name":"Spaghetti (dry)"},{"q":0.5,"unit":"lb","name":"Ground beef"},{"q":1.0,"unit":"cup","name":"Marinara sauce"},{"q":0.75,"unit":"cup","name":"Mozzarella cheese"},{"q":2.0,"unit":"tbsp","name":"Parmesan cheese"}],"family9":[{"q":1.0,"unit":"cup","name":"Pancake mix"},{"q":2.0,"unit":"count","name":"Eggs"},{"q":0.75,"unit":"cup","name":"Milk"},{"q":1.0,"unit":"count","name":"Banana"},{"q":4.0,"unit":"oz","name":"Breakfast sausage"}],"family10":[{"q":1.0,"unit":"cup","name":"Cooked chicken"},{"q":1.0,"unit":"packet","name":"Microwave rice"},{"q":0.75,"unit":"cup","name":"Frozen peas"},{"q":0.75,"unit":"cup","name":"Cheddar cheese"},{"q":0.5,"unit":"cup","name":"Chicken broth"}],"family11":[{"q":0.5,"unit":"lb","name":"Ground turkey"},{"q":1.5,"unit":"cup","name":"Small pasta (dry)"},{"q":1.0,"unit":"packet","name":"Mild taco seasoning"},{"q":1.0,"unit":"cup","name":"Tomato sauce"},{"q":0.5,"unit":"cup","name":"Cheddar cheese"}],"family12":[{"q":2.0,"unit":"count","name":"Flour tortillas"},{"q":6.0,"unit":"oz","name":"Deli turkey"},{"q":3.0,"unit":"oz","name":"Cream cheese"},{"q":0.5,"unit":"cup","name":"Cheddar cheese"}],"family13":[{"q":2.0,"unit":"count","name":"Baking potatoes"},{"q":1.0,"unit":"cup","name":"Cooked chicken"},{"q":0.25,"unit":"cup","name":"BBQ sauce"},{"q":0.5,"unit":"cup","name":"Cheddar cheese"},{"q":0.25,"unit":"cup","name":"Plain yogurt"}],"family14":[{"q":0.5,"unit":"lb","name":"Ground beef"},{"q":1.0,"unit":"can","name":"Black beans"},{"q":1.0,"unit":"packet","name":"Microwave rice"},{"q":0.5,"unit":"cup","name":"Cheddar cheese"},{"q":1.0,"unit":"count","name":"Avocado"}],"family15":[{"q":1.0,"unit":"can","name":"Canned light tuna"},{"q":5.0,"unit":"oz","name":"Egg noodles (dry)"},{"q":0.75,"unit":"cup","name":"Frozen peas"},{"q":0.5,"unit":"cup","name":"Milk"},{"q":0.5,"unit":"cup","name":"Cheddar cheese"}],"family16":[{"q":1.0,"unit":"cup","name":"Cooked chicken"},{"q":5.0,"unit":"oz","name":"Penne pasta (dry)"},{"q":1.0,"unit":"cup","name":"Marinara sauce"},{"q":0.75,"unit":"cup","name":"Mozzarella cheese"},{"q":2.0,"unit":"tbsp","name":"Parmesan cheese"}],"family17":[{"q":0.75,"unit":"lb","name":"Boneless chicken"},{"q":1.0,"unit":"lb","name":"Sweet potatoes"},{"q":1.0,"unit":"tbsp","name":"Olive oil"},{"q":0.5,"unit":"tsp","name":"Garlic powder"},{"q":0.75,"unit":"cup","name":"Frozen peas"}],"family18":[{"q":0.5,"unit":"lb","name":"Ground beef"},{"q":0.5,"unit":"cup","name":"Tomato sauce"},{"q":2.0,"unit":"tbsp","name":"Ketchup"},{"q":1.0,"unit":"tsp","name":"Worcestershire sauce"},{"q":4.0,"unit":"count","name":"Slider buns"}],"family19":[{"q":2.0,"unit":"count","name":"Baking potatoes"},{"q":1.0,"unit":"cup","name":"Broccoli"},{"q":0.75,"unit":"cup","name":"Cheddar cheese"},{"q":0.25,"unit":"cup","name":"Milk"},{"q":1.0,"unit":"tbsp","name":"Butter"}],"family20":[{"q":1.0,"unit":"cup","name":"Cooked chicken"},{"q":1.0,"unit":"packet","name":"Microwave rice"},{"q":1.0,"unit":"cup","name":"Frozen peas and carrots"},{"q":2.0,"unit":"count","name":"Eggs"},{"q":1.0,"unit":"tbsp","name":"Low-sodium soy sauce"}],"family21":[{"q":0.5,"unit":"lb","name":"Ground beef"},{"q":2.0,"unit":"cup","name":"Frozen diced potatoes"},{"q":0.75,"unit":"cup","name":"Cheddar cheese"},{"q":0.75,"unit":"cup","name":"Frozen peas"},{"q":0.5,"unit":"tsp","name":"Garlic powder"}],"family22":[{"q":10.0,"unit":"oz","name":"Cheese tortellini"},{"q":1.0,"unit":"cup","name":"Cooked chicken"},{"q":0.75,"unit":"cup","name":"Alfredo sauce"},{"q":1.0,"unit":"cup","name":"Broccoli"}],"family23":[{"q":8.0,"unit":"count","name":"Turkey meatballs"},{"q":1.0,"unit":"cup","name":"Marinara sauce"},{"q":2.0,"unit":"count","name":"Sub rolls"},{"q":0.75,"unit":"cup","name":"Mozzarella cheese"}],"family24":[{"q":4.0,"unit":"slice","name":"Bread"},{"q":4.0,"unit":"oz","name":"Cheddar cheese"},{"q":1.0,"unit":"tbsp","name":"Butter"},{"q":1.0,"unit":"can","name":"Low-sodium tomato soup"}],"family25":[{"q":1.0,"unit":"cup","name":"Cooked chicken"},{"q":1.0,"unit":"can","name":"Black beans"},{"q":0.75,"unit":"cup","name":"Cheddar cheese"},{"q":1.0,"unit":"count","name":"Avocado"},{"q":1.0,"unit":"packet","name":"Microwave rice"}],"family26":[{"q":5.0,"unit":"oz","name":"Pasta (dry)"},{"q":1.0,"unit":"cup","name":"Cooked chicken"},{"q":0.25,"unit":"cup","name":"Basil pesto"},{"q":2.0,"unit":"tbsp","name":"Parmesan cheese"},{"q":0.75,"unit":"cup","name":"Frozen peas"}],"family27":[{"q":0.5,"unit":"lb","name":"Ground turkey"},{"q":4.0,"unit":"count","name":"Slider buns"},{"q":3.0,"unit":"oz","name":"Cheddar cheese"},{"q":1.0,"unit":"lb","name":"Sweet potatoes"},{"q":1.0,"unit":"tbsp","name":"Olive oil"}],"family28":[{"q":0.5,"unit":"lb","name":"Smoked sausage"},{"q":1.5,"unit":"cup","name":"Small pasta (dry)"},{"q":0.75,"unit":"cup","name":"Frozen peas"},{"q":0.5,"unit":"cup","name":"Milk"},{"q":0.75,"unit":"cup","name":"Cheddar cheese"}],"family29":[{"q":0.75,"unit":"cup","name":"Couscous (dry)"},{"q":1.0,"unit":"cup","name":"Cooked chicken"},{"q":1.0,"unit":"cup","name":"Frozen mixed vegetables"},{"q":1.0,"unit":"cup","name":"Chicken broth"},{"q":1.0,"unit":"tbsp","name":"Butter"}],"family30":[{"q":2.0,"unit":"count","name":"English muffins"},{"q":0.5,"unit":"cup","name":"Pizza sauce"},{"q":0.75,"unit":"cup","name":"Mozzarella cheese"},{"q":0.75,"unit":"cup","name":"Cooked chicken"}]};
function dinnerPortions(i){const x=Number(state.recipeServings?.[mondayKey()]?.[i]);return Number.isInteger(x)&&x>=1&&x<=10?x:2}
function fmtAmount(n){const rounded=Math.round(n*100)/100;return Number.isInteger(rounded)?String(rounded):String(rounded).replace(/\.00$/,'')}
function qtyLabel(x,mult=1){return x.unit==='note'?x.name:fmtAmount(x.q*mult)+' '+x.unit+(x.q*mult!==1&&['packet','can','count','slice'].includes(x.unit)?'s':'')+' '+x.name}
function measuredRecipeIngredients(r){return RECIPE_QUANTITIES[r.id]||r.ingredients.map(name=>({q:0,unit:'note',name}))}
function combinedMeasuredIngredients(){const map=new Map();selectedDinnerIds().forEach((id,i)=>{const r=RECIPES.find(x=>x.id===id&&x.type==='dinner');if(!r)return;const factor=dinnerPortions(i)/2;measuredRecipeIngredients(r).forEach(x=>{const key=x.name.toLocaleLowerCase('en-US')+'|'+x.unit;let a=map.get(key);if(!a){a={name:x.name,unit:x.unit,q:0,usedIn:[]};map.set(key,a)}a.q+=x.q*factor;a.usedIn.push(r.name)})});return [...map.values()].sort((a,b)=>a.name.localeCompare(b.name))}
function groceryQtyText(x){return qtyLabel(x)}
function upsertMeasuredGroceries(){const items=combinedMeasuredIngredients();let added=0,updated=0;for(const x of items){const label=groceryQtyText(x),key=x.name.toLowerCase()+'|'+x.unit;const prior=state.groceries.find(g=>g.recipeQuantityKey===key&&!g.done);if(prior){prior.label=label;updated++;continue}const manual=state.groceries.some(g=>!g.done&&(g.label||'').trim().toLowerCase()===x.name.toLowerCase());if(manual)continue;state.groceries.push({label,done:false,recipeQuantityKey:key});added++}save();return {added,updated}}
function itemList(key,title,placeholder){return `<section class="card"><h3>${title}</h3><div class="row-actions"><input class="field grow" id="new-${key}" maxlength="120" placeholder="${placeholder}"><button class="button" data-item-add="${key}">Add</button></div>${state[key].map((g,i)=>`<div class="grocery-line"><label class="task"><input type="checkbox" data-item-check="${key}:${i}" ${g.done?'checked':''}><span>${esc(g.label)}</span></label><button class="icon-button" data-item-remove="${key}:${i}" aria-label="Remove item">×</button></div>`).join('')||'<p class="subtle">Your list is empty for now.</p>'}<button class="button secondary" data-copy-list="${key}">♡ Copy ${key==='household'?'household items':'groceries'} for AnyList</button><p class="subtle">Copies unchecked items only. Paste them into your matching AnyList list.</p></section>`}
function recipes(){const filter=state.recipeFilter||'all';return `<section class="card peach"><h2>Family Recipe Box 🍓</h2><p class="subtle">30 quick, affordable toddler-friendly dinners, plus easy snacks and breakfast. Curated recipes built into your app—not live web suggestions. Ingredients can go straight to your grocery list.</p><div class="row-actions">${[['all','All'],['dinner','30 Dinners'],['snack','After-daycare snacks'],['breakfast','Breakfast'],['favorites','♡ Favorites']].map(([v,t])=>`<button class="button ${filter===v?'':'secondary'}" data-recipe-filter="${v}">${t}</button>`).join('')}</div></section>${RECIPES.filter(r=>filter==='all'||(filter==='favorites'?state.favorites.includes(r.id):r.type===filter)).map(r=>`<section class="card recipe-card"><div class="topline"><h3>${esc(r.name)}</h3><span class="pill">${r.time} min</span></div><p class="subtle">${r.type==='snack'?'After-daycare snack':r.type==='breakfast'?'Breakfast':'Dinner for you & Bailey'} · ${r.leftovers===true?'✓ Great for leftovers':r.leftovers===false?'Best fresh':'Easy to prepare'}</p><b>Ingredients ${r.type==='dinner'?'(estimated for 2 portions)':''}</b><ul class="recipe-ingredients">${measuredRecipeIngredients(r).map(x=>`<li>${esc(qtyLabel(x))}</li>`).join('')}</ul><details><summary>Cooking instructions</summary><ol>${r.steps.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></details>${r.side?`<p><b>Easy side:</b> ${esc(r.side)}</p>`:''}<p class="toddler-tip"><b>♡ Bailey's plate:</b> ${esc(r.tip)}</p><div class="row-actions"><button class="button" data-recipe-add="${r.id}">+ Ingredients to Groceries</button><button class="button secondary" data-recipe-favorite="${r.id}">${state.favorites.includes(r.id)?'♥ Saved':'♡ Save'}</button></div></section>`).join('')||'<section class="card">No recipes here yet. Try another filter.</section>'}`}
// Weekly recipe planning uses the existing recipe IDs; older meal-plan notes remain untouched.
function mondayKey(){const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-((d.getDay()+6)%7));return isoDate(d)}
function selectedDinnerIds(){const x=state.recipeWeeks?.[mondayKey()];return Array.isArray(x)?Array.from({length:5},(_,i)=>typeof x[i]==='string'?x[i]:''):['','','','','']}
function selectedDinnerRecipes(){return selectedDinnerIds().map(id=>RECIPES.find(r=>r.id===id&&r.type==='dinner')).filter(Boolean)}
function consolidatedIngredients(){return combinedMeasuredIngredients()}
function weeklyRecipePlanner(){const selected=selectedDinnerIds(),days=['Monday','Tuesday','Wednesday','Thursday','Friday'],options=RECIPES.filter(r=>r.type==='dinner');const ingredients=combinedMeasuredIngredients();return `<section class="card peach"><span class="eyebrow">✿ SUNDAY NIGHT, SIMPLIFIED</span><h2>Five-Dinner Meal Planner 🍽️</h2><p class="subtle">Choose a recipe and how many portions to make each night. The default is 2 portions (you + Bailey); increase it for bigger appetites or leftovers. Week of ${esc(mondayKey())}.</p>${days.map((day,i)=>`<div class="meal"><label class="caption" for="recipe-day-${i}">${day}</label><select class="field" id="recipe-day-${i}" data-week-recipe="${i}"><option value="">Choose dinner…</option>${options.map(r=>`<option value="${esc(r.id)}" ${selected[i]===r.id?'selected':''}>${esc(r.name)} · ${r.time} min</option>`).join('')}</select>${selected[i]?`<label class="caption" for="recipe-portions-${i}">Portions for ${day}</label><select class="field" id="recipe-portions-${i}" data-recipe-portions="${i}">${[1,2,3,4,5,6,7,8].map(n=>`<option value="${n}" ${dinnerPortions(i)===n?'selected':''}>${n} portion${n===1?'':'s'}</option>`).join('')}</select>`:''}</div>`).join('')}<p class="subtle">${selected.filter(Boolean).length} of 5 dinners selected.</p><div class="row-actions"><button class="button secondary" id="clear-week-recipes">Clear this week</button><button class="button secondary" id="fill-week-favorites">Suggest five dinners</button></div></section><section class="card"><h3>Your measured grocery list 🥕</h3><p class="subtle">Estimated quantities scale with portions and matching ingredients are added together. Amounts are starting estimates, not tested recipe yields; check packages and adjust for appetite and leftovers. Packet seasoning directions may require extra ingredients.</p>${ingredients.length?`<p class="subtle">${ingredients.length} combined items for ${selected.filter(Boolean).length} dinners.</p><ul class="recipe-ingredients">${ingredients.map(x=>`<li>${esc(groceryQtyText(x))}${x.usedIn.length>1?` <small class="muted">(used in ${x.usedIn.length} meals)</small>`:''}</li>`).join('')}</ul><div class="row-actions"><button class="button" id="week-add-groceries">+ Add measured list to Groceries</button><button class="button secondary" id="week-copy-ingredients">Copy measured list for AnyList</button></div>`:'<p class="subtle">Choose a dinner above to see your shopping totals.</p>'}<p id="week-grocery-status" class="subtle" role="status"></p><p class="subtle">Your household essentials list and existing grocery notes stay separate. Adding again updates the app-generated quantities instead of duplicating them.</p></section>`}
function copyTextWithFallback(value){if(navigator.clipboard?.writeText){navigator.clipboard.writeText(value).then(()=>alert('Copied! Paste into AnyList.')).catch(()=>window.prompt('Copy these items for AnyList:',value))}else window.prompt('Copy these items for AnyList:',value)}
function cottageKitchen(){return `<div class="welcome"><span class="eyebrow">✿ THE COTTAGE KITCHEN</span><h2>Meals, snacks & little lists</h2><p>Less wondering what to make. More time together.</p></div><section class="card sage"><h2>Tonight’s dinner shortcut</h2><p>Pick a recipe below, or keep your existing weekly meal plan.</p><button class="button" data-kitchen-view="recipes">Open recipe box ♡</button> <button class="button secondary" data-kitchen-view="lists">Shopping lists</button> <button class="button secondary" data-kitchen-view="weekly">5-Dinner Planner</button> <button class="button secondary" data-kitchen-view="plan">Original plan</button></section>${kitchenView==='recipes'?weeklyRecipePlanner()+recipes():kitchenView==='weekly'?weeklyRecipePlanner():kitchenView==='lists'?itemList('groceries','🥕 Groceries','Milk, bananas, chicken…')+itemList('household','🧺 Household essentials','Diapers, wipes, detergent…'):`${plan()}`}<p class="subtle">Tip: Your original meal plan and grocery notes are still available in Weekly plan.</p>`}
let kitchenView='recipes';
function garden(){const total=state.gratitudes.length,answered=state.prayers.filter(x=>x.answered).length;const blooms=Math.min(24,total+answered);const flower=(i)=>{const col=i%6,row=Math.floor(i/6),x=30+col*52+(row%2)*9,y=104+(i%3)*5-row*19;const palette=['#e7aabd','#b5c9df','#f0d09b','#c9b4da','#e9bdac','#d7a8c2'];return `<g class="garden-flower" style="animation-delay:${(i%8)*0.13}s;transform-origin:${x}px ${y+22}px" aria-label="Flower ${i+1}"><path d="M${x} ${y} Q${x-5} ${y+16} ${x} ${y+34}" stroke="#74977b" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M${x} ${y+23}q-14-13-15-2q9 9 15 2 M${x} ${y+27}q13-13 15-2q-9 9-15 2" fill="#9bb992"/><g transform="translate(${x} ${y})">${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-9" rx="6.5" ry="11" transform="rotate(${a})" fill="${palette[i%palette.length]}"/>`).join('')}<circle r="5.5" fill="#f9e6a8"/><circle r="2" fill="#d3a15f"/></g></g>`};return `<section class="card garden"><span class="eyebrow">✿ LITTLE BLESSINGS BLOOM</span><h2>Your Gratitude Garden 🌷</h2><p>Every grateful moment grows a flower. Answered prayers bring more blooms. Nothing wilts, ever.</p><svg class="garden-scene" viewBox="0 0 340 190" role="img" aria-label="Illustrated garden with ${blooms} flowers"><defs><linearGradient id="gardenSky" x2="0" y2="1"><stop stop-color="#f8f1ea"/><stop offset="1" stop-color="#e7f0e7"/></linearGradient></defs><rect width="340" height="190" rx="15" fill="url(#gardenSky)"/><circle cx="282" cy="38" r="20" fill="#f8e7bd" opacity=".8"/><path d="M0 145Q70 130 135 145T265 141T340 145V190H0Z" fill="#dbe8d3"/><path d="M0 165Q80 150 170 166T340 162V190H0Z" fill="#c8ddbf"/>${Array.from({length:blooms},(_,i)=>flower(i)).join('')}${!blooms?'<text x="170" y="91" text-anchor="middle" fill="#688a7a" font-size="13">Your first little flower is waiting ♡</text>':''}<path d="M12 171q12-7 22 0m270 0q12-7 22 0" stroke="#a1bfa0" stroke-width="2" fill="none"/></svg><p class="subtle">${total} grateful moments · ${answered} answered prayers ${total+answered>24?'· Your garden is flourishing!':''}</p><p class="subtle">Add a gratitude or mark a prayer answered below to see another flower grow.</p></section>`}
function baileyExtras(){const weekend=[0,6].includes(new Date().getDay());const bag=['Diapers','Wipes','Spare outfit','Comfort item','Water cup'];const idx=(new Date().getDate()+new Date().getMonth()*31)%ACTIVITIES.length;const a=ACTIVITIES[idx];return `<section class="card peach"><h2>Bailey’s Little World 🧸</h2><p>Ideas for connection, not more work.</p><h3>One sweet thing today</h3><p><b>${esc(a.name)}</b> · ${a.mins} minutes · ${esc(a.what)}</p><button class="button secondary" id="new-activity">Surprise us with another activity ♡</button><p id="activity-result" class="subtle"></p></section><section class="card"><h3>Daycare bag 🎒</h3><p class="subtle">${weekend?'Weekend! No daycare bag needed today. You can still prepare for Monday.':'A simple bag check; no need to repack everything every day.'}</p>${bag.map((x,i)=>`<label class="task"><input type="checkbox" data-bag="${i}" ${state.baileyBag[isoDate(new Date())+':'+i]?'checked':''}><span>${x}</span></label>`).join('')}</section><section class="card"><h3>Little traditions & memories</h3><p class="subtle">Save the tiny moments you’ll want to remember someday in Bailey’s Little Moments below. You can also use it for clothing sizes and favorites.</p></section>`}
function helpingHand(){const opts=[['tired','😴 Exhausted'],['busy','⏰ Running late'],['overwhelmed','☁ Overwhelmed'],['good','🌷 Have energy']];const d=new Date().getDay(),daycareTomorrow=!([5,6].includes(d));const plans={tired:['An easy dinner or leftovers','Bailey’s bedtime and comfort',...(daycareTomorrow?['Set out daycare essentials']:[]),'Everything else can wait'],busy:['Grab the must-have items','Choose the fastest dinner','Skip nonurgent chores'],overwhelmed:['Food and water for everyone','Handle only urgent needs','Choose one tiny reset—or rest'],good:['Pick a family dinner','Enjoy 10 minutes of Bailey time','Choose one home task','Five-minute evening reset']};return `<section class="card helping"><span class="eyebrow">♡ MAMA’S HELPING HAND</span><h2>What kind of day is it?</h2><div class="row-actions">${opts.map(([id,label])=>`<button class="button ${state.energy===id?'':'secondary'}" data-energy="${id}">${label}</button>`).join('')}</div><h3>Your gentle game plan</h3>${plans[state.energy in plans?state.energy:'tired'].map((x,i)=>`<p>♡ ${esc(x)}</p>`).join('')}<p class="subtle">A suggested plan, not a new checklist. No guilt and no overdue tasks.</p></section>`}
function brain(){return `<section class="card"><h3>🧠 Mama Brain Dump</h3><p class="subtle">Get it out of your head. Add a note, then send it to Groceries, Household, or keep it as a reminder.</p><div class="row-actions"><input class="field grow" id="brain-input" maxlength="240" placeholder="Wipes, appointment, package return…"><button class="button" id="brain-add">Capture</button></div>${state.brain.map((x,i)=>`<div class="brain-line"><span>${esc(x.text)}</span><div class="row-actions"><button class="button secondary" data-brain-send="${i}:groceries">Groceries</button><button class="button secondary" data-brain-send="${i}:household">Household</button><button class="icon-button" data-brain-delete="${i}" aria-label="Remove note">×</button></div></div>`).join('')}</section>`}

function render(){normalizeMode();document.getElementById('today-label').textContent=new Intl.DateTimeFormat('en-US',{weekday:'long',month:'long',day:'numeric'}).format(new Date());document.getElementById('app').innerHTML=({today,week,calendar,reset:routines,plan:cottageKitchen,more,kids,faith}[tab]||today)();document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));updateLiveGrace()}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.kitchenView){kitchenView=b.dataset.kitchenView;render()}else if(b.id==='clear-week-recipes'){if(confirm('Clear the five selected dinners for this week?')){state.recipeWeeks[mondayKey()]=['','','','',''];save();render()}}else if(b.id==='fill-week-favorites'){const all=RECIPES.filter(r=>r.type==='dinner'),fav=all.filter(r=>state.favorites.includes(r.id)),other=all.filter(r=>!state.favorites.includes(r.id));state.recipeWeeks[mondayKey()]=[...fav,...other].slice(0,5).map(r=>r.id);save();render()}else if(b.id==='week-add-groceries'){const result=upsertMeasuredGroceries();const status=document.getElementById('week-grocery-status');if(status)status.textContent=result.added+' new items added; '+result.updated+' recipe quantities updated. Existing personal grocery items preserved.';}else if(b.id==='week-copy-ingredients'){const names=combinedMeasuredIngredients().map(groceryQtyText);if(names.length)copyTextWithFallback(names.join('\n'));else alert('Choose dinners first.')}else if(b.dataset.recipeFilter){state.recipeFilter=b.dataset.recipeFilter;render()}else if(b.dataset.recipeFavorite){const id=b.dataset.recipeFavorite;state.favorites=state.favorites.includes(id)?state.favorites.filter(x=>x!==id):[...state.favorites,id];save();render()}else if(b.dataset.recipeAdd){const r=RECIPES.find(x=>x.id===b.dataset.recipeAdd);if(r){let added=0;measuredRecipeIngredients(r).forEach(item=>{const label=qtyLabel(item);if(!state.groceries.some(x=>x.label.toLowerCase()===label.toLowerCase()&&!x.done)){state.groceries.push({label,done:false});added++}});save();alert(added+' ingredients added to Groceries.');}}else if(b.dataset.itemAdd){const key=b.dataset.itemAdd,el=document.getElementById('new-'+key);if(el?.value.trim()){state[key].push({label:el.value.trim().slice(0,120),done:false});save();render()}}else if(b.dataset.itemRemove){const [key,i]=b.dataset.itemRemove.split(':');state[key].splice(Number(i),1);save();render()}else if(b.dataset.copyList){const items=state[b.dataset.copyList].filter(x=>!x.done).map(x=>x.label);if(!items.length){alert('Add unchecked items first.')}else{const value=items.join('\n');if(navigator.clipboard?.writeText){navigator.clipboard.writeText(value).then(()=>alert('Copied! Paste into AnyList.')).catch(()=>prompt('Copy for AnyList:',value))}else prompt('Copy for AnyList:',value)}}else if(b.dataset.energy){state.energy=b.dataset.energy;save();render()}else if(b.id==='brain-add'){const el=document.getElementById('brain-input');if(el?.value.trim()){state.brain.unshift({text:el.value.trim().slice(0,240)});save();render()}}else if(b.dataset.brainSend){const [i,key]=b.dataset.brainSend.split(':');const x=state.brain.splice(Number(i),1)[0];if(x){state[key].push({label:x.text,done:false});save();render()}}else if(b.dataset.brainDelete){state.brain.splice(Number(b.dataset.brainDelete),1);save();render()}else if(b.id==='new-activity'){const a=ACTIVITIES[Math.floor(Math.random()*ACTIVITIES.length)];document.getElementById('activity-result').textContent=a.name+' ('+a.mins+' min): '+a.what}else if(b.dataset.tab){tab=b.dataset.tab;render();updateLiveGrace();loadDailyNLT();scrollTo(0,0)}else if(b.id==='retry-nlt'){liveNLT.status='idle';loadDailyNLT()}else if(b.dataset.mode){state.mode=b.dataset.mode;state.sickUntil=state.mode==='normal'?'':isoDate(new Date());save();render();window.scrollTo(0,0)}else if(b.dataset.extend){state.sickUntil=addDays(Number(b.dataset.extend));save();render()}else if(b.id==='save-verse'){const v=dailyVerse()[0];state.savedVerses=state.savedVerses.includes(v)?state.savedVerses.filter(x=>x!==v):[...state.savedVerses,v];save();render()}else if(b.id==='capture-add'){const el=document.getElementById('capture-input');if(el.value.trim()){state.capture.unshift({label:el.value.trim(),done:false});save();render()}}else if(b.dataset.add){const k=b.dataset.add,el=document.getElementById('new-'+k);if(el?.value.trim()){state[k].unshift({text:el.value.trim(),answered:false});save();render()}}else if(b.dataset.remove){const [k,i]=b.dataset.remove.split(':');if(confirm('Remove this entry?')){state[k].splice(Number(i),1);save();render()}}else if(b.dataset.answer!==undefined){state.prayers[Number(b.dataset.answer)].answered=!state.prayers[Number(b.dataset.answer)].answered;save();render()}else if(b.dataset.quick){const hints={10:'Try one counter, one laundry basket, or one drawer. Set a timer and stop when it rings.',company:'20-minute guest reset: bathroom sink, kitchen counters, visible clutter, then lights and a fresh towel.',dinner:'Choose an easy family dinner from your Meals tab. Leftovers count!'};document.getElementById('quick-result').textContent=hints[b.dataset.quick]}else if(b.hasAttribute('data-day')){selectedDay=Number(b.dataset.day);render()}else if(b.id==='add-task'){const label=prompt('What task would you like to add?');if(label?.trim()){state.extra.push({id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),day:selectedDay,label:label.trim().slice(0,120)});save();render()}}else if(b.id==='add-grocery'){const el=document.getElementById('new-grocery');if(el.value.trim()){state.groceries.push({label:el.value.trim().slice(0,120),done:false});save();render()}}else if(b.hasAttribute('data-remove-grocery')){state.groceries.splice(Number(b.dataset.removeGrocery),1);save();render()}else if(b.id==='add-event'){const date=document.getElementById('event-date').value,label=document.getElementById('event-label').value.trim();if(date&&label){state.events.push({id:Date.now().toString(36),date,label:label.slice(0,100)});save();render()}}else if(b.hasAttribute('data-remove-event')){state.events=state.events.filter(x=>x.id!==b.dataset.removeEvent);save();render()}else if(b.id==='copy-anylist'){const items=state.groceries.filter(x=>!x.done).map(x=>x.label).filter(Boolean);const msg=document.getElementById('anylist-status');if(!items.length){msg.textContent='Add an unchecked grocery item first.';}else{const value=items.join('\n');if(navigator.clipboard?.writeText){navigator.clipboard.writeText(value).then(()=>{const n=document.getElementById('anylist-status');if(n)n.textContent='Copied! Open AnyList and paste your items.'}).catch(()=>window.prompt('Copy these items for AnyList:',value));}else{window.prompt('Copy these items for AnyList:',value);}}}else if(b.id==='add-today-nlt'){const ref=dailyVerse()[0];const value=prompt('Paste your authorized NLT verse text for '+ref+':');if(value?.trim()){state.nltTexts[ref]=value.trim().slice(0,1500);state.nltVerified={...(state.nltVerified||{}),[ref]:true};save();render();}}else if(b.id==='save-meals'){document.querySelectorAll('[data-meal]').forEach(x=>state.meals[Number(x.dataset.meal)]=x.value.slice(0,200));save();alert('Meal plan saved!')}else if(b.id==='save-notes'){state.notes=document.getElementById('notes').value;save();alert('Notes saved!')}else if(b.id==='export'){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='home-sweet-home-backup-'+isoDate(new Date())+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}else if(b.id==='import'){document.getElementById('import-file').click()}else if(b.id==='import-nlt'){document.getElementById('nlt-file').click()}else if(b.id==='clear'&&confirm('Erase all checklists, projects, meals and notes on this device?')){state=blank();save();render()}});
document.addEventListener('change',async e=>{const x=e.target;if(x.dataset.recipePortions!==undefined){const idx=Number(x.dataset.recipePortions),n=Number(x.value);if(idx>=0&&idx<5&&Number.isInteger(n)&&n>=1&&n<=8){if(!state.recipeServings[mondayKey()])state.recipeServings[mondayKey()]={};state.recipeServings[mondayKey()][idx]=n;save();render()}}else if(x.dataset.weekRecipe!==undefined){const idx=Number(x.dataset.weekRecipe);if(idx>=0&&idx<5){const ids=selectedDinnerIds();ids[idx]=RECIPES.some(r=>r.type==='dinner'&&r.id===x.value)?x.value:'';state.recipeWeeks[mondayKey()]=ids;save();render()}}else if(x.dataset.itemCheck){const [key,i]=x.dataset.itemCheck.split(':');state[key][Number(i)].done=x.checked;save();render()}else if(x.dataset.bag!==undefined){state.baileyBag[isoDate(new Date())+':'+x.dataset.bag]=x.checked;save();render()}else if(x.id==='nlt-file'&&x.files?.[0]){try{const data=JSON.parse(await x.files[0].text());if(!data||Array.isArray(data)||typeof data!=='object')throw Error('Invalid');const valid=Object.entries(data).filter(([k,v])=>DAILY_REFERENCES.includes(k)&&typeof v==='string'&&v.length<1500);if(!valid.length)throw Error('No matching references');if(!confirm('Import '+valid.length+' NLT passages from your authorized source?'))return;state.nltTexts={...(state.nltTexts||{}),...Object.fromEntries(valid)};state.nltVerified={...(state.nltVerified||{}),...Object.fromEntries(valid.map(([k])=>[k,true]))};save();render()}catch(e){alert('Could not import. Use a JSON object such as {"Psalms 1:1":"Your authorized NLT verse text"}.')}}else if(x.dataset.check){state.checks[x.dataset.check]=x.checked;save();render()}else if(x.hasAttribute('data-grocery')){state.groceries[Number(x.dataset.grocery)].done=x.checked;save();render()}else if(x.dataset.project){state.projects[x.dataset.project]=x.checked;save();render()}else if(x.dataset.maint){state.maintenance[x.dataset.maint]=x.checked;save();render()}else if(x.id==='import-file'&&x.files?.[0]){try{const obj=JSON.parse(await x.files[0].text());if(!obj||typeof obj!=='object'||Array.isArray(obj)||!obj.checks||typeof obj.checks!=='object'||Array.isArray(obj.checks)||!Array.isArray(obj.meals)||!Array.isArray(obj.groceries))throw Error('Invalid Home Sweet Home backup');if(!confirm('Replace your current app data with this backup? Export your current data first.'))return;try{localStorage.setItem(KEY+'-pre-import-'+Date.now(),JSON.stringify(state))}catch(e){};state={...blank(),...obj,groceries:Array.isArray(obj.groceries)?obj.groceries:[],events:Array.isArray(obj.events)?obj.events:[],kids:Array.isArray(obj.kids)?obj.kids:[],prayers:Array.isArray(obj.prayers)?obj.prayers:[],gratitudes:Array.isArray(obj.gratitudes)?obj.gratitudes:[],savedVerses:Array.isArray(obj.savedVerses)?obj.savedVerses:[],capture:Array.isArray(obj.capture)?obj.capture:[],mode:['normal','minimum','sick'].includes(obj.mode)?obj.mode:'normal',routineChecks:obj.routineChecks||{},sickUntil:typeof obj.sickUntil==='string'?obj.sickUntil:'',nltTexts:obj.nltTexts||{},nltVerified:obj.nltVerified||{},household:Array.isArray(obj.household)?obj.household:[],favorites:Array.isArray(obj.favorites)?obj.favorites:[],baileyBag:obj.baileyBag||{},brain:Array.isArray(obj.brain)?obj.brain:[],energy:obj.energy||'tired',recipeFilter:'all',recipeWeeks:obj.recipeWeeks&&typeof obj.recipeWeeks==='object'&&!Array.isArray(obj.recipeWeeks)?obj.recipeWeeks:{},recipeServings:obj.recipeServings&&typeof obj.recipeServings==='object'&&!Array.isArray(obj.recipeServings)?obj.recipeServings:{}};save();render()}catch(err){alert('Could not import that backup file.')}}});
render();updateLiveGrace();if('serviceWorker'in navigator&&location.protocol!=='file:')navigator.serviceWorker.register('./sw.js').catch(()=>{});

// Refresh the daily verse when the page loads and when the date changes.
window.addEventListener('load',()=>{loadDailyNLT();document.addEventListener('visibilitychange',()=>{if(!document.hidden){render();updateLiveGrace();loadDailyNLT();}});});
