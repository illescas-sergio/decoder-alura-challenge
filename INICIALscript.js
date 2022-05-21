// selecciono los elementos con los que voy a trabajar
        
        //input
        let userInputArea = document.getElementById('input-textarea');

        //output div
        let resultsDiv = document.getElementById('results-area');

        // let results = document.getElementById('results-area');
       
        //output div img
        let outputAreaImg = document.getElementById('results-img');
       
        //output textArea for placing the encripted text only
        let outputTextArea = document.getElementById('textarea-results');
        
        // text messages for user
        let resultsFooterP = document.getElementById('results-footer-p');
        
        // instructions for user
        let inst = document.getElementById('results-footer-h5');
        
        // div for copy button
        let divForCopyButton = document.getElementById('forCopyButton');

        //textarea Output
        let textAreaOut = document.getElementsByClassName('forOutputText');
        
        
        //Flags para evitar que se pueda presionar los botones mas de una vez
        let allowEnc = true;
        let allowDec = true;

        //variable para guardar el texto encriptado
        let portapapeles = "";
        
        //Leer texto
        function readText(id){
            let area = document.getElementById(id)
            let text = area.value;
            console.log(text)
            return text
        }
        
        // pseudo-Copy
        function copyToClipboard(){
            console.log('ENTRO a copyTo')
            let area = document.getElementById(outputTextArea.id).getElementsByTagName('textarea');
            let text = area[0].value;
            portapapeles = text;
                      
        }

        //pseudo-Paste
        function pasteToInputArea(){
            if(portapapeles !== ""){
                userInputArea.value = portapapeles;
            } else {
                alert('No hay nada para copiar');
            }
        }

        //Limpiar el input de usuario
        function clearInput(){
            console.log('estoy en CLEAR');
            let toErase = outputTextArea.innerHTML;
            //outputTextArea.remove(toErase);
            console.log(toErase)
        }

        // Crear el boton copiar
        function createCopyButton(){

            let copyButton = document.createElement('button');
            copyButton.innerText = "Copiar"
            copyButton.classList.add("data-button-deencript", "copy-button");
            divForCopyButton.appendChild(copyButton); 
            copyButton.addEventListener('click', () => {  
                console.log('entro al eventListener');
                copyToClipboard();             
                pasteToInputArea();
                clearInput()
            })            
            
        }

        //Mostrar texto en el area de resultados
        function bringOnText(result){

            inst.style.display = 'none';
            let p = document.createElement('textarea');
            p.classList.add('forOutputText');
            p.innerText = result;
            outputTextArea.appendChild(p);

        }
        
        
        userInputArea.addEventListener('input', function(){
            if(userInputArea.value !== ""){
                outputAreaImg.style.display = 'none';
                resultsFooterP.style.display = 'none'; 
                resultsDiv.classList.replace('results-area', 'results-area-displayControl')
                inst.innerText = "Presione el botón para encriptar o desencriptar";           

            } else {
                outputAreaImg.style.display = '';
                resultsFooterP.style.display = ''; 
                inst.innerText = "Ningún mensaje fue encontrado";  
                resultsDiv.classList.replace('', '')         
                console.log('no le cambio el display')
            }
        })

        //Botón Encriptar
        let buttonEnc = document.getElementById('btEnc');
        buttonEnc.addEventListener('click', ()=>{
            if(allowEnc === true){
                let input = readText(userInputArea.id)
                let out = code(input);
                bringOnText(out);
                createCopyButton();
                allowEnc= false;
                allowDec= true;
                console.log(out);
            }
        })

        //Boón Desencriptar
        let buttonDec = document.getElementById('btDec');
        buttonDec.addEventListener('click', ()=>{
            if(allowDec === true){
                let encripted = readText(userInputArea.id)
                let guess = deCode(encripted);
                bringOnText(guess);
                allowEnc= true;
                allowDec= false;
                console.log(guess);
            }
        })
             
        //Encriptar
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
        
        //Desencriptar
        function deCode(text){
    
            let copy = text.replace(/ai/gi, 'a').replace(/enter/gi, 'e').replace(/imes/gi, 'i').replace(/ober/gi, 'o').replace(/ufat/gi, 'u');           

           return copy
        }