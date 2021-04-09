import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Loader from 'react-loader-spinner';
import TopBarProgress from 'react-topbar-progress-indicator';
import ErrorPage from '../ErrorPage';

const schema = yup.object().shape({
  name: yup.string().required('Name is not blank'),
});

const NewsForm = ({
  defaultValues,
  onFormSubmit,
  isLoading,
  isError,
  error,
}) => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    errors,
    formState: { touched },
    getValues,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    onFormSubmit(data);
  });

  if (isError) {
    return <ErrorPage error={error.message} />;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12} md={8}>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label htmlFor="name">News</Form.Label>
              <Form.Control
                type="text"
                name="name"
                id="name"
                ref={register}
                isInvalid={!!errors.name}
                isValid={touched.name && !!getValues('name')}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              {isLoading ? (
                <>
                  <TopBarProgress />
                  <Loader type="ThreeDots" color="#fff" height={10} />
                </>
              ) : (
                'Submit'
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

export default NewsForm;
