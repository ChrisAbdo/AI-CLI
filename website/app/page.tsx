// import React from "react";
// import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
// import { Boxes } from "@/components/ui/background-boxes";
// import { cn } from "@/lib/utils";
// import { Terminal } from "@/components/terminal";
// export default function Home() {
//   return (
//     // <div>
//     //   <TypewriterEffectSmooth words={words} />
//     // </div>
//     <div className="h-screen relative w-full overflow-hidden bg-background flex flex-col items-center justify-center rounded-lg">
//       <div className="absolute inset-0 w-full h-full bg-background z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

//       <Boxes />

//       <Terminal />

//       {/* <h1 className={cn("md:text-4xl text-xl text-foreground relative z-20")}>
//         <TypewriterEffectSmooth words={words} />
//       </h1> */}
//       <p className="text-center mt-2 text-foreground relative z-20">
//         Framer motion is the best animation library ngl
//       </p>
//     </div>
//   );
// }

"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { cn } from "@/lib/utils";
import TextShimmer from "@/components/ui/text-shimmer";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {/* <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        Backgrounds
      </p> */}
      <div className="relative isolate pt-14">
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="hidden sm:mb-6 sm:flex sm:justify-center">
                <div
                  className={cn(
                    "group rounded-full border border-black/5 bg-muted text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                  )}
                >
                  <TextShimmer className="inline-flex items-center justify-center px-4 py-1">
                    <span>✨ Introducing iforget</span>
                    <ArrowRightIcon className="size-3 ml-1 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                  </TextShimmer>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                iforget AI CLI
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-600">
                turn natural language into executable terminal commands
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                {/* <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a> */}
                <Button>Get started</Button>
                <Button variant="secondary">Learn more</Button>
              </div>
            </div>
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img
                  src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
