// types/wsMessages.ts
export type WSCompany = {
  company_id: string
  company_name: string
  company_description: string
  similarity_score: number
}
export type WSInvestor = {
  investor_name: string
  investor_website: string
}

export type WSResponseMessage = {
  type: "response"
  data: {
    response: string
    user_id: string
    companies: WSCompany[]
    investors: any[] // You can define proper type if needed
  }
}

export type WSCompanyMessage = {
  type: "company"
  data: WSCompany
}
export type WSInvestorMessage = {
  type: "investor"
  data: WSInvestor
}
export type WSDoneMessage = {
  type: "done"
  data: {
    response: string
    user_id: string
    companies: WSCompany[]
    investors: any[]
  }
}

export type WSErrorMessage = {
  type: "error"
  data: {
    response: string
    user_id: string
    companies: WSCompany[]
    investors: any[]
  }
}

export type WSMessage =
  | WSResponseMessage
  | WSCompanyMessage
  | WSInvestorMessage
  | WSDoneMessage
  | WSErrorMessage
