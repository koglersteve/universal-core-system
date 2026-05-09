// Frontend stub — prevents Next.js from requiring @supabase/supabase-js

export function createSupabaseBrowserClient() {
  return {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
    },
  };
}
