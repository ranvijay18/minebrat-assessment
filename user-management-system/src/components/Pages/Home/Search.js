import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './Search.css';

function Search() {

  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [visibleItems, setVisibleItems] = useState([])
  const itemsPerPage = 2;
  const totalPages = Math.ceil(users.length / itemsPerPage);


  const getVisibleItems = (users, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setVisibleItems(users.slice(startIndex, endIndex));
  };


    const handleSubmit = async (e) => {
       e.preventDefault();

       console.log(e.target.name.value)

       const obj = {
          name: e.target.name.value,
          pincode: e.target.pincode.value,
          startDate: e.target.startDate.value,
          endDate: e.target.endDate.value
       }

       const res = await axios.post(`http://localhost:7000/search-user`, obj);
       console.log(res.data.details)
       setUsers(res.data.details);

       if(res.data.details.length > 0){
        setCurrentPage(1);
       }
       getVisibleItems(res.data.details, currentPage, itemsPerPage);

    }

    useEffect(() => {
      
    },[users, visibleItems])

    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        getVisibleItems(users, currentPage-1, itemsPerPage);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        getVisibleItems(users, currentPage+1, itemsPerPage);
      }
    };



  return (
    <div>
    <Form className='container card xm-5 p-3 mt-2' onSubmit={handleSubmit}>
      <Row>
        <Col>
        <label>Name</label>
          <Form.Control placeholder="Enter name" name='name'/>
        </Col>
        <Col>
        <label>Pincode</label>
          <Form.Control name='pincode' type='number' placeholder="Enter Pincode" />
        </Col>
        </Row>
        <Row>
        <Col>
        <label>Date</label>
          <Form.Control type="date" name='startDate' placeholder="Last name" />
          </Col>
          <Col>
        <label></label>
          <Form.Control type="date" name='endDate' placeholder="Last name" />
          </Col>
          <Row>
          <Col>
          <Button className='mt-3' type='submit' >Search</Button>
          </Col>
          </Row>

        
 </Row>
    </Form>

    
<table className='container mt-5'>
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Address</th>
    <th>Registration Date</th>
  </tr>
  {visibleItems.map((ele,index) => {
    const dateObject = new Date(ele.createdAt);
    const formattedDate = dateObject.toLocaleDateString('en-US');
  return <tr>
  <td>{ele.name}</td>
  <td>{ele.email}</td>
  <td>{ele.phone}</td>
  <td>
    {ele.address.address}
    <br/>
    {ele.address.address2}
    <br/>
    {ele.address.city}
    <br/>
    {ele.address.state}
    <br/>
    {ele.address.pincode}
  </td>
  <td>{formattedDate}</td>
</tr>
  })}
  
</table>
    <div className="pagination-container text-center mt-3">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>

        <span>Page {currentPage} of {totalPages}</span>

        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
</div>
  );
}

export default Search;