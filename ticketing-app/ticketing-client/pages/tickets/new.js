import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import useRequest from '../../hooks/useRequest';
import { useRouter } from 'next/router';
import Layout from '../../UI/layout';

export default () => {
    const [ title, setTitle ] = useState("");
    const [ price, setPrice ] = useState(0);
    const router = useRouter();
    const { doResponse , isLoading, errors } = useRequest('/api/tickets', 'post' ,{ title, price }, ()=>{ });
    const handleSumbit = async( e ) => {
      e.preventDefault();
      doResponse();
    }
  return (     
    <Layout>
      <Form className='col-12 d-flex flex-column align-items-start' onSubmit={handleSumbit}>
        <h1>Create Ticket</h1>
        <Form.Group controlId="formBasictitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title}  onChange={ e => setTitle( e.target.value) } placeholder="Enter title" />
        </Form.Group>

        <Form.Group controlId="formBasicprice">
          <Form.Label>Price</Form.Label>
          <Form.Control value={price} min={0} onChange={ e => setPrice( e.target.value) } type="number" placeholder="Price" />
        </Form.Group>
        { isLoading && <h2>Loading...</h2> }
        { errors?.length > 0 && 
          <Alert variant='danger'>
              {errors.map( err => err.message )}
          </Alert> 
        }
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Layout>
  );
};
