export type StoreT = {
    storeId: string
    name: string
}

export interface ProfileSchema {
    uid: string
    phone: string
    country: CountryCodes
    position: Position
    company: string
    //CAMPOS PARA AGREGAR A UN EMPLEADO
    companyId?: string
    store?: StoreT[]
}

export type SubscriptionsT = 
    "FREE" |
    "BASIC" |
    "MEDIUM" |
    "PROFESIONAL"

export type MetadataI = {
    lastConnection: Date | null
    subscription?: SubscriptionsT
}

export interface RegisterSchema {
    "name":string
    "email":string
    "password":string
    //EL CAMPO DE ABAJO SOLO ES PARA EL OWNER
    "metadata": MetadataI
}
