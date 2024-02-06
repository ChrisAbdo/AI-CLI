"use client";
import { useEffect, useState } from "react";

export function Terminal() {
  const words = [
    {
      text: "list the files in this dir and the size.",
    },
    {
      text: "initialize a new next.js project.",
    },
    {
      text: "install the vercel 'ai' package.",
    },
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <aside className="bg-black text-white p-6 rounded-lg w-full max-w-2xl font-mono z-50">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 text-red-500">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <p className="text-sm">bash</p>
      </div>
      <div>
        <div className="text-green-400 items-center flex">
          $ npx iforget&nbsp;tes
        </div>
        <p className="text-white">+ next@10.2.3</p>
        <p className="text-white">
          added 1 package, and audited 2 packages in 3s
        </p>
        <p className="text-green-400">$</p>
      </div>
    </aside>
  );
}
