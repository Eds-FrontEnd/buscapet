/* Busca Pet */
const c = (el) => document.querySelector(el);
const result = c(".result");
const input = c("input");

// Busca no servidor
const buscarPet = async () => {
    const pet = input.value.toLowerCase();
    const api = await fetch(`https://dog.ceo/api/breed/${pet}/images/random`);
    const dog = await api.json();

    if (dog.status == "error" || input.value == "" || input.value === null || input.value === undefined) {
        result.innerHTML = `<img src="../../assets/img/error404.png" />`;
        
        setTimeout(() => {
            input.value="";
        }, 1000);

        alert("Ops, tente novamente...");

    } else {
        try {
            printDog(dog);
        } catch (error) {
            console.error(`Ops, deu ruim... ${error}`);
        } finally {
            console.info("Fim da requisição.");
        }
    }
};

// Printa na tela
const printDog = (dog) => {
    result.innerHTML = "";

    setTimeout(() => {
        input.value = "";
    }, 1000);
    
    c(".loading").style.display="flex";

    setTimeout(()=>{
        c(".loading").style.display="none";
    }, 1500);

    for(let i in dog) {
        result.innerHTML += `<img src=${dog[i]} class="imgPet" />`;
    }
};

// Botão BuscarPet
const btnBuscarPet = c("button");
btnBuscarPet.addEventListener("click", buscarPet);

// Teclar Enter na Busca
const pressEnter = c("input");
pressEnter.addEventListener("change", buscarPet);

window.onload = function(){
    setTimeout(()=>{
        c(".loading").style.display="none";
    }, 1500);
}