import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getMe } from "@/lib/api/serverApi";
import css from "./page.module.css";

export const metadata: Metadata = {
    title: "Profile | 09-auth",
    description: "User profile information",
};

export default async function Profile() {
    const user = await getMe();

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
                    <Image
                        src={user?.avatar || "/placeholder-avatar.png"}
                        alt="User Avatar"
                        width={120}
                        height={120}
                        className={css.avatar}
                        priority
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
