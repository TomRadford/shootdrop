import Head from "next/head"
import { useState } from "react"
import Layout from "../components/layout"

const Home = () => {
  const [colorChange, setColorChange] = useState(false)

  return (
    <Layout>
      <Head>
        <title>ShootDrop</title>
      </Head>
      <div>
        <main className="pb-20">
          <div className="fixed bottom-3 flex w-11/12 items-center space-x-4 rounded-xl bg-white p-6  shadow-xl transition-all hover:bg-gray-200 md:max-w-lg ">
            <span className="absolute right-4 top-1 hover:cursor-pointer">
              x
            </span>
            <div className="shrink-1">
              <img
                className="h-12 w-12"
                src="/img/logo.svg"
                alt="ChitChat Logo"
              />
            </div>
            <div>
              <div className="text-xl font-bold text-black">ShootDrop</div>
              <p className="text-slate-700">You have a new message!</p>
              <button className="bg-sky-500 hover:bg-sky-700">
                Save changes
              </button>
            </div>
          </div>
          <ul
            role="list"
            className="m-auto divide-y divide-slate-200 p-6 md:max-w-md"
          >
            <li className="flex py-4 first:bg-black first:pt-0 last:pb-0">
              <img
                className="h-10 w-10 rounded-full"
                src="{person.imageUrl}"
                alt=""
              />
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-slate-900">
                  To!!!!!!!!m
                </p>
                <p className="truncate text-sm text-slate-500">dg@dv</p>
              </div>
            </li>
          </ul>
          <a
            href="#"
            className="a group mx-auto block max-w-xs space-y-3 rounded-lg bg-white p-6 shadow-lg ring-1 ring-slate-900/5 transition-all hover:bg-sky-500 hover:ring-sky-500"
          >
            <div className="flex items-center space-x-3">
              <svg
                className="h-6 w-6 stroke-sky-500 group-hover:stroke-white"
                fill="none"
                viewBox="0 0 24 24"
              ></svg>
              <h3 className="text-sm font-semibold text-slate-900 group-hover:text-gray-200">
                New project
              </h3>
            </div>
            <p className="text-sm text-slate-500 group-hover:text-gray-200">
              Create a new project from a variety of starting templates.!
            </p>
          </a>
          <form>
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*']">
                Email
              </span>
              <input
                type="email"
                name="email"
                className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </label>
          </form>
          <blockquote className="text-center text-2xl font-semibold italic text-slate-500">
            When you look
            <span className="relative inline-block text-white before:absolute before:-inset-1 before:block before:-skew-y-12 before:bg-pink-500">
              <span className="relative text-white">annoyed</span>
            </span>
            all the time, people think that you're busy.
          </blockquote>
          <form className="flex items-center space-x-6">
            <div className="shrink-0">
              <img
                className="h-16 w-16 rounded-full object-cover hover:animate-spin"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                alt="Current profile photo"
              />
            </div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                className="block w-full text-sm text-slate-500
      file:mr-4 file:rounded-full file:border-0
      file:bg-violet-50 file:py-2
      file:px-4 file:text-sm
      file:font-semibold file:text-violet-700
      hover:file:bg-violet-100
    "
              />
            </label>
          </form>
          <div className="mx-auto max-w-lg p-8">
            <details
              className="rounded-lg p-6 open:bg-white open:shadow-lg open:ring-1 open:ring-black/5 dark:open:bg-slate-900 dark:open:ring-white/10"
              open
            >
              <summary className="mb-[1.5rem] select-none text-sm font-semibold leading-6 text-slate-900 transition-all duration-700 hover:mb-[0rem] dark:text-white">
                Why do they call it Ovaltine?
              </summary>
              <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                <p>
                  The mug is round. The jar is round. They should call it
                  Roundtine.
                </p>
              </div>
            </details>
          </div>
          <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
            <div className="md:flex">
              <div className="md:shrink-0">
                <img
                  className="h-48 w-full object-cover md:h-full md:w-48"
                  src="/img/building.jpg"
                  alt="Modern building architecture"
                />
              </div>
              <div className="p-8">
                <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
                  Company retreats
                </div>
                <a
                  href="#"
                  className="mt-1 block text-lg font-medium leading-tight text-black hover:underline"
                >
                  Incredible accomodation for your team
                </a>
                <p className="mt-2 text-slate-500">
                  Looking to take your team away on a retreat to enjoy awesome
                  food and take in some sunshine? We have a list of places to do
                  just that.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Home
