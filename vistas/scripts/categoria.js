var tabla;

function init(){
	mostrarform(false);
	listar();

	$("#formulario").on("submit",function(e)
	{
		guardaryeditar(e);
	})
}

function limpiar(){
    $("#nombre").val("");
    $("#descripcion").val("");
    $("#idcategoria").val("");
}

function mostrarform(flag){
	limpiar();
	if (flag)
	{
		//vamos a implementar un DIV en html
		// y lo vamos a llamar listadoregistros
		$("#listadoregistros").hide();
		$("#formularioregistros").show();
		$("#btnGuardar").prop("disabled",false);
		$("#btnagregar").hide();
	}
	else
	{
		$("#listadoregistros").show();
		$("#formularioregistros").hide();
		$("#btnagregar").show();
	}
}

function cancelarform(){
	limpiar();
	mostrarform(false);
}

function listar(){
	tabla=$('#tbllistado').dataTable(
	{
		"aProcessing": true,//Activamos el procesamiento del datatables
		"aServerSide": true,//Paginacion y filtrado realizados por el servidor
		dom: 'Bfrtip',//Definimos los elementos del control de tabla
		buttons: [
					'copyHtml5',
					'excelHtml5',
					'csvHtml5',
					'pdf'
				],
		"ajax":		
				{
					url: '../ajax/categoria.php?op=listar',
					type : "get",
					dataType : "json",
					error: function(e){
						console.log(e.responseText);
					}
				},
		"bDestroy":true,
		"iDisplayLength":5,//paginacion //cuantos mostrar por pagina
		"order": [[0,"desc"]]//Ordenar (columna,orden)		
	}).DataTable();
}

//funcion guardar y editar
function guardaryeditar(e)
{
	e.preventDefault();//No se activara la accion predetermida del evento
	$("#btnGuardar").prop("disabled",true);
	var formData = new FormData($("#formulario")[0]);

	$.ajax({
		url: "../ajax/categoria.php?op=guardaryeditar",
		type: "POST",
		data: formData,
		contentType: false,
		processData: false,

		success: function(datos)
		{
			bootbox.alert(datos);
			mostrarform(false);
			tabla.ajax.reload();
		}
	});
	limpiar();
}

function mostrar(idcategoria)
{
	$.post("../ajax/categoria.php?op=mostrar",{idcategoria : idcategoria}, function(data, status)
	{
		data = JSON.parse(data);
		mostrarform(true);

		$("#nombre").val(data.nombre);
		$("#descripcion").val(data.descripcion);
		$("#idcategoria").val(data.idcategoria);
	})
}

function desactivar(idcategoria)
{
	bootbox.confirm("¿Está Seguro de desactivar la Categoría?",function(result)
	{
		if(result)
		{
			$.post("../ajax/categoria.php?op=desactivar", {idcategoria : idcategoria}, function(e)
			{
				bootbox.alert(e);
				tabla.ajax.reload();
			});
		
		}
	})
}

function activar(idcategoria)
{
	bootbox.confirm("¿Está Seguro de activar la Categoría?",function(result){
		if(result)
		{
			$.post("../ajax/categoria.php?op=activar", {idcategoria : idcategoria}, function(e)
			{
				bootbox.alert(e);
				tabla.ajax.reload();
			});
		
		}
	})
}
init();