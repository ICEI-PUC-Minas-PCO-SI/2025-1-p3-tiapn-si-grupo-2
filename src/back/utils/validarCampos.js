function validarCamposObrigatorios(body, campos) {
  const faltando = campos.filter(campo => !body[campo]);
  return faltando.length > 0 ? faltando : null;
}

module.exports = validarCamposObrigatorios;