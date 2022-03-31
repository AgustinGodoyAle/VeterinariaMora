<?php 
//Incluir la conexion a la BD
require "../config/Conexion.php";

Class Articulo
{
	//Implementar el constructor , instanciar sin parámetro
	public function __construct()
	{

	}
	// implementar un método para insertar registros en la tabla
	public function insertar($idcategoria, $codigo, $nombre, $stock, $descripcion, $imagen)
	{
		$sql="INSERT INTO articulo (idcategoria, codigo, nombre, stock, descripcion, imagen, condicion)
		VALUES('$idcategoria','$codigo', '$nombre', '$stock','$descripcion', '$imagen','1')";
		return ejecutarConsulta($sql);

	}

    //implementar un método para editar registros de mi tabla
	public function editar($idarticulo, $idcategoria, $codigo, $nombre, $stock, $descripcion, $imagen)
	{
		$sql="UPDATE articulo SET idcategoria='$idcategoria', codigo='$codigo' , nombre='$nombre', stock='$stock', descripcion='$descripcion', imagen='$imagen' WHERE idarticulo='$idarticulo'";
		return ejecutarConsulta($sql);

	}
	
    //implementar método para desactivar 
	public function desactivar($idarticulo)
	{
		$sql="UPDATE articulo SET condicion='0' WHERE idarticulo='$idarticulo'";
		return ejecutarConsulta($sql);

	}

	//implementar método para activar 
	public function activar($idarticulo){
		$sql="UPDATE articulo SET condicion='1' WHERE idarticulo='$idarticulo'";
		return ejecutarConsulta($sql);

	}

	//implementar método para mostrar datos de registros a modificar
	public function mostrar($idarticulo){
		$sql="SELECT * FROM articulo WHERE idarticulo='$idarticulo'";
		return ejecutarConsultaSimpleFila($sql);

	}

//relacion de tablas articuloss y categoria // lista todos los articulos de una categoria
	public function listar(){
		$sql="SELECT a.idarticulo, a.idcategoria, c.nombre as categoria, a.codigo, a.nombre , a.stock, a.descripcion, a.imagen, a.condicion FROM articulo a INNER JOIN categoria c ON a.idcategoria=c.idcategoria";
		return ejecutarConsulta($sql);
	}
}
 ?>