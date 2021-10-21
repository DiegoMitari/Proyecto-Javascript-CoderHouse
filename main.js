 //1. Esta function retorna el 'value' ingresado en el <input>, es decir el valor del prestamo solicitado
function prestamo() {
    montoPrestamo = parseInt(document.getElementById("prestamo").value);
    return montoPrestamo;
}
//2. Esta function retorna el 'value' ingresado en el <select>, es decir el valor de cuantas cuotas elige.
function CantCuotas() {
    let cantidadCuotas = parseInt(document.getElementById("cantCuotas").value)
    return cantidadCuotas;
}
function tipoCuota() {
    let tipoCuota = parseFloat(document.getElementById("tipoCuota").value)
    return tipoCuota;
}
//3. Esta arrow function retorna el valor de la cuota, considerando un interes del 20% mensual.
const valorCuota = () => { 
    const interes = 1.2;
    return parseFloat(prestamo()*interes/cuota()).toFixed(2);
}

const btnCalcular = document.querySelector('.btnCalcular');
const ImprimirTabla =   document.querySelector(".table-cronograma");


btnCalcular.addEventListener('click', () => {
    calcularCronograma(prestamo(), tipoCuota(), CantCuotas());
});


function calcularCronograma(monto, interes, tiempo) {
//este bucle  sirve para limpiar la tabla cronograma
         while(ImprimirTabla.firstChild) {
         ImprimirTabla.removeChild(ImprimirTabla.firstChild);
        }

    let fecha = [];
    let fechaActual = Date.now();
    //hacemos uso de la libreria MomentJS, para el manejo de Fechas
    let mes_actual = moment(fechaActual);
    mes_actual.add(1, 'month');
    let pagoInteres = 0, pagoCapital = 0, cuota = 0;

    //Se hace uso del metodo frances para calcular la cuota
    cuota = monto*(Math.pow(1 + interes/100, tiempo)*interes/100)/(Math.pow(1 +interes/100, tiempo) - 1);
    console.log(ImprimirTabla);

    //usamos un bucle for para iterar los valores de cada mes del cronograma de pagos
    for(let i = 1; i <=  tiempo; i++) {
        pagoInteres = parseFloat(monto*(interes/100));
        pagoCapital = cuota - pagoInteres;
        monto = parseFloat(monto - pagoCapital);

        fecha[i] = mes_actual.format('DD-MM-YYYY');
        mes_actual.add(1, 'month');

        const row = document.createElement('tr');
        
        row.innerHTML =  `
                        <td>${fecha[i]}</td>
                        <td>${cuota.toFixed(2)}</td>
                        <td>${pagoCapital.toFixed(2)}</td>
                        <td>${pagoInteres.toFixed(2)}</td>
                        <td>${monto.toFixed(2)}</td>
                         `;
        ImprimirTabla.appendChild(row);
    }
}
