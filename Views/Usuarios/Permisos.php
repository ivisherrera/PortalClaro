<?php include "Views/Templates/header.php"; ?>
<div class="col-m-8 mx-auto">
    <div class="card">
        <div class="card-header text-center bd-primary text-black">
            Asignar Permisos
        </div>
        <div class="card-body">
            <form id="formulario" onsubmit="registrarPermisos(event)">
                <div class="row">
                    <?php foreach($data['datos'] as $row) { ?>
                        <div class="col-md-4  text-center text-black p-2">
                            <label for=""><?php echo $row['permiso']; ?></label><br>
                            <input type="checkbox" name="permisos[]" value="<?php echo $row['id']; ?>">
                        </div>
                    <?php } ?>
                    <input type="hidden" value="<?php echo $data['id_usuario'] ?>" name="id_usuario">
                </div>
                <div class="d-grip gap-2">
                    <button class="btn btn-outline-primary" type="submit">Asignar Permiso</button>
                    <a class="btn btn-outline-danger" href="<?php echo base_url;  ?>Usuarios" >Cancelar</a>
                </div>
            </form>
        </div>
    </div>
</div>

<?php include "Views/Templates/footer.php"; ?>