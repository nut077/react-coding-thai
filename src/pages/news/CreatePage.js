import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
  name: yup.string().required('Name is not blank'),
});

const CreatePage = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    errors,
    formState: { touched },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const res = await axios.post(
      'https://api.codingthailand.com/api/category',
      {
        name: data.name,
      }
    );
    alert(res.data.message);
    history.push('/news');
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12} md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="name">
              <Form.Label>News</Form.Label>
              <Form.Control
                type="text"
                name="name"
                ref={register}
                isInvalid={!!errors.name}
                isValid={touched.name && !!getValues('name')}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePage;
