import { Telescope } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center space-y-8 px-4 text-center">
      <div className="relative">
        <Telescope className="h-24 w-24 text-gray-400 dark:text-gray-600" />
        <span className="-translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 font-extrabold text-5xl text-gray-800 dark:text-gray-200">
          404
        </span>
      </div>

      <h1 className="font-extrabold text-4xl tracking-tight lg:text-5xl">
        ¡Vaya! Parece que hemos perdido la señal.
      </h1>

      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Link href="/" className={cn(buttonVariants({ variant: "default", size: "lg" }))}>
          Regresar a Tierra
        </Link>
      </div>
    </div>
  );
}
