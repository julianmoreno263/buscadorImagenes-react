import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {
	//state que pasa el termino de busqueda desde el formulario hacia App.js
	const [busqueda, guardarBusqueda] = useState('');

	//state para guardar las imagenes de la consulta a la API
	const [imagenes, guardarImagenes] = useState([]);

	//states para el paginador
	const [paginaactual, guardarPaginaActual] = useState(1);
	const [totalpaginas, guardarTotalPaginas] = useState(1);

	//useEffect que va mirando si el state busqueda cambia
	useEffect(() => {
		const consultarAPI = async () => {
			if (busqueda === '') return;

			//variables para realizar la consulta a la API.
			const imagenesPorPagina = 30;
			const key = '19878508-30bb926f6d3a8f62d9d05d200';
			const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

			const respuesta = await fetch(url);
			const resultado = await respuesta.json();

			guardarImagenes(resultado.hits);

			//calcular el total de paginas
			const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
			guardarTotalPaginas(calcularTotalPaginas);
		};

		//llamamos a consultarAPI para que se ejecute si hay un cambio en el state busqueda
		consultarAPI();

		//establecer la pantalla hacia arriba cada vez que se muestre una pagina
		const jumbotron = document.querySelector('.jumbotron');
		jumbotron.scrollIntoView({ behavior: 'smooth' });
	}, [busqueda, paginaactual]);

	//definir la pagina anterior para que el boton de Anterior funcione
	const paginaAnterior = () => {
		const nuevaPaginaActual = paginaactual - 1;
		if (nuevaPaginaActual === 0) return;
		guardarPaginaActual(nuevaPaginaActual);
	};

	//definir la pagina siguiente
	const paginaSiguiente = () => {
		const nuevaPaginaActual = paginaactual + 1;
		if (nuevaPaginaActual > totalpaginas) return;
		guardarPaginaActual(nuevaPaginaActual);
	};

	return (
		<Fragment>
			<div className="container justify-content-center">
				<div className="jumbotron">
					<p className="lead text-center">Buscador de Imagenes</p>
					<Formulario guardarBusqueda={guardarBusqueda} />
				</div>

				<div className="row justify-content-center">
					<ListadoImagenes imagenes={imagenes} />

					{paginaactual === 1 ? null : (
						<button type="button" className="btn btn-info mr-1" onClick={paginaAnterior}>
							&laquo; Anterior
						</button>
					)}

					{paginaactual === totalpaginas ? null : (
						<button type="button" className="btn btn-info " onClick={paginaSiguiente}>
							Siguiente &raquo;
						</button>
					)}
				</div>
			</div>
		</Fragment>
	);
}

export default App;
