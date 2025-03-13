const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});


const uploadFile = async (localpath) => {

    try {

        console.log(localpath);
        

        if(!localpath){
            console.log("Local path not found");
            
        }

        const result = await cloudinary.uploader.upload(localpath,{
            resource_type: 'auto'
        });

        console.log(result);

        fs.unlinkSync(localfilepath)
        

        return result;
        
    } catch (error) {
        fs.unlinkSync(localfilepath)
        return res.status(500).json({ message: "Server error" });
    }
   
}    

module.exports =  uploadFile 