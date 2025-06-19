import React, { useState } from "react";

import Swal from "sweetalert2";
import BotaoCancelar from "../BotaoCancelar/BotaoCancelar";
import BotaoSalvar from "../BotaoSalvar/BotaoSalvar";
import { Link, useNavigate } from "react-router";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";

const FormCadastroAcesso = () => {
  const navigate = useNavigate(); 
  const [cpf, setCPF] = useState("");
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [nivelAcesso, setNivelAcesso] = useState("Gerente");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [descricao, setDescricao] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const listNivelAcesso = ["Gerente", "Funcionário"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      cpf,
      nome,
      matricula,
      nivelAcesso,
      descricao,
      observacoes,
      senha,
    };
    if (validarCPF(cpf) && senha === confirmarSenha) {
      if (
        nome.trim().length > 0 &&
        matricula.trim().length > 0 &&
        senha.trim().length > 0 &&
        confirmarSenha.trim().length > 0
      ) {
        try {
          await axios.post("http://localhost:3000/acessos", dataToSend);
          setCPF("");
          setNome("");
          setMatricula("");
          setDescricao("");
          setObservacoes("");
          setSenha("");
          setConfirmarSenha("");
          await Swal.fire({
            title: "Sucesso!",
            text: "Acesso cadastrado com sucesso!",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate(-1);
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Erro!",
            text: "Algo deu errado!",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
      else{
        Swal.fire({
            title: "Erro!",
            text: "Os valores não podem ser nulos!",
            icon: "error",
            confirmButtonText: "OK",
          });
      }
    } else {
      Swal.fire({
        title: "Erro!",
        text: "Formulário inválido",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
  };

  const handleCPF = (e) => {
    let value = e.target.value;
    // Remove tudo que não for número
    value = value.replace(/\D/g, "");
    // Limita a 11 dígitos
    if (value.length > 11) value = value.slice(0, 11);
    // Aplica a máscara progressivamente
    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    }
    setCPF(value);
  };

  return (
    <div>
      <form className="py-4 flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-5 mt-5  ">
          <div className="flex flex-col w-auto gap-2">
            <label htmlFor="" className="text-lg">
              CPF
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              maxLength={14}
              value={cpf}
              onChange={handleCPF}
              placeholder="000.000.000-00"
            />
          </div>
          <div className="flex flex-col w-auto gap-2">
            <label htmlFor="" className="text-lg">
              Nome
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Digite o nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-auto gap-2">
            <label htmlFor="" className="text-lg">
              Matrícula
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Digite a matrícula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-auto gap-2">
            <label htmlFor="" className="text-lg">
              Nível de acesso
            </label>
            <select
              value={nivelAcesso}
              onChange={(e) => setNivelAcesso(e.target.value)}
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {listNivelAcesso.map((nivel) => (
                <option>{nivel}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-auto gap-2">
            <label htmlFor="" className="text-lg">
              Senha
            </label>
            <div className="relative flex items-center justify-between w-[80%] ">
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Digite a senha do usuário"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              {isPasswordVisible ? (
                <FaRegEye
                  className="absolute right-3 text-gray-500"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              ) : (
                <FaRegEyeSlash
                  className="absolute right-3 text-gray-500"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col w-auto gap-2">
            <label htmlFor="" className="text-lg">
              Confirmar a senha
            </label>
            <div className="relative flex items-center justify-between w-[80%] ">
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Digite a senha do usuário"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
              {isPasswordVisible ? (
                <FaRegEye
                  className="absolute right-3 text-gray-500"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              ) : (
                <FaRegEyeSlash
                  className="absolute right-3 text-gray-500"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 ">
            <label htmlFor="" className="text-lg">
              Descrição
            </label>
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[94%] h-30 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
              type="text"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="" className="text-lg">
              Observações
            </label>
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[94%] h-30 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
              type="text"
              placeholder="Observações"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-5 mt-5">
          <Link to="/acessos">
            <BotaoCancelar />
          </Link>
          <BotaoSalvar />
        </div>
      </form>
    </div>
  );
};

export default FormCadastroAcesso;
