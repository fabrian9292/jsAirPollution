import {button, input, main, resultitlecontainer, resultitle, resultprop, resultprophistory, resultitlehistory} from './dom.js';
import {Obj} from './bigObj.js';


let options = {
    enablehighaccuracy: true
}

let history = [];
 // -----------------------------------------------------------------
function success (pos) {
    let lat, long, gps, city;
    lat = pos.coords.latitude;
    long = pos.coords.longitude;
    gps = true;
    city = false;
    console.log('Qui');
    return new Obj(lat, long, gps, city)
   

}
 // -----------------------------------------------------------------
function error (err){
    let lat = null;
    let long = null;
    let city = null;
    let gps = false;
    return new Obj(lat, long, gps, city)
}
// -----------------------------------------------------------------------

function findpos(){
    let pos = navigator.geolocation.getCurrentPosition(success, error, options);
}
// ----------------------------------------------------------------

button.addEventListener('click', (e) =>{
        e.preventDefault();
        setDate();
        
}) 

function setDate(){
    if(input.value){
        console.log(input.value);
        console.log('Dentro');
        let lat = null;
        let long = null;
        let gps = null;
        let city = input.value;
        return new Obj(lat, long, gps, city)
    }
}

function elemHistory(){
    console.log(history);
}

function painthistory(){
        history.forEach((item, i) =>{
            checkandpaint(item, resultitlehistory[i]);
            resultprophistory[i].innerHTML = `<h3>${history[i].aqi}</h3><h6>${history[i].data}</h6>`;
    })
}

        
function checkandpaint(obj, title){
        if(!title){
            return;
        };
        
        obj.city = obj.city.toUpperCase()
        if(obj.city === false || obj.city === null){
            title.innerHTML = '<h2 style="margin: auto">GPS</h2>';
            console.log('GPS');
        } else {
            title.innerHTML = `<h2 style="margin: auto">${obj.city}</h3>`;
            console.log('Città')
        }
            
        
        if(obj.aqi > 60){
                title.style.backgroundColor = 'red'; 
        } else if(obj.aqi < 60 && obj.aqi > 30){
                title.style.backgroundColor = 'yellow';
        } else {                
                title.style.backgroundColor = 'green';
        }
   
    }

// ----------------------------------------------------------------------

export {success, error, findpos, painthistory, history, checkandpaint}