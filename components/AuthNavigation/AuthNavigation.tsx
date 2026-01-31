"use client"
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import css from "./AuthNavigation.module.css";
import Link from "next/link";

export default function AuthNavigation() {
    const router = useRouter();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const user = useAuthStore((state) => state.user);
    const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
    const handleLogout = async () => {
        try {
            await logout();
            clearIsAuthenticated();
            router.push("/sign-in");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <>
            {isAuthenticated ? (
                <>
                    <li className={css.navigationItem}>
                        <Link href="/profile" className={css.navigationLink}>
                            Profile
                        </Link>
                    </li>

                    <li className={css.navigationItem}>
                        <p className={css.userEmail}>{user?.email || "User email"}</p>
                        <button className={css.logoutButton} onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </>
            ) : (
                <>
                    <li className={css.navigationItem}>
                        <Link href="/sign-in" className={css.navigationLink}>
                            Login
                        </Link>
                    </li>

                    <li className={css.navigationItem}>
                        <Link href="/sign-up" className={css.navigationLink}>
                            Sign up
                        </Link>
                    </li>
                </>
            )}
        </>
    );
}
