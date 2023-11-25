document.querySelector("#btnAgregar").addEventListener('click', agregar);
document.querySelector("#btnReset").addEventListener('click', reset);
document.querySelector("#borrarUltimo").addEventListener('click', borrar);
document.querySelector("#btnSortear").addEventListener('click', sortear);
//modelo de datos 
let nombres = [];

function agregar(){
    let input = document.querySelector("#nombre");
    let nombre = input.value;
    //agrego elemento al arreglo
    nombres.push(nombre);
    mostrar();
    input.value = "";
}
function mostrar(){
    let lista = document.querySelector(".listado");
    lista.innerHTML = "";
   /*for (const elemento of nombres) {
    lista.innerHTML += `<li> ${elemento} </li>`;
   }*/
   nombres.map((nombre) => {
    lista.innerHTML += `<li> ${nombre} </li>`;
   });
}
function reset(){
    nombres = [];
    mostrar();
}
function borrar(){
    nombres.pop();
    mostrar();
}
function sortear(){
    if(nombres.length > 0){
        let random = Math.floor(Math.random() * nombres.length);
        document.querySelector("#result").innerHTML += nombres[random]+"<br/>";
        nombres.pop(random);
        mostrar();
    }
}