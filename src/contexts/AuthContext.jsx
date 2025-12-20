import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import PageLoader from '../components/PageLoader';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setCurrentUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setCurrentUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signup = async (email, password, firstName, lastName) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                },
            },
        });
        if (error) throw error;
        return data;
    };

    const login = async (email, password) => {
        // Check for Admin Credentials
        if (email === 'admin@nyayasetu.in' && password === 'admin@123') {
            const adminUser = {
                id: 'admin-user',
                email: 'admin@nyayasetu.in',
                user_metadata: {
                    first_name: 'Admin',
                    last_name: 'User'
                },
                role: 'admin'
            };
            setCurrentUser(adminUser);
            return { user: adminUser, session: { user: adminUser } };
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    };

    const logout = async () => {
        if (currentUser?.role === 'admin') {
            setCurrentUser(null);
            return;
        }
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };

    const updateUser = async (updatedData) => {
        if (currentUser?.role === 'admin') {
            // Mock update for admin
            setCurrentUser(prev => ({
                ...prev,
                user_metadata: {
                    ...prev.user_metadata,
                    first_name: updatedData.firstName,
                    last_name: updatedData.lastName
                }
            }));
            return;
        }

        const { data, error } = await supabase.auth.updateUser({
            data: {
                first_name: updatedData.firstName,
                last_name: updatedData.lastName,
            }
        });
        if (error) throw error;
        return data;
    };

    const value = {
        currentUser: currentUser ? {
            ...currentUser,
            firstName: currentUser.user_metadata?.first_name,
            lastName: currentUser.user_metadata?.last_name,
            email: currentUser.email,
            isAdmin: currentUser.role === 'admin'
        } : null,
        signup,
        login,
        logout,
        updateUser
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? <PageLoader /> : children}
        </AuthContext.Provider>
    );
}
