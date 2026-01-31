"use client"


import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
    const router = useRouter()
    useEffect(() => { router.refresh() }, [])
    return children
}