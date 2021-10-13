window.onload = function() {
    const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

    search_input = getElement('.search-input');
    search_button = getElement('.search-button');
    content = getElement('.pokemon');
    error_message = getElement('.error');

    var pokemon_name;
    var pokemon;
    var card_item;

    search_button.addEventListener('click', event => {
        pokemon_name = search_input.value.toLowerCase().trim();
        start_app(pokemon_name);
    });

    function start_app(pokemon_name) {
        request_api(BASE_URL, pokemon_name);

        setTimeout(function() {
            //erro
            if(pokemon.detail) {
                error_message.style.display = 'block';
                content.style.display = 'none';
            } else {    
            //sucesso
                error_message.style.display = 'none';
                content.style.display = 'flex';
                content.innerHTML = create_content();
            } 
        }, 2000);
    }

    function create_content() {
        card_item = `
        <div class="pokemon_picture">
        <img src="${pokemon.sprites.front_default}" alt="Imagem do ${pokemon.name}">
        </div>
        <div class="pokemon_info">
        <h1 class="name">Nome: ${pokemon.name}</h1>
        <h2 class="number">Número: ${pokemon.id}</h2>
        <h3 class="type">Tipo: ${pokemon.types.map(item => ' ' + item.type.name).toString()}</h3>
        <h3 class="weight">Peso: ${pokemon.weight / 100}kg</h3>
        <h3 class="height">Altura: ${pokemon.height / 100}m</h3>
        </div>
        `;

        return card_item;
    }

    function request_api(url, pokemon_name) {
        fetch(url + pokemon_name)
        .then(response => response.json())
        .then(data => {
            pokemon = data;
        })
        .catch(err => console.log(err));
    }
}

function getElement(element) {
    return document.querySelector(element);
}