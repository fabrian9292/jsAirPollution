La prima funzione chiamata è findpos();
Questa verifica se la localizzazione è attiva, in ogni caso creerà un oggetto di tipo Pollution, in base allo stato localizzazione con alcune proprietà o con altre;
Parallelemente si può operare con il button che prenderà leggerà il valore input.value e instanzierà un nuovo oggetto di tipo Pollution
All'instanziamento viene subito lanciata la funzione findata(), questà ha 3 scenari possibili se la localizzazione è attiva restituirà le proprietà indicate da findpos(), se invece ad averlo instanziato è il button con il relativo campo di input avrà le proprietà indicate da quest'ultimo, l'ultimo scenario è quello che avviene in fase iniziale se un utente non richiesto dati nell'input e non ha abilitato la localizzazione.
I primi due scenari invocano il metodo assignvalue(), questo setta semplicemente i risultati ottenuti dei campi predisposti alle proprietà dell'oggetto, il metodo successivo che viene invocato è checkandpaint(), questo setta i valori della proprietà nei vari elementi del DOM
Dopo che il metodo checkandpaint() sarà terminato, creo un array che faccio scorrere aggiungendo ogni volta un elemento all'inizio e lo scrivo nel DOM attraverso painthistory()

Per la variabile d'ambiente usare TOKEN
