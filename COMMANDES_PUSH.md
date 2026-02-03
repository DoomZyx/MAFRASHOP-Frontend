# Créer la branche develop et pousser (repo FRONTEND)

La branche `develop` n'existe pas encore. Voici les commandes exactes à exécuter **dans le dossier du repo frontend** (là où se trouve `package.json`).

## 1. Créer la branche develop

```bash
cd /chemin/vers/ton/repo/frontend
git checkout -b develop
```

Tu es maintenant sur la branche `develop` (créée à partir de la branche actuelle, en général `master`).

## 2. Ajouter les fichiers (workflow + modifs)

```bash
git add .github/
git add .gitignore
git status
```

Vérifie que tout ce que tu veux committer est listé.

## 3. Committer

```bash
git commit -m "ci: workflow deploy preprod/prod + branche develop"
```

## 4. Pousser develop sur GitHub

```bash
git push -u origin develop
```

La première fois, `-u origin develop` enregistre le lien entre ta branche locale `develop` et `origin/develop`. Les prochains push : `git push` suffit.

---

Ensuite : chaque push sur `develop` déclenche le déploiement préprod (quand le VPS et les secrets sont en place). Chaque push sur `main` déclenche le déploiement prod.
