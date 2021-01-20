import React from 'react';
import './App.css';

function App() {
  const [pong, setPong] = React.useState(null)

  React.useEffect(() => {
    (async () => {
      // Solo cuando carga por primera vez hacemos GET a /ping
      const response = await fetch('/ping')
      const result = await response.json()
      setPong(result)
    })()
  }, [setPong])

  return (
    <div className="App">
      <header className="App-header">
        {!pong && <p>loading...</p>}
        {pong && (
          <p>
            {JSON.stringify(pong, null, 2)}
          </p>

        )}
      </header>
    </div>
  );
}

export default App;
