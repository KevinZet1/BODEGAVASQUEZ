const $hours = document.getElementById('hours');
const $minutes = document.getElementById('minutes');    
const $seconds = document.getElementById('seconds');

// FECHA DE EVENTO 

const countdownDate = new Date('05 03, 2025 10:00:00').getTime();

let interval = setInterval(function(){
    // OBTENER FECHA ACTUAL
    let now = new Date().getTime();

    // CALCULAR LA DIFERENCIA ENTRE LA FECHA DE EVENTO Y LA FECHA ACTUAL
    let distance = countdownDate - now;

    // DETENER SI EL TIEMPO TERMINÓ
    if (distance <= 0) {
        clearInterval(interval);
        $hours.innerHTML = '00';
        $minutes.innerHTML = '00';
        $seconds.innerHTML = '00';
        return;
    }

    // CALCULAR HORAS, MINUTOS Y SEGUNDOS
    let hours = Math.floor(distance  / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)); 
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // ESCRIBIMOS LOS RESULTADOS EN EL HTML
    $hours.innerHTML = ('0' + hours).slice(-2);
    $minutes.innerHTML = ('0' + minutes).slice(-2); 
    $seconds.innerHTML = ('0' + seconds).slice(-2);

},1000);