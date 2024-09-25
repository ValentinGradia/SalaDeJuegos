export class Chat
{
    correo !: string;
    fecha !: Date;
    mensaje !: string;

    constructor(correoParam : string, fechaParam : Date, mensajeParam: string)
    {
        this.correo = correoParam;
        this.fecha = fechaParam;
        this.mensaje = mensajeParam;
    }
}