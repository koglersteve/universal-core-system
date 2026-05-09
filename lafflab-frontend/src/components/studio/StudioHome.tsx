"use client";

type StudioHomeProps = {
  data: any;
};

export default function StudioHome({ data }: StudioHomeProps) {
  return (
    <div className="p-4 text-white space-y-3">
      <h1 className="text-2xl font-semibold">Studio</h1>

      {data ? (
        <pre className="text-sm text-white/60 whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <p className="text-white/60">No studio data available.</p>
      )}
    </div>
  );
}
