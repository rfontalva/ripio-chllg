import React from 'react';
import UserContext from './context/UserContext';
import LogOptions from './views/LogOptions';
import Home from './views/Home';
import AppContext from './context/AppContext';
import AppTitle from './components/AppTitle';

const App = () => {
  const [user, setUser] = React.useState();
  const [isLoggedIn, setIsLoggedIn] = React.useState();
  const [newDeposit, setNewDeposit] = React.useState(false);
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const userDetails = { user, setUser };
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const appDetails = {
    isLoggedIn, setIsLoggedIn, newDeposit, setNewDeposit,
  };

  React.useEffect(() => {
    const username = 'username=';
    const search = document.cookie.search(username);
    if (search !== -1) {
      const startIndex = search + username.length;
      const end = document.cookie.slice(startIndex).search(';') + startIndex;
      const userFound = document.cookie.slice(startIndex, end);
      if (userFound !== 'undefined') {
        setUser(userFound);
        setIsLoggedIn(true);
      }
    }
  }, []);

  return (
    <div className="App">
      <AppContext.Provider value={appDetails}>
        <UserContext.Provider value={userDetails}>
          {isLoggedIn && <AppTitle />}
          {isLoggedIn ? <Home /> : <LogOptions />}
        </UserContext.Provider>
      </AppContext.Provider>
    </div>
  );
};

export default App;
