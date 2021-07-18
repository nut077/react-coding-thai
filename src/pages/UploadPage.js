import { Button, Col, Container, Form, FormGroup, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';
import ErrorPage from './ErrorPage';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';

const SUPPORT_IMAGE_FORMATS = ['image/jpg', 'image/jpeg'];

const UploadPage = () => {
  const history = useHistory();
  const { addToast } = useToasts();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const upload = (data) => {
    try {
      const fileUpload = data.picture[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileUpload);
      reader.onload = async (e) => {
        const base64Image = e.target.result;
        const res = await axios.post(
          'https://api.codingthailand.com/api/upload',
          {
            picture: base64Image,
          }
        );
        addToast(res.data.data.message, {
          appearance: 'success',
        });
        history.push('/');
      };
    } catch (err) {
      addToast(err, {
        appearance: 'error',
        autoDismissTimeout: 3000,
      });
    }
  };

  const mutation = useMutation(upload);

  if (mutation.isLoading) {
    return <TopBarProgress />;
  }

  if (mutation.isError) {
    return <ErrorPage error={mutation.error.message} />;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <h1>Upload file</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Form.Control
                type="file"
                name="picture"
                {...register('picture', {
                  required: 'Picture is require',
                  validate: {
                    checkFileType: (value) =>
                      value && SUPPORT_IMAGE_FORMATS.includes(value[0].type),
                  },
                })}
                className={`${errors.picture ? 'is-invalid' : ''}`}
              />
              {errors.picture && errors.picture.type === 'required' && (
                <div className="invalid-feedback">{errors.picture.message}</div>
              )}
              {errors.picture && errors.picture.type === 'checkFileType' && (
                <div className="invalid-feedback">File type use .jpg only</div>
              )}
            </FormGroup>
            <Button variant="primary" type="submit">
              Upload
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadPage;
