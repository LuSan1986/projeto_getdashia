import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data Deletion Instructions | GetDashia',
  description:
    'Learn how to request deletion of your GetDashia account and data, and how to disconnect the Meta integration.',
}

export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-16 text-zinc-100">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-10 inline-block text-sm text-zinc-400 transition-colors hover:text-zinc-200"
        >
          ← Back to home
        </Link>

        <h1 className="mb-2 text-3xl font-bold">Data Deletion Instructions</h1>
        <p className="mb-10 text-sm text-zinc-500">Last updated: October 2026</p>

        <div className="space-y-10 text-zinc-300 leading-relaxed">

          {/* Overview */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-zinc-100">Overview</h2>
            <p>
              GetDashia is a multi-channel marketing attribution dashboard that connects to advertising
              platforms — including Meta Ads (Facebook and Instagram) — via OAuth, using read-only
              permissions. This page explains what data we store, how to remove it, and how to revoke
              the integration directly from Meta.
            </p>
          </section>

          {/* What data we store */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-zinc-100">What data we store</h2>
            <p className="mb-3">
              When you connect your Meta Ads account, GetDashia stores the following information in
              our database (Supabase):
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>OAuth access token</strong> — encrypted at rest, used exclusively to fetch
                campaign metrics from the Meta Marketing API. We never use it to create, edit, or
                delete campaigns or any other Meta resource.
              </li>
              <li>
                <strong>Ad account ID</strong> — the numeric identifier of the Meta Ads account you
                selected during setup (e.g. <code className="text-zinc-400">act_XXXXXXXXXX</code>).
              </li>
              <li>
                <strong>Account name</strong> — the display name of your ad account, stored for
                convenience in the dashboard.
              </li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> store individual user profiles, friend lists, or any personal
              data from Facebook or Instagram beyond what is listed above.
            </p>
          </section>

          {/* How to disconnect Meta */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-zinc-100">
              How to revoke the Meta connection
            </h2>
            <p className="mb-3">
              You can revoke GetDashia&apos;s access to your Meta account at any time directly from
              Facebook settings, without needing to contact us:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Go to{' '}
                <strong>Facebook Settings</strong> →{' '}
                <strong>Security and Login</strong> →{' '}
                <strong>Apps and Websites</strong>{' '}
                (or visit <span className="text-zinc-400">facebook.com/settings?tab=applications</span>).
              </li>
              <li>Find <strong>GetDashia</strong> in the list of connected apps.</li>
              <li>Click <strong>Remove</strong> to revoke all permissions.</li>
            </ol>
            <p className="mt-3">
              Once revoked, GetDashia will no longer be able to read data from your Meta Ads account.
              Any previously stored access token is immediately invalidated by Meta.
            </p>
          </section>

          {/* How to delete your GetDashia data */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-zinc-100">
              How to delete your GetDashia account and all data
            </h2>
            <p className="mb-3">
              To permanently delete your GetDashia account and all associated data (profile, organization,
              integration tokens, campaign history), send an email to:
            </p>
            <p className="mb-3">
              <a
                href="mailto:luciano@getdashia.com.br"
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                luciano@getdashia.com.br
              </a>
            </p>
            <p className="mb-3">Please include in your email:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Subject: <strong>Data Deletion Request</strong></li>
              <li>The email address associated with your GetDashia account.</li>
              <li>Whether you want to delete only the Meta Ads integration or your entire account.</li>
            </ul>
            <p className="mt-3">
              We will process your request and confirm deletion within <strong>15 business days</strong>.
              All data — including encrypted tokens, campaign records, and account information — will
              be permanently erased from our systems.
            </p>
          </section>

          {/* Scope of the ads_read permission */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-zinc-100">
              How we use the <code className="text-indigo-400 text-base">ads_read</code> permission
            </h2>
            <p className="mb-3">
              GetDashia requests the <strong>ads_read</strong> permission only. This is the minimum
              permission necessary to display your campaign performance metrics in the dashboard.
              Specifically, we use it to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Read campaign-level metrics: impressions, clicks, cost, conversions, and revenue
                from the Meta Marketing API.
              </li>
              <li>List the ad accounts accessible under your Meta Business portfolio.</li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Create, edit, pause, or delete any campaigns, ad sets, or ads.</li>
              <li>Access your personal Facebook profile, friends, posts, or messages.</li>
              <li>Share or sell your data to any third party.</li>
              <li>Use your data for advertising or profiling purposes.</li>
            </ul>
          </section>

          {/* Contact */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-zinc-100">Contact</h2>
            <ul className="space-y-1">
              <li><strong>Responsible:</strong> Luciano De Santana Oliveira</li>
              <li>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:luciano@getdashia.com.br"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  luciano@getdashia.com.br
                </a>
              </li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  )
}
