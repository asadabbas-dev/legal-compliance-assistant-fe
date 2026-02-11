import { Scale } from "lucide-react";

function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-1/4 h-64 w-64 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />
      </div>

      <div className="relative w-[92%] max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center shadow-2xl backdrop-blur-sm sm:p-7">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400 text-black shadow-lg shadow-amber-500/25 sm:h-18 sm:w-18">
          <Scale className="h-8 w-8 animate-pulse" strokeWidth={2.2} />
        </div>

        <h1 className="text-xl font-bold text-white sm:text-2xl">
          Preparing your workspace
        </h1>
        <p className="mt-1 text-sm text-white/70">
          Loading documents, memory, and compliance context...
        </p>

        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-[loader_1.2s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300" />
        </div>
      </div>

      <style jsx>{`
        @keyframes loader {
          0% {
            transform: translateX(-110%);
          }
          50% {
            transform: translateX(60%);
          }
          100% {
            transform: translateX(220%);
          }
        }
      `}</style>
    </div>
  );
}

export default FullPageLoader;
