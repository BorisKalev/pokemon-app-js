const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const resultContainer = document.getElementById("pokemon-details");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const pokeImg = document.getElementById("sprite");

const colours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};


const listOfPokemons = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const findPokemon = (data, data2) => {
  let find = false;
  data.results.forEach((pokemon) => {
  const inputId = parseInt(searchInput.value);
  const inputName = searchInput.value.toLowerCase();
    const { id, name, url } = pokemon; 
    if(id === inputId || name.toLowerCase() === inputName){
      console.log(`Pokemon ID: ${id}, Name: ${name}, URL: ${url}`);
      find =true;
      const capPokeName = data2.name.toUpperCase();


      pokemonName.textContent = capPokeName;
      pokemonId.textContent =  "#" + id;
      weight.textContent = "Weight: "+data2.weight;
      height.textContent = "Height: "+data2.height;
      pokeImg.src = data2.sprites.front_default;
      types.textContent = data2.types.name;

      data2.types.forEach((typeObj) => {
        const typeName = typeObj.type.name;
        const typeColor = colours[typeName];
        
        const typeSpan = document.createElement("span");
        typeSpan.textContent = typeName.toUpperCase();
        typeSpan.style.backgroundColor = typeColor;
  
        
        types.appendChild(typeSpan); 
      }); 
  
      hp.textContent = data2.stats[0].base_stat;
      attack.textContent = data2.stats[1].base_stat;
      defense.textContent = data2.stats[2].base_stat;
      specialAttack.textContent = data2.stats[3].base_stat;
      specialDefense.textContent = data2.stats[4].base_stat;
      speed.textContent = data2.stats[5].base_stat;
    }
    
  });
  
   
  
  if(!find){
    alert("Pokemon not found");
  }
}

const updateUrl = (url) => {
  return `${url}/${searchInput.value.toLowerCase()}`;
};

const fetchData = async () => {
  try {
    const specificPokemonUrl = updateUrl(listOfPokemons);
    const res = await fetch(listOfPokemons);
    const data = await res.json();
    const res2 = await fetch(specificPokemonUrl);
    const data2 = await res2.json();
    findPokemon(data, data2);
  } catch (err) {
    alert("Pokemon not found");
  }
};

searchBtn.addEventListener("click", fetchData);