// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi. Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l’utente deve inserire i numeri che ha visto precedentemente, nell’ordine che preferisce. (√)


// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.


// salvare i dati di input
    const form = document.getElementById ('answers-form'); //user form 
    const number = generateRandomNumbers(5, 1, 50); //numeri generati casualmente
    const inputNumber = document.querySelectorAll ('#input-group input');// input numeri user
    const button = document.querySelector('button'); //pulsante di invio dati

// console.log('questi sono gli input', form, number,inputNumber, button);

// salvare i dati di output 
    const countDown = document.getElementById ('countdown'); //countdown
    const instructions = document.getElementById ('instructions'); //instruzione utente
    const listNumber = document.getElementById ('numbers-list'); //ul contenente i li con i numeri
    const messaggio = document.getElementById ('message'); // messaggio risultato

    // console.log('questi sono gli output', countDown, instructions, listNumber, messaggio);


//GENERO I LI
// inizializzazione variabile di accumulo
let items = '';

// ciclo per inserire i li con i numeri randomici
for (let i = 0; i < 5; i++){

    // aggiorna items con stringa
    items += `<li>${number[i]}<li>`;
}

// aggiungi tutti gli items in output
listNumber.innerHTML = items;


//FUNZIONE di countdown di 30 secondi

//settiamo i secondi di partenza
let seconds = 10;

// Stampiamo lo start dei secondi a schermo
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
        
        // // mostro l'output di countdown
        countDown.innerHTML = seconds;
    }


}, 1000) //secondi di asincronicita 


// // tramite l'invio del form prendiamo i valori dei campi selezionati e li scriviamo nei blocchi
form.addEventListener('submit', (event) => {
    // blocco l'invio dei form
    event.preventDefault();
    
    // creo un array vuoto che immagazzina i numeri scelti dall'utente
    const numeriscelti = []

    // salvo la variabile duplicato inizialmente falsa
    let duplicato = false

    // creo un ciclo per ricavarmi i valori inseriti negli input
    for(let i = 0; i < inputNumber.length; i++){

        // mi salvo il valore
        const numberValue = parseInt(inputNumber[i].value.trim());

        // Controlla se il numero è già presente nell'array (per evitare duplicati)
        if(numeriscelti.includes(numberValue) ){

            // modifica il valore di duplicato in vero
            duplicato = true;
            break
        }

        // lo inserisco nell'array numeriscelti
        numeriscelti.push(numberValue)

    }
    // console.log(numeriscelti);


    if(duplicato){
        // Mostra un messaggio di errore se ci sono duplicati
        messaggio.innerHTML = "Non puoi inserire numeri duplicati!";
        messaggio.classList.remove('text-success');
        messaggio.classList.add('text-danger');
    }else{

    // convalido i dati usando la funzione validazione
    const numeriIndovinati = validazione(numeriscelti, number)

    // Genero messaggio di numeri indovinati
    const numeriIndovinatimex = `HAI INDOVINATO ${numeriIndovinati.length} NUMERI: ${numeriIndovinati.join(' - ')}`
    console.log(numeriIndovinati)

    // setto lo stile del testo del messaggio
    messaggio.classList.add('text-success')
    messaggio.classList.remove('text-danger');

    // se gli array sono entrambi vuoti significa che i numeri sono stati tutti indovinati
    if (numeriIndovinati.length === 5) {

        // inserisco messaggio in html
        messaggio.innerHTML = `${numeriIndovinatimex}`;
        
        // console.log("HAI VINTO");

    } else if (numeriIndovinati.length === 4) {

        // inserisco messaggio in html
        messaggio.innerHTML = `${numeriIndovinatimex}` ;
        // console.log("NE HAI INDOVINATE 4");

    } else if (numeriIndovinati.length === 3) {

        // inserisco messaggio in html
        messaggio.innerHTML = `${numeriIndovinatimex}`;
        // console.log("NE HAI INDOVINATE 3");

    } else if (numeriIndovinati.length === 2) {

        // inserisco messaggio in html
        messaggio.innerHTML = `${numeriIndovinatimex}`;
        // console.log("NE HAI INDOVINATE 2");

    }else if (numeriIndovinati.length === 1) {

        // inserisco messaggio in html
        messaggio.innerHTML = ` ${numeriIndovinatimex}`;
        // console.log("NE HAI INDOVINATA 1");

    }else{

        // inserisco messaggio in html
        messaggio.innerHTML = 'NON HAI INDOVINATO NESSUN NUMERO';

        // modifico lo stile del testo
        messaggio.classList.remove('text-success')
        messaggio.classList.add('text-danger')
        // console.log("LOSER");
    }

    // disabilita il click del bottone
    button.disabled = true
    // resetta il form
    form.reset()
    }

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

            // Stampa il numero aggiunto debug( opzionale, per debug)
            console.log(`Numero aggiunto: ${numeriesimo}`);
        } else{

            // Stampa se il numero è duplicato (opzionale, per debug)
            // console.log(`Numero duplicato ignorato: ${numeriesimo}`);
        }  
    }
    return randomNumbers;

}

// function validazione dei due array
function validazione (arraycheck, arrayverify){

    // genero un array vuoto che immagazzina il risultato
    const result = [];

    // creo un ciclo che mi elimina gli elementi diversi e mi ritorna quelli uguali
    for (let i = 0; i < arraycheck.length; i++) {

        // mi salvo l'elemento iesimo
        const item = arraycheck[i];

            //se l'array che sto validando include gli elementi iesimi e tali elementi non sono gia stati inseriti nell'array risultato
            if (arrayverify.includes(item) && !result.includes(item)) {

                // salvami quegli elementi nell'array
                result.push(item);
            }
        }

    // ritornarmi l'array
    return result
}





