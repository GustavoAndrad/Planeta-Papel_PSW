const { v4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadPath = path.join(__dirname, '../../uploads/');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Verifica se a pasta existe, se não, cria
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Nome atualizado futuramente
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Filtro para restringir tipos de arquivos permitidos
function fileFilter(req, file, cb) {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Aceita o arquivo
    } else {
        cb(new Error('Tipo de arquivo não suportado. Apenas PNG, JPEG ou JPG são permitidos.'), false); // Rejeita o arquivo
    }
}

/**
 * Remove uma imagem do sistema de arquivos
 * @param {*} imageName - nome da imagem
 */
function delete_image(imageName) {
    const imagePath = path.join(uploadPath, imageName);

    // Verifica se a imagem existe antes de tentar apagar
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Apaga o arquivo
        console.log(`Imagem ${imageName} removida com sucesso.`);
    } else {
        console.warn(`Imagem ${imageName} não encontrada.`);
    }
}

/**
 * Remove uma lista de imagens do sistema de arquivos
 * @param {*} imageNames - nome da imagem
 */
function delete_images(imageNames) {
    imageNames.forEach(delete_image);
}

/**
 * Modifica o nome d eum arquivo
 * @param {*} file Arquivo
 * @param {*} name Novo nome do arquivo
 * @returns {String} nome do arquivo
 */
function rename_file(file, name) {
    const ext = path.extname(file.originalname);
    const newFileName = `${name}-${v4()}${ext}`;
    const newFilePath = path.join(uploadPath, newFileName);

    // Renomeia o arquivo no sistema
    fs.renameSync(file.path, newFilePath);

    return newFileName;
}

/**
 * Retorna o caminho completo de uma imagem no sistema de arquivos, caso ela exista
 * @param {*} name Nome do Arquivo
 * @returns 
 */
function get_image(name) {
    const imagePath = path.join(uploadPath, name); // Cria o caminho completo da imagem

    // Verifica se a imagem existe no diretório
    if (!fs.existsSync(imagePath)) {
        throw new Error('Imagem não encontrada');
    }
    return imagePath;
}

module.exports = {
    upload: multer({ storage: storage, fileFilter: fileFilter }), // Inclui o filtro na configuração do multer
    rename_file,
    get_image,
    delete_images
};
