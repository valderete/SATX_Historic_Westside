// width and height set in separate .js file

// INITIALIZE MAP AND SET VIEW //
const map = L.map('map')
    .setView([29.424349, -98.491142], 12); // San Antonio LAT LONG

 // ADD MAP LAYER //
 L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/dark-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'sk.eyJ1IjoidmFsZGVyZXRlMTEiLCJhIjoiY2wxbWZsZXh2MDBvNDNscW9wYWI5NnpnaSJ9.hx1dqc-JR5V8NJM1qRbBjQ'
        })
    .addTo(map);
