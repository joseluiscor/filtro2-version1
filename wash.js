const form = document.getElementById('myForm');
const searchInput = document.getElementById('searchInput');
const tableBody = document.getElementById('dataTable');
const tableRows = Array.from(tableBody.getElementsByTagName('tr'));
let rowId = 1;

const selectService = document.getElementById('selectServices');
const selectOptions = document.getElementById('selectOptions');
const dataFidelizacion = document.getElementById('dataFidelizacion');

const valueCars = [
    {   
        title: 'Tunel de lavado',
        value: '50.000'
    },
    {   
        title: 'Lavado a presion',
        value: '30.000'
    },
];
let dataUsers = [];
let dataP = [];

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const apellidos = document.getElementById('apellidos').value;
    const tel = document.getElementById('tel').value;
    const email = document.getElementById('email').value;
    const placa = document.getElementById('placa').value;
    const tipo = document.getElementById('tipo').value;

    const newRow = document.createElement('tr');
    const idCell = document.createElement('td');
    const nameCell = document.createElement('td');
    const apellidosCell = document.createElement('td');
    const telCell = document.createElement('td');
    const emailCell = document.createElement('td');
    const placaCell = document.createElement('td');
    const tipoCell = document.createElement('td');
    const optionsCell = document.createElement('td');

    idCell.textContent = id;
    nameCell.textContent = name;
    apellidosCell.textContent = apellidos;
    telCell.textContent = tel;
    emailCell.textContent = email;
    placaCell.textContent = placa;
    tipoCell.textContent = tipo;

    
    dataUsers.push({
        id: idCell.textContent,
        name: nameCell.textContent,
        apellidos: apellidosCell.textContent,
        tel: telCell.textContent,
        puntos: 0,
    })

    //console.log(dataUsers);
    //puntos(dataUsers);

    const editIcon = document.createElement('i');
    editIcon.classList.add('fas', 'fa-edit', 'edit-icon');
    editIcon.addEventListener('click', function() {
        // Lógica para editar la fila
        // Aquí puedes abrir un modal, cargar los datos en el formulario, etc.
    });

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash', 'delete-icon');
    deleteIcon.addEventListener('click', function() {
        const rowId = newRow.getAttribute('data-row-id');
        const row = document.querySelector(`tr[data-row-id="${rowId}"]`);

        const confirmation = confirm('¿Estás seguro de que deseas eliminar esta fila?');
        if (confirmation) {
            row.remove(); // Eliminar la fila del DOM
        }
    });

    optionsCell.appendChild(editIcon);
    optionsCell.appendChild(deleteIcon);

    newRow.appendChild(idCell);
    newRow.appendChild(nameCell);
    newRow.appendChild(apellidosCell);
    newRow.appendChild(telCell);
    newRow.appendChild(emailCell);
    newRow.appendChild(placaCell);
    newRow.appendChild(tipoCell);
    newRow.appendChild(optionsCell);

    tableBody.appendChild(newRow);
    newRow.setAttribute('data-row-id', rowId); // Asignar el ID único a la fila
    rowId++; // Incrementar el contador de IDs únicos

    // Agrega una opción al select
    const newOption = document.createElement('option');
    newOption.textContent = name +' '+ apellidos;
    newOption.value = name +' '+ apellidos;
    selectOptions.appendChild(newOption);

    form.reset();
});

searchInput.addEventListener('input', function() {
    const searchText = searchInput.value.toLowerCase();

    tableRows.forEach(function(row) {
        const idr = row.cells[0].textContent.toLowerCase();
        const namer = row.cells[1].textContent.toLowerCase();
        const apellidosr = row.cells[2].textContent.toLowerCase();
        const telr = row.cells[3].textContent.toLowerCase();
        const emailr = row.cells[4].textContent.toLowerCase();
        const placar = row.cells[5].textContent.toLowerCase();
        const tipor = row.cells[6].textContent.toLowerCase();

    if (idr.includes(searchText) || namer.includes(searchText) || apellidosr.includes(searchText) || telr.includes(searchText) || emailr.includes(searchText) ||
        placar.includes(searchText) || tipor.includes(searchText)) {
        row.style.display = '';
    } else {
        row.style.display = 'none';
    }
    });
});


//servicios
const formService = document.getElementById('serviceForm');
const cardContainer = document.getElementById('cardContainer');
let cardIdCounter = 1;

formService.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const tematica = document.getElementById('tematica').value;
    const servicio = document.getElementById('servicio').value;
    const puntos = document.getElementById('puntos').value;

    valueCars.push({title: title, value: servicio});

    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.src = './auto.jpeg'; // Actualiza con la ruta de tu imagen
    card.appendChild(image);

    const content = document.createElement('div');
    const titleHeading = document.createElement('h2');
    titleHeading.textContent = title;

    const tematicaData = document.createElement('p');
    tematicaData.textContent = 'Descripcion: ' + tematica;

    const serviceData = document.createElement('p');
    serviceData.textContent = 'Valor servicio: $ ' + servicio;

    const puntosData = document.createElement('p');
    puntosData.textContent = 'Puntos: ' + puntos;

    content.appendChild(titleHeading);
    content.appendChild(tematicaData);
    content.appendChild(serviceData);
    content.appendChild(puntosData);

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa', 'fa-trash', 'delete-icon');
    deleteIcon.addEventListener('click', function() {
        card.remove();
    });

    card.appendChild(content);
    card.appendChild(deleteIcon);

    cardContainer.appendChild(card);
    cardIdCounter++;

    // Agrega una opción al select
    const newOption = document.createElement('option');
    newOption.textContent = title;
    newOption.value = title;
    selectService.appendChild(newOption);

    formService.reset();
});

function generateTableHTML(data) {
    let tableHTML = "<table>";
    tableHTML += "<tr><th>Nombre</th><th>Edad</th><th>Email</th></tr>";
  
    data.forEach(item => {
      tableHTML += `<tr><td>${item.nombre}</td><td>${item.edad}</td><td>${item.email}</td></tr>`;
    });
  
    tableHTML += "</table>";
    return tableHTML;
 }

function compra(){
    var client = selectOptions.value;
    var service = selectService.value;
    //console.log(client,service);
    //console.log(valueCars);
    const nomb = client.split(' ')[0];
    const resultado = valueCars.find(dato => dato.title === service);
    //console.log(resultado);
    let dataclient = dataUsers.find(dato => dato.name === nomb)
    console.log(dataclient);
    if (dataclient) {
        // Modificar el dato en el objeto encontrado
        dataclient.puntos = dataclient.puntos + resultado.value/1;
        console.log('Objeto modificado:', dataclient);
        console.log('Arreglo actualizado:', dataUsers);
        dataUsers = dataUsers.map(objeto => objeto.id === dataclient.id ? dataclient : dataUsers);
        //console.log(dataUsers);
        puntos(dataP);
        puntos(dataUsers);
    }
    
    Swal.fire({
        title: 'Datos de compra',
        html: "Nombre: " + client + "<br> servicio: " + service + "<br> Valor: " + resultado.value,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar compra',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Aprobada!',
            'La compra se ha realizado exitosamente.',
            'success'
          )
        }
      })
}

function puntos(dataUsers){

    dataUsers.forEach(obj => {

        const row = document.createElement('tr');
        const idFid = document.createElement('td');
        const nameFid = document.createElement('td');
        const apellidosFid = document.createElement('td');
        const telFid = document.createElement('td');
        const puntosFid = document.createElement('td');
    
        idFid.textContent = obj.id;
        nameFid.textContent = obj.name;
        apellidosFid.textContent = obj.apellidos;
        telFid.textContent = obj.tel;
        puntosFid.textContent = obj.puntos;
      
        row.appendChild(idFid);
        row.appendChild(nameFid);
        row.appendChild(apellidosFid);
        row.appendChild(telFid);
        row.appendChild(puntosFid);
    
        dataFidelizacion.appendChild(row);
    });
}
