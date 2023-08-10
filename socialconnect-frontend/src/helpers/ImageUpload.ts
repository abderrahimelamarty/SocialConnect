import axios from 'axios';

export const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'm2mrwofg'); // Replace with your actual upload preset
 
    try {
      
        const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dytvl1fnk/image/upload', // Replace with your cloud name
            formData
        );
      
        return response.data.url;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};
