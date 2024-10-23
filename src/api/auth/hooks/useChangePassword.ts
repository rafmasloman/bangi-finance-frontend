import { useMutation } from '@tanstack/react-query';
import authServiceApi from '../AuthService';
import { useNavigate, useParams } from 'react-router-dom';
import { DIRECTOR_USER_PAGE } from '../../../constants/pages-route';

export const useChangePassword = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return useMutation({
    mutationFn: authServiceApi.changePassword,
    onSuccess() {
      navigate(`${DIRECTOR_USER_PAGE}/${id}/account-setting`);
    },
  });
};
