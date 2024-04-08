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

            filteredTasks:[],
            setFilteredTasks: (filteredTasks) => set({ filteredTasks }),
            getFilteredTasks: () => userStore.getState().filteredTasks,

            myTasks:[],
            setMyTasks: (myTasks) => set({ myTasks }),
            getMytasks: () => userStore.getState().myTasks,


            notifications: [], 
            updateNotifications: (notifications) => set({ notifications }), // Alterando aqui para setar diretamente o estado de notifications
            addNotification: (newNotification) => set((state) => ({ notifications: [...state.notifications, newNotification] })),
           
             // Função para limpar completamente o store
             clearStore: () => set({
                token: "", 
                role: "",
                categoryId:"",
                username:"",
                taskIdForEdit:"",
               
            }),

            
            locale: "en", 
            updateLocale : (locale) => set({locale}) 




        }),
        {
            name: 'mystore',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);



