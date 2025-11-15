import { useEffect, useState } from "react";

import canvaService from "../services/supabase/canvaService";
import type { Positions } from "../types/Positions";

import Cell from "./Cell";

export default function Canvas() {
    const [positions, setPositions] = useState<Positions[]>([]);
    const cellSize = 25;

    const handleClickCell = async (x: number, y: number) => {
        console.info("Cell clicked at:", x, y);
        const result = await canvaService.savePosition(x, y, 1);
        console.info(result);

        const fetchData = async () => {
            const positionsData = await canvaService.getPositions();
            setPositions(positionsData);
        };

        fetchData();
    };

    useEffect(() => {
        const fetchData = async () => {
            const positionsData = await canvaService.getPositions();
            setPositions(positionsData);
        };

        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-25 grid-rows-25 gap-1">
            {Array.from({ length: 25 }, (_, y) =>
                Array.from({ length: 25 }, (_, x) => (
                    <Cell
                        key={`${x}-${y}`}
                        size={cellSize}
                        color={positions.find((element) => element.x === x && element.y === y)?.user_id.color || "#ffffff"}
                        onClick={() => handleClickCell(x, y)}
                        letter={positions.find((element) => element.x === x && element.y === y)?.user_id.letter || ""}
                    />
                ))
            )}
        </div>
    );
}
