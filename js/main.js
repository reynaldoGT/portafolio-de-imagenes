const grid = new Muuri('.grid', {
    layout: {
        rounding: false,
    }
});

window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');
    agregarEventos();
    barraBusqueda();
    overLayListener();
    cerrarImagen();
    cerrarConOverLay();
})

// agregamos los enlances para filtrar por categoria
agregarEventos = () => {
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach((elemento) => {
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault();

            enlaces.forEach((enlace) => enlace.classList.remove('activo'));

            evento.target.classList.add('activo');

            // haciendo el filtrado para poder mostrarlo
            const categoria = evento.target.innerHTML.toLowerCase();
            //usando el metodo grid.filter de la libreria Muuri
            categoria === 'todos' ? grid.filter('[data-categoria]') :
                grid.filter(`[data-categoria="${categoria}"]`);
        });

    });
}

// =============================
// Agregamos los listeners para la barra de busqueda
// =============================

const barraBusqueda = () => {
    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
        const busqueda = evento.target.value;
        // es mostrar solamente los elemtnso que cumplan con estas caracteristicas, lo cual pe pasamos una funcion que tiene le parametro de item, lo que va hacer lo que por cada una de las imagen, el elemento de la imagen y obtener el dataset de la imagen y si obtiene el elemento de la busqueda lo va mostrar
        grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda))
    })
}

/* ------------------------------ */
/* Agreamos listeners a las imagenes */
/* ------------------------------ */

overLayListener = () => {
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((elemento) => {
        
        elemento.addEventListener('click', () => {
            // obtener el elemento padre de este elemento
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentElement.parentNode.dataset.descripcion;
            
            // añadiendo la clase de activo
            overlay.classList.add('activo');
            // cambiando los elementos de src y descripcion por el elemento seleccionado
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;

        });
    });

    /* ------------------------------ */
    /* Evento para poder cerrar con el boton de cerrar */
    /* ------------------------------ */

}
const cerrarImagen = () => {
    const overlay = document.getElementById('overlay');

    const boton = document.querySelector('#btn-cerrar-popup');
    boton.addEventListener('click', () => {
        overlay.classList.remove('activo');
    });
}

/* ------------------------------ */
/* Evento para el overlay */
/* ------------------------------ */

cerrarConOverLay = () => {
    const overlay = document.getElementById('overlay');
    overlay.addEventListener('click', (evento) => {

        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';

    })
}