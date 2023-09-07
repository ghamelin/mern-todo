import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice.js';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../slices/usersApiSlice.js';
import Loader from '../components/Loader.jsx';

const ProfileScreen = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');

	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.auth);
	const [updateUser, { isLoading }] = useUpdateUserMutation();

	useEffect(() => {
		if(!userInfo) return;
		if(!userInfo.name) return;
		setFirstName(userInfo.name.firstName);
		setLastName(userInfo.name.lastName);
		setEmail(userInfo.email);
		console.log('userInfo: ', userInfo);
	}, [
		userInfo.setFirstName,
		userInfo.setEmail,
		userInfo.setLastName,
		userInfo.email,
		userInfo,
	]);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (!firstName || !lastName || !email) {
			toast.error('All fields are required');
		} else {
			try {
				const res = await updateUser({
					_id: userInfo._id,
					firstName,
					lastName,
					email,
				}).unwrap();
				const user = {
					_id: userInfo._id,
					firstName: res.user.name.first_name,
					lastName: res.user.name.last_name,
					email: res.user.emails[0].email,
				};
				setEmail(user.email || '');
				setFirstName(user.firstName || '');
				setLastName(user.lastName || '');
				dispatch(setCredentials(user));
				toast.success('User profile updated');
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	return (
		<FormContainer>
			<h1>Update Profile</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group className='my-2' controlId='Name'>
					<Form.Label>First Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter First Name'
						value={firstName || ''}
						onChange={(e) =>
							setFirstName(e.target.value)
						}></Form.Control>
				</Form.Group>
				<Form.Group className='my-2' controlId='Name'>
					<Form.Label>Last Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Last Name'
						value={lastName || ''}
						onChange={(e) =>
							setLastName(e.target.value)
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

				{isLoading && <Loader />}

				<Button type='submit' variant='primary' className='mt-3'>
					Update
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ProfileScreen;
