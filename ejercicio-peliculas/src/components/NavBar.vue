<template>
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-links">
                <router-link to="/" class="nav-link">Login</router-link>
                <router-link to="/movie" class="nav-link">Movie</router-link>
                <router-link to="/profile" class="nav-link">Profile</router-link>
            </div>
            <span class="user-name">{{ userName }}</span>
        </div>
    </nav>
</template>

<script setup>
import{computed} from 'vue'
import {useUserStore} from '../stores/directorStore'

const userStore = useUserStore()
const userName = computed(() => userStore.userName)
</script>