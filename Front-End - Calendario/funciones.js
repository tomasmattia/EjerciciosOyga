hoy = new Date();
esteMes = hoy.getMonth();
esteAnio = hoy.getFullYear();
meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
var feriados;
mesAnio = document.getElementById("mesAnio");
var index = 0;

// recibe el JSON con los feriados
const getJSON = function(url) {
    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest()
  
      xhr.open('GET', url, true)
      xhr.responseType = 'json'
  
      xhr.onload = function() {
        const { status } = xhr
  
        if (status === 200) {
          resolve(xhr.response)
        } else {
          reject(xhr.status)
        }
      }
  
      xhr.send()
    })
  }
  
// una vez recibido el json se renderiza el calendario
  getJSON('http://nolaborables.com.ar/api/v2/feriados/2019').then(feriados => {
    mostrarCalendario(esteMes, esteAnio, feriados);
  })

// adelanta un mes, y el año de ser necesario
function next() {
    esteAnio = (esteMes === 11) ? esteAnio + 1 : esteAnio;
    esteMes = (esteMes + 1) % 12;
    getJSON(`http://nolaborables.com.ar/api/v2/feriados/${esteAnio}`).then(feriados => {
    mostrarCalendario(esteMes, esteAnio, feriados);})
}

// retrocede un mes, y el año de ser necesario
function previous() {
    esteAnio = (esteMes === 0) ? esteAnio - 1 : esteAnio;
    esteMes = (esteMes === 0) ? 11 : esteMes - 1;
    getJSON(`http://nolaborables.com.ar/api/v2/feriados/${esteAnio}`).then(feriados => {
    mostrarCalendario(esteMes, esteAnio, feriados);})
}


function mostrarCalendario(mes, anio, feriados) {
    // primer dia del mes
    let primerDia = (new Date(anio, mes)).getDay();
    // elemento que se renderiza una vez que se completa el mes
    cuerpoCalendario = document.getElementById("calendar"); 
    // se elimina todo el contenido del elemento
    cuerpoCalendario.innerHTML = "";
    
    mesAnio.innerHTML = meses[mes] + "<br>" + anio;
    let fecha = 1;
    // semanas que puede tener el mes
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");
        // dias que puede tener la semana
        for (let j = 0; j < 7; j++) {
            // mientras no sea el primer dia del mes se generan elementos vacios y se agregan
            if (i === 0 && j < primerDia) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            // si se excede del ultimo dia del mes termina la ejecucion
            else if (fecha > diasMes(mes, anio)) {
                break;
            }
            // se generan los elementos que contienen los dias y se agregan
            else {
                cell = document.createElement("td");
                cellText = document.createTextNode(fecha);
                // si es el dia de hoy se agrega la clase active
                if (fecha === hoy.getDate() && anio === hoy.getFullYear() && mes === hoy.getMonth()) {
                    cell.classList.add("active");
                }
                // se comprueban los feriados
                for (let i in feriados)
                {
                    // si la fecha de feriado coincide se agrega la clase feriado
                    if(fecha == feriados[i].dia && mes + 1 == feriados[i].mes)
                    {
                        cell.classList.add("feriado");
                    }
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
                fecha++;
            }    
        }
        // se agregan todos los elementos al cuerpo del calendario y se renderiza
        cuerpoCalendario.appendChild(row); 
    }

    
}


// determina cuantos dias tiene un mes 
function diasMes(iMes, iAnio) {
    return 32 - new Date(iAnio, iMes, 32).getDate();
}


