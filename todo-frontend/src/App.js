import React, { useState, useEffect } from 'react';
import './App.css'; // Assurez-vous de créer ce fichier CSS

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Récupérer les todos
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fonction pour récupérer les todos
  const fetchTodos = () => {
    setLoading(true);
    fetch('http://localhost:5000/todos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        return response.json();
      })
      .then(data => {
        setTodos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the todos!", error);
        setError("Impossible de charger les tâches");
        setLoading(false);
      });
  };

  // Ajouter un todo
  const handleAddTodo = () => {
    if (todoText.trim()) {
      fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: todoText }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur réseau');
          }
          return response.json();
        })
        .then(data => {
          setTodos([...todos, data]);
          setTodoText('');
        })
        .catch(error => {
          console.error("There was an error adding the todo!", error);
          setError("Impossible d'ajouter la tâche");
        });
    }
  };

  // Supprimer un todo
  const handleDeleteTodo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        // Filtrer le todo supprimé du state
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the todo!", error);
        setError("Impossible de supprimer la tâche");
      });
  };

  // Commencer à modifier un todo
  const startEditing = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.text);
  };

  // Annuler la modification
  const cancelEditing = () => {
    setEditingId(null);
    setEditText('');
  };

  // Sauvegarder la modification
  const saveEdit = (id) => {
    if (editText.trim()) {
      fetch(`http://localhost:5000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: editText }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur réseau');
          }
          return response.json();
        })
        .then(updatedTodo => {
          // Mettre à jour le todo dans le state
          setTodos(todos.map(todo => 
            todo._id === id ? updatedTodo : todo
          ));
          setEditingId(null);
          setEditText('');
        })
        .catch(error => {
          console.error("There was an error updating the todo!", error);
          setError("Impossible de modifier la tâche");
        });
    }
  };

  // Gérer la touche Entrée dans l'input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-content">
          <div className="logo">
            <span className="logo-icon">📋</span>
            <h1 className="app-title">TodoList</h1>
          </div>
          
          {/* Bouton menu mobile */}
          <button 
            className="menu-toggle"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          >
            {mobileSidebarOpen ? <span>✕</span> : <span>☰</span>}
          </button>
          
          {/* Menu desktop */}
          <nav className="desktop-menu">
            <a href="#" className="menu-item">Accueil</a>
       
          </nav>
        </div>
      </header>
      
      {/* Menu mobile */}
      {mobileSidebarOpen && (
        <div className="mobile-menu">
          <a href="#" className="mobile-menu-item">Accueil</a>
         
        </div>
      )}
      
      <main className="main-content">
        <div className="container">
          {/* Carte principale */}
          <div className="card main-card">
            <h2 className="card-title">Mes tâches</h2>
            
            {/* Champ d'ajout */}
            <div className="add-todo-container">
              <div className="input-group">
                <input 
                  type="text" 
                  value={todoText} 
                  onChange={(e) => setTodoText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ajouter une nouvelle tâche..." 
                  className="todo-input"
                />
                <button 
                  onClick={handleAddTodo}
                  className="add-button"
                >
                  <span>+</span>
                  <span>Ajouter</span>
                </button>
              </div>
            </div>
            
            {/* Affichage des todos */}
            {loading ? (
              <div className="loading-message">
                <p>Chargement des tâches...</p>
              </div>
            ) : error ? (
              <div className="error-message">
                {error}
              </div>
            ) : todos.length === 0 ? (
              <div className="empty-message">
                <p>Aucune tâche pour le moment</p>
              </div>
            ) : (
              <ul className="todo-list">
                {todos.map(todo => (
                  <li key={todo._id} className="todo-item">
                    {editingId === todo._id ? (
                      <div className="edit-container">
                        <input 
                          type="text" 
                          value={editText} 
                          onChange={(e) => setEditText(e.target.value)} 
                          className="edit-input"
                          autoFocus
                        />
                        <div className="edit-buttons">
                          <button 
                            onClick={() => saveEdit(todo._id)} 
                            className="save-button"
                          >
                            Enregistrer
                          </button>
                          <button 
                            onClick={cancelEditing} 
                            className="cancel-button"
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="todo-checkbox">⭘</span>
                        <span className="todo-text">{todo.text}</span>
                        <div className="todo-actions">
                          <button 
                            onClick={() => startEditing(todo)} 
                            className="edit-button"
                          >
                            ✎
                          </button>
                          <button 
                            onClick={() => handleDeleteTodo(todo._id)} 
                            className="delete-button"
                          >
                            🗑️
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Carte d'information */}
          <div className="card info-card">
            <h3 className="info-title">Informations</h3>
            <p className="info-text">
              Cette application TodoList vous permet de gérer facilement vos tâches quotidiennes.
              Ajoutez simplement de nouvelles tâches dans le champ ci-dessus.
              Vous pouvez modifier une tâche en cliquant sur l'icône crayon ou la supprimer avec l'icône corbeille.
            </p>
          </div>
        </div>
      </main>
      
      <footer className="footer">
        <div className="footer-content">
          <p>TodoList App &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;