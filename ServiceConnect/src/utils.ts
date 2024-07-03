import { useEffect, useState } from 'react'
import { getUserById, useQuery } from 'wasp/client/operations'

export function useUserDetails (userId: number, userType: 'Provider' | 'Owner') {
    const [username, setUsername] = useState(`No ${userType}`);
    const { data: user, error } = useQuery(getUserById, { userId }, [userId]);
  
    useEffect(() => {
      if (error) {
        setUsername(`No ${userType} (Error)`);
      } else if (!user) {
        setUsername(`No ${userType}`);
      } else {
        const email = (user as any)?.auth?.identities[0]?.providerUserId;
        setUsername(email ? email.split('@')[0] : '');
      }
    }, [user, error, userType]);
  
    return username;
  }