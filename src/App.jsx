import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Outlet, Routes, Route } from "react-router-dom";
import useLocalStorage from 'use-local-storage';
import { TodoContext } from "./contexts/TodoContext";
import AddTodo from "./pages/AddTodo";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import EditTodo from "./pages/EditTodo";

function Layout() {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Todos</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/add">Add Todo</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}

export default function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="add" element={<AddTodo />} />
            <Route path="todo/:id" element={<EditTodo />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TodoContext.Provider>
  )
}