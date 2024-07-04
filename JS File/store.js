// JavaScript code
const apiUrl = 'api.json';

let pets = [];
let searchOptions = ['dogs', 'cats', 'rabbits', 'turtles'];
let petNames = [];

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    pets = data;
    petNames = pets.map(pet => pet.name.toLowerCase());
  });

const handleButton = (e) => {
  const buttonType = e.target.textContent.toLowerCase();
  const singularType = makeSingular(buttonType);
  displayData(singularType);
};

const handleSearch = (e) => {
  const userInput = e.target.value.toLowerCase();
  checkInput(userInput);
  e.target.value = '';
};

const checkInput = (input) => {
  if (searchOptions.includes(input)) {
    displayData(makeSingular(input));
  } else if (petNames.includes(input)) {
    const pet = pets.find(pet => pet.name.toLowerCase() === input);
    displayData(pet);
  } else {
    console.log('Not found');
  }
};

const displayData = (filter) => {
  const petList = document.getElementById('pet-list');
  petList.innerHTML = '';
  if (filter === 'all') {
    pets.forEach(pet => {
      const petCard = createPetCard(pet);
      petList.appendChild(petCard);
    });
  } else {
    const filteredPets = pets.filter(pet => pet.type === filter);
    filteredPets.forEach(pet => {
      const petCard = createPetCard(pet);
      petList.appendChild(petCard);
    });
  }
};

const createPetCard = (pet) => {
  const petCard = document.createElement('div');
  petCard.className = 'pet-card';
  petCard.innerHTML = `
    <img src="${pet.image}" alt="${pet.name}">
    <h3>${pet.name}</h3>
    <p>${pet.description}</p>
    <p>Price: ${pet.price}</p>
    <p>Ratings: ${pet.ratings}</p>
    <button>Add to Cart</button>
  `;
  return petCard;
};

const makeSingular = (word) => {
  if (word.endsWith('s')) {
    return word.slice(0, -1);
  }
  return word;
};

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const arrayShuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};



// React code
import React, { useState, useEffect } from 'react';

const PetStore = () => {
  const [pets, setPets] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredPets, setFilteredPets] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setPets(data);
      });
  }, []);

  const handleSearch = (e) => {
    const userInput = e.target.value.toLowerCase();
    setSearchInput(userInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkInput(searchInput);
    setSearchInput('');
  };

  const checkInput = (input) => {
    if (searchOptions.includes(input)) {
      setFilteredPets(pets.filter(pet => pet.type === makeSingular(input)));
    } else if (petNames.includes(input)) {
      const pet = pets.find(pet => pet.name.toLowerCase() === input);
      setFilteredPets([pet]);
    } else {
      console.log('Not found');
    }
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="#">Dogs</a></li>
            <li><a href="#">Cats</a></li>
            <li><a href="#">Rabbits</a></li>
            <li><a href="#">Turtles</a></li>
          </ul>
        </nav>
        <div className="search-bar">
          <input type="search" value={searchInput} onChange={handleSearch} />
          <button type="submit" onClick={handleSubmit}>Search</button>
        </div>
      </header>
      <main>
        <section className="pet-grid">
          {filteredPets.map(pet => (
            <div key={pet.id} className="pet-card">
              <img src={pet.image} alt={pet.name} />
              <h3>{pet.name}</h3>
              <p>{pet.description}</p>
              <p>Price: ${pet.price}</p>
<p>Ratings: ${pet.ratings}</p>
<button>Add to Cart</button>
</div>
))}
</section>
</main>
</div>
);
};

export default PetStore;