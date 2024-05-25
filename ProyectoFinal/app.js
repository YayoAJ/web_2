//creación de la tabla dividendolas en filas y columnas
function parseCSV(csvData){
    const rows =csvData.split('\n');
    const tableBody = document.querySelector('#csvTable tBody');
    rows.forEach( row =>{
        const colums = row.split(',');
        const tr = document.createElement('tr');
        colums.forEach(column=>{
            const td = document.createElement('td');
            td.addEventListener('click', () => eliminarFila(tr)); // evento que cuando se hace click en una fila llama a la función elimarFila()
            td.textContent=column;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
};

//modulo de lector de csv
function readCSV(file){
    const reader = new FileReader();
    reader.onload= function(e){
        const csvData = e.target.result;
        parseCSV(csvData);
    }
    reader.readAsText(file);
};

//permite al usuario subir un archivo CSV y llama a readCSV para leerlo
document.querySelector('input[type="file"]').addEventListener('change',function(e){
    const file = e.target.files[0];
    readCSV(file);
});

//modulo para agregar datos al CSV
function agregarDatos() {
    //obtención de los datos del formulario con los id´s
    const Nombre = document.getElementById('nombre').value;
    const Correo = document.getElementById('correo').value;
    const Edad = document.getElementById('edad').value;
    const Carrera = document.getElementById('carrera').value;
    const Num_cuenta = document.getElementById('no_cuenta').value;
    const Semestre = document.getElementById('semestre').value;

    //verificacion de que todos los campos no esten vacíos
    if (Nombre && Correo && Edad && Carrera && Num_cuenta && Semestre) {
        //selecciona la tabla con el id y crea una nueva fila
        const tableBody = document.querySelector('#csvTable tBody');
        const tr = document.createElement('tr');
        
        //añade los datos obtenidos del formulario a la fila
        [Nombre, Correo, Edad, Carrera, Num_cuenta, Semestre].forEach(text => {
            const td = document.createElement('td');
            td.textContent = text;
            tr.appendChild(td);
        });

        //añade la fila a la tabla
        tableBody.appendChild(tr);
        
        //actualiza el csv
        updateCSV();

    } else {
        //mensaje cuando un campo o todos esten vacíos
        alert('Llene los campos');
    }
}

//modulo para borrar datos
function eliminarFila(row) {
    row.remove();
    alert("Fila eliminada con exito");
    updateCSV();
}

function descargarCSV() {
    //selecciona la tabla y obten los datos de la tabla
    const table = document.getElementById('csvTable');
    const rows = table.querySelectorAll('tbody tr');
        
    //crea una cadena para almacenar el contenido CSV
    let csvContent = 'Nombre,Correo,Edad,Carrera,Núm. de cuenta,Institución\n';

    //recorre todas las filas de la tabla
    rows.forEach(row => {
        //de cada fila, seleciona todas las celdas
        const cells = row.querySelectorAll('td');
        //agrega la cadena que se formo a cvsContenido y un salto de linea
        const rowData = Array.from(cells).map(cell => cell.textContent).join(',');     
        csvContent += rowData + '\n';
    });

    //crea un objeto Blob que contenido los datos del CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    //crea un enlace
    const link = document.createElement('a');
    //establece la URL el enlace que apunta al objeto blob creado
    link.href = window.URL.createObjectURL(blob);
    //atributo para nombrar el archivo descargado
    link.setAttribute('download', 'NuevoCSV.csv');
    link.style.display = 'none';
    //agrega el enlace al cuerpo del documento
    document.body.appendChild(link);
    //simula un clic en el enlace para iniciar la descarga
    link.click();
    //elimina el enlace temporal creado para descargar el csv
    document.body.removeChild(link);
}