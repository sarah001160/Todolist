<template>
    <div style="min-height:100vh;" class="navContainer bg-sky-300">
        <nav class="min-w-[25%]">
        <ul class=" text-base" 
            style="width:90%;margin:5px; margin-top:50px;">
            <li class="rounded-lg bg-teal-700 hover:bg-sky-700 border-b-4 text-white 
                text-center font-bold" style="margin-bottom:15px; width:120px;">
            <router-link to="/">Todo list</router-link>
            </li>
            <li class="w-19 rounded-lg bg-teal-700 hover:bg-sky-700 border-b-4 text-white 
            text-center font-bold" style="margin-bottom:15px;  width:120px;">
            <router-link to="/userlists">User list</router-link>
            </li>
        </ul>
</nav>
    </div>
 
</template>

<style scoped>
.navContainer{
    margin:0;
    padding:0;
    box-sizing:border-box;
    min-width:180px;
}

</style>