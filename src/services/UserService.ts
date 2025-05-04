import { genericRequest, genericRequestAutheticated } from "@/utils/genericRequest";

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

  export const getUserByIdWService = async () => {
    try {
        const response = await genericRequestAutheticated(`${base_url}/users/getUser`, 'GET')
        return response
    } catch (error: any) {
        await handleError(error, 'getUserById')
    }
  }

  export const updateUserByIdService = async (name: string, email: string) => {
    try {
        const response = await genericRequestAutheticated(`${base_url}/users/updateUserById`, 'POST', { name, email })
        return response
    } catch (error: any) {
        await handleError(error, 'updateUserByIdService')
    }
  }

  export const createAppointmentService = async (name: string, phone: string, date: number, time: number) => {
    try {
        const response = await genericRequestAutheticated(`${base_url}/appointment/createAppointment`, 'POST', { name, phone, date, time })
        return response
    } catch (error: any) {
        await handleError(error, 'createAppointmentService')
    }
  }

  export const getUserAppointmentsService = async () => {
    try {
        const response = await genericRequestAutheticated(`${base_url}/appointment/getUserAppointments`, 'GET')
        return response
    } catch (error: any) {
        await handleError(error, 'getUserAppointmentsService')
    }
  }