var db = require('../db').dbTree,
    ObjectID = require('../db').ObjectID,
    multiparty = require('multiparty'),
    fs = require('fs');

module.exports = {
    index: function(req, res) {
        db(function(collection){
            collection.find().toArray(function(err, docs) {
                if(err) return res.status(500).send({status: 'Failed to find docs'});
                res.send(docs);
            })
        }) 
    },
    show: function(req, res) {
        
    },
    create: function(req, res) {console.log("req:",req)
        var params = req.body;
        db(function(collection){
            collection.insert(params, function(err) {
                if (err) return res.status(500).send({status: "Failed to create doc"});
                res.send(params);
            })
        })
    },
    destroy: function(req, res) {
        var id = req.params.id;
        doc = req.body;
        db(function(collection) {
            collection.remove({_id: new ObjectID(id)}, function(err) {
                if(err) return res.status(500).send({err: err});
                res.send(doc);
            });
        });
    },
    update: function(req, res) {
        var id = req.params.id,
            doc = req.body;
        delete doc._id;
        db(function(collection) {
            collection.update({_id: new ObjectID(id)}, doc, function(err) {
                if(err) return res.status(500).send({err: err});
                res.send(doc);
            });
        });
    },
    file: function(req, res, next) {
        // создаем форму
        var form = new multiparty.Form();
        //здесь будет храниться путь k загружаемому файлу, его тип и размер
        var uploadFile = {uploadPath: '', type: '', size: 0};
        //максимальный размер файла
        var maxSize = 2 * 1024 * 1024; //2MB
        //поддерживаемые типы(в данном случае это картинки формата jpeg,jpg и png)
        var supportMimeTypes = ['image/jpg', 'image/png'];
        //массив с ошибками произошедшими в ходе загрузки файла
        var errors = [];

         //если произошла ошибка
        form.on('error', function(err){
            if(fs.existsSync(uploadFile.path)) {
                //если загружаемый файл существует удаляем его
                fs.unlinkSync(uploadFile.path);
                console.log('error');
            }
        });

        form.on('close', function() {
            //если нет ошибок и все хорошо
            if(errors.length == 0) {
                //сообщаем что все хорошо
                res.send({status: 'ok', text: 'Success'});
            }
            else {
                if(fs.existsSync(uploadFile.path)) {
                    //если загружаемый файл существует удаляем его
                    fs.unlinkSync(uploadFile.path);
                }
                //сообщаем что все плохо и какие произошли ошибки
                res.send({status: 'bad', errors: errors});
            }
        });

        // при поступление файла
        form.on('part', function(part) {
            //читаем его размер в байтах
            uploadFile.size = part.byteCount;
            //читаем его тип
            uploadFile.type = part.headers['content-type'];
            //путь для сохранения файла
            uploadFile.path = './public/images/' + part.filename;

            //проверяем размер файла, он не должен быть больше максимального размера
            if(uploadFile.size > maxSize) {
                errors.push('File size is ' + uploadFile.size + '. Limit is' + (maxSize / 1024 / 1024) + 'MB.');
            }

            //проверяем является ли тип поддерживаемым
            if(supportMimeTypes.indexOf(uploadFile.type) == -1) {
                errors.push('Unsupported mimetype ' + uploadFile.type);
            }

            //если нет ошибок то создаем поток для записи файла
            if(errors.length == 0) {
                var out = fs.createWriteStream(uploadFile.path);
                part.pipe(out);
            }
            else {
                //пропускаем
                //вообще здесь нужно как-то остановить загрузку и перейти к onclose
                part.resume();
            }
        });

        // парсим форму
        form.parse(req);
    }
};