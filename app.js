const express = require('express');

const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const storageStrategy = multer.memoryStorage();
const upload = multer({ storage: storageStrategy });


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/imagen', upload.single('imagen') ,async (req, res) => {

    const imagen = req.file;

    // buffer de datos de la imagen con sharp
    const prosessImage = sharp(imagen.buffer);
    //Re escalado de foto
    const resizedImage = prosessImage.resize(800, 800, {
        // escalamos la foto desdtro de nuestras dimenciones especificadas
        fit: 'contain',
        background: '#fff',
    });
    //Buffer de Imagen Con Promesa 
    const resizedImagenBuffer = await resizedImage.toBuffer();
    //fs con foto reescalada
    fs.writeFileSync('rutaImagen/resized.jpg', resizedImagenBuffer);

    console.log(resizedImagenBuffer);

    res.send([{resizeImage : resizedImagenBuffer}]);
})

const PORT = process.env.PORT || 3000;
app.listen (PORT, () => {
    console.log('Server on port '+ PORT);
});
