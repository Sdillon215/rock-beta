"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", { email, password, redirect: false });
        if (result?.error) {
            alert("Login failed: " + result.error);
        } else {
            window.location.href = "/dashboard";
        }
    };

    return (
        <form onSubmit={handleLogin} className="flex flex-col gap-2">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
}
