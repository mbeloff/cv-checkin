<script setup></script>

<template>
  <div id="app" class="max-w-screen grid min-h-screen">
    <header
      class="fixed flex h-20 w-full items-center bg-gray-900 p-10 shadow-xl"
    >
      <p class="text-2xl font-bold text-blue-500">Campervan Village</p>
    </header>
    <main class="min-h-screen bg-gray-100 pt-20">
      <router-view />
    </main>
  </div>
</template>

<style lang="postcss">
#app {
  font-family: "Poppins", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.my-input {
  @apply flex-1 rounded border bg-gray-200 py-3 pl-2;
}

.group:hover .form-i {
  @apply text-yellow-500;
}
</style>
