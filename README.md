# Ubuntu Challenge — Site Web Officiel

> "I Am Because We Are" — Basketball & Cultural Initiative by Pipo Noundou

## 🚀 Stack Technique

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Style**: Tailwind CSS
- **Base de données**: Supabase (PostgreSQL)
- **Hébergement**: Vercel
- **Auth Admin**: Supabase Auth

---

## 📦 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/VOTRE_USERNAME/ubuntu-challenge.git
cd ubuntu-challenge
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Copiez le fichier `.env.local` et remplissez vos clés Supabase :

```bash
cp .env.local .env.local
```

Allez sur [supabase.com](https://supabase.com) → votre projet → **Settings > API** et copiez :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 4. Configurer la base de données Supabase

Dans votre dashboard Supabase → **SQL Editor** → **New Query**,
copiez-collez tout le contenu du fichier `lib/schema.sql` et cliquez **Run**.

### 5. Ajouter le logo

Copiez votre fichier logo dans :
```
public/logo.png
```

### 6. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

---

## 🗂️ Structure du projet

```
ubuntu-challenge/
├── app/
│   ├── page.tsx              # Page d'accueil
│   ├── about/page.tsx        # À propos
│   ├── players/page.tsx      # Joueurs
│   ├── news/page.tsx         # Actualités
│   ├── events/page.tsx       # Événements
│   ├── sponsors/page.tsx     # Sponsors
│   ├── contact/page.tsx      # Contact
│   └── admin/
│       ├── login/page.tsx    # Connexion admin
│       └── dashboard/        # Dashboard admin
├── components/
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── lib/
│   ├── supabase.ts           # Client Supabase
│   └── schema.sql            # Schéma base de données
├── types/
│   └── index.ts              # Types TypeScript
└── public/
    └── logo.png              # Logo Ubuntu Challenge
```

---

## 🌐 Déploiement sur Vercel

1. Poussez le code sur GitHub :
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Allez sur [vercel.com](https://vercel.com) → **New Project** → importez votre repo GitHub

3. Dans **Environment Variables**, ajoutez vos 3 clés Supabase

4. Cliquez **Deploy** — le site est en ligne ! 🎉

---

## 👤 Créer le compte admin

Dans votre dashboard Supabase → **Authentication > Users** → **Add User** :
- Email: `admin@ubuntuchallenge.org`
- Password: choisissez un mot de passe fort

Puis connectez-vous sur `/admin/login`

---

## 📞 Support

Fondé par **Pipo Noundou** · Metro Manila, Philippines
