<script lang="ts">
    import type { Horario, Materia } from '$lib/types';
    import { onMount } from 'svelte';
    import type { PageServerData } from './$types';
    import Horarios from '../components/Horarios.svelte';
    type MateriaJoin = Horario & Materia
    let materiasEscondidas: string[] = []
    let transversales: string[] = []
    let materiasSeleccionadas: MateriaJoin[] = []
	export let data: PageServerData;

    let materias: MateriaJoin[] = data.materias
    let materias2: MateriaJoin[] = materias

    let filters = {
        hideSeleccionadas: false,
        hideTransversales: false,
        search: ""

    }

    let hideMateria = false;

    onMount(() => {
        let transversalesFilter = materias
            .filter((materia) => materia.esTransversal)
            .map(materia => materia.nombre)
        transversales = Array.from(new Set([...transversalesFilter]))
        if(window.localStorage.getItem("transversales")){
            let value = Boolean(window.localStorage.getItem("transversales"))!
            filters.hideTransversales = value
            if(value) {
                materiasEscondidas = materiasEscondidas.concat(transversales)
            }
            filters = filters
        }
        if(window.localStorage.getItem("escondidas")){
            let response =  JSON.parse(window.localStorage.getItem("escondidas")!) as string[]
            if(!(response.length<=0)){
                materiasEscondidas = JSON.parse(window.localStorage.getItem("escondidas")!)
            }
            materiasEscondidas = materiasEscondidas
        }
        
    })

    let arr: any[][] = [];
    const dias = ["lu", "ma", "mi", "ju", "vi", "sa"]
    const rows = 15;
    const columns = 6;

    for (let i = 0; i < rows; i++) {
        arr[i] = [];
        for (let j = 0; j < columns; j++) {
            arr[i][j] = i;
        }
    }

    function handleCheckbox(e: any) {
        hideMateria = e.target.checked
    }

    function handleTransversales(e: any) {
        if(e.target.checked) {
            materiasEscondidas = materiasEscondidas.concat(transversales)
            filters.hideTransversales = true
            window.localStorage.setItem("transversales", String(filters.hideTransversales))
            
        } else {
            materiasEscondidas = materiasEscondidas.filter(materia => !transversales.includes(materia))
            filters.hideTransversales = false
            window.localStorage.setItem("transversales", String(filters.hideTransversales))
        }
    }

    $: MateriasTest = materias2.filter((mat) => {
        if(materiasEscondidas.includes(mat.nombre)){
            return false
        }
        if(!mat.nombre.toLowerCase().includes(filters.search.toLowerCase())){
            return false
        }
        return true
    })

    function removeFromEscondidas(nombre: string) {
        materiasEscondidas = materiasEscondidas.filter(materia => materia !== nombre)
        window.localStorage.setItem("escondidas", JSON.stringify(materiasEscondidas))
        materias2 = materias.filter((materia) => !materiasEscondidas.includes(materia.nombre))
    }

    function removeFromSeleccionadas(materia: MateriaJoin) {
        materiasSeleccionadas = materiasSeleccionadas.filter(mat => mat.nombre !== materia.nombre)
        materias2 = materias.filter((mat) => !materiasSeleccionadas.some(mat => materia.nombre != mat.nombre) && !materiasEscondidas.includes(mat.nombre))

        let index = dias.indexOf(materia.dia.toLowerCase())
        for(let i=materia.horarioInicio-8; i<materia.horarioFin-8; i++){
            arr[i][index] = i
        }
        
    }

    function checkIfHorarioIsUsed(materia: MateriaJoin) {
        return materiasSeleccionadas.some(item => 
            materia.dia == item.dia 
            && materia.horarioInicio == item.horarioInicio
            && item.horarioFin == materia.horarioFin)
    }

    function checkIfMateriaIsUsed(materia: MateriaJoin) {
        return materiasSeleccionadas.some(item => item.nombre == materia.nombre)
    }

    function hideMaterias(nombre: string) {
        materiasEscondidas = materiasEscondidas.concat(nombre)
        window.localStorage.setItem("escondidas", JSON.stringify(materiasEscondidas))
    }

    function addToHorarios(materia: MateriaJoin) {
        materiasSeleccionadas = materiasSeleccionadas.concat(materia)
        let index = dias.indexOf(materia.dia.toLowerCase())
        for(let i=materia.horarioInicio-8; i<materia.horarioFin-8; i++){
            arr[i][index] = materia.nombre + materia.modalidad.substring(0,5) + ")"
        }
        arr = arr
        materias2 = materias2
    }

</script>
<div>
    <p>Materias escondidas: </p>
    {#each materiasEscondidas as materia} 
        <button on:click={() => removeFromEscondidas(materia)}>{materia}</button>
    {/each}
</div>

<div>
    <p>Materias seleccionadas: </p>
    {#each materiasSeleccionadas as materia} 
        <button on:click={() => removeFromSeleccionadas(materia)}>
            {materia.nombre} - {materia.dia} - {materia.horarioInicio}:{materia.horarioFin} {materia.modalidad.substring(0,5) + ")"}
        </button>
    {/each}
</div>

<input type="checkbox" id="hide" on:change={handleCheckbox}/>
<label for="hide">Esconder Materias</label>
<input type="checkbox" id="transversales" on:change={handleTransversales} bind:checked={filters.hideTransversales}/>
<label for="transversales">Esconder Transversales</label>
<input type="text" id="busqueda" bind:value={filters.search} placeholder="buscar materia"/>
<div class="body">

    <div class="materias">
        {#each MateriasTest as materia}
            <button 
                disabled={(checkIfHorarioIsUsed(materia) || checkIfMateriaIsUsed(materia))}
                on:click={() => !hideMateria ? addToHorarios(materia) : hideMaterias(materia.nombre)}
            >
                {materia.nombre} - {materia.dia} - {materia.horarioInicio}:{materia.horarioFin} {materia.modalidad.substring(0,5) + ")"}
            </button>
        {/each} 
    </div>

    <Horarios {dias} horarios={arr}/>
    
</div>

<style>
    .body {
        display: flex
    }
</style>