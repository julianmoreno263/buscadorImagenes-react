/*
En este nuevo proyecto vamos a crear un buscador de imagenes de pixabay, utilizaremos la API de pixabay que habiamos utilizado en el curso de js moderno, requerimos la key que nos proporciona la API, mi API KEY es: 19878508-30bb926f6d3a8f62d9d05d200.

Tambien vamos a utilizar bootswatch que basicamente es un sitio donde tenemos las mismas clases de bootstrap pero con diferentes colores.(v155)

CREACION DEL PROYECTO

1- Usamos npx create-react-app pixabay para crear nuestro proyecto y comenzamos a darle limpieza de los archivos.

2- el profe trabajara con bootstrap y con bbotswatch y para eso nos deja el linkde estas herramientas que pegamos en index.html de public despues de title.

3- elimino en src App.css, logo, test y el index.css. y elimino los respectivos enlaces en App.js y en index.js.

4- ahora, en App.js comenzamos a crear los divs para la app y los estilizamos con clases de bootstrap(v155)

---------------------------------------------------------------------------------------

despues del div con el titulo de buscador de imagenes creamos el primer componente que sera el formulario y vendra debajo del titulo.

1- validamos nuestro formulario, primero creamos el state para el formulario, como el state debe capturar el termino de busqueda que el usuario ingrese en el input nombramos a este state como termino, y a su funcion como guardarTermino, recordar importar useState. En principio este state sera un string vacio,pues el usuario escribira texto en el input del formulario.(v156)

2- como solo habra este state en el formulario, podemos pasarselo directamente al input del formulario para que por medio del evento onChange ejecute la funcion guardarTermino, recordar que si queremos usar la funcion del state en el evento debemos hacerlo dentro de una arrow function, y usamos el objeto del evento e para poder capturar el valor que el usuario escribe por medio de la instruccion e.target.value, el codigo queda asi:

                    onChange={e=>guardarTermino(e.target.value)}


Para probar que queda bien, abrimos components y si escribimos algo en el input del formulario se debe de almacenar en el state.

3- ahora, para cuando el usuario de submit en el formulario debemos crear una funcion que se ejecute por medio del evento onSubmit en form. Esta funcion la creamos y debe de realizar dos cosas, validar el formulario y enviar el termino de busqueda(osea el state) al compoente principal App.js.

4- para la validacion usamos el metodo trim() que evalua si hay espacios en blanco, osea si el usuario escribio mal un termino y puso espacios en blanco o si no puso nada y dio submit, para la validacion del formulario debemos de crear un state para el error.(v156):

                            	if (termino.trim() === '') {
                                    guardarError(true);
                                    return;
                                }

                                guardarError(false)

aqui esta la validacion, el state de error comienza como false, si el usuario escribe con espacios en blanco o no escribio nada y dio submit al formulario se llama a la funcion que actualiza el state de error y lo pasa a true.El return interrumpe la ejecucion del codigo.

Si no hay error, pues no se entra en el if y el state error sigue siendo false por medio de la linea  guardarError(false)

5- en caso de que haya error, creamos un componente que sera un mensaje de error, lo creamos al final del form dentro de un ternario que evalua si existe un error, y si existe muestra el error o si no pues no muestra nada(null)

--------------------------------------------------------------------------------------

CONSULTANDO LA API.

Para consultar la API debemos enviar el termino de busqueda (osea el state termino del formulario) hacia el componente principal App.js

1- vamos a App.js y creamos un state que sera el que tome el termino de busqueda que viene desde el formulario, lo nombramos busqueda y guardarBusqueda(v157)

2- este state sera un string vacio, pasamos la funcion guardarBusqueda al componente Formulario via prop, y esta funcion la usamos en Formulario.js despues de la validacion, le pasamos a esta funcion como prop el state termino, de esta forma el termino que el usuario escribe se pasa a App.js por medio de ambos states,termino y busqueda. Si vamos a components, en App nos debe aparecer el termino de busqueda que escribamos en el input en su state.

3- ahora, si ese termino cambia debemos usar el useEffect que lo que hace es reaccionar si el state cambia,en este caso el state que va a estar mirando es busqueda. Cuando la app carge por primera vez va a tratar de realizar una busqueda, para evitar esto se coloca un if dentro de useEffect que evalue si inicialmente hay un string vacio pues que no ejecute nada,esto lo conseguimos con un return.

4- creamos unas variables para guardar el numero de imagenes por pagina, nuestra API KEY y la url que viene de ejemplo en la documentacion de la API de pixabay, esto para poder realizar las consultas a la API. La url va dentro de template string para poder reemplazar la key dentro de la url por medio de interpolacion(osea ${}),la parte de la url que va despues de &q=significa la query,la consulta, aqui reemplazamos todo esto por el state busqueda,pues es el que tiene la informacion a consultar, y despues ponemos el parametro &per_page que pide cuantas imagenes por pagina queremos ver, esteparametro esta en la documentacion de la API y sirve para realizar la paginacion, si en un proyecto nos piden realizar paginacion debemos pedir que nos den este parametro o si no es muy complicado.(v157)

	const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;

5- todo este codigo que hemos echo en el useEffect lo ponemos dentro de el pero en una funcion llamada consultarAPI(), esta funcion sera async-await, y esta funcion sera la que realize las consultas a la API con las variables que creamos. Al realizar una busqueda nos dara los resultados,en los resultados hay una propiedad hits, esta es la que tiene los resultados del json. Podemos ir verificando esto con un console.log(resultado.hits)


recordar:  useEffect funciona algo parecido al ciclo de vida en los componentes de tipo clase, se usa para ejecutar código si el state cambia o para ejecutar una vez se cargue el componente.

---------------------------------------------------------------------------------------
vamos a mostrar las imagenes en la app, para esto creamos dos compoentes nuevos, ListadoImagenes.js y Imagen.js.

1- ListadoImagenes tomara un listado de imagenes como props,dentro de este componente creamos el codigo html con boostrap para mostrar ese listado de imagenes. Este componente itera con map() las imagenes que se le pasan como prop y en cada iteracion muestra el compoente Imagen,osea va mostrando cada imagen hasta el fin del ciclo.(v158)

2- para mostrar los resultados,osea las imagenes, en App.js creamos un state llamado imagenes,guardarImagenes, este state sera el que reemplazamos por el console.log que teniamos para ir viendo los resultados en consola,pues este state sera el que vaya guardando las imagenes de la consulta. Inicialmente sera un array vacio.

3- importamos en App.js ListadoImagenes y lo usamos para mostrar las imagenes en pantalla, lo colocamos dentro de un div. Ya nos debe de mostrar en pantalla lo que tenga el componente imagen, en este punto solo le pusimos un parrafo a este componente, cada imagen para ser mostrada debe de contar con un key unico,la consola nos saca ese mensaje, si vamos a compoents, en App podemos ver los resultados que nos trae la consulta y aqui vemos que estos resultados si tiene un id de cada elemento. Entonces en ListadoImagenes en la iteracion del componente Imagen le pasamos como key ese id y le pasamos la prop imagen que va iterando.

4- ahora en el componente Imagen extraemos con destructuring todas las propiedades que necesitamos mostrar en pantalla de cada imagen, como largeImageURL(que es la imagen grande),los likes,previewURL(que es la imagen pequeña), y otras mas. Esta es la informacion en si que se va a mostrar en pantalla.

------------------------------------------------------------------------------------

vamos a hacer el paginador de la app, para esto debemos crear dos state, uno que le indique a la app en que pagina se encuentra(por defecto este state lo ponemos en 1 porque siempre comienza por la pagina 1) y el otro state le indica cuantas paginas tiene el paginador(tambien comienza en 1 porque al menos debera tener una pagina que mostrar).

1- creamos el state paginaactual en App.js  y comenzara en 1, y el state totalpaginas que tambien comienza en 1.(v160)

2- empezaremos  por calcular el numero de paginas que muestra la API segun el termino de busqueda, para esto usamos la propiedad totalhits que sale en cada resultado de consulta(podemos verlo en components), como indicamos que queremos mostrar 30 fotos por pagina, podemos calcular cuantas paginas se mostraran en cada consulta con la siguiente division:

                            totalhits/30

Ahora, nos pueden salir resultados decimales, pero como queremos un numero entero, utilizamos la clase Math con su metodo ceil() que redondea por arriba el resultado:

                                Math.ceil(totalhits/30)

asi, si nos sale un resultado con decimales, se redondeara por arriba para que muestre los resultados completos.

3- entonces, en nuestro useEffect donde realizamos la consulta, creamos el codigo para el calculo del total de paginas.(v160)

recordar que como estamos usando la API pero en version gratis solo tenemos un maximo de 500 fotos por termino de busqueda.

4-agregamos los botones del paginador en App.js despues del componente listadoImagenes, tendran en su nombre una entidad llamada &laquo; estas entidades agregan las flechitas de anterior y siguiente a los botones.(v161)

5- para que cada boton haga la funcion de regresar o adelantar, le ponemos un evento onClick y definimos una funcion que realizara la correspondiente funcion de adelantar o regresar segun sea el boton.

--------------------------------------------------------------------------------------------

Si estamos en la pagina 1 no queremos que se muestre el boton de Anterior,y si ya no hay mas paginas tampoco queremos que se muestre el boton de Siguiente, por lo que veremos como ocultar esos botones segun estas condiciones(v162)

1- esto lo hacemos evaluando estas condiciones con ternarios.

2- hasta aqui ya los botones se muestran segun la condicion, pero no hacen nada porque debemos actualizar la url para que se muestren las paginas segun se de click en estos botones, para esto vamos a la url y colocamos al final:  &page=${paginaactual}

y el state paginaactual lo pasamos como dependencia del useEffect porque necesitamos que se vaya modificando cada vez que se actualize.

3- ahora, cuando se muestra otra pagina, el scroll siempre queda abajo, osea donde estan los botones, y no se ve bien porque cada vez que se muestre una pagina diferente deberia mostrase desde arriba, entonces creamos un document.querySelectro para seleccionar el div de la clase jumbotron y despues de seleccionado utilizamos el metodo scrollIntoView() y le podemos dar una animacion con  behavior: smooth, esto dentro del useEffect.(v162)

LISTO EL PROYECTO!!!!!  ESTE PROYECTO ES BUENO PARA ENTENDER LA LOGICA DEL FLUJO DE REACT, PUES ES SIMPLE Y ADEMAS SE USA BOOSTRAP Y PODEMOS VER LAS CLASES PARA HACERLO RESPONSIVE( col-12 , col-sm-6, etc, en el componente de Imagen y Formulario.)

CREAMOS EL BUILD PARA PRODUCCION Y LO SUBIMOS A NETLIFY Y A GITHUB.

*/
