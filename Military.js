
const MilitarySVG = d3.select('#map')
    .append("svg")
    .attr("width", width*1.2)
    .attr("height", height*1.5)
    //.attr("transform",`translate(${margin.left-50},${margin.top})`)

// INITIALIZE MAP AND SET VIEW //
const Military = L.map('map',
        { zoomControl: false // remove zoom controls
        })
    .setView([29.45, -98.37], 10.5) // San Antonio LAT LONG
    .setMaxZoom([29.49, -98.37]) // diable zoom
   ;

 // ADD MAP LAYER //
 L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        //maxZoom: 20,
        id: 'mapbox/dark-v8',
        tileSize: 512,
        zoomOffset: -1,
        opacity: 0.75,
        accessToken: 'sk.eyJ1IjoidmFsZGVyZXRlMTEiLCJhIjoiY2wxbWZsZXh2MDBvNDNscW9wYWI5NnpnaSJ9.hx1dqc-JR5V8NJM1qRbBjQ'
        })
    .addTo(Military);

// SET polygon lat/long coordinates
const latlngs = [
    [29.383333, -98.580833], // Kelly AFB
    [29.388, -98.6207], // Lackland AFB
    [29.529444, -98.278889], // Randolph AFB
    [29.457386, -98.43956], // Fort Sam Houston
    [29.6259934,-98.6084726], // Cam Bullis
    ];

// DRAW POINTS
KellyAFB = L.circle([29.383333, -98.580833], {
    color: '#cae165',
    fillColor: '#cae165',
    fillOpacity: 0.3,
    radius:1500,
    className: 'military_base'
        })
    .bindTooltip('Kelly Air Force Base', {
        permanent: true,
        })
    .addTo(Military);

LacklandAFB = L.circle([29.388, -98.6207], {
    color: '#cae165',
    fillColor: '#cae165',
    fillOpacity: 0.3,
    radius:1500
    })
    .bindTooltip('Lackland Air Force Base', {
        permanent: true,
        direction: 'left'
        })
    .addTo(Military);

RandolphAFB = L.circle([29.529444, -98.278889], {
    color: '#cae165',
    fillColor: '#cae165',
    fillOpacity: 0.3,
    radius:1500
    })
    .bindTooltip('Randolph Air Force Base', {
        permanent: true,
        direction: 'bottom'
        })
    .addTo(Military);

FortSam = L.circle([29.457386, -98.43956], {
    color: '#cae165',
    fillColor: '#cae165',
    fillOpacity: 0.3,
    radius:1500
    })
    .bindTooltip('Fort Sam Houston', {
        permanent: true,
        direction: 'left'
        })
    .addTo(Military);

CampBullis = L.circle([29.6259934,-98.6084726], {
    color: '#cae165',
    fillColor: '#cae165',
    fillOpacity: 0.3,
    radius:1500
    })
    .bindTooltip('Camp Bullis', {
        permanent: true,
        direction: 'bottom'
        })
    .addTo(Military);