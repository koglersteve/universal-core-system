"use client";

import { useState } from "react";
import { loginRequest } from "../../lib/authClient";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const data = await loginRequest(email, password);
      login(data);

      // Redirect based on role
      switch (data.role) {
        case "founder":
          router.push("/founder");
          break;
        case "admin":
          router.push("/admin");
          break;
        case "advertiser":
          router.push("/advertiser");
          break;
        case "vendor":
          router.push("/vendor");
          break;
        default:
          router.push("/");
      }
    } catch (err) {
      alert("Invalid login");
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /><br/><br/>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        /><br/><br/>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

