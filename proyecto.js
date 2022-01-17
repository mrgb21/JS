

function funcionValor() {
    let input = document.getElementById("caja1").value
    let input2 = document.getElementById("caja2").value
    let input3 = document.getElementById("caja3").value
    let mensaje = document.createElement("li")
    mensaje.innerHTML = `<p>Thank you for being part of our community ${input} ${input2} We sent you an email to ${input3}</p>`
        mensajito.appendChild(mensaje)
        return
};

let boton2 = document.getElementsByClassName("boton2")

$(boton2).click(() => {
    $(funcionValor).toggle("fast");
})







$("body").prepend('<p style="display:none" id="mensajeprueba">Hola</p>');


$('#agregarCarrito1, #agregarCarrito2, #agregarCarrito3').on('click', () => {
    $('.modal-content, .modal-content2, .modal-content3').append("<p class='ggwp'>We have loaded your product to the cart</p>")
}); 


let difCursos = [
    {
        nombre: "Fundamental <br> Analysis",
        precio: 150,
        tag: "cursofundamental",
        enCarrito: 0
    },
    {
        nombre: "Technical Analysis",
        precio: 200,
        tag: "cursotecnico",
        enCarrito: 0
    },
    {
        nombre: "Financial Markets",
        precio: 175,
        tag: "cursofinanzas",
        enCarrito: 0
    }
]; 


function cargarDatos() {
    let numerosProductos = localStorage.getItem("cantidadCarritos")
    if (numerosProductos) {
        document.querySelector('.span1').textContent = numerosProductos;
    }
}


let btnCompra = document.querySelectorAll('.agregar-carrito');

for (let i=0; i < btnCompra.length; i++) {
    btnCompra[i].addEventListener('click', () => {
        cantidadCarritos(difCursos[i]);
        costoTotal(difCursos[i])
    })
}

function cantidadCarritos(difCursos) {
    let numerosProductos = localStorage.getItem('cantidadCarritos');
    numerosProductos = parseInt(numerosProductos);
    if ( numerosProductos ) {
        localStorage.setItem('cantidadCarritos', numerosProductos + 1);
        document.querySelector('.span1').textContent = numerosProductos + 1;
        } else {
            localStorage.setItem('cantidadCarritos', 1);
            document.querySelector('.span1').textContent = 1;
        }

    
   setItems(difCursos);
}

function setItems(difCursos) {
    let objetosCarrito = localStorage.getItem('productosEnCarrito');
    objetosCarrito = JSON.parse(objetosCarrito)

    if(objetosCarrito != null) {
        if (objetosCarrito[difCursos.tag] == undefined) {
            objetosCarrito = {
                ...objetosCarrito,
                [difCursos.tag]: difCursos
            }
        }
        objetosCarrito[difCursos.tag].enCarrito += 1;
    } else {
        difCursos.enCarrito = 1;
        objetosCarrito = {
        [difCursos.tag]: difCursos 
        }

    }


    localStorage.setItem("productosEnCarrito", JSON.stringify(objetosCarrito))
}

function costoTotal (course) {
    /* console.log(course.precio) */
    let costoCarrito = localStorage.getItem('costoTotal');
    

    if(costoCarrito != null) {
            costoCarrito = parseInt(costoCarrito)
            localStorage.setItem('costoTotal', costoCarrito + course.precio);
    } else {
        localStorage.setItem("costoTotal",course.precio)
    }

    
}





function displayCarrito () {
    let objetosCarrito = localStorage.getItem('productosEnCarrito');
    objetosCarrito = JSON.parse(objetosCarrito)
    let productosContainer = document.querySelector('.productos');

    if ( objetosCarrito && productosContainer) {
        productosContainer.innerHTML = '';
        Object.values(objetosCarrito).map(item => {
            productosContainer.innerHTML += `
            <div class="product">
                <div class="nombre">
                    <span>${item.nombre}</span>
                </div>
            </div>
            <div class="precio">Price: $${item.precio}</div>
            <div class="cantidad"><span>Quantity: ${item.enCarrito}</span></div>
            <div class="total">Total Price: $${item.enCarrito * item.precio}</div>
            `
        });
    }
}


cargarDatos();
displayCarrito();