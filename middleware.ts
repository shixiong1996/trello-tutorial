// Clerk身份验证添加到您的应用程序
// publicRoutes: ['/'] 设置为公共路线以免进入3000地址就访问
import { authMiddleware } from "@clerk/nextjs";
 
// See https://clerk.com/docs/references/nextjs/auth-middleware
// for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ['/'],
});

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)"
  ]
};