# 🎯 Splash Screen - Quick Test Guide

## ✅ Splash Screen is Now Integrated!

The splash screen has been added to your `App.tsx` file and should now display when you run the app.

---

## 🧪 How to Test

### **Method 1: First Time (Recommended)**

1. **Clear browser data:**
   - Open DevTools (F12)
   - Go to "Application" tab
   - Click "Local Storage"
   - Find your site
   - Delete the `hasVisited` key
   - Refresh page

2. **Or use Incognito/Private mode:**
   - Open new incognito window
   - Visit your site
   - Splash screen will show!

### **Method 2: Always Show (For Testing)**

Temporarily edit `src/components/AppWrapper.tsx`:

```tsx
const AppWrapper = ({ children }: AppWrapperProps) => {
  const [showSplash, setShowSplash] = useState(true);

  // Comment out the useEffect
  // useEffect(() => {
  //   const hasVisited = localStorage.getItem('hasVisited');
  //   if (hasVisited) {
  //     setIsFirstVisit(false);
  //     setShowSplash(false);
  //   } else {
  //     localStorage.setItem('hasVisited', 'true');
  //   }
  // }, []);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return <>{children}</>;
};
```

---

## 🚀 Run Your App

```bash
npm run dev
```

Then open: `http://localhost:8081`

---

## ✨ What You Should See

1. **Dark gradient background** (navy to black)
2. **Glowing sparkles icon** with rotating ring
3. **"Elegance Events"** in gold gradient
4. **"Creating Magical Moments"** tagline
5. **Progress bar** filling up
6. **Loading messages** changing
7. **Phone number** at bottom: +91 7016686728
8. **Smooth fade out** after 3 seconds
9. **Main app appears**

---

## 🔧 Troubleshooting

### **Splash doesn't show?**

1. **Check localStorage:**
   ```javascript
   // In browser console
   localStorage.getItem('hasVisited')
   // If it returns 'true', delete it:
   localStorage.removeItem('hasVisited')
   // Refresh page
   ```

2. **Check console for errors:**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for any red errors

3. **Verify files exist:**
   - `src/components/SplashScreen.tsx` ✓
   - `src/components/AppWrapper.tsx` ✓
   - Animations in `src/index.css` ✓

### **Animations not smooth?**

- Make sure you're using a modern browser
- Check if hardware acceleration is enabled
- Try in Chrome/Edge for best performance

---

## 📱 Test on Mobile

1. Run `npm run dev`
2. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
3. Open on phone: `http://YOUR_IP:8081`
4. Splash screen should work perfectly!

---

## ⏱️ Duration

Default: **3 seconds**

To change, edit `src/components/AppWrapper.tsx`:

```tsx
<SplashScreen onComplete={handleSplashComplete} duration={5000} />
```

---

## 🎨 Customization

See `SPLASH_SCREEN_GUIDE.md` for:
- Changing colors
- Changing logo
- Changing messages
- Adding sound effects
- And more!

---

## ✅ Checklist

- [x] SplashScreen.tsx created
- [x] AppWrapper.tsx created
- [x] Animations added to index.css
- [x] Integrated in App.tsx
- [ ] Test in browser
- [ ] Clear localStorage
- [ ] See splash screen!

---

## 📞 Contact

**Phone:** +91 7016686728

---

**Your splash screen is ready!** 🎉

Just run `npm run dev` and clear localStorage to see it!
