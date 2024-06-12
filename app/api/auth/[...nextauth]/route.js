import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@utils/database";
import User from "@models/user";

function formatString(inputString) {
    // Eliminar espacios, convertir a minúsculas, y eliminar acentos
    let formattedString = inputString
        .replace(/\s+/g, '') // Eliminar espacios
        .toLowerCase()       // Convertir a minúsculas
        .normalize('NFD')    // Descomponer caracteres Unicode
        .replace(/[\u0300-\u036f]/g, ''); // Eliminar caracteres diacríticos (acentos)

    // Cortar la cadena si supera los 20 caracteres
    if (formattedString.length > 20) {
        formattedString = formattedString.slice(0, 20);
    }

    // Verificar longitud mínima de la cadena
    if (formattedString.length < 8) {
        return 'Error: La cadena resultante debe tener al menos 8 caracteres.';
    }

    return formattedString;
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],

    callbacks:
    {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            session.user.id = sessionUser._id.toString()
            
            return session
        },

        async signIn({ profile, account, user, credentials }) {
            try {
                await connectToDB()
                
                //check if user exist
                const userExist = await User.findOne({
                    email: profile.email
                })

                //if not, create new
                if (!userExist) {
                    await User.create({
                        email: profile.email,
                        username: formatString(profile.name),
                        image: profile.picture
                    })
                }

                return true
            } catch (error) { console.log(error); return false }
        }
    }
})

export { handler as GET, handler as POST }