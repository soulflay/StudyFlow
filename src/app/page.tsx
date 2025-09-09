import {Button} from "@/components/ui/button"
import TypewriterTitle from "@/components/TypewriterTitle"
import Link from "next/link";
import { ArrowRight } from "lucide-react";



export default function Home() {
  return (
    <div className="bg-gradient-to-r min-h-screen grainy from-rose-100 to-cyan-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-6xl text-center">
          A Smart <span className="text-indigo-500 font-bold">Note taking</span>{' '}app
        </h1>
        <div className="mt-4"></div>
        <h2 className="font-semibold text-2xl text-center text-slate-700">
          <TypewriterTitle />
        </h2>
        <div className="mt-7"></div>
      <div className="flex justify-center">
      <Link href="/dashboard">
        <Button className="bg-indigo-600 cursor-pointer transition ease-in-out">Get Started
        <ArrowRight className="ml-0.2 w-5 h-5" strokeWidth={3}/>
        </Button>
        
      </Link>

      </div>
        
        
      </div>
    </div>
  );
}
