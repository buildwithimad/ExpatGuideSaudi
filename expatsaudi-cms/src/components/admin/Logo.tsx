import Link from 'next/link'

export default function Logo() {
  return (
    <Link
      href="/admin"
      className="flex items-center gap-3 no-underline"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#006C35] text-xl font-bold text-white shadow-sm">
        ES
      </div>

      <div className="flex flex-col">
        <span className="text-base font-bold leading-none text-slate-900 dark:text-white">
          ExpatSaudi
        </span>

        <span className="mt-1 text-xs font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Content Management System
        </span>
      </div>
    </Link>
  )
}