# OmnyCMS

A CMS system designed for simplicity of server-side-rendering while enabling building static sites or dynamic apps.

## Running

### AWS

The core application can be deployed using AWS Lambda using API gateway and a Cloudfront distribution. It is recommended to put static assets into an S3 bucket and have them served via Cloudfront.

### Locally

The CMS including serving static assets can be run using koa

## Site structure

### Page patterns
Pages can either be configured to a specific URL or for a prefix e.g. blogs/*. For efficiency sake prefixes can only be directly under the root so the module should handle dealing with loading appropriately.

### Static Assets

