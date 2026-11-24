// TRIPY STAY — Reservation demo. Data is stored in this browser only.
const prices={"Standard":1200,"Deluxe":1850,"Family Suite":2600};
const capacities={"Standard":2,"Deluxe":3,"Family Suite":5};
const rooms={"Standard":[101,102,103,104],"Deluxe":[201,202,203],"Family Suite":[301,302]};
const KEY="tripyStayBookings";let bookings=readBookings();
const $=id=>document.getElementById(id);const today=new Date();today.setHours(0,0,0,0);
const dateString=d=>d.toISOString().slice(0,10);const cash=n=>"EGP "+Number(n).toLocaleString("en-US");
function readBookings(){try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch{return[]}}
function save(){localStorage.setItem(KEY,JSON.stringify(bookings))}
function setupDates(){let t=dateString(today),next=new Date(today);next.setDate(next.getDate()+1);["qIn","checkin"].forEach(id=>{$(id).min=t;if(!$(id).value)$(id).value=t});["qOut","checkout"].forEach(id=>{$(id).min=dateString(next);if(!$(id).value)$(id).value=dateString(next)})}
function nights(){return Math.round((new Date($("checkout").value+"T00:00:00")-new Date($("checkin").value+"T00:00:00"))/86400000)}
function extras(){return [...document.querySelectorAll('.check input:checked')].map(x=>({name:x.value,price:+x.dataset.price}))}
function updateTotal(){let n=Math.max(1,nights()||1),r=$("room").value; $("total").textContent=cash(prices[r]*n+extras().reduce((s,x)=>s+x.price,0))}
function openBooking(room){$("bookingForm").reset();$("formPanel").hidden=false;$("success").hidden=true;$("alert").classList.remove("show");setupDates();if(room)$("room").value=room;updateTotal();$("overlay").classList.add("show")}
function closeBooking(){$("overlay").classList.remove("show")}
function safe(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function availableRoom(type,start,end){let used=bookings.filter(b=>b.roomType===type&&b.status==="Confirmed"&&start<b.checkout&&end>b.checkin).map(b=>b.roomNo);return rooms[type].find(n=>!used.includes(n))}
function submit(e){e.preventDefault();$("alert").classList.remove("show");let name=$("name").value.trim(),email=$("email").value.trim(),phone=$("phone").value.trim(),start=$("checkin").value,end=$("checkout").value,type=$("room").value,count=+$("guests").value,n=nights();
const error=m=>{$("alert").textContent=m;$("alert").classList.add("show")};
if(!name||!email||!phone||!start||!end)return error("Please complete all required fields.");
if(n<=0||new Date(start+"T00:00:00")<today)return error("Please select valid dates. Check-out must be after check-in.");
if(count>capacities[type])return error(type+" accommodates up to "+capacities[type]+" guests.");
let roomNo=availableRoom(type,start,end);if(!roomNo)return error("No "+type+" rooms are available for these dates. Please choose other dates or a different room.");
let extra=extras(),total=prices[type]*n+extra.reduce((s,x)=>s+x.price,0);
let b={id:"TS-"+Date.now().toString().slice(-8),name,email,phone,category:$("category").value,checkin:start,checkout:end,nights:n,guests:count,roomType:type,roomNo,extras:extra.map(x=>x.name),total,requests:$("requests").value,status:"Confirmed"};
bookings.push(b);save();$("formPanel").hidden=true;$("success").hidden=false;
$("receipt").innerHTML=`Booking ID: <b>${b.id}</b><br>Guest: <b>${safe(b.name)}</b><br>Room: <b>${safe(type)} — ${roomNo}</b><br>Stay: <b>${start} to ${end} (${n} nights)</b><br>Guests: <b>${count}</b><br>Services: <b>${b.extras.length?b.extras.map(safe).join(", "):"None"}</b><br>Total: <b>${cash(total)}</b>`;
}
function showAdmin(){$("public").hidden=true;$("admin").hidden=false;$("nav").classList.remove("open");render();window.scrollTo(0,0)}
function showPublic(){$("admin").hidden=true;$("public").hidden=false;window.scrollTo(0,0)}
function render(){let q=$("filter").value.toLowerCase(),list=bookings.filter(b=>b.name.toLowerCase().includes(q)||b.id.toLowerCase().includes(q));$("sBookings").textContent=bookings.length;$("sGuests").textContent=bookings.reduce((s,b)=>s+b.guests,0);$("sRevenue").textContent=cash(bookings.reduce((s,b)=>s+b.total,0));$("rows").innerHTML=list.map(b=>`<tr><td><b>${b.id}</b></td><td>${safe(b.name)}<br><small>${safe(b.email)}</small></td><td>${safe(b.roomType)}<br><small>Room ${b.roomNo}</small></td><td>${b.checkin}<br><small>to ${b.checkout}</small></td><td>${b.guests}</td><td>${cash(b.total)}</td><td><span class="pill">${b.status}</span></td></tr>`).join("");$("empty").hidden=list.length>0}
document.querySelectorAll("[data-book]").forEach(x=>x.addEventListener("click",()=>openBooking()));
document.querySelectorAll("[data-room]").forEach(x=>x.addEventListener("click",()=>openBooking(x.dataset.room)));
$("close").onclick=closeBooking;$("overlay").addEventListener("click",e=>{if(e.target===$("overlay"))closeBooking()});
$("bookingForm").addEventListener("submit",submit);$("room").addEventListener("change",updateTotal);
["checkin","checkout"].forEach(id=>$(id).addEventListener("change",()=>{if(id==="checkin"){let d=new Date($("checkin").value+"T00:00:00");d.setDate(d.getDate()+1);$("checkout").min=dateString(d);if($("checkout").value<=$("checkin").value)$("checkout").value=dateString(d)}updateTotal()}));
document.querySelectorAll(".check input").forEach(x=>x.addEventListener("change",updateTotal));
$("quick").addEventListener("submit",e=>{e.preventDefault();openBooking($("qRoom").value);$("checkin").value=$("qIn").value;$("checkout").value=$("qOut").value;$("guests").value=$("qGuests").value;updateTotal()});
$("adminBtn").onclick=showAdmin;$("footerAdmin").onclick=e=>{e.preventDefault();showAdmin()};$("homeBtn").onclick=showPublic;$("back").onclick=e=>{e.preventDefault();showPublic()};$("filter").addEventListener("input",render);
$("done").onclick=()=>{closeBooking();showPublic()};$("hamb").onclick=()=>$("nav").classList.toggle("open");
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>$("nav").classList.remove("open")));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeBooking()});setupDates();
