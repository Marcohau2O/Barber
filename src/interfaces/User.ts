export interface User {
    id: number
    name: string
    email: string
    password: string
    confirmPassword: string
    userType: string
    resetPasswordToken: string
    resetPasswordExpiry: string
}