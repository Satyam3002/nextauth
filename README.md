# 🛡️ NextAuth MongoDB Auth Starter

Ready-to-use Next.js authentication with NextAuth.js, MongoDB, and dual login options (credentials + Google OAuth).

## ✨ Features
- Email/Password + Google OAuth login
- MongoDB integration for user data
- JWT session management
- API routes using Next.js app directory
- Minimal, extensible setup

## 🚀 Setup

1. **Clone & Install**
```bash
git clone https://github.com/your-username/nextauth-mongodb-auth-starter.git
cd nextauth-mongodb-auth-starter
npm install
```

2. **Environment Variables**
Create `.env.local`:
```
MONGODB_URI=your_mongo_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

3. **Run Development Server**
```bash
npm run dev
```

## 📁 Structure
- `app/api/auth/[...nextauth]/route.ts` - Auth configuration
- `lib/dbConfig.ts` - MongoDB connection
- `models/userModel.ts` - User schema

## 📝 License
MIT © Satyam Laheri
