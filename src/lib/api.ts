import ky from "ky";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        // Obtener la sesión actual de Supabase
        const { data } = await supabase.auth.getSession();
        const session = data.session;

        if (session) {
          // Si hay una sesión, añadir el token a la cabecera
          request.headers.set(
            "Authorization",
            `Bearer ${session.access_token}`
          );
        }
      },
    ],
  },
});

export default api;
