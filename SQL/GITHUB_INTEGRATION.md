# GitHub Integration Guide

This guide will help you add the CEIS236 Database Project to your Software-development-assignments repository on GitHub.

## Method 1: Add as a New Directory (Recommended)

### Step 1: Navigate to Your Repository
```bash
cd /path/to/Software-development-assignments
```

### Step 2: Copy the Project
```bash
# Copy the entire CEIS236-Database-Project folder into your repository
cp -r /path/to/CEIS236-Database-Project ./
```

### Step 3: Commit and Push
```bash
# Add all files
git add CEIS236-Database-Project/

# Commit with a descriptive message
git commit -m "Add CEIS236 Database Systems final project

- Coffee shop database with 4 normalized tables
- 5 analytical SQL queries with documentation
- Complete setup scripts and documentation
- ERD diagram and query result screenshots
- Advanced SQL examples and views"

# Push to GitHub
git push origin main
```

## Method 2: Detailed Step-by-Step

### 1. Prepare Your Local Repository
```bash
# Navigate to your repository
cd ~/Software-development-assignments

# Make sure you're on the main branch
git checkout main

# Pull latest changes
git pull origin main
```

### 2. Add the Database Project
```bash
# Create the directory if it doesn't exist
mkdir -p CEIS236-Database-Project

# Copy all files
cp -r /path/to/CEIS236-Database-Project/* ./CEIS236-Database-Project/
```

### 3. Review the Changes
```bash
# Check what files will be added
git status

# Review the directory structure
tree CEIS236-Database-Project  # or ls -R CEIS236-Database-Project
```

### 4. Stage the Files
```bash
# Add all files in the project
git add CEIS236-Database-Project/

# Or add specific files/directories
git add CEIS236-Database-Project/sql/
git add CEIS236-Database-Project/docs/
git add CEIS236-Database-Project/images/
git add CEIS236-Database-Project/README.md
```

### 5. Commit Your Changes
```bash
git commit -m "Add CEIS236 Database Systems final project

This project demonstrates:
- Relational database design and normalization
- SQL DDL and DML operations
- Complex queries with JOINs and aggregations
- ERD creation and documentation
- Database best practices

Course: CEIS236 - Database Systems
Completed: November 2024"
```

### 6. Push to GitHub
```bash
# Push to your main branch
git push origin main

# If you're using a different branch
git push origin your-branch-name
```

## Verify on GitHub

After pushing, verify your changes on GitHub:

1. Navigate to your repository: `https://github.com/yourusername/Software-development-assignments`
2. You should see the `CEIS236-Database-Project` folder
3. Click on the folder to view its contents
4. The README.md should display automatically
5. Check that images are loading correctly

## Update Your Main Repository README (Optional)

Consider updating your main `Software-development-assignments/README.md` to include this project:

```markdown
# Software Development Assignments

Collection of academic projects and assignments.

## Projects

### CEIS236 - Database Systems
**Coffee Shop Database System**
- Normalized relational database design
- SQL schema and queries
- ERD diagram and documentation
- [View Project](./CEIS236-Database-Project/)

### [Other Projects]
...
```

## Troubleshooting

### Large File Warning
If you get warnings about large files (images are 2.6MB total):
```bash
# Check file sizes
du -sh CEIS236-Database-Project/images/*

# Files under 50MB are fine for GitHub
# If needed, compress images further
```

### .gitignore Conflicts
The project includes its own `.gitignore`. If you have a repository-level `.gitignore`:
```bash
# The project's .gitignore will be included
# It won't conflict with your repository's .gitignore
```

### File Permission Issues
Make sure the setup script is executable:
```bash
chmod +x CEIS236-Database-Project/setup.sh
git add CEIS236-Database-Project/setup.sh
git commit --amend --no-edit
```

## GitHub Features to Enable

### Enable GitHub Pages (Optional)
To showcase your README as a webpage:

1. Go to repository Settings
2. Navigate to Pages
3. Select source: Deploy from a branch
4. Select branch: main
5. Select folder: /CEIS236-Database-Project
6. Save

### Add Topics
Add relevant topics to your repository for discoverability:
- `database`
- `sql`
- `mysql`
- `database-design`
- `academic-project`
- `devry-university`

### Create a Release (Optional)
Tag this version:
```bash
git tag -a v1.0.0 -m "CEIS236 Database Project - Initial Release"
git push origin v1.0.0
```

## Best Practices

### Keep Your Repository Organized
```
Software-development-assignments/
├── CEIS236-Database-Project/    ← This project
├── CEIS114-Programming/
├── NETW204-Networking/
└── README.md
```

### Update Regularly
As you enhance the project:
```bash
git add CEIS236-Database-Project/
git commit -m "Update: Add new queries and documentation"
git push origin main
```

### Use Meaningful Commit Messages
Good examples:
- "Add advanced SQL queries with window functions"
- "Update README with installation instructions"
- "Fix typo in database schema documentation"

Bad examples:
- "Update"
- "Changes"
- "Stuff"

## Next Steps

1. ✅ Add project to repository
2. ✅ Commit and push to GitHub
3. 📝 Update main repository README
4. 🏷️ Add repository topics
5. 🌟 Share with potential employers or professors

## Additional Resources

- [GitHub Docs - Adding a file to a repository](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [GitHub Docs - About READMEs](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)
- [Git Documentation](https://git-scm.com/doc)

---

**Need Help?**
- Check Git status: `git status`
- View commit history: `git log`
- Undo changes: `git reset HEAD~1` (before pushing)

Good luck with your GitHub portfolio! 🚀
