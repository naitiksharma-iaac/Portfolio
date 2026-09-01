# Deploying the active static portfolio to Hostinger

The active site requires no build and no Node.js environment.

## Upload

1. Open `static-portfolio/`.
2. Copy everything inside that directory, including `.htaccess`, directly into Hostinger `public_html/`.
3. Confirm that `public_html/index.html` exists. Do not upload the enclosing `static-portfolio` directory itself.
4. Enable SSL and Force HTTPS in Hostinger.
5. Purge Hostinger cache after replacing an earlier site.

The deployed structure begins as follows:

```text
public_html/
  .htaccess
  index.html
  bio.html
  contact.html
  404.html
  project-template.html
  projects/
    charge-pavilion.html
  assets/
    css/style.css
    js/site.js
    images/projects/...
```

## Local check

Open `static-portfolio/index.html` directly in a browser. All internal navigation and project assets use relative paths and work without a local server.

## Add a project

Duplicate `project-template.html` or an existing file in `projects/`, update its relative asset paths as needed, replace the HTML content and local images, and add its composition/link manually to `index.html`.
