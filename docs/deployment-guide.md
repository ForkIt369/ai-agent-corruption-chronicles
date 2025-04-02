# Deployment Guide for AI Agent Corruption Chronicles

This guide outlines the steps to deploy the AI Agent Corruption Chronicles application to Vercel and connect it to the corruptchronicles.com domain.

## Prerequisites

- GitHub repository with the application code
- Vercel account (connected to GitHub)
- Squarespace account with the corruptchronicles.com domain
- API keys for Anthropic and Fal.ai

## Deployment Steps

### 1. Prepare the Application for Production

- Update security headers in `next.config.js` (already done)
- Ensure all environment variables are properly referenced in the code
- Test the application locally with `npm run build` and `npm run start`

### 2. Deploy to Vercel

1. **Log into Vercel**
   - Go to [vercel.com](https://vercel.com) and log in with your GitHub account

2. **Import the Repository**
   - Click "Add New..." → "Project"
   - Select the AI Agent Corruption Chronicles repository
   - Configure the project:
     - Framework Preset: Next.js
     - Root Directory: Leave default (repository root)
     - Build Command: `next build` (auto-detected)
     - Output Directory: `.next` (auto-detected)

3. **Configure Environment Variables**
   - Add the following environment variables:
     ```
     ANTHROPIC_API_KEY=[your-anthropic-key]
     FinalAlith=[your-fal-api-key]
     NEXT_PUBLIC_APP_URL=https://corruptchronicles.com
     ```
   - For future Supabase integration, add these variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://ucltqlluxgaqojasrqhl.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjbHRxbGx1eGdhcW9qYXNycWhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1OTM4MzAsImV4cCI6MjA1OTE2OTgzMH0.11QtjY5Z3MpqHgVenqTiUUnqAzgdyBJ-i3gNuKa6Sws
     SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjbHRxbGx1eGdhcW9qYXNycWhsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzU5MzgzMCwiZXhwIjoyMDU5MTY5ODMwfQ.xkLlu6pgRMiRe4nicOvITSdyIUfFetOJkbFtBIDRwVA
     ```

4. **Deploy the Project**
   - Click "Deploy" to start the deployment process
   - Wait for the build and deployment to complete

### 3. Connect the Domain

1. **Add Domain in Vercel**
   - Go to the project settings in Vercel
   - Navigate to "Domains"
   - Add "corruptchronicles.com" as your domain
   - Vercel will provide DNS configuration instructions

2. **Update DNS at Squarespace**
   - Log into your Squarespace account
   - Navigate to the domain management section
   - Add the DNS records provided by Vercel:
     - A records pointing to Vercel's IP addresses
     - CNAME record for the 'www' subdomain
   - Wait for DNS propagation (can take up to 48 hours, but often much faster)

3. **Verify Domain Connection**
   - Vercel will automatically check the DNS configuration
   - Once verified, your site will be accessible at corruptchronicles.com

## Continuous Deployment

- The application is set up for continuous deployment
- Any changes pushed to the main branch will automatically trigger a new deployment
- Preview deployments are created for pull requests

## Future Supabase Integration

When ready to implement Supabase for data persistence:

1. **Create Database Schema**
   - Run the SQL commands in `scripts/supabase-schema.sql` in the Supabase SQL editor

2. **Update Code**
   - Modify `sessionManager.js` to use the Supabase client instead of localStorage
   - The `supabaseClient.js` file is already prepared with example functions

## Troubleshooting

- **Build Failures**: Check the build logs in Vercel for specific errors
- **Domain Issues**: Verify DNS configuration and check for propagation
- **API Key Problems**: Ensure environment variables are correctly set in Vercel

## Security Considerations

- API keys are stored as environment variables in Vercel
- Security headers are configured in `next.config.js`
- For Supabase integration, Row Level Security (RLS) policies are defined in the schema

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Documentation](https://supabase.io/docs)
- [Squarespace DNS Settings](https://support.squarespace.com/hc/en-us/articles/205812348-Advanced-DNS-settings)
