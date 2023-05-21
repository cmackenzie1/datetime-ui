"use client";
import { useEffect, useState } from "react";

interface EpochTimeProps {
  name: string;
  time: Date;
  unit:
    | "seconds"
    | "milliseconds"
    | "microseconds"
    | "nanoseconds"
    | "rfc3339"
    | "fulldatetime";
}

export default function EpochTime({ name, time, unit }: EpochTimeProps) {
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setIsCopied(false), 750);
    return () => clearTimeout(timeout);
  }, [isCopied]);

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold">{name}</h2>

      <span
        className="flex copyable rounded-lg p-2 mt-2 cursor-pointer items-center"
        onClick={(e) => {
          navigator.clipboard.writeText(e.currentTarget.innerText);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 750);
        }}
      >
        <code className="text-xl">{formatTime(time, unit)}</code>

        {/* Switch icon between copy and copied when text is copied. Reset after 750ms */}
        <span className="ml-2">
          {!isCopied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-600 dark:text-gray-400 transition-colors duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="green"
              className="w-6 h-6 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
              />
            </svg>
          )}
        </span>
      </span>
    </div>
  );
}

const formatTime = (time: Date, unit: EpochTimeProps["unit"]) => {
  switch (unit) {
    case "seconds":
      return Math.floor(time.getTime() / 1000);
    case "milliseconds":
      return Math.floor(time.getTime());
    case "microseconds":
      return Math.floor(time.getTime()) * 1000;
    case "nanoseconds":
      return Math.floor(time.getTime()) * 1000 * 1000;
    case "rfc3339":
      return time.toISOString();
    case "fulldatetime":
      return time.toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "medium",
      });
  }
};
