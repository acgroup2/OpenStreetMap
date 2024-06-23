/**
 * Load required script
 * @type {HTMLScriptElement}


    //Load scripts
    let leafletScript = document.createElement('script');
    leafletScript.src = './leaflet.js'; //Or load from https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.js
    document.head.appendChild(leafletScript);

    //Load style
    leafletStyle = document.createElement('link');
    leafletStyle.href = ".././css/leaflet.css";//Or load from https://unpkg.com/leaflet@1.7.1/dist/leaflet.css
    leafletStyle.type  = 'text/css';
    leafletStyle.rel = 'stylesheet';
    document.head.appendChild(leafletStyle);

*/

(function ($) {

    const tileLink = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let defaultParams = {
        center: {lat: 35.31, lng: 51.67},
        zoom: 6
    }
    $.fn.osMap = function () {

        //Get id
        let id = $(this).attr('id');
        if( typeof id === 'undefined' || id === false ){
            console.log('Please set id.');

            return false;
        }

        //Get center
        let center = $(this).attr('center');
        if( typeof center === 'undefined' || center === false )
            center = defaultParams.center;
        else{
            let c = center.split(',');
            center = {lat: c[0], lng: c[1]}
        }

        //Get zoom
        let zoom = $(this).attr('zoom');
        if( typeof zoom === 'undefined' || zoom === false ) zoom = defaultParams.zoom;

        if( typeof L === 'undefined' ){
            console.log('leaflet.js not found.');

            return false;
        }

        let map = new L.map(id, {center: center, zoom: zoom});

        let layer = new L.TileLayer(tileLink);
        map.addLayer(layer);

        //Get position
        let positionID = $(this).attr('positionID');
        if( typeof positionID !== 'undefined' && positionID !== false){
            let marker = null;

            map.on('click', (event)=> {

                if(marker !== null){
                    map.removeLayer(marker);
                }

                marker = L.marker([event.latlng.lat , event.latlng.lng]).addTo(map);

                $('#'+positionID).val(event.latlng.lat + ',' + event.latlng.lng);
            });
        }
    }
}(jQuery));