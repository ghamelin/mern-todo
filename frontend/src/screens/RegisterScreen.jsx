import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import { toast } from 'react-toastify';
import Loader from '../components/Loader.jsx';

const RegisterScreen = () => {
  const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.auth);

	const [register, { isLoading }] = useRegisterMutation();

	useEffect(() => {
		if (userInfo) {
			navigate('/');
		}
	}, [userInfo, navigate]);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error('Passwords do not match');
			return;
		} else {
			try {
				const res = await register({ name, email, password }).unwrap();
				dispatch(setCredentials({...res}));
				toast.success('User registration successful');
				navigate('/');

			} catch (err) {
				toast.error(err?.data?.message || err.error.message);
			}
		}
	};
	return (
		<FormContainer>
			<h1>Register</h1>
			<Form onSubmit={submitHandler}>
      <Form.Group className='my-2' controlId='Name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Name'
						value={name}
						onChange={(e) =>
							setName(e.target.value)
						}></Form.Control>
				</Form.Group>
        
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

				<Form.Group className='my-2' controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter Password'
						value={password}
						onChange={(e) =>
							setPassword(e.target.value)
						}></Form.Control>
				</Form.Group>

				<Form.Group className='my-2' controlId='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm Password'
						value={confirmPassword}
						onChange={(e) =>
							setConfirmPassword(e.target.value)
						}></Form.Control>
				</Form.Group>

					{isLoading && <Loader />}
					
        <Button type="submit" variant="primary" className="mt-3">
          Register
        </Button>
        <Row className="py-3">
          <Col>
            Already have an account? <Link to="/register">Sign In</Link>
          </Col>
        </Row>
			</Form>
		</FormContainer>
	);
};

export default RegisterScreen
