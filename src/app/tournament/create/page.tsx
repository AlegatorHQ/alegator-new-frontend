"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Footer from "@/app/(site)/Footer";
import Navbar from "@/app/(site)/Navbar";

export default function CreateTournament() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    format: undefined as string | undefined,
    maxTeams: "",
    registrationDeadline: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the tournament data
    // For now, we'll redirect to the tournament configuration
    router.push("/tournament/config");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">
            CREAR NUEVO TORNEO
          </h1>

          <Card className="bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-green-800">
                Información del Torneo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Nombre del Torneo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Ingrese el nombre del torneo"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <textarea
                    id="description"
                    className="w-full rounded border border-gray-300 p-2"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Descripción del torneo"
                    rows={4}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Fecha del Torneo</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Ubicación</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder="Ubicación del torneo"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="format">Formato de Debate</Label>
                    <Select
                      value={formData.format}
                      onValueChange={(value: string) =>
                        setFormData({ ...formData, format: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar formato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bp">
                          British Parliamentary
                        </SelectItem>
                        <SelectItem value="ap">Asian Parliamentary</SelectItem>
                        <SelectItem value="wsdc">World Schools</SelectItem>
                        <SelectItem value="pf">Public Forum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="maxTeams">Máximo de Equipos</Label>
                    <Input
                      id="maxTeams"
                      type="number"
                      value={formData.maxTeams}
                      onChange={(e) =>
                        setFormData({ ...formData, maxTeams: e.target.value })
                      }
                      placeholder="Número máximo de equipos"
                      min="4"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="registrationDeadline">
                    Fecha Límite de Registro
                  </Label>
                  <Input
                    id="registrationDeadline"
                    type="date"
                    value={formData.registrationDeadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationDeadline: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 alegator-button text-white hover:bg-green-600"
                  >
                    Crear Torneo
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
