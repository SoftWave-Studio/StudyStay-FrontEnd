import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    locale: 'es',
    messages: {
        es: {
            "login-toolbar": {
                "login": "Iniciar sesión",
                "register": "Registrarse",
                "language": "Idioma",
                "language-list": {
                    "spanish" : "Español",
                    "english" : "Inglés"
                }
            },
            "home-toolbar": {
                "post": "Publicaciones",
                "universities": "Universidades",
                "profile": "Perfil"
            },
            
            "login-view": {
                "login": "Iniciar sesión",
                "email": "Email",
                "enter-email": "Ingresa tu Email",
                "password": "Contraseña",
                "enter-password": "Ingresa tu contraseña",
                "enter-btn": "Ingresar"
            },
        
            "register-view":{
                "register": "Registrarse",
                "names": "Nombres",
                "enter-names": "Ingresa tus nombres",
                "email": "Correo Electrónico",
                "enter-email": "Ingresa tu correo ",
                "phone": "Número de Teléfono",
                "enter-phone": "Ingresa tu teléfono",
                "password": "Contraseña",
                "enter-password": "Ingresa tu contraseña",
                "register-btn": "Registrarme"
            },
        
            "posts-view": {
                "create-post": "Crear publicación",
                "search-post": "Buscar publicaciones...",
                "details": "Detalles",
                "near-to": "Cerca a ",
                "phone-detail": "Número de teléfono"
            },
        
            "create-popup": {
                "create-post": "Agregar nueva publicación",
                "description": "Descripción",
                "direction": "Dirección",
                "price": "Precio por hora",
                "near-universities": "Universidades cercanas",
                "url": "URL de la foto",
                "create-btn": "Crear",
                "cancel-btn": "Cancelar"
            },
        
            "post-details": {
                "details": "Detalles",
                "near-to": "Cerca a ",
                "description": "Descripción",
                "enter-description": "Ingresa una descripción",
                "fee": "Tarifa",
                "reserve-btn": "Reservar"
            },
        
            "make-reserve":{
                "make-reservation": "Realizar reserva",
                "check-in": "Fecha de ingreso",
                "check-out": "Fecha de salida",
                "payment-method": "Método de pago",
                "stay-time": "Tiempo de estadía",
                "total-fee": "Monto total",
                "cancel": "Cancelar",
                "confirm": "Confirmar"
            },
        
            "universities-view": {
                "universities": "Universidades",
                "search-university": "Buscar universidades o institutos...",
                "campus": "sedes",
                "university": "Universidad",
                "institute": "Instituto",
                "look-rooms": "Ver habitaciones"
            },
        
            "profile-view": {
                "profile": "Mi Perfil",
                "names": "Nombres",
                "phone": "Número de teléfono",
                "email": "Email",
                "password": "Contraseña",
                "save-changes": "Guardar cambios",
                "delete-account": "Eliminar cuenta",
                "logout": "Cerrar sesión"
            }    
        },
        en: {
            "login-toolbar": {
                "login": "Log in",
                "register": "Register",
                "language": "Language",
                "language-list": {
                    "spanish" : "Spanish",
                    "english" : "English"
                }
            },
            "home-toolbar": {
                "post": "Posts",
                "universities": "Universities",
                "profile": "Profile"
            },
            
            "login-view": {
                "login": "Log in",
                "email": "Email",
                "enter-email": "Enter your email",
                "password": "Password",
                "enter-password": "Enter your password",
                "enter-btn": "Enter"
            },
        
            "register-view":{
                "register": "Register",
                "names": "Names",
                "enter-names": "Enter your names",
                "email": "Email",
                "enter-email": "Enter your email",
                "phone": "Phone number",
                "enter-phone": "Enter your phone number",
                "password": "Password",
                "enter-password": "Enter your password",
                "register-btn": "Register"
            },
        
            "posts-view": {
                "create-post": "Create post",
                "search-post": "Search post...",
                "details": "Details",
                "near-to": "Near to ",
                "phone-detail": "Phone number"
            },
        
            "create-popup": {
                "create-post": "Add new post",
                "description": "Description",
                "direction": "Direction",
                "price": "Price per hour",
                "near-universities": "Near universities",
                "url": "Photo URL",
                "create-btn": "Create",
                "cancel-btn": "Cancel"
            },
        
            "post-details": {
                "details": "Details",
                "near-to": "Near to ",
                "description": "Description",
                "enter-description": "Enter a description",
                "fee": "Fee",
                "reserve-btn": "Reserve"
            },
        
            "make-reserve":{
                "make-reservation": "Make reservation",
                "check-in": "Check-in",
                "check-out": "Check-out",
                "payment-method": "Payment method",
                "stay-time": "Stay time",
                "total-fee": "Total fee",
                "cancel": "Cancel",
                "confirm": "Confirm"
            },
        
            "universities-view": {
                "universities": "Universities",
                "search-university": "Search university...",
                "campus": "campus",
                "university": "University",
                "institute": "Institute",
                "look-rooms": "See rooms"
            },
        
            "profile-view": {
                "profile": "My profile",
                "names": "Names",
                "phone": "Phone number",
                "email": "Email",
                "password": "Password",
                "save-changes": "Save changes",
                "delete-account": "Delete account",
                "logout": "Log out"
            }    
        }
    }
})

export default i18n