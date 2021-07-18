import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import TopBarProgress from 'react-topbar-progress-indicator';
import Loader from 'react-loader-spinner';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import ErrorPage from '../ErrorPage';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Format email incorrect')
    .required('Email is not blank'),
  password: yup.string().required('Password is not blank'),
});

const LoginForm = ({
  onFormSubmit,
  defaultValues,
  isLoading,
  isError,
  error,
}) => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { touchedFields, errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  if (isError) {
    return <ErrorPage error={error.message} />;
  }

  const onSubmit = handleSubmit((data) => {
    onFormSubmit(data);
  });

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12} md={8}>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label htmlFor="name">Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                id="email"
                {...register('email')}
                isInvalid={!!errors.email}
                isValid={touchedFields.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="name">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                {...register('password')}
                isInvalid={!!errors.password}
                isValid={touchedFields.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              {isLoading ? (
                <>
                  <TopBarProgress />
                  <Loader type="ThreeDots" color="#fff" height={10} />
                </>
              ) : (
                'Login'
              )}
            </Button>
            &nbsp;
            <Button variant="secondary" onClick={() => history.goBack()}>
              Back
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
