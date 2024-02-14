// import React from 'react';
import AWS from 'aws-sdk';
import { useState } from 'react';

const S3Uploader = () => {
    const [data,setdata]=useState(null)
    const config={
        bucketName:"awsbuk12345",
        dirName:"user_profile",
        region:"ap-south-1",
        accessKeyID:"AKIARUIC5ZIXVSTD6FIX",
        secretAccessKey: "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"
    }
    const handleFileUpload=(event)=>{
        const file=event.target.files[0];


        // console.log(file);
        if(!config.bucketName||!config.region||!config.accessKeyID||!config.secretAccessKey)
        {
            console.error("aws error incomplete");
            return;
        }
        // Initialize AWS
        AWS.config.update({
            accessKeyId: config.accessKeyID,
            secretAccessKey: config.secretAccessKey,
            region: config.region
        })

        // Create new Instance
        const S3 = new AWS.S3();

        //Having file in ArrayBuffer
        const reader = new FileReader();

        reader.onload=()=>{
            const fileBuffer = reader.result;
            S3.upload({
                Bucket: config.bucketName,
                Key: `${config.dirName}/${file.name}`,
                Body: fileBuffer,
                ACL: 'public-read',
                ContentType: file.type
            },(err, uploadedData) =>{
                if(err){
                    console.log(err);
                }
                else{
                    setdata(uploadedData.Location);
                }
            })
        };
        reader.readAsArrayBuffer(file);
    };
    return (
        <div>
            <input type="file"  name='file to be uploaded' onChange={handleFileUpload}/>
            <img src={data} alt="uploader" width={400} height={400}/>

        </div>
    );
};

export default S3Uploader;
