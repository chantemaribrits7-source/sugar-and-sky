# Sugar & Sky — Editable Website

This project is prepared for Netlify + Decap CMS.

## Publish
1. Create a GitHub repository and upload this folder.
2. In Netlify, choose **Add new project → Import an existing project** and select the GitHub repository.
3. Netlify will use `netlify.toml` and run `node build.js`.
4. In Netlify, enable **Identity** and **Git Gateway**.
5. Set registration to **Invite only** and invite your admin email.
6. Visit `https://YOUR-SITE.netlify.app/admin/` to log in and edit the website.

Decap CMS stores the editable values in `content/site.json`. Publishing from the admin panel commits the change to Git, which triggers a new Netlify deploy.
