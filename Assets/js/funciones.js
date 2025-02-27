let tblUsuarios, tblPromotores;
document.addEventListener("DOMContentLoaded", function() {
    //--------------------tblUsuarios---------------------
    tblUsuarios = $('#tblUsuarios').DataTable({
        ajax: {
            url: base_url + "Usuarios/listar",
            dataSrc: ''
        },
        columns: [
            { 'data': 'id' },
            { 'data': 'usuario' },
            { 'data': 'nombre' },
            { 'data': 'email' }, // Agregado
            { 'data': 'caja' },
            { 'data': 'estado' },
            { 'data': 'acciones' }
        ]
    });

    //----------------------------tblPromotores--------------------------------

    tblPromotores = $('#tblPromotores').DataTable({
        ajax: {
            url: base_url + "Promotores/listar",
            dataSrc: ''
        },
        columns: [
            { 'data': 'id' },
            { 'data': 'imagen' },
            { 'data': 'codigo' },
            { 'data': 'dni' },
            { 'data': 'nombre' },
            { 'data': 'apellido' },
            { 'data': 'telefono' },
            { 'data': 'profesion' },
            { 'data': 'estado_civil' },
            { 'data': 'genero' },
            { 'data': 'direccion' },
            { 'data': 'zona' },
            { 'data': 'departamento' },
            { 'data': 'municipio' },
            { 'data': 'gerencia' },
            { 'data': 'canal' },
            { 'data': 'proyecto' },
            { 'data': 'cargo' },
            { 'data': 'estado' },
            { 'data': 'acciones' }
        ]
    });

    //----------------------------tblVentas--------------------------------

    tblVentas = $('#tblVentas').DataTable({
        ajax: {
            url: base_url + "Ventas/listar",
            dataSrc: ''
        },
        columns: [
            { 'data': 'id' },
            { 'data': 'telefono' },
            { 'data': 'medio' },
            { 'data': 'subgerente' },
            { 'data': 'coordinador' },
            { 'data': 'supervisor' },
            { 'data': 'fecha' },
            { 'data': 'codigo' },
            { 'data': 'ubicacion' },
            { 'data': 'promotor' },
            { 'data': 'punto_venta' },
            { 'data': 'zona_supervisor' },
            { 'data': 'distribuidor' },
            { 'data': 'supervisor' },
            { 'data': 'producto' },
            { 'data': 'perfil_plan' },
            { 'data': 'tecnologia' },
            { 'data': 'centro_venta' },
            { 'data': 'canal_rediac' },
            { 'data': 'aliado' },
            { 'data': 'acciones' }
        ]
    });
})
//-----------------------------------Usuarios--------------------------------------------------

function frmUsuario() {
    document.getElementById("title").innerHTML = "Nuevo usuario";
    document.getElementById("btnAccion").innerHTML = "Registrar";
    document.getElementById("claves").classList.remove("d-none");
    document.getElementById("frmUsuario").reset();
    $("#nuevo_usuario").modal("show");
    document.getElementById("id").value = "";
}

function registrarUser(e) {
    e.preventDefault();
    const usuario = document.getElementById("usuario");
    const nombre = document.getElementById("nombre");
    const clave = document.getElementById("clave");
    const confirmar = document.getElementById("confirmar");
    const caja = document.getElementById("caja");
    const email = document.getElementById("email"); // Agregado

    if (usuario.value == "" || nombre.value == "" || caja.value == "" || email.value == "") { // Actualizado
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Todos los campos son obligatorios!',
            showConfirmButton: false,
            timer: 3000
        })
    } else {
        const url = base_url + "Usuarios/registrar";
        const frm = document.getElementById("frmUsuario");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                if (res == "si") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Usuario registrado con éxito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    frm.reset();
                    $("#nuevo_usuario").modal("hide");
                    tblUsuarios.ajax.reload();
                } else if (res == "modificado") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Usuario modificado correctamente',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    $("#nuevo_usuario").modal("hide");
                    tblUsuarios.ajax.reload();
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: res,
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            }
        }
    }
}

function btnEditarUser(id) {
    document.getElementById("title").innerHTML = "Actualizar usuario";
    document.getElementById("btnAccion").innerHTML = "Modificar";
    const url = base_url + "Usuarios/editar/" + id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const res = JSON.parse(this.responseText);
            document.getElementById("id").value = res.id;
            document.getElementById("usuario").value = res.usuario;
            document.getElementById("nombre").value = res.nombre;
            document.getElementById("email").value = res.email; // Agregado
            document.getElementById("caja").value = res.id_caja;
            document.getElementById("claves").classList.add("d-none");
            $("#nuevo_usuario").modal("show");
        }
    }
}

function btnEliminarUser(id) {
    Swal.fire({
        title: '¿Está seguro de eliminar?',
        text: "¡El usuario no se eliminara de forma permanente, solo cambiará el estado a inactivo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Usuarios/eliminar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire(
                            'Mensaje',
                            'Usuario eliminado con éxito',
                            'success'
                        )
                        tblUsuarios.ajax.reload();
                    } else {
                        Swal.fire(
                            'Mensaje',
                            res,
                            'error'
                        )
                    }
                }
            }
        }
    })
}

function btnReingresarUser(id) {
    Swal.fire({
        title: '¿Está seguro de reingresar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Usuarios/reingresar/" + id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire(
                            'Mensaje',
                            'Usuario reingresado con éxito',
                            'success'
                        )
                        tblUsuarios.ajax.reload();
                    } else {
                        Swal.fire(
                            'Mensaje',
                            res,
                            'error'
                        )
                    }
                }
            }
        }
    })
}


//Fin Usuarios

//-----------------------------------Promotores--------------------------------------------------
function frmPromotor() {
    document.getElementById("title").innerHTML="Nuevo Promotor";
    document.getElementById("btnAccion").innerHTML="Registrar";
    document.getElementById("frmPromotor").reset();
    document.getElementById("id").value = "";
    $("#nuevo_promotor").modal("show");
    deleteImg();

}

function registrarPromotor(e){
    e.preventDefault();
    const codigo = document.getElementById("codigo");
    const dni = document.getElementById("dni");
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const telefono = document.getElementById("telefono");
    const profesion = document.getElementById("profesion");
    const id_estado_civil = document.getElementById("estado_civil");
    const id_genero = document.getElementById("genero");
    const direccion = document.getElementById("direccion");
    const id_zona = document.getElementById("zona");
    const id_departamento = document.getElementById("departamento");
    const id_municipio = document.getElementById("municipio");
    const id_gerencia = document.getElementById("gerencia");
    const id_canal = document.getElementById("canal");
    const id_proyecto = document.getElementById("proyecto");
    const id_cargo = document.getElementById("cargo");
    
    if (codigo.value =="" || dni.value == "" || nombre.value =="" || apellido.value == "" ||  
        telefono.value =="" || profesion.value == "" || direccion.value == ""){
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Todos los campos son obligatorios!',
            showConfirmButton: false,
            timer: 3000
        })
    }else{
        const url = base_url + "Promotores/registrar";
        const frm = document .getElementById("frmPromotor");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function(){
            if(this.readyState ==4 && this.status==200){
                const res = JSON.parse(this.responseText);
                if (res == "si"){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Promotor registrado con éxito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    frm.reset();
                    $("#nuevo_promotor").modal("hide");
                    tblPromotores.ajax.reload();

                }else if(res=="modificado"){
                    Swal.fire({
                        position:'top-end',
                        icon: 'success',
                        title: 'Promotor modificado correctamente',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                    $("#nuevo_promotor").modal("hide");
                    tblPromotores.ajax.reload();

                }else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: res,
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            }
        }
    }
}

function btnEditarPromotor(id) {
    document.getElementById("title").innerHTML="Actualizar promotor";
    document.getElementById("btnAccion").innerHTML="Modificar";
    const url = base_url + "Promotores/editar/" + id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //console.log(this.responseText);
                const res = JSON.parse(this.responseText);
                document.getElementById("id").value = res.id;
                document.getElementById("codigo").value = res.codigo;
                document.getElementById("dni").value = res.dni;
                document.getElementById("nombre").value = res.nombre;
                document.getElementById("apellido").value = res.apellido;
                document.getElementById("telefono").value = res.telefono;
                document.getElementById("profesion").value = res.profesion;
                document.getElementById("estado_civil").value = res.id_estado_civil;
                document.getElementById("genero").value = res.id_genero;  
                document.getElementById("direccion").value = res.direccion;
                document.getElementById("zona").value = res.id_zona;
                document.getElementById("departamento").value = res.id_departamento;
                document.getElementById("municipio").value = res.id_municipio;
                document.getElementById("gerencia").value = res.id_gerencia;
                document.getElementById("canal").value = res.id_canal;
                document.getElementById("proyecto").value = res.id_proyecto;
                document.getElementById("cargo").value = res.id_cargo;
                document.getElementById("img-preview").src = base_url + 'Assets/imgBD/' + res.foto;
                document.getElementById("icon-cerrar").innerHTML = ` 
                <button class="btn btn-danger" onclick="deleteImg()">
                <i class="fas fa-times"></i></button>`;
                document.getElementById("icon-image").classList.add("d-none");
                document.getElementById("foto_actual").value = res.foto;
                $("#nuevo_promotor").modal("show");
            }
    }

}

function btnEliminarPromotor(id) {
    Swal.fire({
        title: '¿Está seguro de rechazar este promotor?',
        text: "¡El promotor no se rechazara de forma permanente, solo cambiará el estado a inactivo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Promotores/eliminar/"+id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire(
                            'Mensaje',
                            'Promotor rechazado con éxito',
                            'success'
                        )
                      tblPromotores.ajax.reload();
                    }else{ Swal.fire(
                            'Mensaje',
                            res,
                            'error'
                    )}
                }
            }
          
        }
    })
}

function btnReingresarPromotor(id) {
    Swal.fire({
        title: '¿Está seguro de contratar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Promotores/reingresar/"+id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire(
                            'Mensaje',
                            'Promotor contratado con éxito',
                            'success'
                        )
                      tblPromotores.ajax.reload();
                    }else{ Swal.fire(
                            'Mensaje',
                            res,
                            'error'
                    )}
                }
            }
          
        }
    })
}

function btnVerPromotor(id) {
    document.getElementById("title").innerHTML="Ficha promotor";
    document.getElementById("btnAccion").innerHTML="Imprimir";
    const url = base_url + "Promotores/ver/" + id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                document.getElementById("id").value = res.id;
                document.getElementById("codigo").value = res.codigo;
                document.getElementById("dni").value = res.dni;
                document.getElementById("nombre").value = res.nombre;
                document.getElementById("apellido").value = res.apellido;
                document.getElementById("telefono").value = res.telefono;
                document.getElementById("profesion").value = res.profesion;
                document.getElementById("estado_civil").value = res.id_estado_civil;
                document.getElementById("genero").value = res.id_genero;  
                document.getElementById("direccion").value = res.direccion;
                document.getElementById("zona").value = res.id_zona;
                document.getElementById("departamento").value = res.id_departamento;
                document.getElementById("municipio").value = res.id_municipio;
                document.getElementById("gerencia").value = res.id_gerencia;
                document.getElementById("canal").value = res.id_canal;
                document.getElementById("proyecto").value = res.id_proyecto;
                document.getElementById("cargo").value = res.id_cargo;
                document.getElementById("img-preview").src = base_url + 'Assets/img/' + res.foto;
                document.getElementById("icon-cerrar").innerHTML = ` 
                <button class="btn btn-danger" onclick="deleteImg()">
                <i class="fas fa-times"></i></button>`;
                document.getElementById("icon-image").classList.add("d-none");
                document.getElementById("foto_actual").value = res.foto;
                $("#nuevo_promotor").modal("show");
            }
    }

}
//Funciones para las fotos
function preview(e){
    const url = e.target.files[0];
    const urlTmp = URL.createObjectURL(url);
    document.getElementById("img-preview").src = urlTmp;
    document.getElementById("icon-image").classList.add("d-none");
    document.getElementById("icon-cerrar").innerHTML = ` 
    <button class="btn btn-danger" onclick="deleteImg()"><i class="fas fa-times"></i></button>
   ${url['name']}`;
}

function deleteImg() {
    document.getElementById("icon-cerrar").innerHTML = '';
    document.getElementById("icon-image").classList.remove("d-none");
    document.getElementById("img-preview").src = '';
    document.getElementById("imagen").value = '';
    document.getElementById("foto_actual").value= '';
   
}


//Fin Promotores


//-----------------------------------Asistencia--------------------------------------------------
function frmAsistencia() {
    document.getElementById("title").innerHTML="Nuevo usuario";
    document.getElementById("btnAccion").innerHTML="Registrar";
    document.getElementById("claves").classList.remove("d-none");
    document.getElementById("frmUsuario").reset();
    $("#nuevo_usuario").modal("show");
    document.getElementById("id").value = "";

}

function registrarUser(e){
    e.preventDefault();
    const usuario = document.getElementById("usuario");
    const nombre = document.getElementById("nombre");
    const clave = document.getElementById("clave");
    const confirmar = document.getElementById("confirmar");
    const caja = document.getElementById("caja");

    if (usuario.value =="" || nombre.value == "" || caja.value == "" ){
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Todos los campos son obligatorios!',
            showConfirmButton: false,
            timer: 3000
        })
    }else{
        const url = base_url + "Usuarios/registrar";
        const frm = document .getElementById("frmUsuario");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function(){
            if(this.readyState ==4 && this.status==200){
                const res = JSON.parse(this.responseText);
                if (res == "si"){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Usuario registrado con éxito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    frm.reset();
                    $("#nuevo_usuario").modal("hide");
                    tblUsuarios.ajax.reload();

                }else if(res=="modificado"){
                    Swal.fire({
                        position:'top-end',
                        icon: 'success',
                        title: 'Usuario modificado correctamente',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                    $("#nuevo_usuario").modal("hide");
                    tblUsuarios.ajax.reload();

                }else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: res,
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            }
        }
    }
}

function btnEditarUser(id) {
    document.getElementById("title").innerHTML="Actualizar usuario";
    document.getElementById("btnAccion").innerHTML="Modificar";
    const url = base_url + "Usuarios/editar/" + id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                document.getElementById("id").value = res.id;
                document.getElementById("usuario").value = res.usuario;
                document.getElementById("nombre").value = res.nombre;
                document.getElementById("caja").value = res.id_caja;
                document.getElementById("claves").classList.add("d-none");
                $("#nuevo_usuario").modal("show");
            }
    }

}

function btnEliminarUser(id) {
    Swal.fire({
        title: '¿Está seguro de eliminar?',
        text: "¡El usuario no se eliminara de forma permanente, solo cambiará el estado a inactivo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Usuarios/eliminar/"+id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire(
                            'Mensaje',
                            'Usuario eliminado con éxito',
                            'success'
                        )
                      tblUsuarios.ajax.reload();
                    }else{ Swal.fire(
                            'Mensaje',
                            res,
                            'error'
                    )}
                }
            }
          
        }
    })
}

function btnReingresarUser(id) {
    Swal.fire({
        title: '¿Está seguro de reingresar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Usuarios/reingresar/"+id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire(
                            'Mensaje',
                            'Usuario reingresado con éxito',
                            'success'
                        )
                      tblUsuarios.ajax.reload();
                    }else{ Swal.fire(
                            'Mensaje',
                            res,
                            'error'
                    )}
                }
            }
          
        }
    })
}

//Fin Promotores

//-----------------------------------Ventas--------------------------------------------------
function frmVentas() {
    document.getElementById("title").innerHTML="Nueva Venta";
    document.getElementById("btnAccion").innerHTML="Registrar";
    document.getElementById("frmVentas").reset();
    document.getElementById("id").value = "";
    $("#nueva_venta").modal("show");

}

function registrarVentas(e){
    e.preventDefault();
    const telefono = document.getElementById("telefono");
    const medio = document.getElementById("medio");
    const subgerente = document.getElementById("subgerente");
    const coordinador = document.getElementById("coordinador");
    const supervisor = document.getElementById("supervisor");
    const fecha = document.getElementById("fecha");
    const codigo = document.getElementById("codigo");
    const ubicacion = document.getElementById("ubicacion");
    const promotor = document.getElementById("promotor");
    const punto_venta = document.getElementById("punto_venta");
    const zona_supervisor = document.getElementById("zona_supervisor");
    const distribuidor = document.getElementById("distribuidor");
    const producto = document.getElementById("producto");
    const perfil_plan = document.getElementById("perfil_plan");
    const tecnologia = document.getElementById("tecnologia");
    const centro_venta = document.getElementById("centro_venta");
    const canal_rediac = document.getElementById("canal_rediac");
    const aliado = document.getElementById("aliado");
    
    if (telefono.value =="" || medio.value == "" || subgerente.value =="" || coordinador.value == "" ||  
        supervisor.value =="" || fecha.value == "" || codigo.value == "" || ubicacion.value == "" || promotor.value =="" || 
        punto_venta.value == "" || zona_supervisor.value == "" || distribuidor.value =="" || producto.value == "" ||  
        perfil_plan.value == "" || tecnologia.value =="" || centro_venta.value == "" || canal_rediac.value == "" || aliado.value ==""){
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Todos los campos son obligatorios!',
            showConfirmButton: false,
            timer: 3000
        })
    }else{
        const url = base_url + "Ventas/registrar";
        const frm = document .getElementById("frmVentas");
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(new FormData(frm));
        http.onreadystatechange = function(){
            if(this.readyState ==4 && this.status==200){
                const res = JSON.parse(this.responseText);
                if (res == "si"){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Ventas registradas con éxito',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    frm.reset();
                    $("#nueva_venta").modal("hide");
                    tblVentas.ajax.reload();

                }else if(res=="modificado"){
                    Swal.fire({
                        position:'top-end',
                        icon: 'success',
                        title: 'Ventas modificadas correctamente',
                        showConfirmButton: false,
                        timer: 3000
                    }) 
                    $("#nueva_venta").modal("hide");
                    tblVentas.ajax.reload();

                }else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: res,
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            }
        }
    }
}

function btnEditarVentas(id) {
    document.getElementById("title").innerHTML="Actualizar ventas";
    document.getElementById("btnAccion").innerHTML="Modificar";
    const url = base_url + "Ventas/editar/" + id;
    const http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.send();
    http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                document.getElementById("id").value = res.id;
                document.getElementById("telefono").value = res.telefono;
                document.getElementById("medio").value = res.medio;
                document.getElementById("subgerente").value = res.subgerente;
                document.getElementById("coordinador").value = res.coordinador;
                document.getElementById("supervisor").value = res.supervisor;
                document.getElementById("fecha").value = res.fecha;
                document.getElementById("codigo").value = res.codigo;
                document.getElementById("ubicacion").value = res.ubicacion;
                document.getElementById("promotor").value = res.promotor;
                document.getElementById("punto_venta").value = res.punto_venta;
                document.getElementById("zona_supervisor").value = res.zona_supervisor;
                document.getElementById("distribuidor").value = res.distribuidor;
                document.getElementById("producto").value = res.producto;
                document.getElementById("perfil_plan").value = res.perfil_plan;
                document.getElementById("tecnologia").value = res.tecnologia;
                document.getElementById("centro_venta").value = res.centro_venta;
                document.getElementById("canal_rediac").value = res.canal_rediac;
                document.getElementById("aliado").value = res.aliado;
                $("#nueva_venta").modal("show");
            }
    }

}

function btnEliminarVentas(id) {
    Swal.fire({
        title: '¿Está seguro de eliminar?',
        text: "¡La venta no se eliminara de forma permanente, solo cambiará el estado a inactivo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Ventas/eliminar/"+id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire(
                            'Mensaje',
                            'Venta eliminada con éxito',
                            'success'
                        )
                      tblVentas.ajax.reload();
                    }else{ Swal.fire(
                            'Mensaje',
                            res,
                            'error'
                    )}
                }
            }
          
        }
    })
}

function btnReingresarVentas(id) {
    Swal.fire({
        title: '¿Está seguro de reingresar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            const url = base_url + "Ventas/reingresar/"+id;
            const http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.send();
            http.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    const res = JSON.parse(this.responseText);
                    if (res == "ok") {
                        Swal.fire(
                            'Mensaje',
                            'Venta reingresada con éxito',
                            'success'
                        )
                      tblUsuarios.ajax.reload();
                    }else{ Swal.fire(
                            'Mensaje',
                            res,
                            'error'
                    )}
                }
            }
          
        }
    })
}
//Fin Ventas
//-----------------------------------Permisos--------------------------------------------------
function registrarPermisos(e){
    e.preventDefault
    const url = base_url + "Usarios/registrarPermisos";
    const frm = document.getElementById('formulario');
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.send(new FormData(frm));
    http.onreadystatechange = function (){
        if (this.readyState == 4 && this.status ==200){
            //const res = JSON.parse(this.responseText);
            console.log(this.responseText);
        }
    }

}