import { api } from "@/lib/api";

export const generatePPT = async (
    user_id: string,
    session_id: string,
    company_profile: any
) => {
    const res = await api.post(
        "/api/generate-ppt",
        { user_id, session_id, company_profile }
    );

    console.log(res.data)
    return res.data;
}
