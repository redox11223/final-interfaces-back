const comidasContainer= document.getElementById('comidasContainer')

let comidasDisponibles=[];

const cargarComidas= async()=>{
  const res= await fetch('/api/producto')
  comidasDisponibles=await res.json();
  renderizarComidas()
}

const renderizarComidas=()=>{
  comidasContainer.innerHTML='';
  comidasDisponibles.forEach((comida)=>{
    const card = document.createElement('div');
    card.className = 'col-6 col-lg-custom';
    card.innerHTML = `
      <div class="card comida-card h-100 shadow-sm" data-id="${comida.id_producto}" data-precio="${comida.precio}" data-stock="${comida.categoria}">
        <img loading="lazy" src="${comida.imagen_url}" class="card-img-top" alt="${comida.nombre}">
        <div class="card-body py-2 px-3">
          <h6 class="card-title mb-1">${comida.nombre}</h6>
          <p class="card-text mb-2">${comida.descripcion} <br> Stock: ${comida.categoria}</p>
        
        </div>
      </div>
    `;
    comidasContainer.appendChild(card);    
  })
}

cargarComidas()