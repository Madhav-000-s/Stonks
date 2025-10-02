'use server'
import { getAuth } from "../better-auth/auth"
import { inngest } from "../inngest/client"
import { headers } from "next/headers"

export const signUpWithEmail=async(data:SignUpFormData)=>{
    try{
        const auth=await getAuth()
        const response=await auth.api.signUpEmail({
            body:{email:data.email,password:data.password,name:data.fullName}
        })
        if(response){
            await inngest.send({name:`app/user.created`,data:{
                email:data.email,
                name:data.fullName,
                country:data.country,
                investmentGoals:data.investmentGoals,
                riskTolerance:data.riskTolerance,
                preferredIndustry:data.preferredIndustry
            }})
        }
        return({success:true,data:response})
    }
    catch(err){
        console.log(err)
        return({success:false,error:'Sign up failed'})
    }
}

export const signOut = async () => {
    try {
        const auth=await getAuth()
        await auth.api.signOut({ headers: await headers() });
    } catch (e) {
        console.log('Sign out failed', e)
        return { success: false, error: 'Sign out failed' }
    }
}

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
    try {
        const auth=await getAuth()
        const response = await auth.api.signInEmail({ body: { email, password } })

        return { success: true, data: response }
    } catch (e) {
        console.log('Sign in failed', e)
        return { success: false, error: 'Sign in failed' }
    }
}