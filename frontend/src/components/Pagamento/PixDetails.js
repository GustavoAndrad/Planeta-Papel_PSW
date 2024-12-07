import React from 'react';

const PixDetails = () => {
  return (
    <div id="pix-details">
      <p className="text-center text-[#828282] mt-4">
        Ao gerar o Código Pix do pedido você pode pagar escaneando o{" "}
        <strong>QR Code</strong> ou <strong>Copiar</strong> e{" "}
        <strong>Colar</strong>.
        <br /> Abra seu banco digital e faça o pagamento. A validação é
        feita na hora!
      </p>
      <div className="flex justify-center mt-4">
        <a href="https://commons.wikimedia.org/wiki/File:Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg#/media/Ficheiro:Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg"
            alt="QR Code"
            className="w-32 h-32"
          />
        </a>
      </div>
      <div className="text-center mt-2">
        <p className="text-black">
          <span id="pix-number">1234 5678 9101 1121</span>
        </p>
        <p
          className="text-[#2A56ED] cursor-pointer hover:underline"
          onClick={() => navigator.clipboard.writeText("1234 5678 9101 1121")}
        >
          Clique para copiar!
        </p>
      </div>
    </div>
  );
};

export default PixDetails;

