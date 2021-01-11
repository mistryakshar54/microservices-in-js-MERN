import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import useRequest from '../../hooks/useRequest';
import { useRouter } from 'next/router';
import Layout from '../../UI/layout';

export default () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const router = useRouter();
    const { doResponse , isLoading, errors } = useRequest('/api/users/auth/signin', 'post' ,{ email, password }, ()=>{ router.push('/'); });
    const handleSumbit = async( e ) => {
      e.preventDefault();
      doResponse();
    }
  return (     
    <Layout>
      <Form onSubmit={handleSumbit}>
        <h1>Sign In</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" value={email}  onChange={ e => setEmail( e.target.value) } placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control value={password}  onChange={ e => setPassword( e.target.value) } type="password" placeholder="Password" />
        </Form.Group>
        { isLoading && <h2>Loading...</h2> }
        { errors?.length > 0 && 
          <Alert variant='danger'>
              {errors.map( err => err.message )}
          </Alert> 
        }
        <Button variant="primary" type="submit">
          SignIn
        </Button>
      </Form>
    </Layout>
  );
};
