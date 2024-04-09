import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const obj = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        
        const res = await axios.post("http://localhost:7000/user", obj);

        if(res.data.status){
            navigate('/')
        }
    }

  return (
    <div>
        <h3 className='text-center mt-3'>Login</h3>
        <div className='container card xm-5 p-3'>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password' placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </div>
    </div>

  );
}

export default Login;