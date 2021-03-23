import { useCallback } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios, { CancelToken } from 'axios';
import { useQuery, useMutation } from 'react-query';
import TopBarProgress from 'react-topbar-progress-indicator';
import ErrorPage from '../ErrorPage';

const EditNewsPage = () => {
  const { id } = useParams();
  const history = useHistory();

  const schema = yup.object().shape({
    name: yup.string().required('Name is not blank'),
  });

  const {
    register,
    handleSubmit,
    errors,
    getValues,
    setValue,
    formState: { touched },
  } = useForm({
    resolver: yupResolver(schema),
    shouldUnregister: false,
  });

  const fetchNews = useCallback(async () => {
    const source = CancelToken.source();
    const promise = await axios.get(
      `https://api.codingthailand.com/api/category/${id}`,
      {
        cancelToken: source.token,
      }
    );
    promise.cancel = () => {
      source.cancel('Query was cancelled by React Query');
    };
    setValue('name', promise.data.name);
    return promise;
  }, [id, setValue]);

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const editNews = async (data) => {
    const res = await axios.put('https://api.codingthailand.com/api/category', {
      id,
      name: data.name,
    });
    alert(res.data.message);
    history.push('/news');
  };

  const mutation = useMutation(editNews);

  const { isLoading, error } = useQuery(['EditNewsPage', id], fetchNews);

  if (error) {
    return <ErrorPage error={error.message} />;
  }
  if (isLoading || mutation.isLoading) {
    return <TopBarProgress />;
  }

  if (mutation.isError) {
    return <ErrorPage error={mutation.error.message} />;
  }

  const goBack = () => {
    history.goBack();
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
            &nbsp;
            <Button variant="secondary" onClick={goBack}>
              Back
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditNewsPage;
