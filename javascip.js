let produtos = [];

function carregarProdutos() {
  const produtosSalvos = localStorage.getItem('produtosLimpeza');
  if (produtosSalvos) {
    produtos = JSON.parse(produtosSalvos);
  } else 
    

}


function salvarProdutos() {
  localStorage.setItem('produtosLimpeza', JSON.stringify(produtos));
}


function adicionarProduto(nome, preco, categoria) {
  produtos.push({ nome: nome, preco: parseFloat(preco), categoria: categoria });
  salvarProdutos();
  listarProdutos();
}

function removerProduto(index) {
  produtos.splice(index, 1);
  salvarProdutos();
  listarProdutos();
}

function listarProdutos() {
  const lista = document.getElementById('listaProdutos');
  lista.innerHTML = "";

  produtos.forEach((produto, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${produto.nome} — R$ ${produto.preco.toFixed(2)} — Categoria: ${produto.categoria} <button onclick="removerProduto(${index})">Remover</button>`;
    lista.appendChild(li);
  });
}

carregarProdutos();
listarProdutos();


const form = document.getElementById('formProduto');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const preco = document.getElementById('preco').value.trim();
  const categoria = document.getElementById('categoria').value.trim();

  if (!nome || !preco || !categoria) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  adicionarProduto(nome, preco, categoria);
  form.reset();
});