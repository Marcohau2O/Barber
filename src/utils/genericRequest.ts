import axios from 'axios'
import { getToken } from './tokenStorage'

export const genericRequest = async (url: string, method: string, body?: any) => {
    try {
        const response = await axios({
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            data: body,
        })
        return response.data
    } catch (error: any) {
        console.error('Error in genericRequest')
        throw error
    }
}

export const genericRequestAutheticated = async (url: string, method: string, body?: any,) => {
    const token = getToken()

    if (!token) {
        throw new Error('No token found')
    }

    try {
        const response = await axios ({
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: body,
        })
        return response
    } catch (error: any) {
        throw error
    }
}