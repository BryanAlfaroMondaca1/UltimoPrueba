import { actualizarPersona, eliminarPersona, obtenerPersonas, registrarPersona } from "./promesas.js";

window.addEventListener("load",()=>{
    document.getElementById("btnRegistrar").addEventListener("click",registrar);
    cargarDatos();
    document.getElementById("btnActualizar").addEventListener("click",actualizar);
})

const registrar = ()=>{
    //recuperar elemento
    let eNombre = document.getElementById("nombre");
    let eApellido = document.getElementById("apellido");
    let eRut = document.getElementById("rut");
    let eCorreo = document.getElementById("correo");
    let efecha = document.getElementById("fecha");
    let eEdad = document.getElementById("edad");
    //recupero valor de elemento
    let vNombre = eNombre.value;
    let vApellido= eApellido.value;
    let vRut = eRut.value;
    let vCorreo = eCorreo.value;
    let vfecha = efecha.value;
    let vEdad = eEdad.value;
    //crea un objeto con los datos recuperados
    let objeto = {nombre:vNombre,apellido:vApellido,rut:vRut,correo:vCorreo,fecha:vfecha,edad:vEdad}
    //envio a una funcion que registra
    registrarPersona(objeto).then(()=>{
    alert("Se registro exitosamente");
    cargarDatos()
    }).catch((error)=>{
        console.log(error)
    });
}

const cargarDatos = ()=>{
    //Traer de las promesas todo lo registrado
    obtenerPersonas().then((personas)=>{
        console.log("HOLA")
        console.log(personas)
        //Cargarlo en la tabla del html
        let estructura = ""
        personas.forEach((p)=>{
            estructura += "<tr>"
            estructura += "<td>"+p.nombre+"</td>"
            estructura += "<td>"+p.apellido+"</td>"
            estructura += "<td>"+p.rut+"</td>"
            estructura += "<td>"+p.correo+"</td>"
            estructura += "<td>"+p.fecha+"</td>"
            estructura += "<td>"+p.edad+"</td>"
            estructura += "<td><button id='UPD"+p.id+"'>Actualizar</button></td>"
            estructura += "<td><button id='DEL"+p.id+"'>Eliminar</button></td>"
            estructura += "</tr>";
        })
        document.getElementById("cuerpotabla").innerHTML = estructura;
        
        personas.forEach((p)=>{
            let elemento = document.getElementById("UPD"+p.id);
            elemento.addEventListener("click",()=>{
                document.getElementById("UPDnombre").value = p.nombre;
                document.getElementById("UPDapellido").value = p.apellido;
                document.getElementById("UPDrut").value = p.rut;
                document.getElementById("UPDcorreo").value = p.correo;
                document.getElementById("UPDfecha").value = p.fecha;
                document.getElementById("UPDedad").value = p.edad;
                document.getElementById("btnActualizar").value = p.id;
            });
            let btnEliminar = document.getElementById("DEL"+p.id);
            btnEliminar.addEventListener("click",()=>{
                if(confirm("Desea eliminar a:\n"+pnombre+" "+p.apellido)){
                    console.log("Vamos a eliminar")
                    eliminarPersona(p.id).then(()=>{
                        alert("Eliminaste con exito")
                        cargarDatos();
                    }).catch((e)=>{
                        console.log(e)
                    })
                }else{
                    console.log("cancelaste la eliminacion")
                }
            })
        })
    })
}

const actualizar = ()=>{
    let eFechaNacimiento = document.getElementById("UPDFechaNacimiento")
    //recuperar campos formulario

    //recuperar elemento
    let eNombre = document.getElementById("UPDnombre");
    let eApellido = document.getElementById("UPDapellido");
    let eRut = document.getElementById("UPDrut");
    let eCorreo = document.getElementById("UPDcorreo");
    let efecha = document.getElementById("UPDfecha");
    let eEdad = document.getElementById("UPDedad");
    //let efechaNacimiento = document.getElementById("UPDfecha");
    //recupero valor de elemento
    let vNombre = eNombre.value;
    let vApellido= eApellido.value;
    let vRut = eRut.value;
    let vCorreo = eCorreo.value;
    let vfecha = efecha.value;
    let vEdad = eEdad.value;
    //crea un objeto con los datos recuperados
    let objeto = {nombre:vNombre,apellido:vApellido,rut:vRut,correo:vCorreo,fecha:vfecha,edad:vEdad}
    //envio a una funcion que registra
    registrarPersona(objeto).then(()=>{
    alert("Se registro exitosamente");
    cargarDatos()
    }).catch((error)=>{
        console.log(error)
    });

    //creo objeto

    let id = document.getElementById("btnActualizar").value;

    //envio obj y id a las promesas
    document.getElementById("btnActualizar").disabled = True;
    actualizarPersona(objeto,id).then(() =>{
        alert("se actualiza con exito")
        cargarDatos();
        
    }).catch((e)=>{
        console.log(e)
    }).finally(()=>{
        document.getElementById("btnActualizar").disabled = "";
    })

}