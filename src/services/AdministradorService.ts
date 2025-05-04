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

  export const getAllUsersService = async () => {
    try {
        const response = await genericRequestAutheticated(`${base_url}/administradores/getAllUsers`, 'GET');
        return response.data.users;
    } catch (error: any) {
        await handleError(error, 'getAllUsersService')
    }
  }

  export const getAllAppointmentsService = async () => {
    try {
      const response = await genericRequestAutheticated(`${base_url}/administradores/getAllAppointment`, 'GET');
      return response.data;
    } catch (error: any) {
      await handleError(error, 'getAllAppointmentsService')
    }
  }

  export const updateUserService = async (user: any) => {
    try {
      const response = await genericRequestAutheticated(`${base_url}/administradores/updateUser/${user.id}`, 'PUT', user);
      return response.data
    } catch (error: any) {
      await handleError(error, 'updateUserService')
    }
  }

  export const updateStatusService = async (id: number, status:string) => {
    try {
      const response = await genericRequestAutheticated(`${base_url}/administradores/updateStatus/${id}`, 'PUT', {status} );
      return response.data
    } catch (error: any) {
      await handleError(error, 'updateStatusService')
    }
  }

  export const deleteUserService = async (id: number) => {
    try {
      const response = await genericRequestAutheticated(`${base_url}/administradores/deleteUser/${id}`, 'DELETE', {id})
    } catch (error: any) {
      await handleError(error, 'updateStatusService')
    }
  }