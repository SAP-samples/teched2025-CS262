import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-24">
      <h2 className="text-4xl font-extrabold text-indigo-700 mb-4">Teched Hands-On Workshop CS262</h2>
      <p className="text-xl text-indigo-400 font-semibold mb-2">Welcome to ACME Inc.'s demo ITSM system</p>
      <div className="mt-8 p-6 rounded-2xl shadow-lg bg-indigo-50 border border-indigo-200">
        <span className="text-lg text-indigo-700 font-medium">Explore how to integrate SAP Knowledge into your business support process!</span>
      </div>
    </div>
  );
}
