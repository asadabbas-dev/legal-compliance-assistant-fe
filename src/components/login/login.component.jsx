"use client";

import Link from "next/link";
import { FileCheck, Scale, Shield } from "lucide-react";
import CustomButton from "@/common/components/custom-button/custom-button.component";
import CustomInput from "@/common/components/custom-input/custom-input.component";
import useLogin from "./use-login.hook";

const highlights = [
  {
    icon: Shield,
    title: "Private by design",
    body: "Your policies stay in your workspace. Answers come from your documents only.",
  },
  {
    icon: FileCheck,
    title: "Cited answers",
    body: "Every response points back to the page it came from, so you can verify it.",
  },
  {
    icon: Scale,
    title: "Built for legal teams",
    body: "Ask in plain language about contracts, policies, and compliance docs.",
  },
];

export default function Login() {
  const {
    onSubmit,
    isChecked,
    setIsChecked,
    loading,
    register,
    handleSubmit,
    errors,
    email,
    password,
  } = useLogin();

  return (
    <div className="relative flex min-h-screen overflow-y-auto bg-black">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 20% 20%, rgba(251, 191, 36, 0.12), transparent 55%), radial-gradient(ellipse 60% 40% at 90% 80%, rgba(251, 191, 36, 0.08), transparent 50%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col lg:flex-row">
        <aside className="hidden flex-col justify-between px-10 py-10 lg:flex lg:w-[46%] lg:py-14">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight !text-white hover:!text-white"
          >
            Compliance Assistant
          </Link>

          <div className="max-w-md">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-amber-400">
              Legal &amp; compliance
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white">
              Sign in to your workspace
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/65">
              Ask questions about your policies and get answers with page-level
              citations.
            </p>

            <ul className="mt-10 space-y-6">
              {highlights.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-amber-400">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/55">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-white/35">
            Answers are generated from your uploaded documents. Always verify
            citations before relying on them.
          </p>
        </aside>

        <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8 lg:px-10 lg:py-14">
          <div className="w-full max-w-[420px]">
            <div className="mb-8 lg:hidden">
              <Link
                href="/"
                className="text-base font-semibold tracking-tight !text-white hover:!text-white"
              >
                Compliance Assistant
              </Link>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-2xl shadow-black/40 sm:p-8">
              <div className="mb-7">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  Welcome back
                </h2>
                <p className="mt-1.5 text-sm text-neutral-500">
                  Sign in with your email to continue.
                </p>
              </div>

              <form
                className="space-y-5"
                onSubmit={handleSubmit(onSubmit)}
                method="post"
                noValidate
              >
                <CustomInput
                  label="Email"
                  name="email"
                  type="email"
                  register={register}
                  errors={errors}
                  placeholder="you@company.com"
                  isRequired={true}
                />

                <CustomInput
                  label="Password"
                  name="password"
                  type="password"
                  register={register}
                  errors={errors}
                  placeholder="Enter your password"
                  isRequired={true}
                />

                <div className="flex items-center justify-between pt-0.5">
                  <label className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      className="h-4 w-4 cursor-pointer rounded border-neutral-300 text-amber-500 accent-amber-400 focus:ring-amber-400"
                    />
                    <span className="text-sm text-neutral-600">
                      Remember me
                    </span>
                  </label>
                </div>

                <CustomButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="!mt-2 h-12 w-full rounded-xl bg-amber-400 text-base font-semibold !text-neutral-900 shadow-sm hover:bg-amber-300"
                  text={loading ? "Signing in…" : "Sign in"}
                  loading={loading}
                  disabled={!email || !password || loading}
                />
              </form>

              <p className="mt-6 text-center text-sm text-neutral-500">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-semibold !text-neutral-900 hover:!text-amber-600"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
