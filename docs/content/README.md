# 📝 Content Management Guide

> Comprehensive guide for managing content in your portfolio

## 📋 Content Overview

Your portfolio contains several types of content:

```
Content Types
├── 📝 Blog Posts         # Technical articles and insights
├── 🎨 Project Showcases  # Portfolio projects with details
├── 👤 Personal Info      # About section and testimonials
├── 📄 Resume/CV         # Professional experience
└── 🤖 AI Knowledge Base # ChatBot personality and knowledge
```

## 🚀 Quick Updates

### Blog Posts
- **File**: `frontend/lib/blog-data.ts`
- **Guide**: [Blog Management Guide](BLOG_GUIDE.md)
- **Add new posts**: Edit the `blogPosts` array

### Project Information
- **Files**: Project showcase components
- **Location**: `frontend/app/projects/page.tsx`
- **Images**: `frontend/public/card/`

### Personal Information
- **About Page**: `frontend/app/whoami/page.tsx`
- **Home Content**: `frontend/app/home-content.tsx`
- **Contact Details**: Update in multiple components

### AI Assistant Knowledge
- **Proxy Config**: `ollama-proxy/main.py`
- **System Prompt**: Contains your professional background
- **Model**: Uses `gpt-oss:20b` with custom personality

## 📚 Detailed Guides

### 📖 Available Guides
- [📝 Blog Management](BLOG_GUIDE.md) - Adding and managing blog posts
- [🎨 Project Updates](PROJECT_UPDATES.md) - Updating project showcases
- [👤 Personal Content](PERSONAL_UPDATES.md) - Managing personal information
- [🤖 AI Customization](AI_CUSTOMIZATION.md) - Customizing the AI assistant

### 📁 Content File Structure
```
frontend/
├── app/
│   ├── page.tsx              # Homepage content
│   ├── home-content.tsx      # Home page sections
│   ├── whoami/page.tsx       # About/personal page
│   ├── projects/page.tsx     # Projects showcase
│   └── blog/page.tsx         # Blog listing page
├── lib/
│   └── blog-data.ts          # Blog posts data
├── public/
│   ├── card/                 # Project images
│   ├── testimonials/         # Testimonial photos
│   └── uploads/
│       └── Resume.pdf        # Current resume
└── components/ui/
    └── chatbot-home.tsx      # AI assistant component
```

## ✏️ Content Update Workflow

### 1. Development Updates
```bash
# 1. Make content changes
cd frontend
# Edit relevant files

# 2. Test locally  
npm run dev

# 3. Verify changes
open http://localhost:3000

# 4. Build and test
npm run build
npm run start
```

### 2. Production Deployment
```bash
# Commit changes
git add .
git commit -m "Update: [describe changes]"
git push origin main

# Automatic deployment via GitHub Actions
# OR manual deployment:
./scripts/manage-portfolio.sh rebuild
```

## 🎯 Content Best Practices

### Blog Posts
- ✅ Use markdown formatting
- ✅ Include relevant tags
- ✅ Add estimated read time
- ✅ Feature important posts
- ✅ Keep content updated

### Project Information
- ✅ Include project images
- ✅ Add technology tags
- ✅ Link to live demos/repos
- ✅ Describe impact and results
- ✅ Keep information current

### AI Assistant
- ✅ Update system prompt with new experiences
- ✅ Include recent projects and skills
- ✅ Maintain professional tone
- ✅ Test responses regularly

## 🔄 Content Maintenance

### Regular Updates
- **Monthly**: Review and update project information
- **Quarterly**: Update resume and professional experience  
- **As needed**: Add new blog posts and testimonials
- **Ongoing**: Keep AI assistant knowledge current

### Content Backup
```bash
# Backup content files
tar -czf content-backup-$(date +%Y%m%d).tar.gz \
  frontend/lib/blog-data.ts \
  frontend/app/home-content.tsx \
  frontend/app/whoami/page.tsx \
  frontend/app/projects/page.tsx \
  frontend/public/uploads/Resume.pdf \
  ollama-proxy/main.py
```

## 📊 Content Analytics

### Monitoring Content Performance
- Track AI assistant usage
- Monitor page visits (if analytics enabled)
- Review user feedback
- Update based on engagement

### A/B Testing Content
- Test different project descriptions
- Experiment with blog post formats
- Try various AI assistant responses
- Measure user engagement

---

**📝 Content is king!** Keep your portfolio fresh and engaging by regularly updating your content across all sections.
