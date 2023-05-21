'use client';
import EpochTime from '@/components/epochTime';

export default function Home() {
  const now = new Date();
  return (
    <main className="container md:container md:mx-auto">
      <div className="flex mt-8">
        <h1 className="text-4xl font-bold">Now</h1>
      </div>
      {/* A CSS grid showing the current time in several different formats. The formats
      are ISO String, Locale, seconds, milliseconds, microseconds and nanoseconds */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="flex flex-col">
          <EpochTime name="UTC" time={now} unit="rfc3339" />
        </div>
        <div className="flex flex-col">
        <EpochTime name="Local" time={now} unit="fulldatetime" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <EpochTime name="Seconds" time={now} unit="seconds" />
        <EpochTime name="Milliseconds" time={now} unit="milliseconds" />
        <EpochTime name="Microseconds" time={now} unit="microseconds" />
        <EpochTime name="Nanoseconds" time={now} unit="nanoseconds" />
      </div>
    </main>
  );
}
