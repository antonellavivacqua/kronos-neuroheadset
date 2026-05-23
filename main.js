// principal.js
// Hecho por mí, todo en español y comentado paso a paso.

// Función para evitar errores si el usuario mete caracteres raros
function escapar(texto){
  if(!texto) return '';
  return String(texto).replace(/[&<>"']/g, function(m){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
  });
}

document.addEventListener('DOMContentLoaded', function(){

  // -----------------------
  // MENÚS MÓVILES
  // -----------------------
  function alternarMenu(idBoton, idMenu){
    var boton = document.getElementById(idBoton);
    var menu = document.getElementById(idMenu);
    if(boton && menu){
      boton.addEventListener('click', function(){
        menu.classList.toggle('oculto');
      });
    }
  }

  // Llamo la función para los tres menús (inicio, producto, contacto)
  alternarMenu('boton-menu', 'menu-movil');
  alternarMenu('boton-menu-2', 'menu-movil-2');
  alternarMenu('boton-menu-3', 'menu-movil-3');


  // -----------------------
  // MODAL DE COMPRA (producto.html)
  // -----------------------

  // Capturo todos los elementos necesarios
  var botonComprar = document.getElementById('btn-comprar');
  var modalCompra = document.getElementById('modal-compra');
  var botonCerrar = document.getElementById('cerrar-modal');
  var formCompra = document.getElementById('form-compra');
  var mensajeCompra = document.getElementById('mensaje-compra');
  var campoCantidad = formCompra ? formCompra.querySelector('input[name="cantidad"]') : null;

  // Precio por unidad del producto (puedo cambiarlo fácilmente desde acá)
  var precioUnitario = 1999;

  // Cuando toco “Comprar”, se abre el modal
  if(botonComprar && modalCompra){
    botonComprar.addEventListener('click', function(){
      modalCompra.classList.remove('oculto');
      // actualizo el precio mostrado apenas se abre
      actualizarTotal();
    });
  }

  // Cuando toco la X, se cierra el modal
  if(botonCerrar && modalCompra){
    botonCerrar.addEventListener('click', function(){
      modalCompra.classList.add('oculto');
    });
  }

  // Si toco fuera del cuadro, también se cierra
  window.addEventListener('click', function(e){
    if(e.target === modalCompra){
      modalCompra.classList.add('oculto');
    }
  });

  // -----------------------
  // FUNCIÓN para actualizar el precio total en vivo
  // -----------------------
  function actualizarTotal(){
    if(!campoCantidad) return;
    var cantidad = parseInt(campoCantidad.value) || 1;
    var total = precioUnitario * cantidad;
    // Busco si ya existe el texto del total
    var textoTotal = document.getElementById('precio-total');
    if(!textoTotal){
      // si no existe, lo creo y lo agrego debajo del campo de cantidad
      textoTotal = document.createElement('p');
      textoTotal.id = 'precio-total';
      textoTotal.style.marginTop = '6px';
      textoTotal.style.fontWeight = 'bold';
      campoCantidad.parentNode.appendChild(textoTotal);
    }
    textoTotal.textContent = 'Precio total: $' + total + ' USD';
  }

  // Escucho cuando cambie la cantidad y actualizo el total
  if(campoCantidad){
    campoCantidad.addEventListener('input', actualizarTotal);
  }

  // -----------------------
  // FORMULARIO DE COMPRA
  // -----------------------
  if(formCompra && mensajeCompra){
    formCompra.addEventListener('submit', function(e){
      e.preventDefault();

      var datos = new FormData(formCompra);
      var nombre = escapar(datos.get('nombre'));
      var email = escapar(datos.get('email'));
      var cantidad = parseInt(datos.get('cantidad')) || 1;

      var total = precioUnitario * cantidad; // cálculo final

      // Escondo el formulario y muestro el mensaje de confirmación
      formCompra.classList.add('oculto');
      mensajeCompra.classList.remove('oculto');
      mensajeCompra.innerHTML =
        '<p>Gracias <strong>' + nombre + '</strong>!<br>' +
        'Compraste <strong>' + cantidad + '</strong> unidad(es) de NeuroHeadset.<br>' +
        'Precio total: <strong>$' + total + ' USD</strong>.<br>' +
        'Te contactaremos al correo <em>' + email + '</em> para completar la compra.</p>';

      // Cierro el modal automáticamente a los 3 segundos
      setTimeout(function(){
        mensajeCompra.classList.add('oculto');
        formCompra.reset();
        formCompra.classList.remove('oculto');
        modalCompra.classList.add('oculto');
      }, 3000);
    });
  }

  // -----------------------
  // FORMULARIO DE CONTACTO
  // -----------------------
  var formContacto = document.getElementById('form-contacto');
  var mensajeContacto = document.getElementById('mensaje-contacto');

  if(formContacto && mensajeContacto){
    formContacto.addEventListener('submit', function(e){
      e.preventDefault();
      var datos = new FormData(formContacto);
      var nombre = escapar(datos.get('nombre'));

      formContacto.reset();
      mensajeContacto.classList.remove('oculto');
      mensajeContacto.innerHTML =
        '<p>Mensaje enviado correctamente. Gracias, <strong>' + nombre + '</strong>!</p>';

      setTimeout(function(){
        mensajeContacto.classList.add('oculto');
        mensajeContacto.innerHTML = '';
      }, 2500);
    });
  }
});

