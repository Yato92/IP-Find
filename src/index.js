import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {addOffset, validateIp, addTileLayer, getAddress} from './helpers';
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');
const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');



btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);


const mapArea = document.querySelector('.map');

const map = L.map(mapArea).setView([51.505, -0.09], 13);

const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
});

let currentMarker = L.marker([51.505, -0.09], {icon: markerIcon}).addTo(map);

addTileLayer(map);

function getData() {

    if(validateIp(ipInput.value)){
        getAddress(ipInput.value).then(setInfo);
    }
}


function handleKey (e){
    if(e.key === 'Enter'){
        getData();
    }
}

function setInfo ({ip_address, location: {country, region, latitude, longitude}, asn: {name}, timezone: {abbreviation}}) {
    ipInfo.innerText = ip_address;
    timezoneInfo.innerText = abbreviation;
    ispInfo.innerText = name;
    locationInfo.innerText = country + ' ' + region;
    map.setView([latitude, longitude], 13);
    if (currentMarker) {
    currentMarker.remove();
    }
    currentMarker = L.marker([latitude, longitude], {icon: markerIcon}).addTo(map); 

    if(matchMedia("max-width: 1023px").matches){
        addOffset(map);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getAddress('46.138.245.152').then(setInfo);
})

