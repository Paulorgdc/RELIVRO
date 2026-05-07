document.addEventListener("DOMContentLoaded", () => {
  const staticBooks = [
    {
      title: "1984",
      price: 29.9,
      image: "assets/images/1984.jpg",
    },
    {
      title: "Capitães da Areia",
      price: 22.5,
      image: "assets/images/captains-of-the-sands.jpg",
    },
    {
      title: "Moby Dick",
      price: 37.5,
      image: "assets/images/moby-dick.jpg",
    },
    {
      title: "As 38 Leis do Poder",
      price: 45.5,
      image: "assets/images/48-laws-of-power.jpg",
    },
    {
      title: "O Pequeno Príncipe",
      price: 25.0,
      image: "assets/images/the-little-prince.jpg",
    },
  ];

  const bookContainer = document.getElementById("books-container");
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  function renderBooks() {
    bookContainer.innerHTML = "";
    staticBooks.forEach((book, index) => {
      const isFavorite = favorites.includes(index);
      const card = document.createElement("div");
      card.className = "book-card";
      
      card.innerHTML = `
        <img src="${book.image}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p>Preço: R$ ${book.price.toFixed(2)}</p> 
        <button class="btn" onclick="addToCart(${index})">Comprar</button>
        <div class="favorite-icon ${isFavorite ? 'active' : ''}" 
             onclick="toggleFavorite(${index})">
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
    alert("Livro adicionado ao carrinho!");
  };

  renderBooks();
});

