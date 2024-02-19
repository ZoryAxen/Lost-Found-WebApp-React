import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

// Configure AWS credentials
const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: 'ASIAZI2LCW4ND4M3J5UZ',
      secretAccessKey: 'Mn6XniOWp0iiRrBTzaIExz4t6oiGS6OdS/u4gQ7s'
    }
});

// Define bucket name and folder
const bucketName = 'cadassignment';
const folderPath = 'dist';

fs.readdir(folderPath, async (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      // Check if the path is a file
      const isFile = fs.statSync(filePath).isFile();
      if (!isFile) {
        console.log(`${file} is not a file, skipping.`);
        continue;
      }
      const fileContent = fs.readFileSync(filePath);
  
      const params = {
        Bucket: bucketName,
        Key: file,
        Body: fileContent,
        ContentType: 'text/html' // Set appropriate content type
      };
  
      try {
        const command = new PutObjectCommand(params);
        const response = await s3Client.send(command);
        console.log('File uploaded successfully:', response);
      } catch (err) {
        console.error('Error uploading file:', err);
      }
    }
  });

// // Configure AWS credentials
// AWS.config.update({
//   accessKeyId: 'ASIAZI2LCW4ND4M3J5UZ',
//   secretAccessKey: 'Mn6XniOWp0iiRrBTzaIExz4t6oiGS6OdS/u4gQ7s',
//   region: 'us-east-1'
// });

// // Create S3 instance
// const s3 = new AWS.S3();

// // Define bucket name and folder
// const bucketName = 'cadassignment';
// const folderPath = 'dist';

// // Upload files to S3
// fs.readdir(folderPath, (err, files) => {
//   if (err) {
//     console.error('Error reading directory:', err);
//     return;
//   }
//   files.forEach(file => {
//     const filePath = path.join(folderPath, file);
//     const fileContent = fs.readFileSync(filePath);

//     const params = {
//       Bucket: bucketName,
//       Key: file,
//       Body: fileContent,
//       ContentType: 'text/html' // Set appropriate content type
//     };

//     s3.upload(params, (err, data) => {
//       if (err) {
//         console.error('Error uploading file:', err);
//         return;
//       }
//       console.log('File uploaded successfully:', data.Location);
//     });
//   });
// });
