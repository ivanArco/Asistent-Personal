import axios from "axios";
import { apiKey } from "../Hooks/Apikey";

// Función principal para llamadas a la API de Gemini (texto)
export const apiCall = async (prompt) => {
    try {
        const res = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, // Modelo actualizado
            {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        console.log('Respuesta de Gemini recibida');
        return {
            success: true,
            data: res.data.candidates[0].content.parts[0].text
        };
    } catch (error) {
        console.error('Error en apiCall:', error.response?.data || error.message);
        return {
            success: false,
            error: error.response?.data || error.message
        };
    }
};

// Función para generación de descripciones de imágenes (texto)
export const imageGenerationCall = async (prompt) => {
    try {
        const res = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, // Modelo actualizado
            {
                contents: [{
                    parts: [{
                        text: `Describe detalladamente una imagen basada en: ${prompt}`
                    }]
                }]
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        console.log('Descripción de imagen generada');
        return {
            success: true,
            data: res.data.candidates[0].content.parts[0].text
        };
    } catch (error) {
        console.error('Error en imageGenerationCall:', error.response?.data || error.message);
        return {
            success: false,
            error: error.response?.data || error.message
        };
    }
};

// Exportación por defecto para compatibilidad
export default {
    apiCall,
    imageGenerationCall
};