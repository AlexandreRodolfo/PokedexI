document.addEventListener("DOMContentLoaded", function (event) {catchQuantidade(150)});

var total = document.getElementById('quantidade');
total.addEventListener('keyup', () => {catchQuantidade(total.value)})

function catchQuantidade(quantidade) {
    //garante que a quantidade seja sempre válida independente do input
    quantidade = (quantidade <= 0 || quantidade == '') ? 0 : quantidade
    //evita um bug que fazia a pokeball ativar e desativar o scroll da página
    document.body.style.overflowY = (quantidade > 0) ? 'visible' : 'hidden'
    api = 'https://pokeapi.co/api/v2/pokemon?limit=' + quantidade
    fetch(api).then(response => response.json()).then(allPokemon => {
        var pokemons = [];
        //results é uma informacao da pokeAPI
        allPokemon.results.map((val) => {
            //precisamos fazer outro fetch para a url para pegarmos as informacoes
            //que contem a imagem do pokemon
            fetch(val.url).then(response => response.json()).then(pokeSingle => {
                pokemons.push({ nome: val.name, imagem: pokeSingle.sprites.front_default, id: pokeSingle.id })
                var pokeBoxes = document.querySelector('.pokemon-boxes')
                if (pokemons.length == quantidade) {
                    //concluido as requisicoes
                    pokeBoxes.innerHTML = ""

                    pokemons.map((val) => {
                        pokeBoxes.innerHTML += `
                    <div class="poke-box">
                        <img src="`+ val.imagem + `">
                        <p>`+ "#" + val.id + " " + val.nome + `</p>
                    </div>
                    `})

                } else {
                    pokeBoxes.innerHTML = `
                    <div class="center-on-page" id="loadingBall">
                        <div class="pokeball">
                            <div class="pokeball__button"></div>
                        </div>
                    </div>
                    `
                }
            })
        })
    });
}
