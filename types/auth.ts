export type SignupCredType = {
  email: string
  password: string
}

export type LoginCredType = {
  email: string
  password: string
}

export type IUser = {
  id: string
  auth_user_id: string
  email: string
  fname: string
  lname: string
  company: string
  status: string
}
