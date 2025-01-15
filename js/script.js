// LOGICA JS-SIMON
// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi. Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l’utente deve inserire i numeri che ha visto precedentemente, nell’ordine che preferisce. (√)
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati. √


// Elementi del DOM
const form = document.getElementById ('answers-form'); //user form 
const inputNumber = document.querySelectorAll ('#input-group input');// numeri scelti
const button = document.querySelector('button'); //pulsante di invio dati
const countDown = document.getElementById ('countdown'); //countdown
const instructions = document.getElementById ('instructions'); //instruzione utente
const listNumber = document.getElementById ('numbers-list'); //lista numerix
const messaggio = document.getElementById ('message'); // messaggio risultato


//GENERO GLI ELEMENTI DELLA LISTA
// generazione numeri casuali
const number = generateRandomNumbers(5, 1, 50);
console.log('questi sono i numeri da indovinare',number);

// inizializzazione variabile di accumulo
let items = '';

// ciclo per inserire i li con i numeri randomici
for (let i = 0; i < 5; i++){

    // aggiorna items con stringa
    items += `<li>${number[i]}<li>`;
}

// aggiungi tutti gli items in output
listNumber.innerHTML = items;

//COUNTDOWN
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
        // mostro l'output di countdown
        countDown.innerHTML = seconds;
    }
}, 1000) 

// Gestione del form
form.addEventListener('submit', (event) => {
    event.preventDefault(); // blocco l'invio dei form
    
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

    // debug numeri scelti in console.log
    console.log("questi sono i numeri che ha scelto l'utente", numeriscelti);

    if(duplicato){
        // Mostra un messaggio di errore se ci sono duplicati
        messaggio.innerHTML = "Non puoi inserire numeri duplicati!";
        messaggio.classList.remove('text-success');
        messaggio.classList.add('text-danger');
    }else{
    // convalido i dati usando la funzione di validazione numeri
    const numeriIndovinati = validateNumbers(numeriscelti, number)

    // Genero messaggio di numeri indovinati
    const numeriIndovinatimex = `HAI INDOVINATO ${numeriIndovinati.length} NUMERI: ${numeriIndovinati.join(' - ')}`

    // debug numeri indovinati in console.log    
    console.log('questi sono i numeri che sono stati indovinati',numeriIndovinati);

    // setto lo stile del testo del messaggio in rosso
    messaggio.classList.add('text-success');
    messaggio.classList.remove('text-danger');

    // se gli array sono entrambi vuoti significa che i numeri sono stati tutti indovinati
    if (numeriIndovinati.length === 5) {

        // inserisco messaggio in html
        messaggio.innerHTML = `${numeriIndovinatimex}`;
        
    } else if (numeriIndovinati.length === 4) {

        // inserisco messaggio in html
        messaggio.innerHTML = `${numeriIndovinatimex}` ;

    } else if (numeriIndovinati.length === 3) {

        // inserisco messaggio in html
        messaggio.innerHTML = `${numeriIndovinatimex}`;

    } else if (numeriIndovinati.length === 2) {

        // inserisco messaggio in html
        messaggio.innerHTML = `${numeriIndovinatimex}`;

    }else if (numeriIndovinati.length === 1) {

        // inserisco messaggio in html
        messaggio.innerHTML = ` ${numeriIndovinatimex}`;

    }else{

        // inserisco messaggio in html
        messaggio.innerHTML = 'NON HAI INDOVINATO NESSUN NUMERO';

        // modifico lo stile del testo
        messaggio.classList.remove('text-success');
        messaggio.classList.add('text-danger');
    }

    // disabilita il click del bottone
    button.disabled = true;
    // resetta il form
    form.reset();
    }

})


// FUNCTIONS
// funzione per generare numeri casuali in un range
function randomNumberRange(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min); 
}

// funzione per generare numeri casuali unici
function generateRandomNumbers(totalNumbers, min, max){

    // creo un array vuoto da riempire
    const randomNumbers = [];

    // ciclo per generar 'n' numeri casuali unici
    for (let i = 0; randomNumbers.length < totalNumbers; i++){
        const numeriesimo = randomNumberRange(min, max);

        // verifica se il numero non è gia presente nell'array
        if(!randomNumbers.includes(numeriesimo)){
            // se non è presente lo aggiungo all'array
            randomNumbers.push(numeriesimo);
        }
    }
    return randomNumbers;
}


// Funzione per validare l'array utente rispetto a quello generato
function validateNumbers (arraycheck, arrayverify){

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
    return result;
}





