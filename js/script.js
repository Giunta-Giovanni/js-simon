// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi. Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l’utente deve inserire i numeri che ha visto precedentemente, nell’ordine che preferisce.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.


// salvare i dati di input
    
    const listNumber = document.getElementById ('numbers-list');    //ul contenente i li con i numeri
    const form = document.getElementById ('answers-form')           //user form 
    const button = document.querySelector('button');                //pulsante di invio dati

console.log('questi sono gli input', listNumber, button);


// salvare i dati di output 
    const countdown = document.getElementById ('countdown');               //countdown
    const instructions = document.getElementById ('instructions')          //instruzione utente
    const messaggio = document.getElementById ('message')                  // messaggio risultato
    const inputNumber = document.querySelectorAll ('#input-group input')   // input numeri user

    console.log('questi sono gli output', countdown, messaggio, inputNumber);






// funzione di countdown di 30 secondi

// funzione per generare numeri casuali con un min e un max number


