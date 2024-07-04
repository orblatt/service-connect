import { useEffect, useState } from 'react'
import { getUserById, useQuery } from 'wasp/client/operations'

export function useUserDetails (userId: number, userType: 'Provider' | 'Owner') {
    const [username, setUsername] = useState(`No ${userType}`);
    const [email, setEmail] = useState('');
    const { data: user, error } = useQuery(getUserById, { userId }, [userId]);
  
    useEffect(() => {
      if (error) {
        setUsername(`No ${userType} (Error)`);
      } else if (!user) {
        setUsername(`No ${userType}`);
      } else {
        const userEmail = (user as any)?.auth?.identities[0]?.providerUserId;
        setEmail(userEmail || '');
        setUsername(typeof userEmail === 'string' && userEmail && email.split('@').length > 0 ? userEmail.split('@')[0] : '');
      }
    }, [user, error, userType]);
  
    return {username, email};
  }