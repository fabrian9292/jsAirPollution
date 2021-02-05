import "./style.css";
import {Pollution} from './Pollution.js';


export const input = document.querySelector('input');
export const button = document.querySelector('button');
export const resultprop = $('.result > .result-prop');
export const resultitle = document.querySelector('.result-title');
export const resultype = document.querySelector('h3');
export const resultitlecontainer = document.querySelector('.historyresult')
export const resultprophistory = $('.historyresult-box > .result-prop');
export const resultitlehistory = $('.historyresult-box > .result-title');
export const link = 'http://api.waqi.info/feed/';

let options = {
    enablehighaccuracy: true
}

//  Array delle ricerche effettuate
let history = [];
 
function success (pos) {
    let lat, long, gps, city;
    lat = pos.coords.latitude;
    long = pos.coords.longitude;
    gps = true;
    city = false;
    return new Pollution(lat, long, gps, city)
   

}

function error (err){
    let lat = null;
    let long = null;
    let city = null;
    let gps = false;
    return new Pollution(lat, long, gps, city)
}

// Verifica lo stato della localizzazione
function findpos(){
    let pos = navigator.geolocation.getCurrentPosition(success, error, options);
}

// Legge il campo di input
button.addEventListener('click', (e) =>{
        e.preventDefault();
        if(input.value){
            let lat = null;
            let long = null;
            let gps = null;
            let city = input.value;
            return new Pollution(lat, long, gps, city)
        }
        
}) 

// Scrive le ultime 5 ricerche effettuate all'interno del DOM
function painthistory(){
        history.forEach((item, i) =>{
            if(i < resultitlecontainer.childElementCount){
                checkandpaint(item, resultitlehistory[i]);
                resultprophistory[i].innerHTML = `<h3>${history[i].aqi}</h3><h6>${history[i].data}</h6>`;
            }
    })
}

// Scrive l'ultima ricerca effettuata all'interno del DOM
function checkandpaint(pollution, title){
        pollution.city = pollution.city.toUpperCase()
        title.innerHTML = `<h2 style="margin: auto">${pollution.city}</h3>`;         
        
        if(pollution.aqi > 60){
                title.style.backgroundColor = 'red'; 
        } else if(pollution.aqi < 60 && pollution.aqi > 35){
                title.style.backgroundColor = 'yellow';
        } else {                
                title.style.backgroundColor = 'green';
        }
   
}

// ----------------------------------------------------------------------

findpos();


export {success, error, findpos, painthistory, history, checkandpaint}