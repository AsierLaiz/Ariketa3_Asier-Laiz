<template>
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-links">
                <router-link to="/" class="nav-link">Login</router-link>
                <router-link to="/pokedex" class="nav-link">Pokedex</router-link>
                <router-link to="/profile" class="nav-link">Profile</router-link>
            </div>
            <span class="user-name">{{ userName }}</span>
        </div>
    </nav>
</template>

<script setup>
import{computed} from 'vue'
import {useUserStore} from '../stores/UserStore'

const userStore = useUserStore()
const userName = computed(() => userStore.userName)
</script>

<style scoped>
.navbar {
    background: linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%);
    padding: 1rem 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-links {
    display: flex;
    gap: 2rem;
}

.nav-link {
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: all 0.3s ease;
}

.nav-link:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
}

.nav-link.router-link-active {
    background: rgba(255, 255, 255, 0.3);
    text-decoration: underline;
}

.user-name {
    color: white;
    font-weight: bold;
    font-size: 1rem;
}
</style>