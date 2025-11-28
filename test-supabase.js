import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nhjvpycrxiriawcswqqw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oanZweWNyeGlyaWF3Y3N3cXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4ODMwNjIsImV4cCI6MjA3OTQ1OTA2Mn0.FvVNsM5NqpFTd_StfGHuL3cGMEeroySsE9x_r_Y8eGQ'

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
