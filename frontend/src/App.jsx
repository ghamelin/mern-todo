import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
	return (
		<>
			<Header />
			<Container className="my-2">
				<ToastContainer />
				<Outlet />
			</Container>
		</>
	);
};

export default App;
