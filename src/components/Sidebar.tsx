import { SectionsObject } from "../types/app";
import { HomeOutlined, UserOutlined } from '@ant-design/icons'

const UserMenu: SectionsObject = {
    Inicio: {
        title: "Inicio",
        route: "/",
        type: "item",
        icon: <HomeOutlined />
    },
    Usuarios: {
        title: "Usuarios",
        type: "subitem",
        icon: <UserOutlined />,
        children: [
            {title: "Inicio", subtitle: "Usuarios", route: "/users"}
        ]

    }
}

export { UserMenu }