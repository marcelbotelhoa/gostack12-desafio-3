import React, { useState, useEffect } from 'react';

import api from './services/api.js'
import Header from './components/Header.js';

import "./styles.css";


function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('projects', {
      title: `Desafio 3 ${Date.now()}`,
      owner: "Marcel3"
    });

    const repository = response.data;

    setRepositories([...repositories, repository])

    console.log(repositories)
  }

  async function handleRemoveRepository(id) {
    repositories.splice(id, 1)

    setRepositories([...repositories])
  }

  return (
    <div>
      <ul data-testid="repository-list">

        <li>
          <Header title="Repositorios" />

          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li>
      </ul>

      <button type="button" onClick={() => handleAddRepository()}>
        Adicionar
      </button>

      <ul>
        {repositories.map(repository => <li key={repository.id} >{repository.title}</li>)}
      </ul>
    </div>
  );
}

export default App;
