import { db } from "./database"
import type { Horario, newCorrelativas, newHorario, newMateria } from "./types"

export async function findHorarioById(id: number) {
    return await db.selectFrom("Horarios")
        .where("codigo", "=", id)
        .selectAll()
        .executeTakeFirst()
}

export async function getAllMaterias() {
    return await db.selectFrom("Materias")
        .selectAll()
        .execute()
}

export async function getAllHorarios() {
    return await db
        .selectFrom("Horarios")
        .innerJoin("Materias", "Materias.codigo", "Horarios.codigo")
        .selectAll()
        .execute()
}


export async function createHorario(horario: newHorario) {
    return await db.insertInto("Horarios")
        .values(horario)
        .returningAll()
        .executeTakeFirstOrThrow()
}

export async function createMateria(materia: newMateria) {
    return await db.insertInto("Materias")
        .values(materia)
        .returningAll()
        .executeTakeFirstOrThrow()
}

export async function createCorrelativa(correlativa: newCorrelativas) {
    return await db.insertInto("Correlativas")
        .values(correlativa)
        .returningAll()
        .executeTakeFirstOrThrow()
}