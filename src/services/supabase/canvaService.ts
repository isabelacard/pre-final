import { supabase } from "./config";

const canvaService = {
    getPositions: async () => {
        const { data, error } = await supabase.from("positions").select("*, user_id(*)").order("id", { ascending: false });

        if (error) {
            return [];
        }

        return data;
    },
    savePosition: async (x: number, y: number, userId: number) => {
        const { data, error } = await supabase
            .from("positions")
            .insert({
                x,
                y,
                user_id: userId,
            })
            .select();

        if (error) {
            return null;
        }

        return data;
    },
};

export default canvaService;
