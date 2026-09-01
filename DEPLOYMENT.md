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
    above-and-inbetween.html
    arwad-tower-jeddah.html
    biopol-3d-printing.html
    charge-pavilion.html
    circular-hub.html
    configurable-topologies.html
    environmental-studies-sydney.html
    hilton-hotel-nepal.html
    machine-learning-kerf-bending.html
    origami-tree.html
    post-digital-temples.html
    rhizome-space-habitat.html
    structural-studies-dharavi.html
    the-crown-sector-111.html
    the-dunes-udaipur.html
    the-edition-sector-66.html
  assets/
    css/style.css
    js/site.js
    images/projects/...
```

## Local check

Open `static-portfolio/index.html` directly in a browser. All internal navigation and project assets use relative paths and work without a local server.

## Add a project

Duplicate an existing file in `projects/`, or copy `project-template.html` there and change its root path prefix to `../`. Replace the HTML content and local images, then add its composition/link manually to `index.html`.
