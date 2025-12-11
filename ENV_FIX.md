# Environment Variables Fix

## Issue
The application was showing error: `process is not defined`

## Cause
This project uses **Vite** (not Next.js), and Vite uses `import.meta.env` instead of `process.env` for environment variables.

## Solution
Changed all environment variable references:

**Before:**
```typescript
process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL
```

**After:**
```typescript
import.meta.env.VITE_GOOGLE_SCRIPT_URL
```

## Environment Variable Naming Convention

### Vite (This Project)
- Prefix: `VITE_`
- Access: `import.meta.env.VITE_VARIABLE_NAME`
- Example: `VITE_GOOGLE_SCRIPT_URL`

### Next.js (Different Framework)
- Prefix: `NEXT_PUBLIC_`
- Access: `process.env.NEXT_PUBLIC_VARIABLE_NAME`
- Example: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`

## Updated Files

1. **src/lib/api.ts**
   - Changed `process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
   - To `import.meta.env.VITE_GOOGLE_SCRIPT_URL`

2. **.env.local.example**
   - Changed all `NEXT_PUBLIC_*` variables
   - To `VITE_*` variables

## How to Use

1. **Copy the environment template:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Edit `.env.local`:**
   ```env
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   VITE_PHONE_NUMBER=917016686728
   VITE_EMAIL=hello@eleganceevents.com
   VITE_WHATSAPP_NUMBER=917016686728
   ```

3. **Restart dev server:**
   ```bash
   npm run dev
   ```

## Status
✅ **FIXED** - Application should now load without errors

## Contact
Phone: +91 7016686728
