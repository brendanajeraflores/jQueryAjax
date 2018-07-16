/*
	Proyecto sobre jQuery y Ajax
	Autor: Najera Flores Brenda
*/

$(document).ready(function(){

	//guarda en variable el selector del elemento con id post
	var div = $("#post");
	//variable que indica el inicio para la peticion de posts
	var inicio = 0;
	//variable que indica el limite para la peticion de posts
	var limite = 10;
	//direccion root a la que se hace la peticion
	var urlRoot = 'https://jsonplaceholder.typicode.com/';

	//Funcion para hacer la peticion de usuarios y posts
	var peticionUsuariosPosts = function(inicio,limite){
		//peticion que se hace al servidor para obtener los usuarios
		$.ajax({
			//direccion a la que se hace la peticion para obtener usuarios
			url: urlRoot+'users',//?_start='+inicio+'&_end='+limite*/,
			type: 'GET',
			dataType: 'json',

			success: function(jsonU){
				//guarda en variable el json de usuarios
				var jsonUsuarios = jsonU;
				//muestra en consola el json de usuarios
				console.log('usuarios' ,jsonUsuarios);

				//Peticion que se hace al servidor
				$.ajax({
					//direccion a la que se hace la peticion para obtener los comentarios
					url: urlRoot+'posts?_start='+inicio+'&_end='+limite,
					type: 'GET',
					dataType: 'json',

					success: function(jsonP){
						//guarda en variable el json de posts
						var jsonPosts = jsonP;
						//muestra en consola el json de post
						console.log('posts' ,jsonPosts);
						//
						$.each(jsonUsuarios, function(iu,itemu){
							//
							$.each(jsonPosts, function(ip,itemp){
								//verifica el el id del usuario y el id del post que se relaciona con el usuario sea el mismo
								if(jsonUsuarios[iu].id == jsonPosts[ip].userId){
									//agrega el div con los datos del post y del usuario
									div.append('<div class="well well-sm" id="'+jsonPosts[ip].id+'"><button id="'+jsonUsuarios[iu].id+'" type="button" class="btn btn-link">'+jsonUsuarios[iu].name+'</button><div id="'+jsonPosts[ip].id+'" class="divPost"><p>'+jsonPosts[ip].title+'</p><p>'+jsonPosts[ip].body+'</p></div></div>');
								}//Fin if que compara id
							});//Fin each con jsonPosts
						});//Fin jsonUsuarios					
					}//Fin success
				});
			}
		});
	}//Fin función peticiónUsuarioPosts


	peticionUsuariosPosts(inicio,limite);

	//Al hacer click en el botón cargará otros 10 post
	$('#btnPosts').click(function(){
		inicio = limite;
		limite += 10;
		peticionUsuariosPosts(inicio,limite);
	});

	var inicioComentarios = 0;
	var limiteComentarios = 3;

	div.on("click", '.divPost', function() {
		$('#divModal').empty();
		$('#boton').show();
		var idDivClick = $(this).attr("id");
		console.log('click', idDivClick);
		var inicioComentarios = 0;
		var limiteComentarios = 3;

		var peticionComentarios = function(inicioComentarios,limiteComentarios){
			$.ajax({
				url: urlRoot+'comments?postId='+idDivClick+'&_start='+inicioComentarios+'&_end='+limiteComentarios,
				type: 'GET',
				dataType: 'json',

				success: function(jsonC){
					//limpiar el modal
					var jsonComments = jsonC;
					console.log('comments' ,jsonComments);
					$.each(jsonComments, function(ic,itemc){
						console.log('ic',ic);
						console.log('itemc',itemc);

						console.log('postid item',itemc.postId);
						console.log('id',itemc.id);
						console.log('name',itemc.name);
						console.log('email',itemc.email);
						console.log('body',itemc.body);

						$("#header").html(itemc.postId);

						var divModal = $('#divModal');
						var formModal = $('#formModal');

						
						divModal.append('<div class="col-md-8"><div class="row"><div class="col-md-4"><strong>postId: </strong></div><div class="col-md-8" id="postId">'+itemc.postId+'</div></div><div class="row"><div class="col-md-4"><strong>id: </strong></div><div class="col-md-8" id="id">'+itemc.id+'</div></div><div class="row"><div class="col-md-4"><strong>name: </strong></div><div class="col-md-8" id="name">'+itemc.name+'</div></div><div class="row"><div class="col-md-4"><strong>email: </strong></div><div class="col-md-8" id="email">'+itemc.email+'</div></div><div class="row"><div class="col-md-4"><strong>body: </strong></div><div class="col-md-8" id="body">'+itemc.body+'</div></div></div>');
					});
					//selector para mostrar el modal
					$('#myModal').modal('show');
				}
			});
		}
		peticionComentarios(inicioComentarios,limiteComentarios);

		var boton = $('#boton');


		boton.click(function(){
			inicioComentarios = limiteComentarios;
			limiteComentarios += 2;
			peticionComentarios(inicioComentarios,limiteComentarios);
			boton.hide();
		});
	});

	
	//Modal para datos del usuario
	div.on("click", 'button', function() {
		$('#divModalUsu').empty();
		$('#formModal').empty();
		var idButtonClick = $(this).attr("id");
		console.log('click button', idButtonClick);
		var inicioComentarios = 0;
		var limiteComentarios = 3;

		var peticionUsuario = function(){
			$.ajax({
				url: urlRoot+'users?id='+idButtonClick,
				type: 'GET',
				dataType: 'json',

				success: function(jsonU){
					var jsonUsuario = jsonU;
					$("#header").html(jsonUsuario[0].id);
					var divModal = $('#divModalUsu');
					var formModal = $('#formModal');

					divModal.append('<div class="col-md-8"><div class="row"><div class="col-md-4"><strong>id: </strong></div><div class="col-md-8" id="idUsu">'+jsonUsuario[0].id+'</div></div><div class="row"><div class="col-md-4"><strong>name: </strong></div><div class="col-md-8" id="nombreUsu">'+jsonUsuario[0].name+'</div></div><div class="row"><div class="col-md-4"><strong>User Name: </strong></div><div class="col-md-8" id="username">'+jsonUsuario[0].username+'</div></div><div class="row"><div class="col-md-4"><strong>email: </strong></div><div class="col-md-8" id="emailUsu">'+jsonUsuario[0].email+'</div></div><div class="row"><div class="col-md-4"><strong>city: </strong></div><div class="col-md-8" id="adress">'+jsonUsuario[0].address.city+'</div></div><div class="row"><div class="col-md-4"><strong>phone: </strong></div><div class="col-md-8" id="phone">'+jsonUsuario[0].phone+'</div></div><div class="row"><div class="col-md-4"><strong>website: </strong></div><div class="col-md-8" id="website">'+jsonUsuario[0].website+'</div></div><div class="row"><div class="col-md-4"><strong>company: </strong></div><div class="col-md-8" id="company">'+jsonUsuario[0].company.name+'</div></div></div>');
					formModal.append('<form><legend>Agregar post</legend><div class="container"><div class="row"><div class="form-group col-md-6"><label  class="control-label" for="login">Título:</label><input class="form-control" id="login" type="text" name="login" /></div></div></div><div class="container"><div class="row"><div class ="form-group col-md-6"><label  class="control-label" for="login">Cuerpo:</label></br><textarea id="comments" class="form-control" name="comments"></textarea><p>Caracteres: <span>0</span></p><div id="error"></div></div></div></div></form>');
					//selector para mostrar el modal
					$('#myModalUsu').modal('show');
				}
			});
		}
		peticionUsuario();

		var boton = $('#botonAgregar');

		boton.click(function(){
			alert('Post agregado con exito.');
		});

		i=0;
		var formModal = $('#formModal');
		formModal.on("click", '#comments', function() {
			text = $('#comments');
			console.log('com',text);
			var error = $('#error');
        	console.log('error', error);

        	//Funcion para contar caracteres 
        	text.on('keyup', function(evento){
        			var value = $(this).val().trim().length;
					var span = $('span');
					span.text(value);

					textoAreaDividido = $('#comments').val().split(" ");
				numeroPalabras = textoAreaDividido.length;

				console.log('palabras ', numeroPalabras);

				if(numeroPalabras > 2){
					error.append('<p>Estas escribiendo mas de 2 palabras</p>')
				}

        		if(value > 5){
        			error.append('<p><strong>Error, estas ingresando mas de 5 caracteres</strong></p>')
        		}

    		}).keyup();

        	/*text.keyup(function(){
     			var palabras = $(this).val().split(/\b[\s,\.\-:;]*//*).lenght;
     			if(palabras > 2){
     				error.append('<p>Escribiste mas de dos palabras</p>')
     			}
     		});*/
       		/*var teclaPulsada = evento.which;
       	 	console.log('tecla ', teclaPulsada);
        	if(teclaPulsada == ){
        		span.text(i -= 1);
        	}*/
    	});
	});



});
