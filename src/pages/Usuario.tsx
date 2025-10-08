import { useState } from "react";
import usuarioMock from "@/data/usuario";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type UsuarioData = typeof usuarioMock;

const Usuario = () => {
  const [usuario, setUsuario] = useState<UsuarioData>(usuarioMock);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState<UsuarioData>(usuarioMock);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardarCambios = () => {
    setUsuario(form);
    setEditando(false);
  };

  return (
    <>
    <Navbar />
      <div className="max-w-xl mx-auto mt-12 bg-[#FFFAEF] border border-[#FEE8C3] rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-[#1A1F2C] mb-4 text-center">
          Perfil de Usuario
        </h2>

        {!editando ? (
          <div className="space-y-3 text-[#1A1F2C]">
            <p>
              <strong>Nombre:</strong> {usuario.nombre}
            </p>
            <p>
              <strong>Email:</strong> {usuario.email}
            </p>
            <p>
              <strong>Teléfono:</strong> {usuario.telefono}
            </p>
            <p>
              <strong>Dirección:</strong> {usuario.direccion}
            </p>

            <button
              onClick={() => setEditando(true)}
              className="mt-4 px-4 py-2 bg-[#0077B6] text-white rounded-md hover:bg-[#1A1F2C] transition"
            >
              Editar datos
            </button>
          </div>
        ) : (
          <form className="space-y-4 text-[#1A1F2C]">
            <div>
              <label className="block text-sm mb-1">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="w-full p-2 border border-[#FEE8C3] rounded-md bg-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 border border-[#FEE8C3] rounded-md bg-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                className="w-full p-2 border border-[#FEE8C3] rounded-md bg-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Dirección</label>
              <input
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                className="w-full p-2 border border-[#FEE8C3] rounded-md bg-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Favorito</label>
              <input
                type="text"
                name="favorito"
                value={form.favorito}
                onChange={handleChange}
                className="w-full p-2 border border-[#FEE8C3] rounded-md bg-white"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={guardarCambios}
                className="px-4 py-2 bg-[#0077B6] text-white rounded-md hover:bg-[#1A1F2C] transition"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => setEditando(false)}
                className="px-4 py-2 bg-[#FFDEE2] text-[#1A1F2C] rounded-md hover:bg-[#FEE8C3] transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
        <Footer />
    </>
  );
};

export default Usuario;
