import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";



function App() {
  const [ repos, setRepos ] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "Novo repo",
      url: "Pedro",
      techs: "React"
    });

    const project = response.data;

    setRepos([...repos, project]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepos(repos.filter(repo => repo.id !== id));
  }

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepos(response.data);
    })
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => 
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={()=> handleAddRepository()}>Adicionar</button>
    </div>
  );
}

export default App;