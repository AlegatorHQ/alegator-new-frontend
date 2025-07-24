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
import  api  from "@/lib/api"; // Usaremos nuestro cliente de API
import toast, { Toaster } from "react-hot-toast";

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
  const [formData, setFormData] = useState({
    name: "",
    shortname: "",
    place: "",
    start_date: "",
    end_date: "",
    description_tournament: "", // Added description field
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.shortname || !formData.place || !formData.start_date || !formData.end_date) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Creando torneo...");

    try {
      interface CreateTournamentResponse {
        id: number | string;
      }
      // Mapeamos los datos del formulario al formato esperado por el backend
      const payload = {
        name: formData.name,
        shortname: formData.shortname,
        place: formData.place,
        start_date: formData.start_date,
        end_date: formData.end_date,
        description_tournament: formData.description_tournament, // Added description to payload
        // Valores por defecto que el backend espera
        tournament_status: "upcoming",
        avoid_same_institution: true,
        missing_feedbacks: false,
        check_in: true,
      };

      const responseData = await api.post("api/v1/tournaments/", {
        json: payload,
      }).json<CreateTournamentResponse>();

      toast.success("Torneo creado con éxito", { id: toastId }); 
      router.push(`/tournaments/${responseData.id}/home`);

    } catch (error) {
      console.error("Error creating tournament:", error);
      toast.error("Hubo un error al crear el torneo. Inténtalo de nuevo.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // Demo handler
  /* const handleDemo = async () => {
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
  }; */

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: PALETTE.bg }}
    >
      <Navbar />
      <Toaster position="top-right" />

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
            onClick={() => {}}
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
                htmlFor="shortname"
                style={{ color: PALETTE.text, fontSize: "1.1rem" }}
              >
                SIGLAS
              </Label>
              <Input
                id="shortname"
                value={formData.shortname}
                onChange={(e) =>
                  setFormData({ ...formData, shortname: e.target.value })
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
                htmlFor="place"
                style={{ color: PALETTE.text, fontSize: "1.1rem" }}
              >
                LUGAR
              </Label>
              <Input
                id="place"
                value={formData.place}
                onChange={(e) =>
                  setFormData({ ...formData, place: e.target.value })
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
                htmlFor="start_date"
                style={{ color: PALETTE.text, fontSize: "1.1rem" }}
              >
                FECHA DE INICIO
              </Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) =>
                  setFormData({ ...formData, start_date: e.target.value })
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
                htmlFor="end_date"
                style={{ color: PALETTE.text, fontSize: "1.1rem" }}
              >
                FECHA DE FIN
              </Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) =>
                  setFormData({ ...formData, end_date: e.target.value })
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

          </div>
          <div>
            <Label
              htmlFor="description_tournament"
              style={{ color: PALETTE.text, fontSize: "1.1rem" }}
            >
              DESCRIPCIÓN
            </Label>
            <Textarea
              id="description_tournament"
              value={formData.description_tournament}
              onChange={(e) =>
                setFormData({ ...formData, description_tournament: e.target.value })
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
                minHeight: "100px",
              }}
            />
          </div>

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
