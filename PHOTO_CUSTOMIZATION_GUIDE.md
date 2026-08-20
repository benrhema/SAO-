# Photo Customization Guide for SAO Website

## Overview
This guide will help you replace placeholder images with your organization's actual photos.

## Where to Add Your Photos

### 1. **Team Page** (`/src/app/pages/TeamPage.tsx`)

#### Leadership Team (Lines 6-47)
Replace these image URLs with photos of your actual leadership:
- **Founder & President** (Dr. Sarah Johnson) - Line 13
- **Executive Director** (Michael Chen) - Line 21
- **Medical Director** (Dr. Aisha Patel) - Line 29
- **Director of Operations** (James Rodriguez) - Line 37

**How to update:**
```typescript
{
  name: "Your President Name",
  role: "Founder & President",
  bio: "Your president's bio here...",
  image: "YOUR_PRESIDENT_PHOTO_URL_HERE",  // ← Replace this
  email: "president@sao.org",
  linkedin: "#"
}
```

#### Board Members (Lines 49-56)
Update the 6 board member photos and names on lines 49-56.

#### Staff Members (Lines 58-65)
Update staff names and roles on lines 58-65.

---

### 2. **Partners Page** (`/src/app/pages/PartnersPage.tsx`)

Update your actual partner organizations:
- **Corporate Partners** (Lines 6-13) - Add your real corporate partners
- **Government Partners** (Lines 15-20) - Add government agencies you work with
- **NGO Partners** (Lines 22-29) - Add NGO collaborations

---

### 3. **Media Gallery Page** (`/src/app/pages/MediaPage.tsx`)

#### Video Thumbnails (Lines 6-51)
Replace video thumbnails with actual screenshots from your videos:
```typescript
{
  title: "Your Video Title",
  description: "Description of your video",
  thumbnail: "YOUR_VIDEO_THUMBNAIL_URL",  // ← Replace this
  duration: "5:24",
  category: "Impact Story"
}
```

#### Photo Galleries (Lines 53-58)
Add your photo gallery covers and counts.

---

### 4. **Homepage Sections**

#### About Section Images
The about section uses the organization statistics. Update the numbers in `/src/app/components/AboutSection.tsx`:
- Lives Impacted (Line ~85)
- Programs (Line ~88)
- Countries (Line ~91)

#### Impact Section (`/src/app/components/ImpactSection.tsx`)
- **Success Story Images** (Lines 6-24): Replace with actual beneficiary photos
- **Team Photo** (Line 114): Replace with your actual team/volunteers photo

#### Programs Section (`/src/app/components/ProgramsSection.tsx`)
- **Program Banner** (Line 94): Replace with photo from your education program

#### Volunteer Section (`/src/app/components/VolunteerSection.tsx`)
- **Volunteer Team Photo** (Line 73): Replace with your volunteer group photo

#### Events Section (`/src/app/components/EventsSection.tsx`)
- **Event Photos** (Lines 8-45): Replace with photos from your actual events
- Update event names, dates, and descriptions

#### News Section (`/src/app/components/NewsSection.tsx`)
- Update news articles with your actual stories

---

## How to Add Photos

### Option 1: Using External URLs
If your photos are hosted online (e.g., Unsplash, your server, cloud storage):
```typescript
image: "https://your-website.com/photos/president.jpg"
```

### Option 2: Using Figma Assets (If importing from Figma)
```typescript
import photo from "figma:asset/YOUR_ASSET_ID.jpg";
// Then use: image: photo
```

### Option 3: Local Images (After deployment)
Store images in a public folder and reference them:
```typescript
image: "/images/team/president.jpg"
```

---

## Priority Updates

### **MUST UPDATE FIRST:**
1. ✅ Team leadership photos (4 people)
2. ✅ Logo (already added to navigation)
3. ✅ Hero section (main page banner)
4. ✅ Success stories (3 testimonials with photos)

### **UPDATE SECOND:**
5. Board members (6 people)
6. Event photos (current and past events)
7. Program photos (education, healthcare, etc.)
8. Video thumbnails

### **UPDATE LAST:**
9. Partner logos
10. Staff member photos
11. Additional gallery photos

---

## Example: Full Leadership Member Update

**Before:**
```typescript
{
  name: "Dr. Sarah Johnson",
  role: "Founder & President",
  bio: "With over 20 years of experience...",
  image: "https://images.unsplash.com/photo-...",
  email: "sarah@sao.org",
  linkedin: "#"
}
```

**After:**
```typescript
{
  name: "Rev. John Mutua",  // ← Your actual name
  role: "Founder & President",
  bio: "Rev. Mutua founded SAO in 2015...",  // ← Your actual bio
  image: "https://your-domain.com/photos/rev-mutua.jpg",  // ← Your photo
  email: "mutua@sao.org",  // ← Your email
  linkedin: "https://linkedin.com/in/johnmutua"  // ← Your LinkedIn
}
```

---

## Need Help?

Send me your photos and I'll help you integrate them into the website! Just provide:
1. Photo URL or file
2. Person's name and role
3. Which section it belongs to

---

## Quick Find & Replace

Use your code editor's "Find and Replace" feature:
- Find: `https://images.unsplash.com/photo-1581065178047-8ee15951ede6`
- Replace with: Your actual leadership photo URL
- This will update all placeholder team photos at once

Then customize each individual person's details.
