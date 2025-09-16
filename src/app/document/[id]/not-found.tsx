import Link from "next/link"
import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <CardContent className="space-y-6 md:pr-6">
        <div className="flex items-center gap-3">
        <div className="bg-red-50 text-red-600 rounded-full p-3 shadow-sm">
        <AlertTriangle className="w-5 h-5" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Página no encontrada</h1>
        </div>
        
        
        <CardDescription className="!text-slate-600 text-base">
        Lo sentimos — la página que buscas no existe o ha sido movida. Es posible que la dirección esté mal escrita o
        que el recurso ya no esté disponible.
        </CardDescription>
        
        
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <Link href="/" passHref>
        <Button asChild className="w-full sm:w-auto">
        <a>Volver al inicio</a>
        </Button>
        </Link>
        
        
        <Link href="/contact" passHref>
        <Button variant="outline" asChild className="w-full sm:w-auto">
        <a>Contactar soporte</a>
        </Button>
        </Link>
        </div>
        
        
        <p className="mt-4 text-sm text-muted-foreground">
        Si crees que esto es un error, por favor contacta con el equipo de soporte indicando la URL que intentaste
        acceder.
        </p>
        </CardContent>
        
        
        <div className="flex items-center justify-center">
        <div className="w-full max-w-sm">
        {/* Decorative illustration */}
        <svg
        viewBox="0 0 600 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-hidden
        >
        <defs>
        <linearGradient id="g1" x1="0" x2="1">
        <stop offset="0%" stopColor="#fef3c7" />
        <stop offset="100%" stopColor="#fca5a5" />
        </linearGradient>
        </defs>
        
        
        <rect x="40" y="40" width="520" height="320" rx="20" fill="#fff" stroke="#e6e6e9" />
        
        
        <g transform="translate(120,80)">
        <circle cx="40" cy="40" r="36" fill="#fff8e1" stroke="#ffd29e" />
        <text x="40" y="48" textAnchor="middle" fontSize="28" fontWeight="700">404</text>
        
        
        <rect x="120" y="12" width="220" height="160" rx="12" fill="url(#g1)" />
        
        
        <path d="M20 140 C60 120, 160 120, 200 140" stroke="#c7d2fe" strokeWidth="8" fill="none" strokeLinecap="round" />
        </g>
        </svg>
        </div>
        </div>
        </Card >


        <div className="mt-6 text-center text-sm text-slate-500">
            <span>¿Sigues viendo este error? prueba borrar la caché del navegador o intenta abrir la página en una ventana de incógnito.</span>
        </div>
        </motion.div >
        </div >
}