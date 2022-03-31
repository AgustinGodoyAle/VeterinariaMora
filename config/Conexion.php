<?php 
require_once"global.php";

//conexion a la BD
$conexion= new mysqli(DB_HOST,DB_USERNAME,DB_DBPASSWORD,DB_NAME);

//consulta para establecer mi cotejamiento 
mysqli_query($conexion, 'SET NAMES "'.DB_ENCODE.'"');

//Si tenemos un posible error en la cadena de conexion lo mostramos
if (mysqli_connect_errno())
{
	printf("Falló la conexión a la Base de Datos: %s\n",mysqli_connect_errno());
	exit();
}	
//Ejecutar consultas en los modelos de mi sistema
if (!function_exists('ejecutarConsulta'))
{
	function ejecutarConsulta($sql)
	{
		global $conexion;
		$query = $conexion->query($sql);
		return $query;
	}

	function ejecutarConsultaSimpleFila($sql)
	{
		global $conexion;
		$query= $conexion->query($sql);
		$row = $query->fetch_assoc();
		return $row;
	}

	function ejecutarConsulta_retornarID($sql)
	{
		global $conexion;
		$query= $conexion->query($sql);
		return $conexion->insert_id;
	}

	function limpiarCadena($str)
	{
		global $conexion;
		$str = mysqli_real_escape_string($conexion,trim($str));
		return htmlspecialchars($str);
	}
}
 ?>
