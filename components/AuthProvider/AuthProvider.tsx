"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const setUser = useAuthStore((state) => state.setUser);
    const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true)
                const isAuthenticated = await checkSession();
                if (isAuthenticated) {
                    const user = await getMe()
                    if (user) setUser(user)
                }
                else {
                    clearIsAuthenticated()
                }

            }
            finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [setUser, clearIsAuthenticated]);
    if (isLoading) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <p>⏳ Data loading, please wait...</p>
            </div>
        );
    }

    return children;
}




// import { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { useAuthStore } from "@/lib/store/authStore";
// import { refreshUser } from "@/lib/api/clientApi";

// export default function AuthProvider({ children }: { children: React.ReactNode }) {
//     const [isRefreshing, setIsRefreshing] = useState(true);
//     const pathname = usePathname();
//     const router = useRouter();

//     const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
//     const setUser = useAuthStore((state) => state.setUser);
//     const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

//     // List of routes that require authentication
//     // You can add more patterns here if needed
//     const isPrivateRoute = pathname.startsWith("/profile");

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const userData = await refreshUser();
//                 setUser(userData);
//             } catch (error) {
//                 clearIsAuthenticated();
//                 // If we are on a private route and refresh fails, redirect to sign-in
//                 if (isPrivateRoute) {
//                     router.push("/sign-in");
//                 }
//             } finally {
//                 setIsRefreshing(false);
//             }
//         };

//         fetchUser();
//     }, [setUser, clearIsAuthenticated, isPrivateRoute, router]);

//     // Handle redirection if user is not authenticated on a private route after refresh
//     useEffect(() => {
//         if (!isRefreshing && isPrivateRoute && !isAuthenticated) {
//             router.push("/sign-in");
//         }
//     }, [isRefreshing, isPrivateRoute, isAuthenticated, router]);

//     if (isRefreshing) {
//         return (
//             <div style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 height: '100vh',
//                 fontSize: '1.5rem',
//                 fontFamily: 'var(--font-roboto)'
//             }}>
//                 Loading session...
//             </div>
//         );
//     }

//     // If it's a private route and we are not authenticated, don't render children
//     // (though the useEffect above will redirect anyway)
//     if (isPrivateRoute && !isAuthenticated) {
//         return null;
//     }

//     return <>{children}</>;
// }
