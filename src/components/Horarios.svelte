<script lang="ts">
    export let horarios: any [][];
    export let dias: string[];
</script>

<div class="horarios">
    {#each dias as dia}
        <div class="horario header-dias">{dia}</div>
    {/each}
    {#each horarios as x}
        {#each x as y}
        {#if ![12,13,18].includes(y+8)}
                {#if isNaN(y)}
                    <div class="horario seleccionado">{y}</div>
                {:else}
                    <div class="horario">{y+8}</div>
                {/if} 
        {/if} 
        {/each}
    {/each}
</div>

<style>
    .header-dias {
        background-color: rgb(158, 158, 158);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        text-transform: uppercase;
    }

    .seleccionado {
        background-color: lightblue;
    }

    .horarios {
        display: grid;
        grid-template-columns: repeat(6, 80px);
        grid-auto-rows: minmax(80px, auto);
        gap: 4px;
    }

    .horario {
        border: 1px solid red
    }
</style>