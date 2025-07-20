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
import { createClient } from "@/lib/supabase/client";

const PALETTE = {
  bg: "#b7c7a2",
  card: "#f5f7f2",
  accent: "#cddcaa",
  dark: "#133c2b",
  green: "#8ca62e",
  yellow: "#ffe97a",
  text: "#133c2b",
  textSecondary: "#4d5c4a",
  white: "#fff",
};

export default function CreateTournament() {
  const router = useRouter();
  const supabase = createClient();
  const [formData, setFormData] = useState({
    name: "",
    initials: "",
    qualifiers: "",
    eliminations: "",
    location: "",
    date: "",
    teamRanking: "",
    judgeRanking: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !formData.name ||
      !formData.initials ||
      !formData.qualifiers ||
      !formData.eliminations ||
      !formData.location ||
      !formData.date ||
      !formData.teamRanking ||
      !formData.judgeRanking
    ) {
      setError("Completa todos los campos.");
      return;
    }

    setLoading(true);

    const { error: dbError } = await supabase.from("tournaments").insert([
      {
        name: formData.name,
        initials: formData.initials,
        qualifiers: Number(formData.qualifiers),
        eliminations: formData.eliminations,
        location: formData.location,
        date: formData.date,
        team_ranking: formData.teamRanking,
        judge_ranking: formData.judgeRanking,
      },
    ]);

    setLoading(false);

    if (dbError) {
      setError("Error al crear el torneo. Intenta de nuevo.");
      return;
    }

    router.push("/tournament/config");
  };

  // Demo handler
  const handleDemo = async () => {
    setLoading(true);
    await supabase.from("tournaments").insert([
      {
        name: "Torneo Demo",
        initials: "DEMO",
        qualifiers: 3,
        eliminations: "Octavos",
        location: "Demo City",
        date: new Date().toISOString().slice(0, 10),
        team_ranking: "General",
        judge_ranking: "General",
      },
    ]);
    setLoading(false);
    router.push("/tournament/config");
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: PALETTE.bg }}
    >
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center mt-24">
        <h1
          className="text-4xl font-bold mb-6 text-center"
          style={{
            color: PALETTE.text,
            fontFamily: "Montserrat, sans-serif",
            letterSpacing: "1px",
          }}
        >
          CREAR TORNEO NUEVO
        </h1>

        {/* Consejo y botón demo */}
        <div
          className="w-full max-w-xl rounded-lg mb-6 px-6 py-4"
          style={{
            background: "rgba(0,0,0,0.15)",
            color: PALETTE.textSecondary,
            fontSize: "1.1rem",
          }}
        >
          <div
            className="font-bold mb-2"
            style={{ color: PALETTE.yellow, fontSize: "1rem" }}
          >
            Consejo:
          </div>
          <div className="mb-3" style={{ color: "#000", fontSize: "1rem" }}>
            ¿Eres nuevo en Alegator? Puedes crear un torneo de demostración que
            esté con una configuración preestablecida de equipos, jueces y
            salas.
          </div>
          <Button
            style={{
              background: PALETTE.yellow,
              color: PALETTE.text,
              fontWeight: "bold",
              borderRadius: "999px",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "1rem",
              padding: "0.5rem 1.5rem",
            }}
            onClick={handleDemo}
            disabled={loading}
          >
            Torneo Demo
          </Button>
        </div>

        {/* Formulario principal */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl rounded-2xl px-8 py-8 flex flex-col gap-8"
          style={{
            background: PALETTE.white,
            boxShadow: "0 2px 24px #cddcaa44",
          }}
        >
          <h2
            className="text-2xl font-bold text-center mb-2"
            style={{
              color: PALETTE.text,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            INGRESE LOS SIGUIENTES DATOS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="name"
                style={{ color: PALETTE.text, fontSize: "1.1rem" }}
              >
                NOMBRE DE TORNEO
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                style={{
                  background: PALETTE.accent,
                  color: PALETTE.text,
                  fontWeight: "bold",
                  borderRadius: "12px",
                  border: "none",
                  marginTop: "6px",
                  fontSize: "1.15rem",
                  padding: "0.75rem",
                }}
                required
              />
            </div>
            <div>
              <Label
                htmlFor="initials"
                style={{ color: PALETTE.text, fontSize: "1.1rem" }}
              >
                SIGLAS
              </Label>
              <Input
                id="initials"
                value={formData.initials}
                onChange={(e) =>
                  setFormData({ ...formData, initials: e.target.value })
                }
                style={{
                  background: PALETTE.accent,
                  color: PALETTE.text,
                  fontWeight: "bold",
                  borderRadius: "12px",
                  border: "none",
                  marginTop: "6px",
                  fontSize: "1.15rem",
                  padding: "0.75rem",
                }}
                required
              />
            </div>
            <div>
              <Label
                htmlFor="qualifiers"
                style={{ color: PALETTE.text, fontSize: "1.1rem" }}
              >
                N° DE CLASIFICATORIAS
              </Label>
              <Input
                id="qualifiers"
                type="number"
                min={1}
                value={formData.qualifiers}
                onChange={(e) =>
                  setFormData({ ...formData, qualifiers: e.target.value })
                }
                style={{
                  background: PALETTE.accent,
                  color: PALETTE.text,
                  fontWeight: "bold",
                  borderRadius: "12px",
                  border: "none",
                  marginTop: "6px",
                  fontSize: "1.15rem",
                  padding: "0.75rem",
                }}
                required
              />
            </div>
            <div>
              <Label
                htmlFor="eliminations"
                style={{ color: PALETTE.text, fontSize: "1.1rem" }}
              >
                ELIMINATORIAS
              </Label>
              <Select
                value={formData.eliminations}
                onValueChange={(value: string) =>
                  setFormData({ ...formData, eliminations: value })
                }
                required
              >
                <SelectTrigger
                  style={{
                    background: PALETTE.accent,
                    color: PALETTE.text,
                    fontWeight: "bold",
                    borderRadius: "12px",
                    border: "none",
                    marginTop: "6px",
                    fontSize: "1.15rem",
                    padding: "0.75rem",
                  }}
                >
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Octavos">Octavos</SelectItem>
                  <SelectItem value="Cuartos">Cuartos</SelectItem>
                  <SelectItem value="Semifinal">Semifinal</SelectItem>
                  <SelectItem value="Final">Final</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="location"
                style={{ color: PALETTE.text, fontSize: "1.1rem" }}
              >
                LUGAR
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                style={{
                  background: PALETTE.accent,
                  color: PALETTE.text,
                  fontWeight: "bold",
                  borderRadius: "12px",
                  border: "none",
                  marginTop: "6px",
                  fontSize: "1.15rem",
                  padding: "0.75rem",
                }}
                required
              />
            </div>
            <div>
              <Label
                htmlFor="date"
                style={{ color: PALETTE.text, fontSize: "1.1rem" }}
              >
                FECHA
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                style={{
                  background: PALETTE.accent,
                  color: PALETTE.text,
                  fontWeight: "bold",
                  borderRadius: "12px",
                  border: "none",
                  marginTop: "6px",
                  fontSize: "1.15rem",
                  padding: "0.75rem",
                }}
                required
              />
            </div>
            <div>
              <Label
                htmlFor="teamRanking"
                style={{ color: PALETTE.text, fontSize: "1.1rem" }}
              >
                CLASIFICACIÓN DE EQUIPO
              </Label>
              <Select
                value={formData.teamRanking}
                onValueChange={(value: string) =>
                  setFormData({ ...formData, teamRanking: value })
                }
                required
              >
                <SelectTrigger
                  style={{
                    background: PALETTE.accent,
                    color: PALETTE.text,
                    fontWeight: "bold",
                    borderRadius: "12px",
                    border: "none",
                    marginTop: "6px",
                    fontSize: "1.15rem",
                    padding: "0.75rem",
                  }}
                >
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Novato">Novato</SelectItem>
                  <SelectItem value="Mixto">Mixto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="judgeRanking"
                style={{ color: PALETTE.text, fontSize: "1.1rem" }}
              >
                CLASIFICACIÓN DE JUEZ
              </Label>
              <Select
                value={formData.judgeRanking}
                onValueChange={(value: string) =>
                  setFormData({ ...formData, judgeRanking: value })
                }
                required
              >
                <SelectTrigger
                  style={{
                    background: PALETTE.accent,
                    color: PALETTE.text,
                    fontWeight: "bold",
                    borderRadius: "12px",
                    border: "none",
                    marginTop: "6px",
                    fontSize: "1.15rem",
                    padding: "0.75rem",
                  }}
                >
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Novato">Novato</SelectItem>
                  <SelectItem value="Mixto">Mixto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && (
            <div className="text-red-600 font-semibold text-center text-lg">
              {error}
            </div>
          )}

          <div className="flex gap-6 pt-2 justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              style={{
                background: "grey",
                color: "black",
                fontWeight: "bold",
                borderRadius: "999px",
                border: "none",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "1.15rem",
                padding: "0.75rem 0",
                width: "45%",
              }}
              disabled={loading}
            >
              Volver
            </Button>
            <Button
              type="submit"
              style={{
                background: PALETTE.yellow,
                color: "black",
                fontWeight: "bold",
                borderRadius: "999px",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "1.15rem",
                padding: "0.75rem 0",
                width: "45%",
              }}
              disabled={loading}
            >
              {loading ? "Creando..." : "Confirmar"}
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
