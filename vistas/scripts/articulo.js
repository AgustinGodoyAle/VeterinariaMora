var tabla;

function init(){
	mostrarform(false);
	listar();

	$("#formulario").on("submit",function(e)
	{
		guardaryeditar(e);
	})

	//cargamos los items al select categoria
	$.post("../ajax/articulo.php?op=selectCategoria", function(r){
			$("#idcategoria").html(r);
			$('#idcategoria').selectpicker('refresh');
	});
	$("#imagenmuestra").hide();
}

function limpiar()
{
	$("#codigo").val("");
    $("#nombre").val("");
    $("#descripcion").val("");
    $("#stock").val("");

    $("#imagen").val("");
    $("#imagenmuestra").attr("src","");
    $("#imagenactual").val("");
    $("#print").hide();
    $("#idarticulo").val("");
}

function mostrarform(flag)
{
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
					url: '../ajax/articulo.php?op=listar',
					type : "get",
					dataType : "json",
					error: function(e){
						console.log(e.responseText);
					}
				},
		"bDestroy":true,
		"iDisplayLength":10,//paginacion //cuantos mostrar por pagina
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
		url: "../ajax/articulo.php?op=guardaryeditar",
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

function mostrar(idarticulo)
{
	$.post("../ajax/articulo.php?op=mostrar",{idarticulo : idarticulo}, function(data, status)
	{
		data = JSON.parse(data);
		mostrarform(true);

		$("#idcategoria").val(data.idcategoria);
		$('#idcategoria').selectpicker('refresh');
		$("#codigo").val(data.codigo);
		$("#nombre").val(data.nombre);
		$("#stock").val(data.stock);
		$("#descripcion").val(data.descripcion);
		$("#imagenmuestra").show();
		$("#imagenmuestra").attr("src","../files/articulos/"+data.imagen);
		$("#imagenactual").val(data.imagen);
		$("#idarticulo").val(data.idarticulo);
		generarbarcode();
	})
}

function desactivar(idarticulo)
{
	bootbox.confirm("¿Está Seguro de desactivar el Artículo?",function(result)
	{
		if(result)
		{
			$.post("../ajax/articulo.php?op=desactivar", {idarticulo : idarticulo}, function(e)
			{
				bootbox.alert(e);
				tabla.ajax.reload();
			});
		
		}
	})
}

function activar(idarticulo)
{
	bootbox.confirm("¿Está Seguro de activar el Artículo?",function(result){
		if(result)
		{
			$.post("../ajax/articulo.php?op=activar", {idarticulo : idarticulo}, function(e)
			{
				bootbox.alert(e);
				tabla.ajax.reload();
			});
		
		}
	})
}

//funcion para generar el codigo de barras
function generarbarcode()
{
	codigo=$("#codigo").val();
	JsBarcode("#barcode",codigo);
	$("#print").show();
}

//funcion para imprimir el codigo de barras
function imprimir()
{
	$("#print").printArea();
}
init();