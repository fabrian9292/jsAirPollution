import {success, error, painthistory, history, checkandpaint} from './script.js' 
import {apiAir, link} from './api.js';
import {resultprop, resultype, resultitlecontainer, resultitle} from './dom.js'




class Obj {
  
    constructor(lat, long, gps, city){
        this.lat = lat;
        this.long = long;
        this.gps = gps;
        this.city = city;
        this.aqi = null;
        this.co = null;
        this.data = null;
        this.pm10 = null;
        this.h = null;
        this.findate();
    }

    findate(){
        if(this.gps === true){
        axios
        .get(link+`geo:${this.lat}` + ';' + `${this.long}/`, { params: { token: apiAir}})
        .then((risp) =>{this.assignvalue(risp)})

        }            
        else if(this.gps === null) {
        console.log(this);
        axios
        .get(link+`${this.city}/`, { params: { token: apiAir}})
        .then((risp) =>{
            console.log(risp);
            this.assignvalue(risp);
        });
        } 
        else {
        console.warn('Errore')
        }         
    }

    assignvalue(risp){
        /*  
           Per prendere la città dal risultato usare lodash con metodo _.words([string=''], [pattern])
        */
        console.log(risp);
        if(risp.data.status === 'ok'){
            console.log(risp.data.data.time.s);
            risp.data.data.aqi ? this.aqi = risp.data.data.aqi : 'Dati non disponibili';
            risp.data.data.iaqi.co.v ? this.co = risp.data.data.iaqi.co.v : 'Dati non disponibili';
            risp.data.data.iaqi.h.v ? this.h = risp.data.data.iaqi.h.v : 'Dati non disponibili';
            risp.data.data.iaqi.pm10.v ? this.pm10 = risp.data.data.iaqi.pm10.v : 'Dati non disponibili';
            risp.data.data.time.s ? this.data = risp.data.data.time.s : 'Dati non disponibili';
            checkandpaint(this, resultitle);               
            this.gps ? resultype.innerText = 'Hai cercato tramite GPS' : resultype.innerText = `Hai cercato tramite la città ${this.city}`;
            console.log(resultprop);
            resultprop.html(`<pre style="color: white"><b>Il valore di inquinamento è:     </b>${this.aqi}</pre><pre style="color: white"><b>Il valore di cobalto è:      </b>${this.co}</pre><pre style="color: white"><b>Il valore di co2 è:      </b>${this.h}</pre><pre style="color: white"><b>Il valore è aggiornato a:     </b>${this.data}</pre>`);
            history.unshift(this);
            painthistory();
        }  else {
            resultype.innerText = 'Errore';
        }
    }
    
   
    

}

export {Obj};
