"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./page.module.css";

export default function Profile() {
    const user = useAuthStore((state) => state.user);

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <div className={css.header}>
                    <h1 className={css.formTitle}>Profile Page</h1>
                    <Link href="/profile/edit" className={css.editProfileButton}>
                        Edit Profile
                    </Link>
                </div>
                <div className={css.avatarWrapper}>
                    <img
                        src={user?.avatar || "Avatar"}
                        alt="User Avatar"
                        width={120}
                        height={120}
                        className={css.avatar}
                    />
                </div>
                <div className={css.profileInfo}>
                    <p>
                        Username: {user?.username || "your_username"}
                    </p>
                    <p>
                        Email: {user?.email || "your_email@example.com"}
                    </p>
                </div>
            </div>
        </main>
    );
}
