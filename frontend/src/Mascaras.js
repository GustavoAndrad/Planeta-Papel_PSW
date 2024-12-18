export const mascaraTelefone = (valor) => {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/, '($1) $2');
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    return valor.slice(0,15);
  };
  
export const mascaraCEP = (valor) => {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/^(\d{5})(\d{1,})$/, '$1-$2');
    return valor.slice(0,9);
};

export const mascaraCPF = (cpf) => {
	cpf = cpf.replace(/\D/g, '');
	cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
	cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
	cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
	return cpf.slice(0,14);
}

export const mascaraCartao = (value) => {
    return value
      .replace(/\D/g, '') 
      .replace(/(\d{4})(\d)/, '$1 $2') 
      .replace(/(\d{4})(\d)/, '$1 $2')
      .replace(/(\d{4})(\d)/, '$1 $2') 
      .replace(/(\d{4})(\d{1,4})$/, '$1 $2')
	  .slice(0,19)
  };

export const mascaraData = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
	  .slice(0, 7);
  };

export const mascaraCVV = (value) => {
    return value
      .replace(/\D/g, '')
      .slice(0, 3);
  };
