"use client";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to Stock Management System</h1>
      <button
        onClick={() => router.push("/home")}
        className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition"
      >
        Getting Started
      </button>
    </div>
  );
}
