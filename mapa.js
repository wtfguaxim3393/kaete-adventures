var map = L.map('map').setView([-2.5, -60], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Kaete Adventures'
}).addTo(map);


// 🌎 LISTA DE DESTINOS
var destinos = [

{
nome:"Vila Tepequém - RR",
lat:3.77,
lng:-61.72,
tipo:"eco",
nota:4.9,
img:"https://al.rr.leg.br/wp-content/uploads/2024/07/DIRETO-SITE-14.jpg",
desc:"🌄 Cachoeiras e natureza preservada"
},

{
nome:"Nobres - MT",
lat:-14.82,
lng:-56.07,
tipo:"eco",
nota:4.8,
img:"https://www.viajali.com.br/wp-content/uploads/2022/10/nobres-0000.png",
desc:"🌿 Rios cristalinos"
},

{
nome:"Serra do Roncador",
lat:-13.7,
lng:-52.5,
tipo:"aventura",
nota:4.7,
img:"https://ogimg.infoglobo.com.br/in/24285397-e78-65d/FT1500A/690/87314331_BVSerra-do-Roncador-Mato-GrossoBico-da-Serra-na-legenda.Foto-de-divulgacao.jpg",
desc:"⛰ Trilhas e mistérios"
},


];

var marcadores = [];


// 🔄 função para renderizar
function mostrarDestinos(filtro="todos", busca=""){

marcadores.forEach(m => map.removeLayer(m));
marcadores = [];

destinos.forEach(d =>{

if((filtro==="todos" || d.tipo===filtro) &&
d.nome.toLowerCase().includes(busca.toLowerCase())){

let marker = L.marker([d.lat, d.lng]).addTo(map)
.bindPopup(`

<div style="width:200px">

<img src="${d.img}" style="width:100%; border-radius:10px">

<h3>${d.nome}</h3>

<p>${d.desc}</p>

<p>⭐ ${d.nota}</p>

<a href="pousadas.html">🏡 Pousadas</a><br>
<a href="https://www.google.com/maps?q=${d.lat},${d.lng}" target="_blank">
🧭 Como chegar
</a>

</div>

`);

marcadores.push(marker);

}

});

}


// iniciar
mostrarDestinos();


// 🔎 busca
document.getElementById("busca").addEventListener("input", function(){
mostrarDestinos(
document.getElementById("filtro").value,
this.value
);
});


// 🎯 filtro
document.getElementById("filtro").addEventListener("change", function(){
mostrarDestinos(
this.value,
document.getElementById("busca").value
);
});


// 📍 localização
map.locate({setView:true, maxZoom:10});

map.on('locationfound', function(e){
L.marker(e.latlng).addTo(map)
.bindPopup("📍 Você está aqui")
.openPopup();
});