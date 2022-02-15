// dto - простой объект не имеющий логики, имеющий только поля, эти объекты предназначенны для обмена данными между подсистемами (клиент -> сервер или сервер <-> сервер)

export class BanUserDto {
    readonly userId: number;
    readonly banReason: string;
}
