// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          
          await connect();
          
          const existingUser = await User.findOne({ email: user.email });
          
          if (!existingUser) {
            
            const newUser = new User({
              username: profile?.name || user.name, 
              email: user.email,
              isVerified: true, 
              password: bcryptjs.hashSync(Math.random().toString(36).slice(-8), 10), 
              provider: "google"
            });
            
            await newUser.save();
          }
          
          return true;
        } catch (error) {
          console.log("Error during Google sign in:", error);
          return false;
        }
      }
      
      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        try {
          await connect();
          const user = await User.findOne({ email: session.user.email });
          if (user) {
            session.user.id = user._id.toString();
          }
        } catch (error) {
          console.error("Session callback error:", error);
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login', 
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };