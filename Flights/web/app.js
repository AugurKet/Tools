async function searchFlights(){

const origin=document.getElementById("origin").value;
const date=document.getElementById("date").value;

const res=await fetch(`/search?origin=${origin}&date=${date}`);

const data=await res.json();

const tbody=document.querySelector("#results tbody");

tbody.innerHTML="";

if(!data.data){

alert("No data returned");
return;

}

for(const item of data.data){

const row=document.createElement("tr");

const dest=document.createElement("td");
dest.innerText=item.destination;

const price=document.createElement("td");
price.innerText="$"+item.price.total;

row.appendChild(dest);
row.appendChild(price);


tbody.appendChild(row);

}

}
