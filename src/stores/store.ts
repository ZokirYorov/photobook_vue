import { defineStore} from "pinia";
import {
    AllOrders,
    CategoryForm,
    ExpensesForm, IForm,
    IFormData,
    IItems, UserForm,
} from '@/typeModules/useModules';
import {ref, UnwrapRef} from "vue";
import { collection, addDoc, query, Query, updateDoc, orderBy, where, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase'

export const useStore = defineStore('item', () => {
    const state = ref({

        users: [] as UserForm[],
        items: [] as IItems[],
        albums: [] as AllOrders[],
        categories: [] as CategoryForm[],
        expenses: [] as ExpensesForm[],
        customers: [] as IFormData[],
    });

    const loadAlbums = async (status?: string) => {
        try {
            const baseRef = collection(db, "albums")

            let q: Query = baseRef

            if (status) {
                q = query(baseRef, where("status", "==", status))
            }

            const snap = await getDocs(q)

            state.value.albums = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as AllOrders[]

        } catch (error) {
            console.log(error)
        }
    }

    const loadComments = async () => {
        const snap = await getDocs(collection(db, 'customers'))

        state.value.customers = snap.docs.map(d => ({
            id: d.id,
            ...d.data()
        })) as IFormData[]
    }

    const addComment = async (item: IForm) => {
        await addDoc(collection(db, 'customers'), {
            ...item,
            createdAt: Date.now()
        })

        await loadComments()
    }

    const updateComment = async (id: string, item: IForm) => {
        await updateDoc(doc(db, 'customers', id), {
            ...item,
            updatedAt: Date.now()
        })

        await loadComments()
    }

    const deleteComment = async (id: string) => {
        await deleteDoc(doc(db, 'customers', id))
        state.value.customers = state.value.customers.filter(c => c.id !== id)
    }

    const loadGetUsers = async () => {
        const snap = await getDocs(collection(db, 'users'))
        state.value.users = snap.docs.map(d => ({
            id: d.id,
            ...d.data()
        })) as UserForm[]
     };

    const addUser = async (user: UserForm) => {
        const { id, ...userData } = user
        await addDoc(collection(db, 'users'), {
            ...userData,
            createdAt: Date.now()
        })
        await loadGetUsers()
    }

    const updateUser = async (id: string, user: UserForm) => {
        if (!id) return;
        const { id: _,...userData } = user
        await updateDoc(doc(db, 'users', id), {
            ...userData,
            updatedAt: Date.now()
        })
        await loadGetUsers()
    }

    const deleteUser = async (id: string) => {
        await deleteDoc(doc(db, 'users', id))
        state.value.users = state.value.users.filter(user => user.id !== id
        )
    }

    const loadGetAlbum = async () => {
        const snap = await getDocs(collection(db, 'albums'))
        state.value.albums = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as AllOrders[]
    }

    const addAlbum = async (item: AllOrders) => {
        const { id, ...itemData } = item;
        // const process = item.processNumber ?? 0;
        // const amount = item.amountNumber ?? 0;
        //
        // if (process === 0) {
        //     itemData.status = 'Kutilmoqda';
        // }
        // else if (process > 0 && process < amount) {
        //     itemData.status = 'Jarayonda';
        // }
        // else if (process >= amount && amount > 0) {
        //     itemData.status = 'Bajarilgan';
        // } bu kerakli logika

        await addDoc(collection(db, 'albums'), {
            ...itemData,
            createdAt: Date.now()
        })
        await loadGetAlbum()
    }

    const updateAlbum = async (id: string, item: AllOrders) => {
        const { id: any, ...itemData } = item;
        // const processItem = item.processNumber ?? 0;
        // const amount = item.amountNumber ?? 0;

        // if (processItem === 0) {
        //     itemData.status = 'Kutilmoqda';
        // }
        // else if (processItem > 0 && processItem < amount) {
        //     itemData.status = 'Jarayonda';
        // }
        // else if (processItem >= amount && amount > 0) {
        //     itemData.status = 'Bajarilgan';
        // } bu ham kerakli logika

        await updateDoc(doc(db, 'albums', id), {
            ...itemData,
            updatedAt: Date.now()
        })
        await loadGetAlbum()
    }

    const deleteAlbum = async (id: string) => {
        await deleteDoc(doc(db, 'albums', id))
        state.value.albums = state.value.albums.filter(album => album.id !== id)
    }

    const loadMaterials = async () => {
        const q = query(
            collection(db, 'materials'),
            orderBy('createdAt', 'desc')
        );
        const snap = await getDocs(q)
        state.value.items = snap.docs.map(d => ({
            id: d.id,
            ...d.data()
        })) as IItems[]
    }

    const addMaterial = async (item: Omit<UnwrapRef<IItems>, "id">) => {
        await addDoc(collection(db, 'materials'), {
            ...item,
            createdAt: Date.now(),
        })
        await loadMaterials()
    }

    const updateMaterial = async (id: string | null, item: IItems) => {
        await updateDoc(doc(db, 'materials', String(id)), {
            ...item,
            updatedAt: Date.now(),
        })
        await loadMaterials()
    }

    const deleteMaterial = async (id: string | null) => {
        await deleteDoc(doc(db, 'materials', String(id)))
        state.value.items = state.value.items.filter(item => item.id !== id)
    }


    const getAllOrders = async () => {
        try {
            // const response = await axiosInstance.get("/api/orders")
            // state.value.orders = response.data;
            // return response.data
        }
        catch (error) {
            console.error(error);
        }
    }


    return {
        state,
        loadAlbums,
        loadComments, addComment, updateComment, deleteComment, getAllOrders,
        addUser, updateUser, deleteUser, loadGetUsers,
        loadMaterials, addMaterial, updateMaterial, deleteMaterial,
        loadGetAlbum, addAlbum, updateAlbum, deleteAlbum,
    }
})