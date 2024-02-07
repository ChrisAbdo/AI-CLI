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
import { BorderBeam } from "@/components/ui/border-beam";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  return (
    <div className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {/* <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        Backgrounds
      </p> */}
      <ModeToggle />
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
            <div className="relative rounded-xl">
              <img
                src="https://camo.githubusercontent.com/fff26cf3d903fa17887ebc137730cb53a51b57211534e7c8938dc65bf75eb9c7/68747470733a2f2f76797a66673168646976307565766c682e7075626c69632e626c6f622e76657263656c2d73746f726167652e636f6d2f41334631424533382d363131392d343944372d394341302d3742373945304545354330332d38434b37564665655465426a35466743496c48367455346b7a45797430442e6a706567"
                alt="Hero Image"
                className="block max-w-[700px] rounded-[inherit] border object-contain shadow-lg"
              />

              <BorderBeam className="z-50" size={250} duration={12} delay={9} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
