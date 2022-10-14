//Service Worker
if('serviceWorker' in navigator){
    console.log('Puede usar los service worker en tu navegador');
    navigator.serviceWorker.register('./sw.js')
                            .then(res => console.log('serviceWorer cargado correctamente'))
                            .catch(err => console.log('serviceWorer no se ha podido registrar', err))
}else{
    console.log('No puede usar los service worker en tu navegador');
}