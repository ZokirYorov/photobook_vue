export interface Register {
    name: string;
    email: string;
    password: string;
}

export interface UserLogin {
    email: string;
    password: string;
}
export interface Paging {
    page: number;
    size: number;
}

export interface IItems {
    id: string | null;
    itemName: string;
    itemType: string;
    unitName: string;
    quantity: number | null;
    createdAt: string | null;
    updatedAt: string | null;
}

export interface CategoryForm {
    id: number | string | null;
    name: string | null;
    createdAt: string | null;
    updatedAt: string | null;
}

export interface AllOrders {
    id: string;
    categoryName: string | null; // buyurtma turi nomi
    orderName: string; // buyurtma nomi { tuy, maktab ...,}
    pageNumber: number | null; // betlar soni
    amountNumber: number | null; //buyurtma soni
    customerName: string; // mijoz nomi
    receiverName: string; // qabul qiluvchi
    employeeName: string; // xodim
    processNumber: number | null; // jarayonda bajarilgan holati soni
    termData: string | null; // muddat tugash sanasi
    status: string; // holat
    // doneData: number | null; // bajarildi
    createdData: string;
    createdAt: string | null; // yaratilgan kun
    updatedAt: string | null; // yangilangan kun
}

export interface UserForm {
    id: string;
    fullName: string;
    profession: string;
    phoneNumber: number | null;
    createdAt: string | null;
    updatedAt: string | null;
}

export interface Order {
    id: number | null;
    name: string;
    fullName: string;
    client: string;
    data: string | null;
    status: string;
}


export interface ExpensesForm {
    id: number | string | null;
    name: string;
    price: number | null;
    description: string;
    itemId: string;
    date: string;
    paymentMethod: string;
    receipt_image: string;
}

export interface IForm {
    text: string;
    name: string;
    date: string;
}

export interface IFormData {
    id: string | null;
    text: string;
    name: string;
    date: string;
    createdAt: number | null;
    updatedAt: number | null;
}