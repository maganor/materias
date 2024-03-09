import * as PersonRepository from "$lib/PersonRepository"
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    return {
        materias: await PersonRepository.getAllHorarios()
    }
}