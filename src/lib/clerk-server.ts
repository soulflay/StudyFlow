import { Clerk } from "@clerk/backend"
export const clerk = Clerk({
    secretKey: process.env.CLERK_SECRET_KEY
})


// export const clerk = Clerk(process.env.CLERK_SECRET_KEY);