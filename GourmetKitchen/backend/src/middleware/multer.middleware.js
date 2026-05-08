import multer from 'multer'

const storage = multer.diskStorage({
    destination : function(req ,file , cb){
        cb(null ,'public/upload');
    },
    filename : function(req, file ,cb){
        const name = file.originalname;
        cb(null , name)
    }
})

export const upload = multer({storage})