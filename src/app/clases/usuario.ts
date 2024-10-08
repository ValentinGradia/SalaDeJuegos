export class Usuario {
    nombre : string = '';
    apellido : string = '';
    mail : string = '';
    contraseña : string = '';

    constructor(nombreParam:string, apellidoParam:string, mailParam:string, contraseñaParam:string)
    {
        this.nombre = nombreParam;
        this.apellido = apellidoParam;
        this.mail = mailParam;
        this.contraseña = contraseñaParam;
    }

    static async hashearContraseña(contraseña : string) : Promise<string>
    {
        const encoder = new TextEncoder();
        const data = encoder.encode(contraseña);
        
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        
        const hashArray = Array.from(new Uint8Array(hashBuffer)); 
        const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex;   
    }
}
