export default ({ env }) => ({
  upload: {
    config: {
      provider: 'strapi-provider-upload-supabase',
      providerOptions: {
        apiUrl: env('SUPABASE_API_URL'),
        apiKey: env('SUPABASE_API_KEY'),
        bucket: env('SUPABASE_BUCKET'),
        directory: env('SUPABASE_DIRECTORY')
      }
    }
  },
  'vercel-deploy': {
    enabled: true,
    config: {
      deployHook: env('VERCEL_DEPLOYHOOK'),
      apiToken: env('VERCEL_APITOKEN'),
      appFilter: env('VERCEL_APPFILTER'),
      teamFilter: env('VERCEL_TEAMFILTER'),
      roles: ['strapi-super-admin', 'strapi-editor', 'strapi-author']
    }
  }
})
