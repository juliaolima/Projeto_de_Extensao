// Base de dados simulada (poderia vir de um arquivo JSON ou banco real)
const baseDeLivros = [
  { titulo: "Dom Casmurro", autor: "Machado de Assis" },
  { titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry" },
  { titulo: "1984", autor: "George Orwell" },
  { titulo: "A Revolução dos Bichos", autor: "George Orwell" },
  { titulo: "O Hobbit", autor: "J.R.R. Tolkien" },
  { titulo: "Capitães da Areia", autor: "Jorge Amado" },
  { titulo: "O Alquimista", autor: "Paulo Coelho" }
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
    resultadoDiv.innerHTML = `✅ Livro encontrado: <br><b>${livroEncontrado.titulo}</b><br><span class="livro-meta">Autor: ${livroEncontrado.autor}</span>`;
    resultadoDiv.className = "resultado encontrado";
  } else {
    resultadoDiv.innerHTML = "❌ Livro não encontrado na base do sebo.";
    resultadoDiv.className = "resultado nao-encontrado";
  }
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