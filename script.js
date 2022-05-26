//Areas donde voy a trabajar

//Input usuario
let userInputArea = document.getElementById('input-textarea'); //donde escribo

//area donde muestro los resultados (Me parece buena idea que todo suceda en el DIV que tiene el dibujo...);
let outputAreaImg = document.getElementById('results-img'); // div que tiene la img adentro
let img = document.getElementsByClassName('img-muneco'); // Imagen, para esconder

//area donde muestro el texto encriptado
let outputTextArea = document.getElementById('textarea-results');

//necesito reducir el margin-top cuando muestro el texto encriptado
let areaResults = document.getElementById('results-area');

//y tambien, basado en show muneco; muestro mensaje de presione botón...
let showMuneco = true;

// elemento a modificar según imagen muneco
let instruction = document.querySelector('.presioneButton');
let instFooter = document.querySelector("#results-footer");

//pseudo-portapapeles
let portapapeles = "";

function showInstruction(){
    if(showMuneco === true){
        instruction.classList.add('hide');
        instFooter.style.visibility = 'visible';

    } else {
        instruction.classList.remove('hide');
        instFooter.style.visibility = 'hidden';
    }
}

 //Control del input, para mostrar mensajes o imagen en el lado de los resultados
 userInputArea.addEventListener('input', function(){
    if(userInputArea.value !== ""){
        showMuneco = false;
        img[0].classList.add('hide');
        showInstruction();

    } else {
        showMuneco = true;
        img[0].classList.remove('hide');
        showInstruction();
    }
});

//En lugar de generar el botón, lo voy a tener oculto y lo voy a mostrar cuando corresponda.
//y ya tengo el lugar que le corresponde.
 let divForCopyButton = document.getElementById('forCopyButton');

 // 1ero, un flag para activar o desactivar
 let showCopy = false;

 function mostrarOcultar(){
    let div = divForCopyButton; 
    if(showCopy === false){
        div.style.visibility = 'hidden'; 

    } else {       
        div.style.visibility = 'visible'; 
    }          
}

//tengo que tener los procesos que va a hacer la aplicación; a saber:

//hay un boton que dispara la codificación y otras cuestiones


//Botón Encriptar
let buttonEnc = document.getElementById('btEnc');
buttonEnc.addEventListener('click', ()=>{
    if(userInputArea.value === "" || toErase.length !== 0){

    } else {
        
        let input = readText(userInputArea.id) //lee el texto
        let out = code(input); //lo codifica
        showCopy = true; //cambio el flag para mostrar
        mostrarOcultar() // muestra el boton;
        bringOnText(out); 
        encriptFlag = true;
        copiado = false;
    }
})


//Lee el texto
function readText(id){
    let area = document.getElementById(id)
    let text = area.value;
    return text;
}

//lo codifica
function code(input){

    let changed = [];

    for(let i = 0; i <= input.length-1; i++){
        if(input[i] === "a"){
            changed.push("ai");
        } else if(input[i] === "e"){
            changed.push("enter"); 
        } else if(input[i] === "i"){
            changed.push("imes"); 
        } else if(input[i] === "o"){
            changed.push("ober"); 
        } else if(input[i] === "u"){
            changed.push("ufat"); 
        } else {
            changed.push(input[i])
        }
    }
    return changed.join('');
}

//lo muestra en el lugar que corresponde
function bringOnText(string){
    areaResults.classList.add('results-area-displayControl');
    outputAreaImg.classList.add('hide');
    let p = document.createElement('div');
    p.classList.add('forOutputText');
    p.innerText = string;
    outputTextArea.appendChild(p);
}


//Botón copiar(y pegar en el input) me permite copiar luego de presionar encriptar)
let copyButton = document.getElementById('copyButton');

copyButton.addEventListener('click', function(){
    //copio y pego el texto codificado en el input; listo para decodificar    
    copyToClipboard();
    pasteToInputArea()
});

//funcion copiar (y pegar)

//necesito el div donde se muestra el texto cifrado
let textToCopy = document.getElementsByClassName('forOutputText');

//flag de boton copiar
// lo uso para que no se pueda desencriptar sin copiar despues de encriptar

let copiado = true;

// pseudo-Copy
function copyToClipboard(){
    let text = textToCopy[0].textContent;
    portapapeles = text; 
    copiado = true;          
}

//pseudo-Paste
function pasteToInputArea(){
    if(portapapeles !== ""){
        userInputArea.value = portapapeles;
        let toErase = textToCopy[0].textContent;
        toErase = "";
    } else {
        alert('No hay nada para copiar');
    }
}
//limpia el area de resultados
//quita el texto anterior

let toErase = document.getElementsByClassName('forOutputText'); //esto lo pongo fuera de la funcion para ver si funciona y para usarlo en otro lado

function clearOut(){
    
    toErase[0].innerHTML = "";
}

//No desencripta si no encripté primero;
//Esto lo soluciono dandole un segundo camino al desencriptar:

let encriptFlag = false;
//el boton encriptar cambia este flag

//Boton desencriptar
let buttonDec = document.getElementById('btDec');
buttonDec.addEventListener('click', ()=>{
    if(userInputArea.value !== "" && toErase.length === 0 || encriptFlag === true && copiado === true){
        if(encriptFlag === true){
            clearOut();
            let input = readText(userInputArea.id) //lee el texto
            let out = deCode(input); //lo decodifica
            showCopy = true; //cambio el flag para mostrar
            mostrarOcultar() // oculta el boton;
            //muestra el texto
            bringOnText(out); 
            encriptFlag = false;
        } else {
            let input = readText(userInputArea.id) //lee el texto
            let out = deCode(input); //lo decodifica
            mostrarOcultar()
            bringOnText(out);
        }   
    }    
})

//lo decodifica
//Desencriptar
function deCode(text){
    
   let copy = text.replace(/ai/gi, 'a').replace(/enter/gi, 'e').replace(/imes/gi, 'i').replace(/ober/gi, 'o').replace(/ufat/gi, 'u');           

   return copy
}






