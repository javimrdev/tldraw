import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Telescope } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-theme(spacing.16))] flex-col items-center justify-center space-y-8 text-center px-4">
      <div className="relative">
        <Telescope className="w-24 h-24 text-gray-400 dark:text-gray-600" />
        <span className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-extrabold text-gray-800 dark:text-gray-200">
          404
        </span>
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        ¡Vaya! Parece que hemos perdido la señal.
      </h1>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "default", size: "lg" }))}
        >
          Regresar a Tierra
        </Link>
      </div>
    </div>
  );
}