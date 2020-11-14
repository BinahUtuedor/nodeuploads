const express = require('express');
const multer = require('multer');
const eje = require('ejs');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: '/public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + 
        path.extname(file.originalname));
    }
});

// Init upload
upload = multer({
    storage: storage
}).single('myImage');

// Init app
const app = express();

// EJS
app.set('view engine', 'ejs');

// public folder
app.use(express.static('./public')); 

app.get('/', (req, res) => res.render('index'));

app.post('/upload', (req, res) =>{
    upload(req, res, (err) => {
        if(err) {
            res.render('index', {
                msg: err
            })
        } else {
            console.log(req.file);
            res.send('test')
        }
    });
});

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));