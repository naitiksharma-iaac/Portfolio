# Deploying to Hostinger

This portfolio is exported as a static website. Hostinger only needs the files from the generated `out` folder; Node.js does not run on the server.

## 1. Set the final website address

Copy `.env.example` to a new file named `.env.production` and replace the example value with your real domain:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Use `https://`, do not add a trailing slash, and rebuild whenever this domain changes. This value is used for social-sharing metadata.

## 2. Build the upload folder

From the project root, run:

```bash
npm install
npm run build
```

The finished website will be in:

```text
out/
```

The build is complete when `out/index.html` exists. The `out` folder also contains `.htaccess`, `404.html`, project route folders, images, CSS and JavaScript.

Do not upload the project source, `node_modules`, `.next`, or the `out` folder itself. Upload everything **inside** `out`.

## 3. Upload through Hostinger hPanel

1. In Hostinger, open **Websites → Dashboard → File Manager** for the correct domain.
2. Open `public_html`.
3. Back up any existing site, then remove the default `index.php`, old `index.html`, and old site files you no longer need. Do not delete files for another domain or application.
4. Upload every file and folder from inside your local `out` folder directly into `public_html`.
5. Confirm that `public_html/index.html` and `public_html/.htaccess` exist. There must not be an extra `out` directory between `public_html` and `index.html`.

For a faster upload, compress the **contents** of `out` into a ZIP, upload the ZIP to `public_html`, extract it there, and then delete the ZIP.

## 4. Hostinger settings

- Website type: use a normal **Custom PHP/HTML website** or an existing Web/Cloud hosting site. No Node.js application, start command, database, PHP package or build command is required on Hostinger.
- Document root: keep the domain pointed at `public_html`.
- SSL: make sure the SSL certificate is installed and **Force HTTPS** is enabled.
- Cache: if Hostinger cache is enabled, purge it after replacing the website. Also test once in a private/incognito window.
- `.htaccess`: Hostinger File Manager shows dotfiles. If using FTP, enable “show hidden files” so `.htaccess` is uploaded.

## 5. Check the deployment

Open these addresses using your real domain:

```text
/
/projects/
/projects/continuum-canopy/
/resume/
/a-page-that-does-not-exist/
```

The first four should load normally. The final address should show the custom 404 page. Also check the mobile navigation, project filters, images, GIFs and videos.

## Updating the live site later

1. Edit the files in `content/` or add media under `public/images/projects/`.
2. Run `npm run build` again.
3. Replace the old files in `public_html` with everything inside the newly generated `out` folder.
4. Purge Hostinger cache if enabled.

Each build recreates `out` from the current project content. Never make permanent edits only inside `out`, because the next build replaces them.

## Troubleshooting

- **Hostinger welcome page appears:** `index.html` is not directly inside `public_html`, or the default Hostinger index file is still taking precedence.
- **Project URL gives 404:** confirm the complete project folders were uploaded and `.htaccess` exists in `public_html`.
- **`.htaccess` is missing:** enable hidden files in your FTP client, or upload it through Hostinger File Manager.
- **Old design still appears:** purge Hostinger cache and browser cache.
- **Social preview uses the wrong address:** correct `NEXT_PUBLIC_SITE_URL` in `.env.production`, rebuild, and upload the new files.

## Hostinger references

- [Hostinger File Manager and `public_html`](https://www.hostinger.com/support/4548688-basic-actions-in-the-file-manager-in-hostinger/)
- [Creating and locating `.htaccess`](https://www.hostinger.com/support/1583307-how-to-create-an-htaccess-file-at-hostinger/)
- [Enabling and forcing HTTPS](https://www.hostinger.com/support/1583201-how-to-enable-or-disable-https-for-your-website-at-hostinger/)
