import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import { ConfirmationContent } from "./ConfirmationContent"

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-ivory flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-gold animate-spin mx-auto mb-4" />
            <p className="font-serif text-xl text-emerald-dark">Confirming your booking...</p>
          </div>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  )
}
