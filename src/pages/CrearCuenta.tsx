import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const CrearCuenta = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.nombre ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setError("");
    setSubmitted(true);
    console.log("Cuenta creada:", form);
  };

  return (
    <>
      <Navbar />
      <div className=" bg-kakao-lightBlue">
        <div className="min-h-screen  bg-[url('/showa_bg2.png')] flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-kakao-gold p-8 relative">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img
                src="/showa-logo.jpg"
                alt="Kakao Manga Logo"
                className="h-10 w-10 object-cover rounded-full"
              />
              <h2 className="text-3xl font-bold text-kakao-darkBlue">
                Crear cuenta
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nombre */}
              <div className="relative">
                <User
                  className="absolute left-3 top-3 text-kakao-lightBlue"
                  size={20}
                />
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Nombre completo"
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-kakao-black bg-kakao-white text-kakao-darkBlue focus:outline-none focus:ring-2 focus:ring-kakao-lightBlue transition-all"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 text-kakao-lightBlue"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Correo electrónico"
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-kakao-dark bg-kakao-white text-kakao-darkBlue focus:outline-none focus:ring-2 focus:ring-kakao-lightBlue transition-all"
                />
              </div>

              {/* Contraseña */}
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 text-kakao-lightBlue"
                  size={20}
                />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Contraseña"
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-dark bg-kakao-white text-kakao-darkBlue focus:outline-none focus:ring-2 focus:ring-kakao-lightBlue transition-all"
                />
              </div>

              {/* Confirmar contraseña */}
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 text-kakao-lightBlue"
                  size={20}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmar contraseña"
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-dark bg-kakao-white text-kakao-darkBlue focus:outline-none focus:ring-2 focus:ring-kakao-lightBlue transition-all"
                />
              </div>

              {/* Mensaje de error */}
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              {submitted && !error && (
                <p className="text-green-600 text-sm text-center">
                  Cuenta creada con éxito 🎉
                </p>
              )}

              {/* Botón */}
              <Button
                type="submit"
                className="w-full bg-kakao-pink text-white hover:bg-kakao-darkBlue transition-colors font-semibold py-2 rounded-md"
              >
                Crear cuenta
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CrearCuenta;
