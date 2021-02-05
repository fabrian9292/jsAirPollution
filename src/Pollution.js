import {success, error, painthistory, history, checkandpaint, resultprop, resultype, resultitlecontainer, resultitle, link} from './script.js' 
import 'lodash';





class Pollution {
  
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
        this.findata();
        
    }

    // if se passato da findpos(), else if se passato da button, else se la localizzazione è disattivata e non c'è nessun elemento nel campo di input
    findata(){
        if(this.gps === true){
        axios
        .get(link+`geo:${this.lat}` + ';' + `${this.long}/`, { params: { token: process.env.TOKEN}})
        .then((risp) =>{
            this.assignvalue(risp)
        });
        }            
        else if (this.gps === null){
        axios
        .get(link+`${this.city}/`, { params: { token: process.env.TOKEN}})
        .then((risp) =>{
            this.assignvalue(risp)
        });
        }
        else {
            resultype.innerText = 'Non hai abilitato la localizzazione'
        }
    }

    assignvalue(risp){
        Boolean(this.city) ? true : this.city = _.words(_.get(risp,"data.data.city.name"))[1];  
        if(_.get(risp,"data.status") === 'ok'){
            _.has(risp,"data.data.aqi") ? this.aqi = _.get(risp,"data.data.aqi") : this.aqi = 'Data not available';
            _.has(risp,"data.data.iaqi.co.v") ? this.co = _.get(risp,"data.data.iaqi.co.v") : this.co = 'Data not available';
            _.has(risp,"data.data.iaqi.h.v") ? this.h = _.get(risp,"data.data.iaqi.h.v") : this.h = 'Data not available';
            _.has(risp,"data.data.iaqi.pm10.v") ? this.pm10 = _.get(risp,"data.data.iaqi.pm10.v") :this.pm10 = 'Data not available';
            _.has(risp,"data.data.time.s") ? this.data = _.get(risp,"data.data.time.s") : this.data = 'Data not available';
            checkandpaint(this, resultitle);             
            this.gps ? resultype.innerText = 'Hai cercato tramite GPS' : resultype.innerText = `Hai cercato tramite la città ${this.city}`;
            resultprop.html(`<pre style="color: white"><b>Il valore di inquinamento è:     </b>${this.aqi}</pre><pre style="color: white"><b>Il valore di cobalto è:      </b>${this.co}</pre><pre style="color: white"><b>Il valore di co2 è:      </b>${this.h}</pre><pre style="color: white"><b>Il valore è aggiornato a:     </b>${this.data}</pre>`);
            history.unshift(this);   
            painthistory();
        }  else {
            resultype.innerText = 'Errore';
        }
    }
    
   
    

}

export {Pollution};
