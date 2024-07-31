'use client'

import { useEffect, useRef, useState } from 'react'
import { Transition } from '@headlessui/react'
import Image, { StaticImageData } from 'next/image'
import FeatureImage01 from '@/public/images/gpt-for-devs-2.png'
import FeatureImage02 from '@/public/images/gpt-for-devs-3.png'



function tabButton(name: string, description: string, tab: number, shouldShow: boolean, setTab: (value: (((prevState: number) => number) | number)) => void) {
  return <button
    className={`text-left px-4 py-5 border border-transparent rounded ${shouldShow ? 'bg-zinc-100 opacity-60 hover:opacity-100 transition' : '[background:linear-gradient(theme(colors.white),theme(colors.white))_padding-box,linear-gradient(120deg,theme(colors.zinc.300),theme(colors.zinc.100),theme(colors.zinc.300))_border-box] shadow-sm rotate-1'}`}
    onClick={(e) => {
      e.preventDefault();
      setTab(tab);
    }}
  >
    <div className="flex items-center justify-between mb-1">
      <div className="font-inter-tight font-semibold text-zinc-900">{name}</div>
      <svg className={`fill-zinc-400 shrink-0 ml-2 ${shouldShow ? 'hidden' : ''}`}
           xmlns="http://www.w3.org/2000/svg" width="10" height="10">
        <path
          d="M8.667.186H2.675a.999.999 0 0 0 0 1.998h3.581L.971 7.469a.999.999 0 1 0 1.412 1.412l5.285-5.285v3.58a.999.999 0 1 0 1.998 0V1.186a.999.999 0 0 0-.999-.999Z"/>
      </svg>
    </div>
    <div className="text-sm text-zinc-500">{description}
    </div>
  </button>;
}

function tabButtons(tab: number, setTab: (value: (((prevState: number) => number) | number)) => void) {
  return <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
    {tabButton("Access any LLM", "Claude 3.5 Sonnet, GPT4o, Claude 3 Opus, Perplexity online model and more", 1, tab === 1, setTab)}
    {tabButton("Keyboard navigation", "Visually structure your designs and structure them easily.", 2, tab === 2, setTab)}
    {tabButton("Private models", "Access local models.", 3, tab === 3, setTab)}
    {tabButton("Predefined prompts", "Visually structure your designs and structure them easily.", 4, tab === 4, setTab)}
  </div>;
}

function tabContent(name: string, imagePath: StaticImageData, show: boolean, heightFix: () => void) {
  return <Transition
    as="div"
    show={show}
    className="w-full text-center"
    enter="transition ease-in-out duration-700 transform order-first"
    enterFrom="opacity-0 -translate-y-4"
    enterTo="opacity-100 translate-y-0"
    leave="transition ease-in-out duration-300 transform absolute"
    leaveFrom="opacity-100 translate-y-0"
    leaveTo="opacity-0 translate-y-4"
    beforeEnter={() => heightFix()}
    unmount={false}
  >
    <div className="inline-flex relative align-top">
      <Image
        className="rounded-t-lg border border-transparent box-content"
        src={imagePath} width={600} height={360} alt={name}/>
    </div>
  </Transition>;
}

export default function Features01() {

  const [tab, setTab] = useState<number>(1)

  const tabs = useRef<HTMLDivElement>(null)

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement) tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`
  }

  useEffect(() => {
    heightFix()
  }, [])

  return (
    <section className="relative bg-zinc-50">
      <div className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h2 className="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Go further than
              the speed of thought</h2>
            <p className="text-lg text-zinc-500">AI reads and understands your designs, and with nothing more
              than a single line of feedback, perform complex actions autonomously.</p>
          </div>
          <div>
            {/* Tabs buttons */}
            {tabButtons(tab, setTab)}
            {/* Tabs items */}
            <div className="relative lg:max-w-none -mx-6">
              <div className="relative flex flex-col pt-12 md:pt-20 mx-6" ref={tabs}>
                {/* Item 1 */}
                {tabContent('feature 01', FeatureImage01, tab === 1, heightFix)}
                {/* Item 2 */}
                {tabContent('feature 02', FeatureImage02, tab === 2, heightFix)}
                {/* Item 3 */}
                {tabContent('feature 03', FeatureImage01, tab === 3, heightFix)}
                {/* Item 4 */}
                {tabContent('feature 04', FeatureImage02, tab === 4, heightFix)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}