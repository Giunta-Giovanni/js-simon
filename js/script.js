// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi. Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l’utente deve inserire i numeri che ha visto precedentemente, nell’ordine che preferisce.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.


// salvare i dati di input
    const form = document.getElementById ('answers-form');          //user form 
    const number = generateRandomNumbers(5, 1, 50);                 //numeri generati casualmente
    const button = document.querySelector('button');                //pulsante di invio dati

console.log('questi sono gli input', form, number, button);


// salvare i dati di output 
    const countDown = document.getElementById ('countdown');               //countdown
    const instructions = document.getElementById ('instructions')          //instruzione utente
    const listNumber = document.getElementById ('numbers-list');           //ul contenente i li con i numeri
    const messaggio = document.getElementById ('message')                  // messaggio risultato
    const inputNumber = document.querySelectorAll ('#input-group input')   // input numeri user

    console.log('questi sono gli output', countdown, instructions, listNumber, messaggio, inputNumber);




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


// funzione di countdown di 30 secondi

    //settiamo i secondi di partenza
    let seconds = 5;
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


        }else{

            // diminuisco il conto di 1
            seconds = seconds - 1;
            
            // mostro l'output di countdown
            countDown.innerHTML = seconds;
        }


    }, 1000) //1000 sta a identificare i secondi di asincronicita cioe di calcolo



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




