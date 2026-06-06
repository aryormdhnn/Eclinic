import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      updateLegacyStorage(session?.user);
      setLoading(false);
    });

    // Listen to changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      updateLegacyStorage(session?.user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateLegacyStorage = (userObj) => {
    if (userObj) {
      const username = userObj.user_metadata?.username || userObj.email.split('@')[0];
      localStorage.setItem('loggedInUser', JSON.stringify({ 
        username, 
        email: userObj.email 
      }));
    } else {
      localStorage.removeItem('loggedInUser');
    }
  };

  // Legacy compat
  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, isAuthenticated: !!user, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};