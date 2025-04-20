# 🛡️ NextAuth MongoDB Auth Starter
Ready-to-use Next.js authentication with NextAuth.js, MongoDB, and dual login options (credentials + Google OAuth).

## ✨ Features
- Email/Password + Google OAuth login
- MongoDB integration for user data
- JWT session management
- API routes using Next.js app directory
- Minimal, extensible setup
- **Email verification** using Mailtrap for new sign-ups

## 🚀 Setup
1. **Clone & Install**
```bash
git clone https://github.com/Satyam3002/nextauth
cd nextauth
npm install
```

2. **Environment Variables**
Create `.env.local`:
```
MONGO_URI=mongodb+srv://username:password@cluster.example.mongodb.net/
TOKEN_SECRET=your_token_secret
DOMAIN=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=your_mailtrap_user
MAIL_PASS=your_mailtrap_password
MAIL_FROM=your-email@example.com
```

3. **Run Development Server**
```bash
npm run dev
```

## 📁 Structure
- `app/api/auth/[...nextauth]/route.ts` - Auth configuration
- `lib/dbConfig.ts` - MongoDB connection
- `models/userModel.js` - User schema
- `helpers/mailer.ts` - Email verification service
