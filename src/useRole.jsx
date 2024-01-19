import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from './AuthProvider';
import axios from 'axios';

const useRole = () => {
  const { user, loading } = useContext(AuthContext);
  const { data: role, isLoading } = useQuery({
    queryKey: ['role',user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axios(`https://brainy-boa-shoulder-pads.cyclic.app/users/${user?.email}`);
      return res.data.role;
    },
  })
  return [role, isLoading]
}

export default useRole
