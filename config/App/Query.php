<?php
class Query extends Conexion {
    private $pdo, $con, $sql, $datos;
    
    public function __construct() {
        $this->pdo = new Conexion();
        $this->con = $this->pdo->conect();
    }
    
    public function select(string $sql) {
        $this->sql = $sql;
        $resul = $this->con->prepare($this->sql);
        $resul->execute();
        $data = $resul->fetch(PDO::FETCH_ASSOC);
        return $data;
    }

    public function selectAll(string $sql) {
        $this->sql = $sql;
        $resul = $this->con->prepare($this->sql);
        $resul->execute();
        $data = $resul->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }

    public function save(string $sql, array $datos) {
        $this->sql = $sql;
        $this->datos = $datos;
        $insert = $this->con->prepare($this->sql);
        $data = $insert->execute($this->datos);
        return $data ? 1 : 0;
    }

    public function selectWithParams(string $sql, array $params) {
        $this->sql = $sql;
        $resul = $this->con->prepare($this->sql);
        $resul->execute($params);
        $data = $resul->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }
}
?>
