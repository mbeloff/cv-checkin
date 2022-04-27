<script setup></script>
<template>
  <div id="app" class="max-w-screen grid min-h-screen">
    <header class="sticky flex h-20 w-full items-center bg-gray-900 shadow-xl">
      <div class="container mx-auto px-2">
        <div class="flex items-center">
          <img
            src="https://res.cloudinary.com/dg5ybbkbh/image/upload/v1649391973/cv/cav-logo-part-white.svg"
            alt=""
            class="h-14"
          />
          <p class="ml-1 text-left text-xl font-bold leading-none text-white">
            Campervan <br />Village
          </p>
        </div>
      </div>
    </header>
    <main class="-mt-20 min-h-screen bg-gray-100 pt-20">
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
.my-input:focus {
  @apply outline-none ring-2 ring-blue-500;
}
</style>
