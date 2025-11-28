import { createClient } from '@supabase/supabase-js'

import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
    console.log('Testing Supabase connection...')
    try {
        const { data, error } = await supabase.from('test').select('*').limit(1)
        // We expect an error if table doesn't exist, but connection should work.
        // Or we can check auth.

        const { data: authData, error: authError } = await supabase.auth.getSession()

        if (authError) {
            console.error('Auth Error:', authError)
        } else {
            console.log('Auth Connection Successful. Session:', authData.session ? 'Active' : 'None')
        }

    } catch (err) {
        console.error('Unexpected error:', err)
    }
}

testConnection()
