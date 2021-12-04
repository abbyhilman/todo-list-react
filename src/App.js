import "./App.css";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import MyNavbar from "./component/MyNavbar";
import TodoPage from "./pages/TodoPage";

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <TodoPage />
    </div>
  );
}

export default App;
