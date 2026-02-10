<template>
    <div>
        <h2>Movie Form</h2>
        <div>
            <input type="text" placeholder="Titulua" v-model="title"/>
            <input type="number" placeholder="Luzera (min)" v-model.number="length"/>
            <input type="text" placeholder="Zuzendaria" v-model="director"/>
            <button @click="addMovie">Gehitu</button>
        </div>


        <table border="1" style="margin-top: 1rem; width: 100%;">
            <thead>
                <th>Titulua</th>
                <th>Luzera</th>
                <th>Zuzendaria</th>
                <th>Ekintzak</th>
            </thead>
            <tbody v-if="movies.length === 0">
                <tr>
                    <td colspan="4" style="text-align:center;">Pelikularik ez daude</td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr v-for="(movie,index) in movies" :key="index">
                    <td>{{movie.title}}</td>
                    <td>{{movie.length}}</td>
                    <td>{{movie.director}}</td>
                    <td><button @click="removeMovie(index)">Ezabatu</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import {ref} from 'vue'

const title= ref('')
const length= ref(null)
const director= ref('')
const movies= ref([])

function addMovie(){
    if(!title.value || !length.value || !director.value) return
    movies.value.push({
        title: title.value,
        length: length.value,
        director: director.value
    })
    title.value = ''
    length.value = null
    director.value = ''
}

function removeMovie(index){
    movies.value.splice(index,1)
}

</script>