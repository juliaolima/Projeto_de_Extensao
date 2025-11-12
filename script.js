// Base de dados simulada (poderia vir de um arquivo JSON ou banco real)
const baseDeLivros = [
  { titulo: "Dom Casmurro", autor: "Machado de Assis" },
  { titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry" },
  { titulo: "1984", autor: "George Orwell" },
  { titulo: "A Revolução dos Bichos", autor: "George Orwell" },
  { titulo: "O Hobbit", autor: "J.R.R. Tolkien" },
  { titulo: "Capitães da Areia", autor: "Jorge Amado" },
  { titulo: "O Alquimista", autor: "Paulo Coelho" },
  { titulo: "Cem Anos de Solidão", autor: "Gabriel García Márquez" },
  { titulo: "Grande Sertão: Veredas", autor: "João Guimarães Rosa" },
  { titulo: "Os Lusíadas", autor: "Luís de Camões" },
  { titulo: "Memórias Póstumas de Brás Cubas", autor: "Machado de Assis" },
  { titulo: "O Cortiço", autor: "Aluísio Azevedo" },
  { titulo: "Ensaio sobre a Cegueira", autor: "José Saramago" },
  { titulo: "O Apanhador no Campo de Centeio", autor: "J.D. Salinger" },
  { titulo: "Orgulho e Preconceito", autor: "Jane Austen" },
  { titulo: "Crime e Castigo", autor: "Fiódor Dostoiévski" },
  { titulo: "Guerra e Paz", autor: "Liev Tolstói" },
  { titulo: "Madame Bovary", autor: "Gustave Flaubert" },
  { titulo: "A Metamorfose", autor: "Franz Kafka" },
  { titulo: "O Processo", autor: "Franz Kafka" },
  { titulo: "O Nome da Rosa", autor: "Umberto Eco" },
  { titulo: "O Senhor dos Anéis: A Sociedade do Anel", autor: "J.R.R. Tolkien" },
  { titulo: "Beloved", autor: "Toni Morrison" },
  { titulo: "To Kill a Mockingbird", autor: "Harper Lee" },
  { titulo: "Moby-Dick", autor: "Herman Melville" },
  { titulo: "Frankenstein", autor: "Mary Shelley" },
  { titulo: "Drácula", autor: "Bram Stoker" },
  { titulo: "O Retrato de Dorian Gray", autor: "Oscar Wilde" },
  { titulo: "A Casa dos Espíritos", autor: "Isabel Allende" },
  { titulo: "A Revolta de Atlas", autor: "Ayn Rand" },
  { titulo: "Norwegian Wood", autor: "Haruki Murakami" },
  { titulo: "Kafka à Beira-Mar", autor: "Haruki Murakami" },
  { titulo: "O Estrangeiro", autor: "Albert Camus" },
  { titulo: "As Vinhas da Ira", autor: "John Steinbeck" },
  { titulo: "O Velho e o Mar", autor: "Ernest Hemingway" },
  { titulo: "Sapiens: Uma Breve História da Humanidade", autor: "Yuval Noah Harari" },
  { titulo: "O Poder do Hábito", autor: "Charles Duhigg" },
  { titulo: "Como Fazer Amigos e Influenciar Pessoas", autor: "Dale Carnegie" },
  { titulo: "A Menina que Roubava Livros", autor: "Markus Zusak" }
];

function verificarLivro() {
  const input = document.getElementById("nomeLivro").value.trim().toLowerCase();
  const resultadoDiv = document.getElementById("resultado");

  if (input === "") {
    resultadoDiv.innerHTML = "Por favor, digite o nome do livro.";
    resultadoDiv.className = "resultado";
    return;
  }

  // Procura se o livro existe na base
  const livroEncontrado = baseDeLivros.find(livro =>
    livro.titulo.toLowerCase() === input
  );

  if (livroEncontrado) {
    resultadoDiv.className = "resultado encontrado";
    resultadoDiv.innerHTML = `<div>✅ Livro encontrado: <br><b>${escapeHtml(livroEncontrado.titulo)}</b><br><span class="livro-meta">Autor: ${escapeHtml(livroEncontrado.autor)}</span></div>`;

    // cria botão Excluir para o livro encontrado
    const btnExcluir = document.createElement('button');
    btnExcluir.type = 'button';
    btnExcluir.textContent = 'Excluir';
    btnExcluir.className = 'btn-delete';
    btnExcluir.style.marginTop = '8px';
    btnExcluir.addEventListener('click', () => {
      excluirLivro(livroEncontrado.titulo);
    });
    resultadoDiv.appendChild(btnExcluir);
  } else {
    resultadoDiv.innerHTML = "❌ Livro não encontrado na base do sebo.";
    resultadoDiv.className = "resultado nao-encontrado";
  }
}

// Excluir livro da base simulada por título (case-insensitive)
function excluirLivro(titulo) {
  const idx = baseDeLivros.findIndex(l => l.titulo.toLowerCase() === titulo.toLowerCase());
  const resultadoDiv = document.getElementById("resultado");
  const mensagemDiv = document.getElementById("cadastroResultado");

  if (idx === -1) {
    if (resultadoDiv) {
      resultadoDiv.textContent = 'Livro não encontrado para exclusão.';
      resultadoDiv.className = 'resultado nao-encontrado';
    }
    return;
  }

  if (!confirm(`Confirma exclusão do livro "${titulo}"?`)) return;

  baseDeLivros.splice(idx, 1);
  renderLista();

  if (resultadoDiv) {
    resultadoDiv.textContent = `🗑️ Livro "${titulo}" excluído.`;
    resultadoDiv.className = 'resultado';
  }
  if (mensagemDiv) {
    clearTimeout(mensagemDiv._timeoutId);
    mensagemDiv.textContent = `🗑️ Livro "${titulo}" excluído.`;
    mensagemDiv._timeoutId = setTimeout(() => { mensagemDiv.textContent = ''; }, 3000);
  }
}

/* utilitário simples para evitar injeção no DOM */
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Função para renderizar lista (se houver um container com id="listaLivros")
function renderLista() {
  const lista = document.getElementById("listaLivros");
  if (!lista) return;

  // pega critério de ordenação (por título ou autor)
  const ordenarPorSelect = document.getElementById("ordenarPor");
  const sortKey = ordenarPorSelect ? ordenarPorSelect.value : "titulo";

  // cria cópia e ordena sem mutação da base original
  const ordenada = [...baseDeLivros].sort((a, b) =>
    a[sortKey].localeCompare(b[sortKey], "pt", { sensitivity: "base" })
  );

  lista.innerHTML = "";
  ordenada.forEach(l => {
    const item = document.createElement("div");
    item.className = "livro-item";
    item.innerHTML = `<div><b>${l.titulo}</b></div><div class="livro-meta">${l.autor}</div>`;
    lista.appendChild(item);
  });
}

// Função para cadastrar novo livro (usa inputs com ids novoTitulo e novoAutor)
function cadastrarLivro() {
  const tituloInput = document.getElementById("novoTitulo");
  const autorInput = document.getElementById("novoAutor");
  const mensagem = document.getElementById("cadastroResultado");

  if (!tituloInput || !autorInput) {
    console.warn("Inputs para cadastro não encontrados (ids: novoTitulo, novoAutor).");
    return;
  }

  const titulo = tituloInput.value.trim();
  const autor = autorInput.value.trim();

  if (titulo === "" || autor === "") {
    if (mensagem) {
      mensagem.textContent = "Preencha título e autor antes de cadastrar.";
      mensagem.classList.remove("fade-out");
      // limpa mensagem automaticamente também se quiser
      clearTimeout(mensagem._timeoutId);
      mensagem._timeoutId = setTimeout(() => {
        mensagem.classList.add("fade-out");
        // remove texto após transição (600ms)
        setTimeout(() => (mensagem.textContent = ""), 650);
      }, 5000);
    }
    return;
  }

  // Verifica duplicata por título (case-insensitive)
  const existe = baseDeLivros.some(l => l.titulo.toLowerCase() === titulo.toLowerCase());
  if (existe) {
    if (mensagem) {
      mensagem.textContent = "Livro já existe na base.";
      mensagem.classList.remove("fade-out");
      clearTimeout(mensagem._timeoutId);
      mensagem._timeoutId = setTimeout(() => {
        mensagem.classList.add("fade-out");
        setTimeout(() => (mensagem.textContent = ""), 650);
      }, 5000);
    }
    return;
  }

  // Adiciona novo livro
  baseDeLivros.push({ titulo, autor });

  // Atualiza UI
  if (mensagem) {
    mensagem.textContent = `✅ Livro cadastrado: ${titulo} — ${autor}`;
    mensagem.classList.remove("fade-out");
    // limpa timeout anterior se houver
    clearTimeout(mensagem._timeoutId);
    // faz a mensagem desaparecer depois de 5 segundos
    mensagem._timeoutId = setTimeout(() => {
      mensagem.classList.add("fade-out");
      // remove texto após transição (600ms)
      setTimeout(() => (mensagem.textContent = ""), 650);
    }, 5000);
  }

  tituloInput.value = "";
  autorInput.value = "";
  renderLista();
}

// Inicializa lista ao carregar, se houver container e adiciona listener de ordenação
document.addEventListener("DOMContentLoaded", () => {
  renderLista();
  const ordenarPorSelect = document.getElementById("ordenarPor");
  if (ordenarPorSelect) {
    ordenarPorSelect.addEventListener("change", renderLista);
  }
});