import { defineStore} from "pinia";
import {
    AllCategory,
    AllOrders,
    ExpensesForm,
    IFormData,
    IItems, IPicture, Order, UserForm,
} from '@/typeModules/useModules';
import {ref, UnwrapRef} from "vue";
import { collection, addDoc, query, Query, updateDoc, orderBy, where, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase'

export const useStore = defineStore('item', () => {
    const state = ref({

        users: [] as UserForm[],
        items: [] as IItems[],
        vignette: [] as Order[],
        albums: [] as AllOrders[],
        pictures: [] as IPicture[],
        alCategory: [] as AllCategory[],
        vignetteCategory: [] as AllCategory[],
        photoCategory: [] as AllCategory[],
        expenses: [] as ExpensesForm[],
        customers: [] as IFormData[],
    });

    const loadCollection = async <T>(
        collectionName: string,
        filters?: {
            status?: string | null
            from?: string | null
            to?: string | null
        }
    ): Promise<T[]> => {
        try {
            const baseRef = collection(db, collectionName)

            const conditions: any[] = []

            if (filters?.status) {
                conditions.push(where("status", "==", filters.status))
            }

            if (filters?.from) {
                conditions.push(where("createdData", "==", filters.from))
            }

            if (filters?.to) {
                conditions.push(where("termData", "==", filters.to))
            }

            const q = conditions.length
                ? query(baseRef, ...conditions)
                : baseRef

            const snap = await getDocs(q)

            return snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as T[]

        } catch (error) {
            console.log(error)
            return []
        }
    }


    const loadComments = async () => {
        const snap = await getDocs(collection(db, 'categories'))

        state.value.customers = snap.docs.map(d => ({
            id: d.id,
            ...d.data()
        })) as IFormData[]
    }

    const addComment = async (item: IFormData) => {
        const {id, ...itemData} = item
        await addDoc(collection(db, 'categories'), {
            ...itemData,
            createdAt: Date.now()
        })

        await loadComments()
    }

    const updateComment = async (id: string | null, item: IFormData) => {
        const { id: _, ...itemData } = item
        await updateDoc(doc(db, 'categories', String(id)), {
            ...itemData,
            updatedAt: Date.now()
        })

        await loadComments()
    }

    const deleteComment = async (id: string) => {
        await deleteDoc(doc(db, 'categories', id))
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

    const loadGetOrders = async () => {
        const snap = await getDocs(collection(db, 'vignette'))
        state.value.vignette = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Order[]
    }

    const addOrder = async (item: Order) => {
        const { id, ...itemData } = item;
        await addDoc(collection(db, 'vignette'), {
            ...itemData,
            createdAt: Date.now()
        })
        await loadGetOrders()
    }

    const updateOrder = async (id: string, item: Order) => {
        const { id: _, ...itemData } = item;
        await updateDoc(doc(db, 'vignette', id), {
            ...itemData,
            updatedAt: Date.now()
        })
        await loadGetOrders()
    }

    const deleteOrder = async (id: string) => {
        await deleteDoc(doc(db, 'vignette', id))
        state.value.vignette = state.value.vignette.filter(v => v.id !== id)
    }

    const loadGetPhotos = async () => {
        const snap = await getDocs(collection(db, 'pictures'))
        state.value.pictures = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as IPicture[]
    }

    const addPhotos = async (item: IPicture) => {
        const { id, ...itemData } = item;
        await addDoc(collection(db, 'pictures'), {
            ...itemData,
            createdAt: Date.now()
        })
        await loadGetPhotos()
    }

    const updatePhotos = async (id: string, item: IPicture) => {
        const { id: _, ...itemData } = item;
        await updateDoc(doc(db, 'pictures', id), {
            ...itemData,
            updatedAt: Date.now()
        })
        await loadGetPhotos()
    }

    const deletePhotos = async (id: string) => {
        await deleteDoc(doc(db, 'pictures', id))
        state.value.pictures = state.value.pictures.filter(p => p.id !== id)
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

    const loadAlbumCategories = async () => {
        const snap = await getDocs(collection(db, 'alCategory'))
        state.value.alCategory = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as AllCategory[]
    }

    const addAlCategory = async (item: AllCategory) => {
        const { id, ...itemData } = item
        await addDoc(collection(db, 'alCategory'), {
            ...itemData,
            createdAt: Date.now()
        })
        await loadAlbumCategories()
    }

    const updateAlCategory = async (id: string, item: AllCategory) => {
        const { id: _, ...itemData } = item;
        await updateDoc(doc(db, 'alCategory', id), {
            ...itemData,
            updatedAt: Date.now()
        })
        await loadAlbumCategories()
    }

    const deleteAlCategory = async (id: string) => {
        await deleteDoc(doc(db, 'alCategory', id))
        state.value.alCategory = state.value.alCategory.filter(c => c.id !== id)
    }

    const loadVigCategory = async () => {
        const snap = await getDocs(collection(db, 'vigCategory'))
        state.value.vignetteCategory = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as AllCategory[]
    }

    const addVigCategory = async (item: AllCategory) => {
        const { id, ...itemData } = item;
        await addDoc(collection(db, 'vigCategory'), {
            ...itemData,
            createdAt: Date.now()
        })
        await loadVigCategory()
    }

    const updateVigCategory = async (id: string, item: AllCategory) => {
        const { id: _, ...itemData } = item;
        await updateDoc(doc(db, 'vigCategory', id), {
            ...itemData,
            updatedAt: Date.now()
        })
        await loadVigCategory()
    }

    const deleteVigCategory = async (id: string) => {
        await deleteDoc(doc(db, 'vigCategory', id))
        state.value.vignetteCategory = state.value.vignetteCategory.filter(c => c.id !== id)
    }

    const loadPhotoCategory = async () => {
        const snap = await getDocs(collection(db, 'photoCategory'))
        state.value.photoCategory = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as AllCategory[]
    }

    const addPhotoCategory = async (item: AllCategory) => {
        const { id, ...itemData } = item;
        await addDoc(collection(db, 'photoCategory'), {
            ...itemData,
            createdAt: Date.now()
        })
        await loadPhotoCategory()
    }

    const updatePhotoCategory = async (id: string, item: AllCategory) => {
        const { id: _, ...itemData } = item;
        await updateDoc(doc(db, 'photoCategory', id), {
            ...itemData,
            updatedAt: Date.now()
        })
        await loadPhotoCategory()
    }

    const deletePhotoCategory = async (id: string) => {
        await deleteDoc(doc(db, 'photoCategory', id))
        state.value.photoCategory = state.value.photoCategory.filter(c => c.id !== id)
    }

    return {
        state,
        loadCollection,
        loadComments, addComment, updateComment, deleteComment,
        addUser, updateUser, deleteUser, loadGetUsers,
        loadMaterials, addMaterial, updateMaterial, deleteMaterial,
        loadGetAlbum, addAlbum, updateAlbum, deleteAlbum,
        loadGetOrders, addOrder, updateOrder, deleteOrder,
        loadGetPhotos, addPhotos, updatePhotos, deletePhotos,
        loadAlbumCategories, addAlCategory, updateAlCategory, deleteAlCategory,
        loadVigCategory, addVigCategory, updateVigCategory, deleteVigCategory,
        loadPhotoCategory, addPhotoCategory, updatePhotoCategory, deletePhotoCategory,
    }
})