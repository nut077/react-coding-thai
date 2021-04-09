import { Button } from 'react-bootstrap';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { useMutation, useQueryClient } from 'react-query';
import TopBarProgress from 'react-topbar-progress-indicator';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import styles from './News.module.css';

const News = ({ id, name, goPage }) => {
  const queryClient = useQueryClient();
  const { addToast } = useToasts();

  const removeNews = async (id) => {
    //const isConfirm = window.confirm(`Do you want to delete news id ${id}?`);
    //if (isConfirm === true) {
    const res = await axios.delete(
      `https://api.codingthailand.com/api/category/${id}`
    );
    addToast(res.data.message, {
      appearance: 'success',
    });
  };

  const { mutateAsync, isLoading: mutateIsLoading } = useMutation(removeNews);

  const remove = async (id) => {
    await mutateAsync(id);
    await queryClient.invalidateQueries('news');
  };

  const confirmRemove = async (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className={styles.customUi}>
            <h4>Do you want to delete news id {id}</h4>
            <button
              onClick={() => {
                remove(id);
                onClose();
              }}
            >
              OK
            </button>
            &nbsp;
            <button onClick={onClose}>Cancel</button>
          </div>
        );
      },
    });
  };

  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{name}</td>
      <td>
        <Button
          className="ml-2"
          variant="outline-info"
          size="sm"
          onClick={() => goPage(`/news/edit/${id}`)}
        >
          <BsPencil />
        </Button>
        {mutateIsLoading && <TopBarProgress />}
        <Button
          className="ml-2"
          variant="outline-danger"
          size="sm"
          onClick={() => confirmRemove(id)}
        >
          <BsTrash />
        </Button>
      </td>
    </tr>
  );
};

export default News;
