import type { User } from "../../types/User";

import { supabase } from "./config";

const userService = {
    getUserByEmail: async (email: string) => {
        const { data, error } = await supabase.from("users_final").select("*").eq("email", email).single();

        if (error) {
            console.error("No se guardo, perdi");
            return null;
        }

        return data;
    },

    createUser: async (user: Omit<User, "id">) => {
        const { data, error } = await supabase
            .from("users")
            .insert({
                username: user.username,
                email: user.email,
                letter: user.letter,
                color: user.color,
            })
            .select();

        if (error) {
            return null;
        }

        return data;
    },
};

export default userService;
