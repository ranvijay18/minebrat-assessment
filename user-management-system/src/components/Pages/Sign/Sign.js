import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Sign(props) {

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
       
        const userObj = {
            name: e.target.name.value,
            phone: e.target.phone.value,
            email: e.target.email.value,
            password: e.target.password.value,
            address: e.target.address.value,
            address2: e.target.address2.value,
            city: e.target.city.value,
            state: e.target.state.value,
            pincode: e.target.pincode.value,
        }

       const res = await axios.post("http://localhost:7000/new-user", userObj);
       alert(res.data.message);
       props.onSign(res.data.status);
       navigate('/login')
    }
  return (
    <div>
    <h3 className='text-center mt-3'>Register</h3>
    <div className='container card xm-5 p-3'>
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
      <Form.Group as={Col}>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" placeholder="Enter your name" />
        </Form.Group>

        <Form.Group as={Col}>
        <Form.Label>Phone</Form.Label>
        <Form.Control type="number" name="phone" placeholder="Enter your phone number" />
      </Form.Group>
      </Row>

    <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" />
        </Form.Group>
      </Row>

      

      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control name="address" placeholder="1234 Main St" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Address 2</Form.Label>
        <Form.Control name="address2" placeholder="Apartment, studio, or floor" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>City</Form.Label>
          <Form.Control name="city" placeholder='City' />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>State</Form.Label>
          <Form.Control name="state" placeholder='State' />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Pincode</Form.Label>
          <Form.Control type="number" name="pincode" placeholder='110030'/>
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
   
    </div>

  );
}

export default Sign;