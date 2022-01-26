import React from 'react';
import UserContext from './context/UserContext';
import LogOptions from './views/LogOptions';

const App = () => {
  const [user, setUser] = React.useState();
  const [isLoggedIn, setIsLoggedIn] = React.useState();
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const userDetails = { user, setUser };

  React.useEffect(() => {
    const username = 'username=';
    const search = document.cookie.search(username);
    if (search !== -1) {
      const startIndex = search + username.length;
      const end = document.cookie.slice(startIndex).search(';') + startIndex;
      setUser(document.cookie.slice(startIndex, end));
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={userDetails}>
        {isLoggedIn ? <Home /> : <LogOptions />}
      </UserContext.Provider>
    </div>
  );
};

export default App;
