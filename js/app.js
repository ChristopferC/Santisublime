const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos');
let articulosCarrito = [];

// Crear eventos
cargarEventos();
function cargarEventos() {
	listaProductos.addEventListener('click', cargarEvento);

	// Eliminar producto del carrito
	contenedorCarrito.addEventListener('click', eliminarProducto);

	// Vaciar productos del carrito
	vaciarCarritoBtn.addEventListener('click', () => {
		articulosCarrito = [];
		limpiarHTML();
	});
}

// Agregar Producto
function cargarEvento(e) {
	e.preventDefault();
	if (e.target.classList.contains('agregar-carrito')) {
		const productoSeleccionado = e.target.parentElement.parentElement;
		leerProducto(productoSeleccionado);
	}
}

// Eliminar producto del carrito
function eliminarProducto(e) {
	if (e.target.classList.contains('borrar-producto')) {
		const productoID = e.target.getAttribute('data-id');

		// Eliminar del array del carrito
		articulosCarrito = articulosCarrito.filter((producto) => producto.id !== productoID);
		carritoHTML();
	}
}
// Leer producto seleccionado
function leerProducto(producto) {
	const infoProducto = {
		img: producto.querySelector('img').src,
		titulo: producto.querySelector('h4').textContent,
		precio: producto.querySelector('.precio span').textContent,
		id: producto.querySelector('a').getAttribute('data-id'),
		cantidad: 1
	};
	console.log(infoProducto);

	const existe = articulosCarrito.some((producto) => producto.id === infoProducto.id);
	console.log(existe);

	if (existe) {
		// actualizar cantidad
		const productos = articulosCarrito.map((producto) => {
			// Con map se crea nuevo array
			if (producto.id === infoProducto.id) {
				producto.cantidad++;
				return producto;
			} else {
				return producto;
			}
		});
		articulosCarrito = [ ...productos ];
	} else {
		// Mostrar el mismo
		articulosCarrito = [ ...articulosCarrito, infoProducto ];
	}
	carritoHTML();
}

// Mostrar en conetenedor HTML
function carritoHTML() {
	// Limpiar HTML
	limpiarHTML();

	// Recorrer array
	articulosCarrito.forEach((producto) => {
		const row = document.createElement('tr');
		row.innerHTML = `
		<td>
			<img src="${producto.img}" width="100">
		</td>
		<td> ${producto.titulo} </td>
		<td> ${producto.precio} </td>
		<td> ${producto.cantidad} </td>
		<td>
			<a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
		</td>
		`;

		// Mostrar en HTML
		contenedorCarrito.appendChild(row);
	});
}

// Limpiar HTML
function limpiarHTML() {
	while (contenedorCarrito.firstChild) {
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}
}