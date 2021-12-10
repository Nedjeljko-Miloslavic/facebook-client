import Login from "./pages/Login";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Register from "./pages/Register";
import Main from "./pages/Main";
import Friends from "./pages/Friends";


function App() {
  return (
	<Router>
		<div className="App">
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/main" component={Main} />
				<Route exact path="/friends" component={Friends} />
			</Switch>
		</div>
	</Router>
    
  );
}

export default App;
