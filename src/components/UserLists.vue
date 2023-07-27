<script setup>
import { ref } from 'vue'
const Userdatas = ref([])
const cacheUser = ref({})
const newUser = ref({
    id:null,
    name:"",
    username:"",
    email:"",
    address:{	
        street:"",
        suite:"",
        city:"",
        zipcode:"",
    },
    geo:{	
        lat:"",
        lng:"",
    },
    phone:"",
    website:"",
    company:{
    name:"",
    catchPhrase:"",
    bs:""
    }
})
const openModal = ref(false) //for editting
const openNewuserModal = ref(false) 

const getUsers = async function(){
    try{
      let lists = await fetch("https://jsonplaceholder.typicode.com/users")
      if(!lists.ok){
        throw Error("failed fetching")
      }
      Userdatas.value = await lists.json();
    
    }catch(error){
        throw error
    }
 }
 
const postData = async function(url="",data={}){
    const response = await fetch(url,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
     }).then(
        console.log(data)
    )
   return response.json()
 }

function editUser(item){
    openModal.value=true;
    cacheUser.value=Object.assign({},item);
    console.log(cacheUser)
}

function confirmAdvise(){
    //PUT
    const datatoUpdate = cacheUser.value;
    const id= cacheUser.value.id;
    const url=`https://jsonplaceholder.typicode.com/users/${id}`;
    const options={
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(datatoUpdate)
    }
    fetch(url,options)
    .then(response=>{
        if(!response.ok){throw new Error(`${response.status}`)}
        return response.json()
    })
    .then(datatoUpdate=>{
        console.log(datatoUpdate)
    })
    .catch(error=>{
        console.error(error)
    })

    Userdatas.value.forEach(item=>{
        if(item.id=== datatoUpdate.id){
            item.name = datatoUpdate.name;
            item.username = datatoUpdate.username;
            item.email = datatoUpdate.email;
            item.phone = datatoUpdate.phone;
            item.address.street = datatoUpdate.address.street;
            item.address.suite = datatoUpdate.address.suite;
            item.address.city = datatoUpdate.address.city;
            item.company.name = datatoUpdate.company.name;
            item.company.catchPhrase = datatoUpdate.company.catchPhrase; 
        }
    })
    cacheUser.value=Object.assign({})
    openModal.value=false;
}

function deleteUser(item){
    let idNum = item.id
     //Delete it from Userdatas
    let newIndex = Userdatas.value.findIndex((todo)=>{
        return todo.id === item.id
    })
    Userdatas.value.splice(newIndex,1)
    //Delete method
    const  url=`https://jsonplaceholder.typicode.com/users/${idNum}`
    const response = fetch(url,{
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
        body:null
    }).then(res=>{console.log(res)})
    //return response.json()

}

function addnewUser(){
    let id = Math.floor(Date.now()/1000);
    newUser.value.id = id;
    let data = newUser.value;  
    postData("https://jsonplaceholder.typicode.com/users",data)
    Userdatas.value.push(data);
    newUser.value={ 
        id:null,
        name:"",
        username:"",
        email:"",
        address:{	
            street:"",
            suite:"",
            city:"",
            zipcode:"",
        },
        geo:{	
            lat:"",
            lng:"",
        },
        phone:"",
        website:"",
        company:{
            name:"",
            catchPhrase:"",
            bs:""
        }
    }
    openNewuserModal.value = false;
}
</script>

<template>
    <main class="min-w-[80%]">
        <h1 class="bg-orange-100 font-bold font-lg text-center" 
            style="width:200px;margin:10px;margin-left:30px;padding:10px;">
            使用者清單
        </h1>
        <button @click="getUsers()" class="bg-sky-500 hover:bg-sky-700 rounded text-white" 
          style="margin-left:30px;padding:5px;">預設使用者清單</button>

        <button class="bg-sky-500 hover:bg-sky-700 rounded text-white" 
          style="margin-left:30px;padding:5px;" @click="openNewuserModal=true">
          新增使用者
        </button>
         <!---User list-->
         <div class="flex flex-wrap flex-row" style="margin-left:20px;padding:20px;">
                <div  v-for="(item,key) in Userdatas" :key="item.id" 
                       class="todocard bg-orange-200 rounded relative">
                    <div class="absolute top-0 right-0 rounded bg-sky-200 w-5 h-5">
                        <span>{{key+1}}</span>
                    </div>
                    <span >姓名</span> <p class="bg-white">{{item.name}}</p>
                    <span >使用者名稱</span> <p class="bg-white">{{item.username}}</p>
                    <span>Email</span> <p class="bg-white">{{item.email}}</p>
                    <span>地址</span><p  class="bg-white">{{item.address.street}} {{item.address.suite}} {{item.address.city}}</p>
                    <span>電話</span><p  class="bg-white"> {{item.phone}}</p>
                    <span>公司名稱</span> <p class="bg-white">{{item.company.name}}</p>
                    <span>公司標語</span><p class="bg-white"> {{item.company.catchPhrase}}</p>    
                    <button class="absolute bottom-2 left-2"
                     @click="deleteUser(item)" >
                         <img src="../assets/images/trash-can-solid.svg" class="w-5 h-5"> 
                    </button> 
                    <button @click="editUser(item)" class="border-solid bg-blue-300 absolute right-2 bottom-2 w-10 h-8">編輯</button>
                </div>
                
        </div>

        <!--open edit Modal-->
        <div class="modal fixed bg-neutral-200/80 drop-shadow-md border-solid  top-2 left-60" 
            style="width:70%;min-height:530px;z-index:10;padding:10px 30px;" v-if="openModal">
            <img src="../assets/images/x-solid.svg"  @click="openModal=false"
                class="w-6 h-6 top-5 right-5 hover:cursor-pointer absolute right-2">   
            <!--bind cacheUser for editting-->
            <div class="font-bold rounded absolute top-2 right-20">
                <span class=" "> User list id: {{cacheUser.id}}</span>
            </div>
            <form>
                <label for="name" class="block">姓名</label>
                <input id="name" type="text" v-model="cacheUser.name" class="bg-white h-50 mt-2">
                <label for="username" class="block">使用者名稱</label>
                <input id="username" type="text" v-model="cacheUser.username" class="bg-white h-50">
                <label for="email" class="block">Email</label>
                <input id="email" type="text" v-model="cacheUser.email" class="bg-white h-50">
                <span class="block" style="margin-top:15px;">地址</span>
                <div class="flex flex-col md:flex-row">
                    <div style="margin-right:10px;">
                        <label for="street" class="block">街道</label>
                        <input id="street" type="text" v-model="cacheUser.address.street">
                    </div>
                    <div style="margin-right:10px;">
                        <label for="suite"  class="block">室</label>
                        <input id="suite" type="text" v-model="cacheUser.address.suite">
                    </div>
                    <div>
                        <label for="city"  class="block">城市</label>
                        <input id="city" type="text" v-model="cacheUser.address.city">
                    </div>

                </div>
                <label class="block" for="phone">電話</label>
                <input type="text" id="phone" v-model="cacheUser.phone">
                <div>
                    <label for="companyName" class="block">公司名稱</label>
                    <input type="text" id="companyName" v-model="cacheUser.company.name" style="margin-right:10px;">
                    <label for="catchPhrase" class="block">公司標語</label>
                    <input type="text" id="catchPhrase" 
                        v-model="cacheUser.company.catchPhrase" style="width:280px;">
                </div>
            </form>
            <button class="absolute bottom-10 right-10 bg-blue-300 w-20 h-10"
                @click="confirmAdvise()"
                >確認修改
            </button>
         
        </div>

        <!--add new User Modal-->
        <div class="newUsermodal absolute bg-neutral-200/80 drop-shadow-md border-solid  top-5 left-60" 
            v-if="openNewuserModal==true"    
            style="width:70%;min-height:500px;z-index:10;padding:25px 30px;" 
            >
            <img src="../assets/images/x-solid.svg"
                class="w-6 h-6 top-5 right-5 hover:cursor-pointer absolute right-10"
                @click="openNewuserModal = false" >   
            <!--bind newUser object for adding-->
            <form>
                <label  class="block">姓名</label>
                <input  type="text" v-model="newUser.name" class="bg-white h-50 mt-2">
                <label  class="block">使用者名稱</label>
                <input  type="text" v-model="newUser.username" class="bg-white h-50">
                <label  class="block">Email</label> 
                <input  type="text" v-model="newUser.email" class="bg-white h-50">
                <span class="block" style="margin-top:15px;">地址</span>
                <div class="flex flex-col md:flex-row">
                    <div style="margin-right:10px;">
                        <label class="block">街道</label>
                        <input type="text" v-model="newUser.address.street">
                    </div> 
                    <div style="margin-right:10px;">
                        <label  class="block">室</label>
                        <input  type="text" v-model="newUser.address.suite">
                    </div>
                    <div>
                        <label  class="block">城市</label>
                        <input  type="text" v-model="newUser.address.city">
                    </div> 

                 </div> 
                <label class="block">電話</label>
                <input type="text" v-model="newUser.phone">   
                <div>
                    <label class="block">公司名稱</label>
                    <input type="text"  v-model="newUser.company.name" style="margin-right:10px;">
                    <label  class="block">公司標語</label>
                    <input type="text" 
                        v-model="newUser.company.catchPhrase" style="width:280px;">
                </div> 
            </form>
            <button class="absolute bottom-10 right-10 bg-blue-300 w-20 h-10"
                @click="addnewUser()"
                >新增
            </button>
         
        </div>


    </main>
</template>

<style scoped>
*,nav,main{
    margin:0;
    padding:0;
    box-sizing:border-box;
}
.todocard{
    width:300px;
    min-height:400px;
    box-sizing:border-box;
    margin:20px;
    padding:10px;
    padding-bottom:20px;
}

.modal{
    overflow-y:scroll;
}
.modal label{
  margin-top:10px;
}
.modal input{
    margin-top:10px;
}

</style>