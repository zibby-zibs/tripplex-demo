interface Category {
    _createdAt:string
    _id:string
    _rev:string
    _type:"category"
    _updatedAt:string
    title:string
}

interface User {
    _createdAt:string
    _id:string
    _rev:string
    _type:"user"
    _updatedAt:string
    email:string
    name:string
    phone:string
    bank: string
    account: string
}

interface Bill {
    _createdAt:string
    _id:string
    _rev:string
    _type:"bill"
    _updatedAt:string
    amount:string
    billName:string
    billType:string
    categories:{
        _ref:string
        _type:"reference"
    }
    user:{
        _ref:string
        _type:"reference"
    }
}