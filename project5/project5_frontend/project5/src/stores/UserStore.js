import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const userStore = create(
    persist(
        (set) => ({
            token: "", 
            setToken: (token) => set({ token }), 
            getToken: () => userStore.getState().token,

            role: "",
            setRole: (role) => set({ role }),
            getRole: () => userStore.getState().role,


            //Guar o id da categoria para ser possível a sua edição
            categoryId:"",
            setCategoryId: (categoryId) => set({ categoryId }), 
            getCategoryId: () => userStore.getState().categoryId,

            //Guarda o username necessário para editar o perfil pelo PO
            username:"",
            setUsername: (username) => set({ username }),
            getUsername: () => userStore.getState().username,

            //Guarda o id da task que vai ser editada
            taskIdForEdit:"",
            setTaskIdForEdit: (taskIdForEdit) => set({ taskIdForEdit }), 
            getTaskIdForEdit: () => userStore.getState().taskIdForEdit,


            //Esta lista de tarefa é guardada aqui porque esta em componentes dieferentes, ou seja é criada no SeacrhFields e apresentada no ScrumBoard
            filteredTasks:[],
            setFilteredTasks: (filteredTasks) => set({ filteredTasks }),
            getFilteredTasks: () => userStore.getState().filteredTasks,

            //Esta lista de tarefas é quardada porque ele é pedida quando abro a aplicacao no MainMenu e depois é so consultada no ScrumBoard
            myTasks:[],
            setMyTasks: (myTasks) => set({ myTasks }),
            getMytasks: () => userStore.getState().myTasks,
    
            
            locale: "en", 
            updateLocale : (locale) => set({locale}) 


        }),
        {
            name: 'mystore',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);



