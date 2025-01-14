// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi. Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l’utente deve inserire i numeri che ha visto precedentemente, nell’ordine che preferisce.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.


// salvare i dati di input
    const form = document.getElementById ('answers-form');                 //user form 
    const number = generateRandomNumbers(5, 1, 50);                        //numeri generati casualmente
    const inputNumber = document.querySelectorAll ('#input-group input')   // input numeri user
    const button = document.querySelector('button');                       //pulsante di invio dati

// console.log('questi sono gli input', form, number,inputNumber, button);


// salvare i dati di output 
    const countDown = document.getElementById ('countdown');               //countdown
    const instructions = document.getElementById ('instructions')          //instruzione utente
    const listNumber = document.getElementById ('numbers-list');           //ul contenente i li con i numeri
    const messaggio = document.getElementById ('message')                  // messaggio risultato


    // console.log('questi sono gli output', countDown, instructions, listNumber, messaggio);




//genero i li
// inizializzazione variabile di accumulo
let items = '';

// ciclo per inserire i li con i numeri randomici
for (let i = 0; i < 5; i++){

    // aggiorna items con stringa
    items += `<li>${number[i]}<li>`;
}

// aggiungi tutti gli items in output
listNumber.innerHTML = items;


//funzione di countdown di 30 secondi

//settiamo i secondi di partenza
let seconds = 0;
countDown.innerHTML = seconds;

// settiamo il setInterval
const contoAllaRovescia = setInterval(() => {

    // se il conto arriva a 0
    if (seconds === 0) {

        // fermo l'esecuzione
        clearInterval(contoAllaRovescia);

        // modifico le instruzioni all'utente in uscita
        instructions.innerHTML = "Inserisci i numeri che ti ricordi, non importa l'ordine!";

        // elimino il numero una volta che il countdown arriva a 0
        countDown.innerHTML = ''; 

        // nascondo la lista di numeri(listNumber)
        listNumber.classList.add ('d-none');

        // mostro il form con gli input dell'utente
        form.classList.remove('d-none')

    }else{

        // diminuisco il conto di 1
        seconds = seconds - 1;
        
        // mostro l'output di countdown
        countDown.innerHTML = seconds;
    }


}, 1000) //secondi di asincronicita 


// // tramite l'invio del form prendiamo i valori dei campi selezionati e li scriviamo nei blocchi
form.addEventListener('submit', (event) => {

    // blocco l'invio dei form
    event.preventDefault();
    
    // creo un array vuoto che immagazzina i numeri scelti dall'utente
    const numeriscelti = []

    // creo un ciclo per ricavarmi i valori inseriti negli input
    for(let i = 0; i < inputNumber.length; i++){

        // mi salvo il valore
        const numberValue = parseInt(inputNumber[i].value.trim());

        // lo inserisco nell'array numeriscelti
        numeriscelti.push(numberValue)

    }

    // console.log(numeriscelti);


    // convalido i dati usando la funzione validazione
    const differenze1 = validazione(numeriscelti, number)
    const differenze2 = validazione(number, numeriscelti)
    

    // se gli array sono entrambi vuoti significa che i numeri sono stati tutti indovinati
    if (differenze1.length === 0 && differenze2.length === 0) {

        // inserisco messaggio in html
        messaggio.innerHTML = 'HAI VINTO';
        
        // modifico lo stile del testo
        messaggio.classList.remove('text-danger')
        messaggio.classList.add('text-success')
        // console.log("HAI VINTO");

    } else if (differenze1.length === 1 && differenze2.length === 1) {

        // inserisco messaggio in html
        messaggio.innerHTML = 'NE HAI INDOVINATE 4';
        
        // modifico lo stile del testo
        messaggio.classList.remove('text-danger')
        messaggio.classList.add('text-success')
        // console.log("NE HAI INDOVINATE 4");

    } else if (differenze1.length === 2 && differenze2.length === 2) {

        // inserisco messaggio in html
        messaggio.innerHTML = 'NE HAI INDOVINATE 3';

        // modifico lo stile del testo
        messaggio.classList.remove('text-danger')
        messaggio.classList.add('text-success')
        // console.log("NE HAI INDOVINATE 3");

    } else if (differenze1.length === 3 && differenze2.length === 3) {

        // inserisco messaggio in html
        messaggio.innerHTML = 'NE HAI INDOVINATE 2';

        // modifico lo stile del testo
        messaggio.classList.remove('text-danger')
        messaggio.classList.add('text-success')
        // console.log("NE HAI INDOVINATE 2");

    }else if (differenze1.length === 4 && differenze2.length === 4) {

        // inserisco messaggio in html
        messaggio.innerHTML = 'NE HAI INDOVINATA 1';

        // modifico lo stile del testo
        messaggio.classList.remove('text-danger')
        messaggio.classList.add('text-success')
        // console.log("NE HAI INDOVINATA 1");
    }else{

        // inserisco messaggio in html
        messaggio.innerHTML = 'LOSER';

        // modifico lo stile del testo
        messaggio.classList.remove('text-success')
        messaggio.classList.add('text-danger')
        // console.log("LOSER");
    }

    // resetta il form
    form.reset()

})



// FUNCTIONS

// funzione per generare numeri casuali con un min e un max number
function randomNumberRange(min, max){
    const numeroGenerato = Math.floor(Math.random() * (max - min + 1) + min)
    return numeroGenerato
}

// funzione per generare numeri casuali unici
function generateRandomNumbers(totalNumbers, min, max){

    const randomNumbers = []; // array inizialmente vuoto che conterrà 5 numeri casuali

    // ciclo per geerare 5 numeri casuali unici
    for (let i = 0; randomNumbers.length < totalNumbers; i++){
        const numeriesimo = randomNumberRange(min, max);

        // verifica se il numero non è gia presente nell'array
        if(!randomNumbers.includes(numeriesimo)){
            // se non è presente lo aggiungo all'array
            randomNumbers.push(numeriesimo);

            // Stampa il numero aggiunto 
            console.log(`Numero aggiunto: ${numeriesimo}`);
        } else{
            
            // Stampa se il numero è duplicato (opzionale, per debug)
            console.log(`Numero duplicato ignorato: ${numeriesimo}`);
        }  
    }
    return randomNumbers;
}

// function validazione dei due array
function validazione (arraycheck, arrayverify){

    // genero un array vuoto che immagazzina il risultato
    const result = [];

    // creo un ciclo che mi elimina gli elementi uguali e mi ritorna quelli diversi
    for (let i = 0; i < arraycheck.length; i++) {

        // mi salvo l'elemento iesimo
        const item = arraycheck[i];

            //se l'array che sto validando non include gli elementi iesimi
            if (!arrayverify.includes(item)) {

                // salvami quegli elementi nell'array
                result.push(item);
            }
        }

    // ritornarmi l'array
    return result
}





