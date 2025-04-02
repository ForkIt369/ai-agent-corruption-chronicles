# Squarespace DNS Configuration for Vercel

This guide provides instructions for configuring DNS settings in Squarespace to point your domain to your Vercel deployment.

## Prerequisites

- A Squarespace account with the corruptchronicles.com domain
- A Vercel account with your project deployed
- Access to the Squarespace domain management settings

## Steps to Configure DNS in Squarespace

### 1. Get DNS Configuration from Vercel

1. Log into your Vercel account
2. Navigate to your project dashboard
3. Go to "Settings" → "Domains"
4. Add your domain (corruptchronicles.com) if you haven't already
5. Vercel will provide DNS configuration instructions, which typically include:
   - A records pointing to Vercel's IP addresses
   - CNAME record for the 'www' subdomain

### 2. Access Squarespace Domain Settings

1. Log into your Squarespace account
2. Go to "Settings" → "Domains"
3. Select corruptchronicles.com
4. Click "Advanced Settings" or "DNS Settings"

### 3. Configure A Records

For each A record provided by Vercel:

1. Click "Add Record" or equivalent
2. Select "A" as the record type
3. For the "Host" field:
   - Use "@" for the root domain (corruptchronicles.com)
   - Or use the specific subdomain if provided by Vercel
4. For the "Data" or "Points to" field, enter the IP address provided by Vercel
5. Set TTL to "Automatic" or "3600" (1 hour)
6. Save the record

Typical Vercel A records look like:

| Type | Host | Data           | TTL    |
|------|------|----------------|--------|
| A    | @    | 76.76.21.21    | 3600   |

### 4. Configure CNAME Record for www Subdomain

1. Click "Add Record" or equivalent
2. Select "CNAME" as the record type
3. For the "Host" field, enter "www"
4. For the "Data" or "Points to" field, enter "cname.vercel-dns.com" or the value provided by Vercel
5. Set TTL to "Automatic" or "3600" (1 hour)
6. Save the record

The CNAME record should look like:

| Type  | Host | Data                | TTL    |
|-------|------|---------------------|--------|
| CNAME | www  | cname.vercel-dns.com | 3600   |

### 5. Verify DNS Configuration

1. Return to Vercel's domain settings
2. Vercel will automatically check if the DNS configuration is correct
3. It may take some time for DNS changes to propagate (up to 48 hours, but often much faster)
4. Once verified, your site will be accessible at corruptchronicles.com

## Troubleshooting

### DNS Propagation Delay

- DNS changes can take time to propagate across the internet
- You can check propagation status using tools like [whatsmydns.net](https://www.whatsmydns.net/)

### Squarespace Domain Lock

- Squarespace may have a domain lock feature that prevents external DNS changes
- If you encounter issues, check if there's a domain lock and disable it

### HTTPS/SSL Issues

- Vercel automatically provisions SSL certificates for your domain
- If you see SSL warnings after setup, it may be due to:
  - Incomplete DNS propagation
  - Incorrect DNS configuration
  - Vercel's SSL certificate still being provisioned

### Conflicting DNS Records

- Remove any conflicting DNS records in Squarespace
- Particularly, remove any existing A or CNAME records that point to Squarespace servers

## Additional Resources

- [Vercel Domain Documentation](https://vercel.com/docs/concepts/projects/domains)
- [Squarespace DNS Settings Help](https://support.squarespace.com/hc/en-us/articles/205812348-Advanced-DNS-settings)
- [DNS Propagation Checker](https://www.whatsmydns.net/)
