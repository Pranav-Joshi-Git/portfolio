# ipranavjoshi.com — Personal Portfolio

Personal portfolio of Pranav Joshi, built with React + Vite + TypeScript. Live at [ipranavjoshi.com](https://ipranavjoshi.com).

## Stack

- React + Vite + TypeScript
- Tailwind CSS v3 (CSS variable theming)
- Framer Motion (animations)
- EmailJS (contact form)
- Firebase Hosting (deployment)

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Environment variables

Create a `.env` file in the root (not committed to git):

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Get these from [emailjs.com](https://www.emailjs.com) → Email Services / Email Templates / Account.

---

## Updating Content

Most content lives in `src/data/` — no need to touch component files for these.

| File | What to update |
|------|---------------|
| `src/data/site.ts` | Name, tagline, description, email, resume filename |
| `src/data/experience.ts` | Work history |
| `src/data/skills.ts` | Skill groups |
| `src/data/certifications.ts` | Certifications & courses |
| `src/data/sections.ts` | Section ids shared by the nav and `App.tsx` (rarely needs touching) |

The stats grid (years of experience, company count, certification count) derives its numbers from this data automatically — you never need to hand-update a count there.

### Adding a certification

1. If it's a new brand, add the brand name to `Certification['brand']` in `src/types.ts`.
2. Drop a logo file into `src/assets/brands/<brand>.<svg|png>` — the filename (without extension) must match the `brand` value exactly, e.g. `google` → `src/assets/brands/google.svg`.
3. Add an entry to `src/data/certifications.ts`.

That's it — no component code to touch. `CertificationCarousel.tsx` picks up the logo file automatically (via `import.meta.glob`), and the "Certifications" stat updates itself since it's derived from `certifications.length`.

**Caveat:** a misspelled or missing brand name won't break the build — it just falls back to a capitalized label (e.g. `googlecloud` → "Googlecloud" instead of "Google Cloud"). If you want exact display casing, add an entry to the `brandLabels` map in `CertificationCarousel.tsx`.

### Adding a job / work experience

Add an entry to `src/data/experience.ts`. The "Companies" stat updates automatically.

**Caveat:** the About section bio in `src/components/Biography.tsx` is hand-written prose, not derived from `experience.ts`. It mentions your current role, company, and tenure in freeform text — if any of that changes, you need to manually rewrite the relevant sentences there too.

### Updating the resume

1. Replace `public/resume.pdf` with the new file (keep the name `resume.pdf`)
2. Update `resumeFile` in `src/data/site.ts` to change the downloaded filename:
   ```ts
   resumeFile: 'PranavJoshi_AEMDeveloper_5YoE',
   ```

---

## Build & Deploy

### Build

```bash
npm run build
```

Output goes to `dist/`.

### Deploy to Firebase

```bash
firebase deploy --only hosting
```

Or build and deploy in one command:

```bash
npm run build && firebase deploy --only hosting
```

Requires Firebase CLI (`npm install -g firebase-tools`) and being logged in (`firebase login`).

---

## Custom Domain Setup (Firebase + GoDaddy)

For reference if setting up the domain from scratch on a new Firebase project:

### 1. Firebase project setup
- Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
- Run `firebase init hosting` in the repo, select `dist` as public directory, configure as SPA (yes to rewrites)

### 2. Add custom domain in Firebase
- Firebase Console → Hosting → Add custom domain
- Firebase will give you an **A record** IP and a **TXT record** for ownership verification

### 3. GoDaddy DNS changes
- Delete any existing A record for `@`
- Add new **A record**: Name `@`, Value = Firebase's provided IP
- Add **TXT record**: Name `@`, Value = `hosting-site=<your-firebase-project-id>`

### 4. Wait for DNS propagation
- Check progress at [whatsmydns.net](https://www.whatsmydns.net) (search A record for your domain)
- Once propagated globally, click **Verify** in Firebase Console

### 5. SSL certificate
- Firebase uses Let's Encrypt — after domain verification it asks for an ACME challenge
- Add the provided **TXT record** (`_acme-challenge`) in GoDaddy
- Click Verify — Firebase mints the SSL cert automatically (can take up to 1 hour)

### 6. www redirect (optional)
- Firebase Console → Hosting → Add custom domain → `www.yourdomain.com`
- Check "Redirect to existing website" → enter root domain
- Update the `www` **CNAME** record in GoDaddy to point to `your-project.web.app`
- Firebase mints a cert for www as well
