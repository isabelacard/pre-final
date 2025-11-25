import type { User } from "../../types/User";

import userService from "./userService";
import { supabase } from "./config";

const authService = {
    signUp: async (email: string, password: string, additionalInfo: Omit<User, "id">) => {
        //registra usuario
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            console.error("Error signing up:", error);
            return {
                success: false,
                error: error.message,
                user: null,
            };
        }

        const resultCreate = await userService.createUser(additionalInfo); //crea usuario

        return {
            success: true,
            data,
            user: resultCreate,
        };
    },
    //---------------------------------------------------------------------------
    signOut: async () => {
        //cierra sesion
        const { error } = await supabase.auth.signOut(); //cierra sesion

        if (error) {
            console.error("Error signing out:", error);
            return {
                success: false,
                error: error.message,
            };
        }

        return {
            success: true,
        };
    },
    //---------------------------------------------------------------------------
    signIn: async (email: string, password: string) => {
        //inicia sesion
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error("Error signing in:", error);
            return {
                success: false,
                error: error.message,
                user: null,
            };
        }

        return {
            success: true,
            data,
        };
    },
};

export default authService;
