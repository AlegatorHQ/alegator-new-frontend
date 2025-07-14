import Image from "next/image";
import CheckoutButton from "@/components/CheckoutButton";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#ADBC9F] p-4 font-montserrat">
      <div className="max-w-md w-full text-center bg-[#11372A] p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <Image
            src="/alegator-logo.svg"
            alt="Alegator"
            width={180}
            height={180}
            className="h-36 w-auto"
            priority
          />
        </div>
        <h1 className="text-4xl font-extrabold text-yellow-400 mb-4 font-montserrat">
          404
        </h1>
        <h2 className="text-2xl font-extrabold text-white mb-4 font-montserrat">
          Página no encontrada :(
        </h2>
        <p className="text-white mb-8 font-medium font-montserrat">
          Lo sentimos, pero la página que estás buscando no existe. Puede que
          haya sido movida o eliminada.
        </p>
        <CheckoutButton
          href="/"
          className="inline-block bg-green-700 text-white py-2 px-4 rounded-full hover:bg-green-800 transition-colors font-bold font-montserrat"
        >
          Volver a la página principal
        </CheckoutButton>
      </div>
    </div>
  );
}
