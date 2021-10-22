export class Vec3
{
    public x:number;
    public y:number;
    public z:number;

    public constructor(x:number = 0, y:number = 0, z:number = 0){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public clone(){
        return new Vec3(this.x, this.y, this.z);
    }

    public multiplyScalar(value:number){
        this.x *= value;
        this.y *= value;
        this.z *= value;

        return this;
    }

    public add(other:Vec3){
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;

        return this;
    }
}