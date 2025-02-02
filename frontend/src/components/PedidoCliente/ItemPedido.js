import { useState } from "react";

function ItemPedido({ nome, qt, total, imagem }) {
    const [image, setImage] = useState("/images/clipboard.png"); // Valor padrão da imagem

    const fetchImage = async () => {
        if (imagem) { // Verifica se o produto tem uma imagem associada
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/produtos/images/${imagem}`);

                if (!response.ok) {
                    throw new Error("Erro ao buscar a imagem");
                }

                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);

                // Atualiza a imagem se houver uma nova
                setImage(imageUrl);
            } catch (error) {
                console.error(error.message);
            }
        }
    };

    // Carrega a imagem apenas uma vez no início do componente
    if (image === "/images/clipboard.png" && imagem) {
        fetchImage();
    }

    return (
        <div className="w-full min-w-[200px] h-full flex justify-between px-6 items-center mt-5">
            <img src={image} className="size-20" alt="" />
            <div>
                <h1 className="text-2xl font-bold text-accentBlue">{nome}</h1>
                <h2 className="font-bold text-md">Quantidade: {qt}</h2>
                <h2 className="font-bold text-md">total - R$ {total} <br/> unit. - R${(total/qt).toFixed(2)}</h2>
            </div>
        </div>
    );
}

export default ItemPedido;
