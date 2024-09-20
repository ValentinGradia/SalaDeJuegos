export class Chat
{
    correo !: string;
    fecha !: Date;
    mensaje !: string;
    nombre !: string;

    constructor(correoParam : string, fechaParam : Date, mensajeParam: string, nombreParam: string)
    {
        this.correo = correoParam;
        this.fecha = fechaParam;
        this.mensaje = mensajeParam;
        this.nombre = nombreParam;
    }
}