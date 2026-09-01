# Deploying to Hostinger

This portfolio exports as a static website. Hostinger does not need Node.js, a database or a server start command.

## 1. Set the final domain

Copy `.env.example` to `.env.production` and replace the example address:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Use the final `https://` address without a trailing slash. This value controls social-sharing links.

## 2. Build the upload folder

Open a terminal in:

```text
C:\Users\naiti\OneDrive\Documents\NaitikSimplePortfolio
```

Install dependencies after first downloading the project, or whenever `package.json` changes:

```bash
npm install
```

Create the production website:

```bash
npm run build
```

The exact folder to upload is:

```text
C:\Users\naiti\OneDrive\Documents\NaitikSimplePortfolio\out
```

The build is ready when `out/index.html` exists. The build also copies `.htaccess`, `404.html`, `_next`, all media folders, and a folder for every clean page route.

## 3. Upload to `public_html`

1. Open the correct website in Hostinger hPanel.
2. Open **File Manager** and enter `public_html`.
3. Back up any existing site before replacing it.
4. Remove the Hostinger starter `index.php` and old files that belong to this domain.
5. Upload **everything inside `out`** directly into `public_html`.

The result must look like this:

```text
public_html/index.html
public_html/.htaccess
public_html/404.html
public_html/_next/
public_html/images/
public_html/projects/
public_html/resume/
public_html/about/
public_html/contact/
```

Do not upload it as `public_html/out`. `index.html` must be directly inside `public_html`.

For a faster upload, ZIP the **contents** of `out`, upload the ZIP into `public_html`, extract it there, then delete the ZIP. Make sure hidden files are included so `.htaccess` is uploaded.

## 4. Hostinger settings

- Website type: normal custom HTML/PHP hosting
- Document root: `public_html`
- Node.js application: not required
- Database: not required
- SSL: enable the certificate and **Force HTTPS**
- Cache: purge Hostinger cache after each replacement upload

No redirect rule needs to be added in hPanel. The included `public/.htaccess` becomes `out/.htaccess` and handles directory indexes, the custom 404 page, safe headers, compression and asset caching.

### Optional image hotlink protection

Hotlink protection can stop another website from displaying your hosted image files directly while using your bandwidth. It does not make public images impossible to retrieve.

If you want this additional deterrent, add the following rules inside the existing `<IfModule mod_rewrite.c>` section in `public/.htaccess`, immediately after `RewriteBase /` and before the rules that preserve real files. Replace both domain examples with your final domain, then rebuild:

```apache
RewriteCond %{HTTP_REFERER} !^$
RewriteCond %{HTTP_REFERER} !^https?://(www\.)?your-domain\.com/ [NC]
RewriteRule \.(?:jpg|jpeg|png|webp|gif)$ - [F,NC,L]
```

Allowing an empty referrer keeps direct visits, privacy-focused browsers and local testing from being blocked. Test every project page after enabling the rule. Remove it if Hostinger or a CDN already provides hotlink protection or if legitimate images stop loading.

## 5. Test after uploading

Open these pages on the final domain:

```text
/
/projects/
/projects/hilton-hotel-nepal/
/projects/the-crown-sector-111/
/projects/the-dunes-udaipur/
/resume/
/about/
/contact/
/a-page-that-does-not-exist/
```

The first pages should load normally. The final address should show the custom 404 page. Also check the desktop and mobile navigation, project filters, external links, images, GIFs and videos.

## Updating the site later

1. Edit project content in `content/projects.js`, `content/newProfessionalProjects.js` or `content/archiveProjects.js`.
2. Edit résumé data in `content/resume.js`.
3. Edit Aerie Academy teaching content in `content/teaching.js`.
4. Edit name, email and links in `content/site.js`.
5. Put your media in `public/projects/project-slug/images/user/`, `gifs/user/` or `video/user/`.
6. Run `npm run build` again.
7. Replace the old contents of `public_html` with the new contents of `out`.
8. Purge Hostinger cache.

Do not make permanent changes inside `out`; every build recreates it from the project source.

## Common problems

- **Hostinger welcome page appears:** `index.html` is not directly inside `public_html`, or an old default index file remains.
- **A direct project URL gives 404:** upload the complete `projects` folder and confirm `.htaccess` is in `public_html`.
- **Styles or images are missing:** upload `_next`, `images`, `projects` and `experience` at the same level as `index.html`.
- **Old content remains:** purge Hostinger cache and test in a private browser window.
- **Social preview uses the wrong domain:** correct `.env.production`, rebuild, and upload the new `out` contents.

## Hostinger help

- [Using Hostinger File Manager](https://www.hostinger.com/support/4548688-basic-actions-in-the-file-manager-in-hostinger/)
- [Creating and locating `.htaccess`](https://www.hostinger.com/support/1583307-how-to-create-an-htaccess-file-at-hostinger/)
- [Enabling and forcing HTTPS](https://www.hostinger.com/support/1583201-how-to-enable-or-disable-https-for-your-website-at-hostinger/)
