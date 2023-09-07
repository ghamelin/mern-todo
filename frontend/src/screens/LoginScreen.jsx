import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import { toast } from 'react-toastify';
import Loader from '../components/Loader.jsx';

const LoginScreen = () => {
	const [email, setEmail] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login, { isLoading }] = useRegisterMutation();

	const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		if (userInfo) {
			navigate('/');
		}
	}, [userInfo, navigate]);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			if (!email) {
				toast.error('Email is required');
				return;
			}
			const res = await login({ email }).unwrap();
			toast.success('Check your email for the login link');
			navigate('/');
		} catch (err) {
			toast.error(err?.data?.message || err.error.message);
			
		}
	};
	return (
		<>
			<FormContainer>
				<h1>Sign In</h1>

				<Form onSubmit={submitHandler}>
					<Form.Group className='my-2' controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							value={email}
							onChange={(e) =>
								setEmail(e.target.value)
							}></Form.Control>
					</Form.Group>
							{isLoading && <Loader /> }
					<Button type='submit' variant='primary' className='mt-3'>
						Sign In
					</Button>
				</Form>
				<Row className='py-3'>
					<Col>
						New Customer? <Link to='/register'> Register </Link>
					</Col>
				</Row>
				
			</FormContainer>
		</>
	);
};
export default LoginScreen;
