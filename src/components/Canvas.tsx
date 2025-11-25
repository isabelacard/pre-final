import { useEffect, useState } from "react";

import canvaService from "../services/supabase/canvaService";
import type { Positions } from "../types/Positions";

import Cell from "./Cell";

export default function Canvas() {
    const [positions, setPositions] = useState<Positions[]>([]); //almacena posiciones
    const cellSize = 25; //tamaño de la celda

    const handleClickCell = async (x: number, y: number) => {
        //manejo de clicks
        console.info("Cell clicked at:", x, y);
        const result = await canvaService.savePosition(x, y, 1); //guarda posicion
        console.info(result); //imprime resultado

        const fetchData = async () => {
            //obtiene posiciones
            const positionsData = await canvaService.getPositions(); //obtiene posiciones
            setPositions(positionsData); //almacena posiciones
        };

        fetchData();
    };

    useEffect(() => {
        //carga posiciones al cargar la pagina
        const fetchData = async () => {
            //obtiene posiciones
            const positionsData = await canvaService.getPositions(); //obtiene posiciones
            setPositions(positionsData); //almacena posiciones
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
