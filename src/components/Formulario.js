import React, { useState } from 'react';
import Error from './Error';

const Formulario = ({ guardarBusqueda }) => {
	//state del formulario
	const [termino, guardarTermino] = useState('');
	//state para el error
	const [error, guardarError] = useState(false);

	//funcion que se encarga de buscar la imagen
	const buscarImagenes = (e) => {
		e.preventDefault();

		//validacion del formulario
		if (termino.trim() === '') {
			guardarError(true);
			return;
		}

		guardarError(false);

		//enviar termino de busqueda(state) al componente principal
		guardarBusqueda(termino);
	};
	return (
		<form onSubmit={buscarImagenes}>
			<div className="row">
				<div className="form-group col-md-8">
					<input
						type="text"
						className="form-control form-control-lg"
						placeholder="Busca una imagen, ejemplo:futbol o café"
						onChange={(e) => guardarTermino(e.target.value)}
					/>
				</div>

				<div className="form-group col-md-4">
					<input type="submit" className="btn btn-lg btn-danger btn-block" value="Buscar" />
				</div>
			</div>
			{error ? <Error mensaje="Agrega un término de busqueda" /> : null}
		</form>
	);
};

export default Formulario;
