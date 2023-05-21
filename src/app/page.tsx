"use client";
import Clock from "@/components/clock";
import EpochTime from "@/components/epochTime";
import { useEffect, useState } from "react";

export default function Home() {
  // get url params "dt" and parse to date
  const urlParams = new URLSearchParams(window.location.search);
  const dt = urlParams.get("dt") || Date.now();

  const [inputValue, setInputValue] = useState("");
  const [now, setNow] = useState(new Date(dt));

  // set the dt url param to the current date/time
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("dt", now.toISOString());
    window.history.replaceState({}, "", url.toString());
  }, [now]);

  // Function to update the "now" variable to the current date/time
  const updateNow = () => {
    setNow(new Date());
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const resetDateTime = () => {
    setInputValue("");
    setNow(new Date());
  };

  return (
    <main className="container mx-auto">
      <div className="flex flex-col items-center mt-8">
        <code className="text-4xl mb-4">datetime</code>
        <Clock />
        <div className="flex items-center">
          <input
            type="text"
            className="input input-bordered w-80 max-w-xs mr-2"
            placeholder="Enter RFC3339 or epoch seconds"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button className="btn btn-primary gap-2 ml-2" onClick={updateNow}>
            Submit
          </button>
          <button
            className="btn btn-secondary gap-2 ml-2"
            onClick={resetDateTime}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-8 md:flex-row">
        <div className="flex flex-col md:w-1/2 mb-4 md:mr-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <EpochTime name="UTC" time={now} unit="rfc3339" />
          </div>
        </div>
        <div className="flex flex-col md:w-1/2">
          <div className="bg-white rounded-lg shadow-md p-4">
            <EpochTime name="Local" time={now} unit="fulldatetime" />
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-8 md:flex-row">
        <div className="flex flex-col md:w-1/2 mb-4 md:mr-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <EpochTime name="Seconds" time={now} unit="seconds" />
          </div>
        </div>
        <div className="flex flex-col md:w-1/2">
          <div className="bg-white rounded-lg shadow-md p-4">
            <EpochTime name="Milliseconds" time={now} unit="milliseconds" />
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-4 md:flex-row">
        <div className="flex flex-col md:w-1/2 mb-4 md:mr-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <EpochTime name="Microseconds" time={now} unit="microseconds" />
          </div>
        </div>
        <div className="flex flex-col md:w-1/2">
          <div className="bg-white rounded-lg shadow-md p-4">
            <EpochTime name="Nanoseconds" time={now} unit="nanoseconds" />
          </div>
        </div>
      </div>
    </main>
  );
}
