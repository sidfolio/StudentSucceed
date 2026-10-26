# StudentSucceed website

A self-contained HTML, CSS and JavaScript prototype. No installation or build step is needed.
This export includes the homepage, demo login, onboarding, resume parser, people filters,
Help and Accessibility tools, and the latest aligned and tinted profile fields.

## Publish to GitHub Pages

1. Unzip `StudentSucceed-GitHub-Ready.zip` on your computer.
2. Create a GitHub repository. A public repository can use GitHub Pages with GitHub Free.
3. Add the extracted contents to the repository root. `index.html` must be at the top level,
   alongside `login.html`, `onboarding.html`, `assets/`, `vendor/` and `.github/`.
   Upload the extracted files, not the ZIP. GitHub Desktop is convenient for adding the whole folder,
   including hidden files and `.github/workflows/pages.yml`.
4. Commit and push to the `main` branch. If your default branch has another name,
   update `branches: [main]` in `.github/workflows/pages.yml`.
5. Open repository **Settings > Pages**. Under **Build and deployment**, choose **GitHub Actions**.
6. Open **Actions > Deploy StudentSucceed to GitHub Pages** and choose **Run workflow**.
   If the first automatic run happened before Pages was enabled, run it again now.
7. When deployment succeeds, open the URL displayed in the workflow or in **Settings > Pages**.

The usual project address is `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.
Links in this export work under a repository subfolder as well as at a domain root.
Future pushes to `main` update the site automatically.

### Simpler manual deployment option

If you prefer not to use Actions, upload all website files and enable
**Settings > Pages > Deploy from a branch > main > / (root)**.
In that case, omit `.github/workflows/pages.yml` to avoid running a second deployment method.
Keep `.nojekyll` in the repository.

## Preview locally

Serve this folder with any static web server. For example, if Python is installed:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000/`.
Use a web server rather than double-clicking HTML files so module imports and resume parsing work.

## What works

- Editable onboarding with saved browser progress.
- Local text extraction from text-based PDF, DOCX and TXT resumes.
- Import review with source-aware shading, validation and conflict handling.
- Multiple-company, location and other filters over fictional people profiles.
- Keyboard focus styles, error summaries, Help and accessibility preferences.

## Prototype limitations

- Google and phone sign-in are simulations. The phone demo code is `123456`; no SMS is sent.
- LinkedIn and portfolio imports use sample data. No real LinkedIn account or portfolio URL is read.
- The browser-only login gate is not production authentication or a security boundary.
- People, companies and roles are sample data. No application or message is sent.
- Profile answers and preferences are saved in browser storage, not a database or this repository.
- Real authentication, SMS, live integrations and account isolation require a backend or external services.
- GitHub Pages does not inherit the private access gate from the previous hosting service.

This ZIP excludes hosting credentials, `.env` files, Git history, private documents, user-uploaded
resumes and original research references. Third-party reader licenses are retained in `vendor/`.
Confirm rights to any brand assets or embedded fonts before reuse outside this project.

GitHub deployment reference:
https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
