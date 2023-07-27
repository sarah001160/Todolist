<script setup>
 import { ref } from 'vue'
 //todolist
 const contentValue = ref('')
 const titleValue = ref('')
 const todoArray = ref(JSON.parse(localStorage.getItem('todo'))||[])
 //edit todo
 const cachecontentValue = ref('')
 const cachetitleValue = ref('')
 const cacheTodo = ref({})
//add new todo
 const openNote = ref(false)
 //open edit todo
 const openEditNote=ref(false)

//submit new todo
function addTodo(){
    let txt = contentValue.value;
    let titletxt = titleValue.value;
    if(txt==="" || titletxt===""){
        alert("please enter content");
        return;
    }
    let id = Math.floor(Date.now()/1000);
    let item={
        id:id,
        title:titletxt,
        content:txt,
        completed:false,
    }
  
    if(!item){return}
    todoArray.value.push(item)
    localStorage.setItem('todo',JSON.stringify(todoArray.value))
    console.log(todoArray.value)
    contentValue.value="";
    titleValue.value="";
    openNote.value = false;
}
//cancel new todo
function cancel(){
    contentValue.value = "";
    titleValue.value = "";
    openNote.value = false;
}
//delete todo
function remove(item){
    let newIndex = todoArray.value.findIndex((todo)=>{
        return todo.id=== item.id
    })
    todoArray.value.splice(newIndex,1)
    this.updateStorage()
}
//edit todo
function edit(item){
    openEditNote.value = true;
    cacheTodo.value = item;
    cachecontentValue.value =item.content;
    cachetitleValue.value =item.title;
}
//confirm edit todo
function confirmEdit(){
    todoArray.value.forEach((item)=>{
       if(item.id===cacheTodo.value.id){
        item.content = cachecontentValue.value;
        item.title = cachetitleValue.value;
        console.log(item)
        updateStorage();
        openEditNote.value = !openEditNote.value;
        cachecontentValue.value="";
        cachetitleValue.value="";
       
       }
       
    })
       
  }

function updateStorage(){
    localStorage.setItem('todo',JSON.stringify(todoArray.value))
}


</script>


<template>
    <div id="todoDashboard" class="flex flex-row">
       
        <main class="min-w-[80%] p-3">
            <!--button for adding new todo-->
            <button @click="openNote=true" 
                class="font-bold border-solid rounded-lg bg-orange-500 text-white 
                hover:bg-blue-400 text-white py-2 px-4 border-b-4 
                border-orange-700 hover:border-blue-500"
                style="width:100px;height:40px; margin:10px; padding:10px">新增todo+  
            </button>               
           <!--todolist--->
            <div class="cardsarea flex flex-row flex-wrap">
                <div v-for="(item,key) in todoArray" :key="item.id"  
                    class="todocard bg-yellow-200 m-2 rounded-lg break-words relative"
                    :class="{'bg-zinc-200':item.completed}">
                    <button class="absolute top-2 right-2 bg-orange-400 rounded"
                         style="padding:0.5px;" @click="edit(item)">編輯
                    </button>
                    <div class="font-bold mb-2 ml-2">Todo.{{key+1}} - {{item.title}}</div>
                    <div class="min-h-[180px] bg-amber-400 mb-3 rounded hover:cursor-pointer"
                         :class="{'bg-zinc-400':item.completed}"
                            style="padding-left:5px;" 
                            @dblclick="edit(item)"                        
                        >{{item.content}}</div>
                    <input type="checkbox" id="checked" v-model="item.completed" :id="item.id" @change="updateStorage()" class="w-5 h-5 hover:cursor-pointer" style="margin-top:5px;">
                    <span class="italic" v-if="item.completed">已完成</span>     
                    <button @click="remove(item)" class="block w-5 rounded-lg hover:cursor-pointer absolute right-5 bottom-2" >
                        <img src="../assets/images/trash-can-solid.svg" class="w-5 h-5"> 
                    </button>
                    
                </div>
          </div>
           <!--adding new todo-->
            <div v-if="openNote" class="newNoteDiv rounded-lg
                    border-l-4 border-orange-200 drop-shadow-2xl ">
                    <img src="../assets/images/x-solid.svg"  
                        @click="cancel()" 
                        class="w-6 h-6 top-5 right-5 hover:cursor-pointer absolute right-10">
                    <div class="flex flex-col md:flex-row" style="margin-top:25px;">
                        <label for="titleInput" class="titleLabel ml-10 text-lg
                                text-orange-500">
                            標題
                        </label>
                        <input id="titleInput" type="text" placeholder="輸入標題" 
                            class=" rounded-lg bg-orange-50" 
                            style="width:80%; padding-left:10px; height:50px;"
                            v-model="titleValue">
                    </div>
                    <div class="flex flex-col md:flex-row bg-red-80" style="margin-top:10px;">     
                        <label for="inputValue" class="contentLabel text-lg text-orange-500">請輸入內容</label>
                        <textarea rows="10" cols="60" id="inputValue" 
                        class="border-solid border-blue-300 hover:border-blue-800 
                                rounded-lg bg-orange-50" 
                            style="width:80%; margin-top:10px; padding-left:10px;"
                            placeholder="輸入 todo 內容" 
                            v-model="contentValue"> 
                        </textarea><br>
                    </div>
                    <div class="btnArea absolute bottom-10 right-20">
                        <button @click="cancel()" class="position bottom-0 
                        right-10 bg-purple-500 hover:bg-purple-900 hover:text-white hover:border-b-4 hover:border-purple-500
                        font-bold rounded-lg text-base" style="margin-right:20px;">取消
                        </button>
                        <button @click="addTodo()" class="ml-5 font-bold bg-orange-300 hover:text-white hover:bg-orange-600 hover:border-b-4 hover:border-orange-300
                            rounded-lg text-base">新增
                        </button>
                    </div>
                    
            </div>
            <!--edit todo-->
            <div v-if="openEditNote" class="newNoteDiv rounded-lg
                border-l-4 border-orange-200 drop-shadow-2xl ">
                <img src="../assets/images/x-solid.svg"  
                @click="openEditNote=false"
                    class="w-6 h-6 top-5 right-5 hover:cursor-pointer absolute right-10">
                <div class="flex flex-col md:flex-row" style="margin-top:25px;">
                    <label for="titleInput" class="titleLabel ml-10 text-lg
                            text-orange-500">
                        標題
                    </label>
                    <input id="titleInput" type="text" placeholder="輸入標題" 
                        class=" rounded-lg bg-orange-50" 
                        style="width:80%; padding-left:10px; height:50px;"
                        v-model="cachetitleValue">
                </div>
                <div class="flex flex-col md:flex-row bg-red-80" style="margin-top:10px;">     
                    <label for="inputValue" class="contentLabel text-lg text-orange-500">請輸入內容</label>
                    <textarea rows="10" cols="60" id="inputValue" 
                    class="border-solid border-blue-300 hover:border-blue-800 
                            rounded-lg bg-orange-50" 
                        style="width:80%; margin-top:10px; padding-left:10px;"
                        placeholder="請輸入你的todo" 
                        v-model="cachecontentValue"> 
                    </textarea><br>
                </div>
                <div class="btnArea absolute bottom-10 right-20">
                    <button @click="openEditNote=false" class="position bottom-0 
                    right-10 bg-purple-500 hover:bg-purple-900 hover:text-white hover:border-b-4 hover:border-purple-500
                    font-bold rounded-lg text-base" style="margin-right:20px;">取消
                    </button>
                    <button @click="confirmEdit()" class="ml-5 font-bold bg-orange-300 hover:text-white hover:bg-orange-600 hover:border-b-4 hover:border-orange-300
                        rounded-lg text-base">確認修改
                    </button>
                </div>
                            
                        
            </div>

        </main>
       
        
    </div>
</template>


<style scoped>
*,nav,main{
    margin:0;
    padding:0;
    box-sizing:border-box;
}
#todoDashboard{
    width:100%;
}
.cardsarea{
    width:100%;
    padding:20px;
}
.todocard{
    width:250px;
    min-height:250px;
    box-sizing:border-box;
    margin:20px;
    padding:10px;
}
.newNoteDiv{
    position:absolute;
    top:30px;
    left:10%;
    margin:10px auto;
    z-index:100;
    width:80%;
    min-height:530px;
    background: white;
    padding:20px;
}
.newNoteDiv .titleLabel, .newNoteDiv .contentLabel{
    margin:10px;
    width:100px;
    display:block;
    box-sizing: border-box;
}

.newNoteDiv .btnArea button{
    width:100px;
    padding:10px;
}
.modal label{
  margin-top:10px;
}
.modal input{
    margin-top:10px;
}

</style>