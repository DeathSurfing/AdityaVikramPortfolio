import Link from "next/link"

import IdentityFooter from "@/components/identity/IdentityFooter"

export default function NotFound() {
  return (
    <>
      <main id="main" className="page-main">
        <div className="shell page-content">
          <div className="flex max-w-2xl flex-col gap-6">
            <h1 className="page-title">page not found</h1>

            <p className="lead">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>

            <Link href="/" className="action-primary self-start">
              <span aria-hidden>←</span> home
            </Link>
          </div>
        </div>
      </main>
      <IdentityFooter />
    </>
  )
}
