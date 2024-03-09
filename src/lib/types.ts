import type {
  Insertable,
  Selectable,
  Updateable
} from 'kysely'

export interface Database {
  Horarios: HorariosTable
  Materias: MateriasTable
  Correlativas: CorrelativasTable
}

export interface HorariosTable {
  codigo: number
  comision: number
  modalidad: string
  turno: string | null
  dia: string
  horarioInicio: number
  horarioFin: number
  sede: string
}

export interface MateriasTable {
  codigo: number
  anio: number
  cuatrimestre: number
  nombre: string
  esTransversal: number
}

export interface CorrelativasTable {
  materia: number
  dependeDe: number
}

export type Materia = Selectable<MateriasTable>
export type newMateria = Insertable<MateriasTable>
export type MateriaUpdate = Updateable<MateriasTable>

export type Horario = Selectable<HorariosTable>
export type newHorario = Insertable<HorariosTable>
export type HorarioUpdate = Updateable<HorariosTable>

export type Correlativas = Selectable<CorrelativasTable>
export type newCorrelativas = Insertable<CorrelativasTable>
export type CorrelativasUpdate = Updateable<CorrelativasTable>