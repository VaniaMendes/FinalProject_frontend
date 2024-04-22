import { create } from 'zustand';


//Controla o aparecimento dos modals
export const showModal = create((set) => ({
    showModalNewCategory: false,
    setShowModalNewCategory: (value) => set({ showModalNewCategory: value }),
    showEditCategory: false,
    setShowEditCategory: (value) => set({ showEditCategory: value }),
    showNewUserModal: false, 
    setShowNewUserModal: (value) => set({ showNewUserModal: value }), 
    showModalEditUser:false,
    setShowModalEditUser:(value) => set({ showModalEditUser: value }),

    filterOn: false,
    setFilterOn: (value) => set({ filterOn: value }),
    
  }));

  

  export const updateCategoriesTable = create((set) => ({
    showCategoriesTable: false,
    setShowCategoriesTable: (value) => set({ showCategoriesTable: value }),
  }));

  export const updateUsersTable = create((set) => ({
    showUsersTable: false,
    setShowUsersTable: (value) => set({ showUsersTable: value }),
  }));

  export const showModalNewTask = create((set) => ({
    showNewTask: false,
    setShowNewTask: (value) => set({ showNewTask: value }),
  }));

  export const updateTasksList = create((set) => ({
    updateTasks: false,
    setUpdateTasks: (value) => set({ updateTasks: value }),
  }));


  export const showModalEditTask = create((set) => ({ 
    showEditTask: false,
    setShowEditTask: (value) => set({ showEditTask: value }),

  }));

  export const modeEditOn = create((set) => ({

    modeEdit: false,
    setModeEdit: (value) => set({ modeEdit: value }),
  }));

  export const modeEditTask = create((set) => ({

    editTask: false,
    setEditTask: (value) => set({ editTask: value }),
  }));

  export const showMyTasks = create((set) => ({

    showUserTasks: false,
    setShowUserTasks: (value) => set({ showUserTasks: value }),
  }));


  export const ViewTaskDetails = create((set) => ({
    showTaskDetails: false,
    setShowTaskDetails: (value) => set({ showTaskDetails: value }),
  }));


  export const cleanBoardStore = () => {
    
    showModal.getState().setFilterOn(false);
    showMyTasks.getState().setShowUserTasks(false);

    
}

export const showChart = create((set) => ({
  showTaskChart: false,
  setShowTaskChart: (value) => set({ showTaskChart: value }),
}));


export const showMessages = create((set) => ({
  showMessageChat: false,
  setShowMessageChat: (value) => set({ showMessageChat: value }),
}));



export const showNotificationsPainel = create((set) => ({
  showNotifications: false,
  setShowNotifications: (value) => set({ showNotifications: value }),
}));