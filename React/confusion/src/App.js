import Menu from './components/MenuComponent'
import {Navbar, NavbarBrand} from 'reactstrap'

function App() {
  return (
    <div className="App">
      <Navbar dark color="secondary">
        <div className='container'>
          <NavbarBrand href="/">My Ristorante</NavbarBrand>
        </div>
      </Navbar>
        <Menu />
    </div>
  );
}

export default App;
