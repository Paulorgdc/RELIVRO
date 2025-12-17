document.addEventListener("DOMContentLoaded", () => {
  const livrosFixos = [
    {
      titulo: "Dom Casmurro",
      preco: 19.9,
      imagem:
        "https://images.tcdn.com.br/img/img_prod/1271663/dom_casmurro_189_1_0386b5369c5ad64fd1779fe57ced0b1c.jpg",
    },
    {
      titulo: "O Pequeno Príncipe",
      preco: 25.0,
      imagem: "O Pequeno Principe.jpg",
    },
    {
      titulo: "1984",
      preco: 29.9,
      imagem: "1984.jpg",
    },
    {
      titulo: "Capitães da Areia",
      preco: 22.5,
      imagem: "Capitães da Areia.jpg",
    },
    {
      titulo: "Criptomoedas",
      preco: 22.5,
      imagem:
        "https://m.media-amazon.com/images/I/41TB3Du70CL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      titulo: "As 48 leis do poder",
      preco: 45.5,
      imagem: "As 48 leis do poder.jpg",
    },
    {
      titulo: "A Dança dos Dragões",
      preco: 83.9,
      imagem:
        "https://super.abril.com.br/wp-content/uploads/2024/09/91gIftSmvhL._SL1500_.jpg?quality=70&strip=info&w=1024",
    },
    {
      titulo: "O alquimista",
      preco: 39.9,
      imagem: "https://m.media-amazon.com/images/I/81slUinjTlS.jpg",
    },
    {
      titulo: "Odisseia",
      preco: 45.49,
      imagem:
        "https://m.media-amazon.com/images/I/71YQ4CvEWgL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      titulo: "Hamlet",
      preco: 99.9,
      imagem:
        "https://cdn.kobo.com/book-images/695eb39e-9405-4c4b-8267-302344f0f5f7/1200/1200/False/hamlet-15.jpg",
    },
    {
      titulo: "Moby Dick",
      preco: 37.5,
      imagem: "Moby Dick.jpg",
    },
    {
      titulo: "Menino Maluqinho",
      preco: 29.9,
      imagem:
        "https://books.google.com.br/books/publisher/content?id=ziTpEAAAQBAJ&hl=pt-BR&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U12QWV--ezggbGQhBZwjfL1p88c2g&w=1280",
    },
    {
      titulo: "The Last Of Us I",
      preco: 117.95,
      imagem: "https://m.media-amazon.com/images/I/918rQ9CXFfL._SY466_.jpg",
    },
    {
      titulo: "O alienista",
      preco: 42.99,
      imagem:
        "https://books.google.com.br/books/publisher/content?id=DKFJEAAAQBAJ&hl=pt-BR&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U0iPI1udvXR6xsY0xw99FkK1Vbzhg&w=1280",
    },
  ];

  const livrosCadastrados = JSON.parse(localStorage.getItem("livros")) || [];
  const livros = livrosFixos.concat(livrosCadastrados);
  const container = document.getElementById("livrosContainer");

  // Recupera favoritos do localStorage
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  function salvarFavoritos() {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }

  function toggleFavorito(index) {
    const idLivro = index; // Usando índice como id
    const pos = favoritos.indexOf(idLivro);
    if (pos === -1) {
      favoritos.push(idLivro);
    } else {
      favoritos.splice(pos, 1);
    }
    salvarFavoritos();
    renderizarLivros();
  }

  function renderizarLivros() {
    container.innerHTML = "";
    livros.forEach((livro, index) => {
      const isFavorito = favoritos.includes(index);
      const div = document.createElement("div");
      div.className = "livro";
      div.style.position = "relative";
      div.style.border = "1px solid #ccc";
      div.style.padding = "10px";
      div.style.margin = "10px";
      div.style.width = "200px";
      div.style.textAlign = "center";
      div.style.borderRadius = "8px";
      div.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
      div.innerHTML = `
        <img src="${livro.imagem}" alt="${
        livro.titulo
      }" style="width: 100%; height: auto; border-radius: 4px;">
        <h3>${livro.titulo}</h3>
        <p>Preço: R$ ${livro.preco.toFixed(2)}</p>
        <button class="btn" onclick="adicionarAoCarrinho(${index})" 
          style="
            background-color: #2e7d32; 
            color: white; 
            border: none; 
            border-radius: 4px; 
            padding: 8px 12px; 
            cursor: pointer;
            width: 100%;
            font-weight: bold;
          ">
          Comprar
        </button>
        <div class="favoritar" data-index="${index}" 
          style="
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 28px;
            cursor: pointer;
            color: ${isFavorito ? "#e53935" : "#bbb"};
            user-select: none;
            transition: color 0.3s ease;
            ">
          &#10084;
        </div>
      `;
      container.appendChild(div);
    });

    // Adiciona evento aos corações
    document.querySelectorAll(".favoritar").forEach((coracao) => {
      coracao.addEventListener("click", () => {
        const index = parseInt(coracao.getAttribute("data-index"));
        toggleFavorito(index);
      });
    });
  }

  renderizarLivros();

  window.adicionarAoCarrinho = function (index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push(livros[index]);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert("Livro adicionado ao carrinho!");
  };
});
