import { genericRequest, genericRequestAutheticated } from "@/utils/genericRequest";
import { getToken } from "@/utils/tokenStorage";

const base_url = import.meta.env.VITE_ENDPOINT_API

const handleError = async (error: any, context: string) => {
    const errorMessage = `Error during ${context}: ${error.message}`
    console.error(errorMessage)
  
    const errorDetails = {
      response: error.response
        ? {
            data: error.response.data,
            status: error.response.status,
            headers: error.response.headers,
          }
        : null,
      request: error.request || null,
      message: error.message,
    }
  
    await console.error('error', errorMessage, errorDetails)
    throw error
  }

  export const LoginService = async(email: string, password: string) => {
    try {
        const response = await genericRequest(`${base_url}/users/login`, 'POST', { email, password })
        return response
    } catch (error: any) {
        await handleError(error, 'LoginService')
    }
  }

  export const RegisterServices = async (
        name: string,
        email: string,
        password: string,
        confirmPassword: string
  ) => {
    try { 
        const response = await genericRequest(`${base_url}/users/register`, 'POST', {
            name, email, password, confirmPassword,
        })
        return response
    } catch (error: any) {
        await handleError(error, 'RegisterServices')
    }
  }

  export const LogoutService = async () => {
    const token = getToken();

    try {
        const response = await genericRequestAutheticated(`${base_url}/users/logout`, 'POST', { token })
        return response
    } catch (error: any) {
        await handleError(error, 'LogoutService')
    }
  }

  export const SendMailService = async (email: string) => {
    try {
      const response = await genericRequest(`${base_url}/users/forget-password`, 'POST', { email });
      return response
    } catch (error: any) {
      await handleError(error, 'SendMailService')
    }
  }

  export const ResertPasswordService = async (newPassword: string, newConfirmPassword: string, token: string) => {
    try {
      const response = await genericRequest(`${base_url}/users/reset-password`, 'POST', { newPassword, newConfirmPassword, token });
      return response
    } catch (error: any) {
      await handleError(error, 'resertpassword')
    }
  }