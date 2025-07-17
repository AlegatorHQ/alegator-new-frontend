"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FileText, Upload, CheckCircle } from "lucide-react"
import type { Round } from "@/types/tournament"

interface MotionUploadProps {
  round: Round
  onUploadMotion: (motion: string) => void
  onNext: () => void
}

export function MotionUpload({ round, onUploadMotion, onNext }: MotionUploadProps) {
  const [motion, setMotion] = useState(round.motion || "")
  const [isUploaded, setIsUploaded] = useState(!!round.motion)

  const handleUpload = () => {
    if (motion.trim()) {
      onUploadMotion(motion.trim())
      setIsUploaded(true)
    }
  }

  const predefinedMotions = [
    "Esta Casa cree que las redes sociales han hecho más daño que bien a la sociedad",
    "Esta Casa apoyaría la implementación de un ingreso básico universal",
    "Esta Casa cree que la inteligencia artificial representa una amenaza existencial para la humanidad",
    "Esta Casa prohibiría la publicidad dirigida a menores de edad",
    "Esta Casa cree que los gobiernos deberían regular estrictamente las criptomonedas",
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#11372] mb-2">Subir Moción del Debate</h2>
        <p className="text-[#11372]">Define el tema que se debatirá en esta ronda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Motion Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-[#6b9026]" />
              <span>Moción del Debate</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="motion" className="text-[#333333]">
                Escribe la moción para esta ronda
              </Label>
              <Textarea
                id="motion"
                value={motion}
                onChange={(e) => setMotion(e.target.value)}
                placeholder="Esta Casa cree que..."
                className="mt-2 min-h-[120px] border-[#d9d9d9] focus:border-[#6b9026]"
              />
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleUpload}
                disabled={!motion.trim() || isUploaded}
                className="bg-[#6b9026] hover:bg-[#5a7821] text-white disabled:bg-[#d9d9d9] disabled:text-[#7a8174]"
              >
                {isUploaded ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Moción Subida
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Subir Moción
                  </>
                )}
              </Button>

              {isUploaded && (
                <Button
                  onClick={() => setIsUploaded(false)}
                  variant="outline"
                  className="border-[#6b9026] text-[#6b9026] hover:bg-[#6b9026] hover:text-white"
                >
                  Editar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Predefined Motions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#11372]">Mociones Sugeridas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {predefinedMotions.map((predefinedMotion, index) => (
                <div
                  key={index}
                  className="p-3 bg-[#f3f4f3] rounded-lg hover:bg-[#e8e8e8] transition-colors cursor-pointer"
                  onClick={() => setMotion(predefinedMotion)}
                >
                  <p className="text-sm text-[#11372]">{predefinedMotion}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Motion Display */}
      {isUploaded && round.motion && (
        <Card className="border-l-4 border-l-[#6b9026]">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-[#6b9026]" />
              <span>Moción Actual</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#333333] font-medium text-lg">{round.motion}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
