import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { clearCredentials } from '../slices/authSlice.js';
import { useLogoutMutation } from '../slices/usersApiSlice.js';
import { toast } from 'react-toastify';

const Header = () => {

	const userInfo = useSelector((state) => state.auth);


	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [logoutApiCall] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(clearCredentials());
			navigate('/');
		} catch (err) {
			toast.error(err?.data?.message || err.message);
		}
	};
	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand href='/'>ToDo</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ms-auto'>
              {userInfo ? (<><NavDropdown title={userInfo.name} id='username'><LinkContainer to='/profile'><NavDropdown.Item>Profile</NavDropdown.Item></LinkContainer><NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item></NavDropdown></>) : (<><LinkContainer to='/login'><Nav.Link><FaSignInAlt /> Sign In</Nav.Link></LinkContainer><LinkContainer to='/register'><Nav.Link><FaSignOutAlt /> Sign Up</Nav.Link></LinkContainer></>)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};
export default Header;
