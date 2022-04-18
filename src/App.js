import { Route, Switch, Redirect } from "react-router-dom";

import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <StartPage></StartPage>
      </Route>
      <Route path="/:name/:wordId" exact>
        <GamePage />
      </Route>
      <Route path="/*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
