document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. SISTEMA DE BLOQUEIO E CABEÇALHO (AUTENTICAÇÃO)
    // ==========================================
// Mude de localStorage para sessionStorage aqui:
    const currentUser = sessionStorage.getItem("currentUser");

    if (!currentUser) {
        window.location.href = "templates/login.html"; 
        return; 
    }

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.innerHTML.includes("Login") || link.getAttribute("href").includes("login.html")) {
            link.innerHTML = `<i class="fa fa-user" style="margin-right: 5px;"></i> Olá, ${currentUser}`;
            link.href = "#"; 
            link.title = "Clique para sair da conta";

            link.addEventListener("click", (e) => {
                e.preventDefault();
                if(confirm("Deseja sair da sua conta?")) {
                    // Mude para sessionStorage aqui também:
                    sessionStorage.removeItem("currentUser");
                    window.location.href = "templates/login.html";
                }
            });
        }
    });

    // ==========================================
    // 2. RENDERIZAÇÃO DOS LIVROS E FUNÇÕES DA LOJA
    // ==========================================
    const staticBooks = [
        { title: "1984", price: 29.9, image: "assets/images/1984.jpg" },
        { title: "Capitães da Areia", price: 22.5, image: "assets/images/captains-of-the-sands.jpg" },
        { title: "Moby Dick", price: 37.5, image: "assets/images/moby-dick.jpg" },
        { title: "As 38 Leis do Poder", price: 45.5, image: "assets/images/48-laws-of-power.jpg" },
        { title: "O Pequeno Príncipe", price: 25.0, image: "assets/images/the-little-prince.jpg" }
    ];

    const bookContainer = document.getElementById("books-container");

    function renderBooks() {
        // Buscamos os favoritos atualizados toda vez que renderizamos
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        bookContainer.innerHTML = "";

        staticBooks.forEach((book, index) => {
            // Verificamos se o livro está nos favoritos pelo TÍTULO
            const isFavorite = favorites.some(fav => fav.title === book.title);
            
            const card = document.createElement("div");
            card.className = "book-card";
            
            card.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>Preço: R$ ${book.price.toFixed(2)}</p> 
                <button class="btn" onclick="addToCart(${index})">Comprar</button>
                <div class="favorite-icon ${isFavorite ? "active" : ""}" 
                     onclick="toggleFavorite(this, ${index})">
                  &#10084;
                </div>
            `;
            bookContainer.appendChild(card);
        });
    }

    window.addToCart = (index) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(staticBooks[index]);
        localStorage.setItem("cart", JSON.stringify(cart));

        const buttons = document.querySelectorAll(".btn");
        const currentButton = buttons[index];
        const originalText = currentButton.innerText;

        currentButton.innerText = "Adicionado!";
        // Caso queira um efeito no botão, pode manter essas classes (certifique-se de tê-las no CSS)
        currentButton.classList.add("success", "btn-added-anim");

        setTimeout(() => {
            currentButton.innerText = originalText;
            currentButton.classList.remove("success", "btn-added-anim");
        }, 1000);
    };

    window.toggleFavorite = (element, index) => {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const book = staticBooks[index];
        
        // Procura se o livro já está na lista pelo título
        const favIndex = favorites.findIndex(item => item.title === book.title);
        
        if (favIndex === -1) {
            favorites.push(book); // Salva o objeto completo
            element.classList.add("active");
        } else {
            favorites.splice(favIndex, 1);
            element.classList.remove("active");
        }
        
        localStorage.setItem("favorites", JSON.stringify(favorites));
    };

    renderBooks();
});