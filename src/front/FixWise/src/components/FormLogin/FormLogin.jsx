import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

const FormLogin = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      matricula,
      senha,
    };
    if (matricula.trim().length > 0 && senha.trim().length > 0) {
      try {
        const response = await axios.post(
          "http://localhost:3000/cadastros-login",
          dataToSend
        );
        response.data.sucesso
          ? navigate("/")
          : Swal.fire({
              title: "Erro!",
              text: "Matrícula ou senha incorretos!",
              icon: "error",
              confirmButtonText: "OK",
            });
      } catch (error) {
        console.log(error);
      }
    }
    else{
        Swal.fire({
              title: "Erro!",
              text: "Preencha todos os campos!",
              icon: "error",
              confirmButtonText: "OK",
            });
    }
  };

  return (
    <div className="w-[300px]  p-3 ">
      <form
        action=""
        className="flex flex-col gap-5"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="">Matrícula</label>
          <input
            value={matricula}
            placeholder="Digite sua matrícula"
            onChange={(e) => setMatricula(e.target.value)}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Senha</label>
          <div className="relative flex items-center">
            <input
              value={senha}
              placeholder="Digite sua senha"
              onChange={(e) => setSenha(e.target.value)}
              type={isPasswordVisible ? "text" : "password"}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {isPasswordVisible ? (
              <FaRegEye
                className="absolute right-3 cursor-pointer"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            ) : (
              <FaRegEyeSlash
                className="absolute right-3 cursor-pointer"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="shadow-sm ring p-2 hover:cursor-pointer bg-gray-900 text-white w-full rounded-md"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
