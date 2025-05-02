document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.sidebar ul li a');
    const searchInput = document.querySelector('#searchInput');
    const iframe = document.querySelector('iframe[name="content-frame"]');
    const searchResults = document.querySelector('.search-results');
      // Base de datos de productos
    const productos = {
        abarrotes: [
            { nombre: 'Arroz', precio: 4.80, descripcion: 'Arroz premium de alta calidad', imagen: '../BODEGAVASQUEZ/images/abarrotes1.jpeg' },
            { nombre: 'Azúcar', precio: 7.90, descripcion: 'Azúcar blanca refinada', imagen: '../BODEGAVASQUEZ/images/abarrotes2.jpeg' },
            { nombre: 'Lentejas', precio: 12.99, descripcion: 'Lentejas selectas', imagen: '../BODEGAVASQUEZ/images/abarrote3.jpg' },
            { nombre: 'Alverjas', precio: 8.99, descripcion: 'Alverjas verdes frescas', imagen: '../BODEGAVASQUEZ/images/abarrotes4.jpg' }
        ],
        bebidas: [
            { nombre: 'Coca Cola', precio: 7.50, descripcion: 'Gaseosa refrescante', imagen: '../BODEGAVASQUEZ/images/bebidas1.jpg' },
            { nombre: 'Inca Kola', precio: 7.50, descripcion: 'Bebida nacional', imagen: '../BODEGAVASQUEZ/images/bebidas2.jpg' },
            { nombre: 'Agua mineral', precio: 2.50, descripcion: 'Agua natural sin gas', imagen: '../BODEGAVASQUEZ/images/bebidas3.jpg' },
            { nombre: 'Cerveza', precio: 6.00, descripcion: 'Cerveza rubia', imagen: '../BODEGAVASQUEZ/images/bebidas4.jpg' }
        ],
        snacks: [
            { nombre: 'Doritos', precio: 2.50, descripcion: 'Snacks de maíz', imagen: '../BODEGAVASQUEZ/images/snacks1.jpg' },
            { nombre: 'Papitas Lay\'s', precio: 2.00, descripcion: 'Papas fritas', imagen: '../BODEGAVASQUEZ/images/snacks2.jpg' },
            { nombre: 'Chizitos', precio: 1.00, descripcion: 'Snacks de maíz', imagen: '../BODEGAVASQUEZ/images/snacks3.jpeg' },
            { nombre: 'Galletas Oreo', precio: 1.50, descripcion: 'Galletas de chocolate', imagen: '../BODEGAVASQUEZ/images/snacks4.jpg' }
        ],
        aseo: [
            { nombre: 'Jabón', precio: 3.50, descripcion: 'Jabón de tocador', imagen: '../BODEGAVASQUEZ/images/aseo1.jpg' },
            { nombre: 'Shampoo', precio: 12.90, descripcion: 'Shampoo para todo tipo de cabello', imagen: '../BODEGAVASQUEZ/images/aseo2.jpg' },
            { nombre: 'Papel higiénico', precio: 15.90, descripcion: 'Papel higiénico suave', imagen: '../BODEGAVASQUEZ/images/aseo3.jpg' },
            { nombre: 'Pasta dental', precio: 4.50, descripcion: 'Crema dental con flúor', imagen: '../BODEGAVASQUEZ/images/aseo4.jpg' }
        ],
        revistas: [
            { nombre: 'Diario El Comercio', precio: 3.50, descripcion: 'Periódico nacional', imagen: '../BODEGAVASQUEZ/images/revistas1.jpg' },
            { nombre: 'Revista Caretas', precio: 8.00, descripcion: 'Revista de actualidad', imagen: '../BODEGAVASQUEZ/images/revistas2.jpg' },
            { nombre: 'Diario Trome', precio: 1.00, descripcion: 'Periódico popular', imagen: '../BODEGAVASQUEZ/images/revistas3.jpg' },
            { nombre: 'Revista Somos', precio: 5.00, descripcion: 'Revista de actualidad', imagen: '../BODEGAVASQUEZ/images/revistas4.jpeg' }
        ]
    };

    // Función para actualizar el ítem activo
    function setActiveMenuItem(activeItem) {
        menuItems.forEach(item => item.classList.remove('active'));
        activeItem.classList.add('active');
    }

    // Eventos para los items del menú
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            setActiveMenuItem(this);
            searchInput.value = ''; // Limpiar búsqueda al cambiar de categoría
            clearSearchResults(); // Limpiar resultados
            
            iframe.style.opacity = 0;
            setTimeout(() => {
                iframe.style.opacity = 1;
            }, 300);
        });
    });

    function clearSearchResults() {
        const existingResults = document.querySelector('.search-results');
        if (existingResults) {
            existingResults.remove();
        }
        iframe.style.display = 'block';
    }

    function createSearchResults() {
        clearSearchResults();
        const resultsDiv = document.createElement('div');
        resultsDiv.className = 'search-results';
        resultsDiv.style.cssText = `
            padding: 20px;
            background: white;
            border-radius: 8px;
            margin: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        `;
        return resultsDiv;
    }

    // Búsqueda de productos
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm.length < 2) {
            clearSearchResults();
            return;
        }

        const resultsDiv = createSearchResults();
        let found = false;

        // Buscar en todos los productos
        for (const [categoria, items] of Object.entries(productos)) {
            const matchingProducts = items.filter(product => 
                product.nombre.toLowerCase().includes(searchTerm) ||
                product.descripcion.toLowerCase().includes(searchTerm)
            );

            if (matchingProducts.length > 0) {
                found = true;
                const categoriaTitle = document.createElement('h3');
                categoriaTitle.textContent = categoria.toUpperCase();
                categoriaTitle.style.color = '#d03b40';
                categoriaTitle.style.marginTop = '20px';
                resultsDiv.appendChild(categoriaTitle);

                matchingProducts.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.className = 'producto-resultado';                    productDiv.style.cssText = `
                        padding: 15px;
                        border-bottom: 1px solid #eee;
                        margin: 15px 0;
                        display: flex;
                        align-items: center;
                        gap: 20px;
                        background: #fff;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    `;                    productDiv.innerHTML = `
                        <img src="${product.imagen}" alt="${product.nombre}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;">
                        <div style="flex: 1;">
                            <h4 style="color: #333; margin-bottom: 8px;">${product.nombre}</h4>
                            <p style="color: #666; font-size: 14px; margin-bottom: 8px;">${product.descripcion}</p>
                            <p style="color: #d03b40; font-weight: bold; font-size: 16px;">S/. ${product.precio.toFixed(2)}</p>
                        </div>
                    `;
                    
                    // Hacer el div clickeable y mostrar el modal
                    productDiv.style.cursor = 'pointer';                        // Ver detalles al hacer clic en el producto
                    productDiv.addEventListener('click', () => {
                        // Crear el modal
                        const modalOverlay = document.createElement('div');
                        modalOverlay.className = 'modal-overlay';
                        modalOverlay.style.cssText = `
                            position: fixed;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: rgba(0, 0, 0, 0.7);
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            z-index: 1000;
                        `;

                        const modalContent = document.createElement('div');
                        modalContent.className = 'modal-content';
                        modalContent.style.cssText = `
                            background: white;
                            padding: 20px;
                            border-radius: 8px;
                            max-width: 500px;
                            width: 90%;
                            position: relative;
                            animation: modalAppear 0.3s ease;
                        `;

                        modalContent.innerHTML = `
                            <button class="close-button" style="
                                position: absolute;
                                top: 10px;
                                right: 10px;
                                background: none;
                                border: none;
                                font-size: 24px;
                                cursor: pointer;
                                color: #666;
                            ">&times;</button>
                            <div style="text-align: center;">
                                <img src="${product.imagen}" alt="${product.nombre}" style="
                                    max-width: 300px;
                                    height: auto;
                                    margin-bottom: 20px;
                                    border-radius: 8px;
                                ">
                                <h2 style="color: #333; margin-bottom: 10px;">${product.nombre}</h2>
                                <p style="color: #666; margin-bottom: 15px;">${product.descripcion}</p>
                                <p style="color: #d03b40; font-size: 24px; font-weight: bold;">S/. ${product.precio.toFixed(2)}</p>
                                <button class="add-to-cart" style="
                                    background: #4CAF50;
                                    color: white;
                                    border: none;
                                    padding: 10px 20px;
                                    border-radius: 5px;
                                    cursor: pointer;
                                    margin-top: 15px;
                                ">Agregar al carrito</button>
                            </div>
                        `;

                        modalOverlay.appendChild(modalContent);
                        document.body.appendChild(modalOverlay);

                        // Cerrar modal al hacer clic en el botón de cerrar o fuera del modal
                        const closeButton = modalContent.querySelector('.close-button');
                        closeButton.addEventListener('click', () => modalOverlay.remove());
                        modalOverlay.addEventListener('click', (e) => {
                            if (e.target === modalOverlay) modalOverlay.remove();
                        });

                        // Agregar estilos de animación al documento si no existen
                        if (!document.querySelector('#modal-animations')) {
                            const style = document.createElement('style');
                            style.id = 'modal-animations';
                            style.textContent = `
                                @keyframes modalAppear {
                                    from { opacity: 0; transform: translateY(-20px); }
                                    to { opacity: 1; transform: translateY(0); }
                                }
                            `;
                            document.head.appendChild(style);
                        }

                        // Evento para el botón de agregar al carrito
                        const addToCartButton = modalContent.querySelector('.add-to-cart');
                        addToCartButton.addEventListener('click', () => {
                            alert('Producto agregado al carrito');
                        });
                        
                    });
                    resultsDiv.appendChild(productDiv);
                });
            }
        }

        if (!found) {
            resultsDiv.innerHTML = '<p style="text-align: center; color: #666;">No se encontraron productos que coincidan con la búsqueda</p>';
        }

        // Ocultar el iframe y mostrar los resultados
        iframe.style.display = 'none';
        iframe.parentNode.appendChild(resultsDiv);
    });

    // Marcar el primer ítem como activo por defecto
    if (menuItems.length > 0) {
        setActiveMenuItem(menuItems[0]);
    }
});
